# Synapse - AI Chat Application

Synapse is a **Next.js** application that serves as an AI-powered chat platform with functionalities including code generation, audio generation, video generation, and chatbot creation. This project leverages modern technologies to provide an interactive and feature-rich user experience.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)
- [Learn More](#learn-more)

---

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (version 16.x or later is recommended). [Download Node.js](https://nodejs.org/)
- **Yarn**: This project uses Yarn as the package manager. Install it globally:

```bash
npm install -g yarn
```

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/synapse.git
```

Navigate to the project directory:

```bash
cd synapse
```

Install the dependencies:

```bash
yarn install
```

### Running the Development Server

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To create an optimized production build:

```bash
yarn build
```

To start the production server:

```bash
yarn start
```

---

## Features

- **AI-Powered Chat Interface**: Interact with an AI assistant that can answer questions and generate content.
- **Code Generation**: Generate code snippets in various programming languages.
- **Audio Generation**: Convert text scripts into audio using text-to-speech technology.
- **Video Generation**: Create talking avatar videos from provided scripts.
- **Chatbot Creation**: Build and customize your own chatbots.
- **Social Media Content Creation**: Generate promotional content for social media platforms.
- **Responsive Design**: Optimized for various screen sizes and devices.
- **Agent Factory Interface**: Allows users to interact with the hierarchical agent system.

## How to Use the Agent Factory

1. **Access the Agent Factory:**
   - Click on "Agent Factory" in the navigation menu.

2. **Enter Your Request:**
   - Type your instructions or queries into the textarea.

3. **Submit Your Request:**
   - Click the "Submit" button to send your input to the agent system.

4. **View the Response:**
   - The output from the agents will be displayed below the submit button.

---

## Project Structure

```
synapse/
├── app/                      # Next.js application directory (App Router)
│   ├── layout.tsx            # Root layout of the app
│   ├── providers.tsx         # Global providers for state and context
│   ├── globals.css           # Global CSS styles
│   ├── page.tsx              # Home page component
│   ├── [feature]/            # Feature-specific pages
│   │   ├── page.tsx          # Feature page component
│   │   └── ...               # Additional feature-specific components and files
├── components/               # Reusable components
├── context/                  # React context for global state management
├── templates/                # Page templates
├── public/                   # Static assets
├── styles/                   # Global and component-specific styles
├── mocks/                    # Mock data for testing
├── utils/                    # Utility functions and helpers
├── constants/                # Application constants
├── types/                    # TypeScript type definitions
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

---

## Technologies Used

- **Next.js 13**: Framework for server-rendered React applications.
- **React 18**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Chakra UI**: Modular and accessible component library for React.
- **Framer Motion**: Animation library for React.
- **React Hook Form**: Form validation library for React.
- **React Datepicker**: Date and time picker component for React.
- **React Syntax Highlighter**: Syntax highlighting component for code blocks.
- **Vitest**: Fast unit test framework powered by Vite.
- **Headless UI**: Unstyled, fully accessible UI components.
- **React Icons**: Include popular icons in your React projects.

---

## Available Scripts

In the project directory, you can run:

- **`yarn dev`**: Runs the app in development mode.
- **`yarn build`**: Builds the app for production.
- **`yarn start`**: Runs the built app in production mode.
- **`yarn lint`**: Runs ESLint to analyze the code for potential errors.
- **`yarn test`**: Launches the test runner using Vitest.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- **Next.js**
  - [Next.js Documentation](https://nextjs.org/docs)
  - [Learn Next.js](https://nextjs.org/learn)
- **React**
  - [React Documentation](https://reactjs.org/docs/getting-started.html)
- **TypeScript**
  - [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **Tailwind CSS**
  - [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Chakra UI**
  - [Chakra UI Documentation](https://chakra-ui.com/docs)

Feel free to open an issue if you have any questions or suggestions.
