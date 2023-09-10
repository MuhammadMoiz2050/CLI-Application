# CLI Application

Welcome to the CLI Application! This project provides a command-line interface (CLI) that simulates various command-line functionalities. It allows users to execute commands, fetch cryptocurrency prices, upload CSV files, draw charts, and more.

## Table of Contents

- [Design Choices](#design-choices)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Third-Party Libraries](#third-party-libraries)

## Design Choices

The CLI Application was designed with the following considerations in mind:

- **User-Friendly**: The interface aims to be intuitive and user-friendly, making it accessible for both novice and experienced users.

- **Modular**: The code is organized into modular components, enhancing maintainability and scalability.

- **Error Handling**: Comprehensive error handling is implemented to provide clear error messages and gracefully handle exceptions.

- **Visualization**: The application supports data visualization using charts to help users analyze data efficiently.

## Architecture

The project's architecture follows a client-server model:

- **Client**: The client is a React-based front-end that provides the user interface for interacting with the CLI. It communicates with the server via HTTP requests.

- **Server**: The server is built using Node.js and Express.js. It handles incoming requests, performs actions based on the commands received, and communicates with external APIs as needed.

## Getting Started

Follow these instructions to set up and run the CLI Application on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it [here](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/CLI-Application.git
   ```

2. Change to the project frontend directory:

    ```bash
    cd CLI-Application/frontend

3. Install the dependencies:

    ```bash
    npm install

4. Change to the project backend directory:
    ```bash
    cd CLI-Application/server

5. Install the dependencies:

    ```bash
    npm install

6. Start the frontend and backend servers:

 * Frontend (from the frontend directory):
    ```bash
    npm start

 * Backend (from the server directory):
    ```bash
    npm start devStart

7. Open your web browser and go to http://localhost:3000 to access the CLI Application.

### Available Commands

- **help**: Display available commands.
- **about**: Display information about the CLI.
- **fetch-price [coin]**: Fetch the current price of a specified cryptocurrency.
- **upload**: Upload a CSV file.
- **draw [file] [columns]**: Draw a chart using data from a CSV file.
- **delete [filename]**: Delete a file from the server.
- **cls**: Clear the screen history.


### Third-Party Libraries

The following third-party libraries and frameworks are used in this project:

- [React](https://reactjs.org/): Front-end library for building user interfaces.
- [Node.js](https://nodejs.org/): Server-side JavaScript runtime.
- [Express.js](https://expressjs.com/): Web application framework for Node.js.
- [axios](https://axios-http.com/): Promise-based HTTP client for making API requests.
- [PapaParse](https://www.papaparse.com/): Library for parsing CSV data.
- [Recharts](http://recharts.org/): Charting library for React applications.
