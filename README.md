# Water Blocks Visualizer

A dynamic and interactive web application that visualizes the "trapping rain water" problem. Users can input an array of block heights, and the application will render the blocks and calculate the total amount of water that can be trapped between them.

![Water Visualizer Screenshot](https://placehold.co/800x450.png?text=App+Screenshot)

## ✨ Features

- **Interactive Visualization:** See the blocks and trapped water rendered in real-time.
- **Dynamic Calculation:** Instantly calculates the total units of trapped water.
- **Customizable Input:** Easily change the block heights to see different scenarios.
- **Animated Water:** A subtle wave animation on the water for a more engaging experience.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

## 🛠️ Tech Stack

This project is built with a modern, component-based architecture:

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI/GenAI:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v20 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

### Running the Application

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:9002`. Open this URL in your web browser to see the application.

## Usage

1.  Navigate to the application in your browser.
2.  You will see a default set of blocks and the calculated trapped water.
3.  In the "Input Block Heights" field, enter a new set of comma-separated numbers (e.g., `5, 1, 3, 6, 2, 4`).
4.  Click the "Visualize" button.
5.  The visualization will update to reflect the new block heights, and the "Total Water Trapped" will be recalculated.

## 📄 License

This project is open-source and available under the MIT License.
