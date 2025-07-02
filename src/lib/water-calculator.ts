export function calculateTrappedWater(heights: number[]): { total: number; waterLevels: number[] } {
  if (!heights || heights.length < 2) {
    return { total: 0, waterLevels: heights || [] };
  }

  const n = heights.length;
  const leftMax = new Array<number>(n).fill(0);
  const rightMax = new Array<number>(n).fill(0);
  let total = 0;

  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }
  
  const waterLevels = heights.map((_, i) => Math.min(leftMax[i], rightMax[i]));

  for (let i = 0; i < n; i++) {
    const waterHeight = waterLevels[i] - heights[i];
    if (waterHeight > 0) {
      total += waterHeight;
    }
  }

  return { total, waterLevels };
}
