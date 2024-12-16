=======

# Project Title

## Description

This project is a web application that includes various components such as a loading spinner, data display, and more. The application is designed to provide users with an interactive experience while fetching and displaying data.

## Project Structure

- **src/Componants**: Contains all the React components used in the application.
- **src/assets**: Contains static assets like images and icons.
- **public**: Contains public files such as JSON data files and the main HTML file.
- **src/Componants/Home**: The home page component that displays an overview of the data.
- **src/Componants/DetailsPage**: A component that shows detailed information about specific data entries.
- **src/Componants/Candle**: A component that displays candle data with filtering options.

## Features

- Loading spinner for better user experience.
- Data display with filtering options.
- Responsive design using Tailwind CSS.

## Libraries Used

- React
- React Router
- Axios
- Tailwind CSS
- @testing-library/react
- Jest
- Docker

## Docker

Docker is a platform that allows developers to automate the deployment of applications inside lightweight, portable containers. It helps in creating a consistent environment for development, testing, and production.

## GitHub Repository

[Vercel Link](https://task2-alpha-bice.vercel.app/)

## Data Files

- **public/candle.json**: Contains candle data used in the Candle component.
- **public/exchange.json**: Contains exchange data used for displaying market information.
- **public/metadata.json**: Contains metadata related to the application and its components.

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Project

To run the project locally, use the following command:

```bash
npm run dev
```

Then open your browser and navigate to `http://localhost:3000`.

## Running with Docker

1. Ensure Docker is installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).
2. Build the Docker image:
   ```bash
   docker build -t your-image-name .
   ```
3. Run the Docker container:
   ```bash
   docker run -p 3000:3000 your-image-name
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Visit the home page to view the data.
- Use the loading spinner to indicate data fetching.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request.

## License

This project is licensed under the MIT License.
npm run dev
