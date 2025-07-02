"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Droplets } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { calculateTrappedWater } from "@/lib/water-calculator";

const formSchema = z.object({
  heights: z.string().min(1, {
    message: "Please enter at least one block height.",
  }),
});

const initialBlocks = [4, 2, 0, 3, 2, 5];

export function WaterVisualizer() {
  const [blocks, setBlocks] = useState<number[]>(initialBlocks);
  const [waterData, setWaterData] = useState<{ total: number; waterLevels: number[] } | null>(null);

  useEffect(() => {
    setWaterData(calculateTrappedWater(blocks));
  }, [blocks]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heights: initialBlocks.join(", "),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newBlocks = values.heights
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 0);
    
    if (newBlocks.length > 0) {
      setBlocks(newBlocks);
    } else {
      form.setError("heights", {
        type: "manual",
        message: "Please enter valid, comma-separated non-negative numbers.",
      });
    }
  }

  const visualization = useMemo(() => {
    if (!waterData || blocks.length === 0) return null;

    const BLOCK_WIDTH = 50;
    const GAP = 10;
    const SVG_PADDING = 20;
    const MAX_VIS_HEIGHT = 300;
    
    const overallMaxHeight = Math.max(...waterData.waterLevels, 1);
    const scaleY = MAX_VIS_HEIGHT / overallMaxHeight;
    
    const svgWidth = blocks.length * (BLOCK_WIDTH + GAP) - GAP + 2 * SVG_PADDING;
    const svgHeight = MAX_VIS_HEIGHT + 2 * SVG_PADDING;

    return (
      <svg
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        aria-label="Visualization of blocks and trapped water"
        className="mx-auto mt-4"
      >
        <defs>
          <filter id="wave-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence baseFrequency="0.02 0.05" numOctaves="1" seed="2" stitchTiles="stitch" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" scale="8" xChannelSelector="R" yChannelSelector="G" />
            <animate attributeName="baseFrequency" dur="6s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0.02 0.05;0.03 0.06;0.02 0.05" />
          </filter>
        </defs>
        <g transform={`translate(${SVG_PADDING}, ${SVG_PADDING})`}>
          {blocks.map((height, i) => {
            const waterLevel = waterData.waterLevels[i];
            const x = i * (BLOCK_WIDTH + GAP);
            
            const blockHeight = height * scaleY;
            const blockY = MAX_VIS_HEIGHT - blockHeight;

            const waterHeight = (waterLevel - height) * scaleY;
            const waterY = MAX_VIS_HEIGHT - (waterLevel * scaleY);

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={blockY}
                  width={BLOCK_WIDTH}
                  height={blockHeight}
                  className="fill-secondary-foreground transition-all duration-500"
                  rx="2"
                />
                {waterHeight > 0 && (
                  <rect
                    x={x}
                    y={waterY}
                    width={BLOCK_WIDTH}
                    height={waterHeight}
                    className="fill-water opacity-80"
                    filter="url(#wave-filter)"
                    rx="2"
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>
    );
  }, [blocks, waterData]);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-headline">Water Blocks Visualizer</CardTitle>
        <CardDescription>
          Enter block heights as comma-separated numbers to see how much water can be trapped.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="heights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Input Block Heights</FormLabel>
                  <FormControl>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input placeholder="e.g., 4, 2, 0, 3, 2, 5" {...field} />
                      <Button type="submit" className="w-full sm:w-auto">
                        <Droplets className="mr-2 h-4 w-4" />
                        Visualize
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="mt-6 min-h-[340px] w-full overflow-x-auto rounded-lg border bg-card p-2">
          {visualization}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-4 rounded-b-lg">
        <div className="text-lg">
          <span className="font-semibold">Total Water Trapped: </span>
          <span className="font-bold text-primary">{waterData?.total ?? 0}</span>
          <span> units</span>
        </div>
      </CardFooter>
    </Card>
  );
}
