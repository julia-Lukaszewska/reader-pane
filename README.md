# Reader Pane

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Testing](#testing)
- [Security and Monitoring](#security-and-monitoring)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)
- [Project Status and Roadmap](#project-status-and-roadmap)
- [Support](#support)
- [Changelog](#changelog)

## Introduction

**Reader Pane** is a web application that currently serves as an advanced ebook and document reader, temporarily supporting only the PDF format. It allows users to upload their own files from their disk, view them, and automatically save their reading progress. The application also allows for adding notes and rating books.

The main goal of the project was to provide fast streaming of books without the need to read them from a local drive, enabling access on various devices. Each user has their own library assigned to their account, which they create and manage themselves.

The name **Reader Pane** reflects the project's vision: "Reader" is a space for comfortable content consumption, while "Pane" symbolizes a single "pane" or a modular interface panel. Reader Pane is a lightweight, modular reader that arranges content in "glass" tiles. Ultimately, by using a glassmorphism aesthetic (blurred, semi-transparent panels) and a 4/8/12 × * tile grid, the user will be able to freely arrange articles, notes, and files in separate panes, smoothly switch between focus mode and a mosaic view, as well as pin selected panels (Pin Pane) and maintain context while working. In short: **Reader Pane is a "window for reading,"** where each tile is its own pane – organize your content just like you arrange things on your desk.

> **Note:** The application is currently in a demo version and is experimenting with graphics, offering light glass-inspired effects. The final, fully polished visual effect and intuitive menu will be implemented after the core technical functions are refined.

In the future, Reader Pane is set to evolve into a comprehensive application for learning and working with text. It will facilitate the quick processing of large amounts of text, which will be particularly useful for university students who draw from many sources, or for self-learning languages with original texts. There are plans to introduce flashcard functionality and integration with AI-based tools.

## Features

### Current Features
- **PDF Reader**: Supports viewing documents in PDF format, with three reading modes: single-page view, two-page view, and scroll mode
- **File Upload**: Ability to upload your own PDF files from the user's disk
- **Reading Progress Saving**: Automatically saves the last read page and progress in books
- **Notes**: Ability to add and manage notes within documents
- **Book Rating**: Functionality to rate read books
- **Cloud Streaming**: Fast streaming of books stored in the cloud, allowing access from multiple devices
- **Personal Library**: Each user has their own, self-managed library of books
- **Responsive Design**: Currently, most views adapt to different browser window sizes. A dedicated design for phones and tablets will be created once the core user interface elements for browsers are refined

### Future Plans
- Integration with an external API for books from free sources
- Development into a tool for learning and working with text (bookmarks, flashcards)
- Integration with AI features
- Automatic translations and different language versions of the application
- A mobile application for phones

## Technologies Used

A detailed list of all technologies, libraries, and tools used in the project.

### Frontend
- **React.js** (version 19.0.0)
- **React Router** (version 7.4.1)
- **React Router DOM** (version 7.4.1)
- **Redux Toolkit** (version 2.7.0)
- **React Redux** (version 9.2.0)
- **Reselect** (version 5.1.1)
- **Redux Persist** (version 6.0.0)
- **Redux Persist Transform Expire In** (version 1.1.3)
- **Styled Components** (version 6.1.16)
- **React Icons** (version 5.5.0)
- **React Select** (version 5.10.1)
- **Date-fns** (version 4.1.0)
- **Lodash.throttle** (version 4.1.1)
- **PDF.js** (version 5.1.91)
- **Use-debounce** (version 10.0.4)
- **UUID** (version 11.1.0)
- **@sentry/browser** (version 9.28.1)
- **@sentry/react** (version 9.28.1)
- **@sentry/replay** (version 7.116.0)
- **@sentry/tracing** (version 7.120.3)
- **@sentry/vite-plugin** (version 3.5.0)
- **@esbuild-plugins/node-globals-polyfill** (version 0.2.3)

### Backend
- **Node.js** (version 5.1.0 - Express)
- **Express.js** (version 5.1.0)
- **MongoDB** (version 6.17.0 - driver)
- **Mongoose** (version 8.15.1) - ORM for MongoDB
- **Bcrypt** (version 6.0.0) - for password hashing
- **JSON Web Token** (jsonwebtoken) (version 9.0.2) - for JWT authentication
- **Cookie Parser** (version 1.4.7)
- **CORS** (version 2.8.5)
- **Dotenv** (version 16.4.7)
- **Express Validator** (version 7.2.1)
- **GridFS Stream** (version 1.1.1)
- **Helmet** (version 8.1.0)
- **Morgan** (version 1.10.0) - for HTTP logging
- **Multer** (version 2.0.1) - for handling file uploads
- **Passport** (version 0.7.0) - for authentication
- **Passport Google OAuth20** (version 2.0.0)
- **Passport JWT** (version 4.0.1)
- **Passport Local** (version 1.0.0)
- **PDF-Lib** (version 1.17.1)
- **PDF.js** (version 5.3.31)
- **Range Parser** (version 1.2.1)
- **@napi-rs/canvas** (version 0.1.71)
- **@sentry/node** (version 9.28.1)
- **@sentry/tracing** (version 7.120.3)

### Database
- **MongoDB** (version 6.17.0 - driver, used with Mongoose)
- **MongoDB Atlas** (used as a cloud service)
- **GridFS** (for storing large files, e.g., PDFs)

### Developer Tools
- **Git**
- **npm / yarn**
- **ESLint** (version 9.28.0) - for code linting
- **Prettier** (version 3.5.3) - for code formatting
- **Concurrently** (version 9.1.2) - for running scripts in parallel
- **Cross-env** (version 7.0.3) - for setting environment variables
- **Devcert** (version 1.2.2)
- **JSDoc** (version 4.0.4) - for generating JS documentation
- **Nodemon** (version 3.1.0) - for automatic server restarts
- **Jest** (version 29.7.0) - testing framework
- **Supertest** (version 6.3.3) - for HTTP testing
- **MongoDB Memory Server** (version 8.14.0) - for in-memory MongoDB tests
- **Vite** (version 6.2.5) - frontend build tool
- **@vitejs/plugin-react** (version 4.3.4) - React plugin for Vite

### Other Tools and Services
- **MongoDB GUI Tools**: MongoDB Atlas web interface
- **Deployment Platforms**: Vercel, Render (for main and build environments), local localhost (for dev environment)
- **Web Servers / Proxies**: Render automatically manages the proxy server for the application
- **Process Managers**: Render automatically manages the Node.js application processes
- **Containerization**: Docker (planned for the future)
- **CI/CD Tools**: Automatic deployment to Vercel and Render after a push to the main or build branch in the repository (e.g., using GitHub Actions, GitLab CI/CD)
- **Additional Monitoring/Logging Systems**: Sentry (integrated, but requires further adjustments to work correctly)
- **Caching / Message Queues**: The project uses Redux Persist for frontend caching. It does not use dedicated caching systems (e.g., Redis) or message queues (e.g., RabbitMQ, Apache Kafka) on the backend

## System Requirements

Ensure users know what they need to have installed to run your project.

- **Node.js** (version 18+ recommended)
- **npm** (Node Package Manager) or **Yarn**
- **Git**
- **MongoDB Account** (local or in the cloud, e.g., MongoDB Atlas)

## Installation

Detailed step-by-step instructions.

### Cloning the Repository

```bash
git clone https://github.com/julia-Lukaszewska/reader-pane.git
cd reader-pane
```

### Environment Variables Configuration

The project uses environment variables to configure database connections, API keys, and other settings. **Never commit sensitive data directly to .env files** in the Git repository. Instead, use the `.env.client.dev.example` and `.env.server.dev.example` files to show the required variables, and store the actual values in `.env.client.dev` and `.env.server.dev` files (add them to `.gitignore`).

#### For the local environment (dev branch):

In the project's root directory, create a directory named `env`, and inside it, create `.env.client.dev` and `.env.server.dev` files based on the examples below:

**`.env.server.dev` file (for the Backend):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database_name # URI to your local MongoDB database
JWT_SECRET=a_very_secret_jwt_key # Secret key for generating JWT tokens
NODE_ENV=development # Runtime environment
# (Add other environment variables required by the backend, e.g., API keys for external services)
```

**`.env.client.dev` file (for the Frontend):**
```env
REACT_APP_API_URL=https://localhost:5000/api # URL of the backend API (use https)
# (Add other environment variables required by the frontend, e.g., Sentry keys if they are different from package.json)
```

Make sure that `MONGO_URI` points to your MongoDB instance (local or Atlas).

#### For production environments (main and build branches):

Environment variables for production environments (deployed on Vercel and Render) are not stored in .env files in the repository. Instead, you configure them directly in the administrative panels of these platforms:

- **Vercel**: Log in to the Vercel dashboard, go to your frontend project's settings, and add the environment variables in the "Environment Variables" section
- **Render**: Log in to the Render dashboard, go to your backend service's settings, and add the environment variables in the "Environment" section

Ensure that all the variables listed above (and any others you use) are correctly configured in the respective environments on Vercel and Render.

### Installing Dependencies

Instead of installing dependencies separately for the frontend and backend, you can use a single command in the project's root directory:

```bash
npm run install:all
```

This command will install all required packages for both parts of the application.

## Usage

Instructions on how to run the application and interact with it.

### Accessing the Live Demo

The easiest way to test the application is to use the deployed demo version, which is available online.

**Frontend (Vercel)**: [https://reader-pane.vercel.app/](https://reader-pane.vercel.app/)

The frontend application is already configured to communicate with the backend deployed on Render. Simply open the link above in your browser and follow the instructions in the [Interacting with the Application](#interacting-with-the-application) section.

### Running the Application Locally (for Developers)

Thanks to the configuration in the root `package.json` file, you can run the entire development environment (backend and frontend) with a single command.

1. Make sure you are in the root directory of the project (the `reader-pane` folder)
2. Run the following command in your terminal:

```bash
npm run dev
```

This command will use the `concurrently` tool to simultaneously start the backend server (`nodemon server.js`) and the frontend development server (`vite`). You will see logs from both processes in a single terminal window.

The frontend application should open in your browser at `http://localhost:5173` (or another address indicated by Vite in the terminal), and the backend server will be listening on `https://localhost:5000`.

### Interacting with the Application

Whether you are using the online demo or a locally run version, the steps for interacting with the application are the same.

1. Open the application in your browser
2. Click the **"Log in"** button
3. If you don't have an account, go to the **"Register"** tab
4. Enter your login (for now, it doesn't have to be unique; it's used for user personalization in the interface)
5. Enter an email address (for now, there is no authorization, so it doesn't have to be real, but it's important to remember it as there is no option to remind email or recover the password)
6. Enter a password that meets the requirements: **a minimum of 8 characters, at least one uppercase letter, one digit, and one special character**
7. After registering, log in using the provided credentials

> **Note:** If you try to switch views without being logged in/registered, the registration/login panel will automatically appear.

#### Library View

After logging in, you will be automatically redirected to the library view.

- To add your first file, click on the tile with the **plus icon (+)**
- Once the file is correctly uploaded, you will see it in the library view

#### Changing View Mode

The library views can be switched between three modes:
- **Grid**
- **List**
- **Table**

The icons for changing the view mode are located in the top right corner of the screen, in the toolbar.

#### Actions on Book Tiles

On the book tiles (depending on the view mode), basic action buttons are available:
- **Read**
- **Add to favorites**
- **Archive**

The button with the **cross (X)** is for deleting a book. After clicking it, a modal will appear asking for confirmation to delete. An archive button is also available in the modal. To exit the modal, click "Cancel" or click outside the modal.

#### Book Preview and Edit Modal

To open the book details preview modal, click the **"See more"** button on the book tile. If the button is not visible (depending on the view mode), simply click on the tile itself.

In the opened modal, you can:
- Edit the book details by clicking the **"Edit"** button, filling in the data, and clicking **"Save"**
- Add a note without entering edit mode – just click in the appropriate field and start typing. The text is saved when you click outside the modal or press Enter
- Give a star rating to the book and click the heart icon to add it to your favorites
- View the reading progress bar, cover preview, and use the **"Read"** button to open the book in the reader

## Project Structure

```
reader-pane/
├── client/               # React application built with Vite.
│   ├── config/           # Frontend tools configuration (ESLint, Prettier)
│   ├── public/           # Static assets (favicon, PDF.js worker)
│   ├── src/              # React application source code
│   │   ├── assets/       # Static assets (e.g., logo)
│   │   ├── components/   # General UI components
│   │   │   └── common/   # Basic interface components
│   │   ├── controllers/  # Logic controllers for views
│   │   ├── hooks/        # Custom React hooks
│   │   ├── layout/       # Application layout components
│   │   ├── modules/      # Main application functionalities (book, home, library, reader, uploadPDF, user)
│   │   │   ├── book/
│   │   │   ├── home/
│   │   │   ├── library/
│   │   │   ├── reader/
│   │   │   ├── uploadPDF/
│   │   │   └── user/
│   │   ├── providers/    # React context providers
│   │   ├── routes/       # React Router route definitions
│   │   ├── store/        # Redux Toolkit and RTK Query configuration
│   │   │   ├── api/
│   │   │   ├── selectors/
│   │   │   └── slices/
│   │   ├── styles/       # Global styles and themes
│   │   ├── utils/        # Helper functions
│   │   └── views/        # Main application views/pages
│   └── vite.config.js
├── server/               # Express application (backend).
│   ├── config/           # Server settings and database connection.
│   ├── controllers/      # Business logic implementation.
│   ├── middlewares/      # Middleware functions, e.g., for access verification.
│   ├── models/           # MongoDB schemas (Mongoose).
│   ├── routes/           # API endpoint definitions.
│   ├── utils/            # Additional server tools.
│   ├── instrument.js     # Instrumentation file (e.g., Sentry).
│   └── server.js         # Main Express server file.
├── scripts/              # Scripts for data management and project maintenance.
├── package.json          # Root package.json (for the monorepo).
└── package-lock.json     # Locked dependency versions.
```

## Deployment

Brief instructions on how to deploy the application.

- **Backend**: Deployed on **Render**
- **Frontend**: Deployed on **Vercel**
- **Database**: Uses **MongoDB Atlas**

## Testing

Currently, the project does not have a full testing strategy implemented yet. The priority in the initial development phase was to deliver the application's key functionalities.

Implementing comprehensive tests (unit, integration, and E2E) is one of the most important tasks on the project roadmap. Tools like **Jest** and **Supertest** are already part of the configuration, which will facilitate the start of work on tests.

In the future, tests can be run using the following commands:

### Backend Tests
```bash
# In the /server directory
npm test
```

### Frontend Tests
```bash
# In the /client directory
npm test
```

## Security and Monitoring

### Security

- **Data validation** using `express-validator` in the user login and registration router
- **Password hashing** in the User model using `bcrypt` (operation performed in `pre('save')` middleware)
- **Password requirements**: The password must contain a minimum of 8 characters, including at least one uppercase letter, one digit, and one special character
- **Email address uniqueness**: The system ensures that a second user cannot be registered with the same email address
- **JWT authentication** using `passport-jwt` and an `authJwt` middleware protecting private API routes
- **Google OAuth** login support (`passport-google-oauth20`) - partially implemented but currently inactive. Activating this functionality is a priority, but it will only happen after a comprehensive review and ensuring the full security of user data, including conscious management of the scope of access to information from Google accounts that the application could potentially access. The protection of user privacy and data integrity is crucial. Enabling Google OAuth is also dependent on the prior implementation of a password recovery feature via email and user verification mechanisms, which will ensure consistent and secure account management
- **CORS configuration** with a list of allowed domains and detailed logging of unauthorized sources
- **Security headers** using `helmet`
- **Refresh tokens** stored in HttpOnly cookies, which limits access from browser scripts

### Monitoring

- **Logging** of HTTP requests using `morgan` in development mode
- **Integration with Sentry** for tracking and reporting application errors
- **Global error handler** in Express to catch unhandled exceptions and send them to Sentry

## Contribution Guidelines

Thank you for your interest in the project! Currently, this is a personal project that I am developing for educational and portfolio-building purposes. For this reason, I am not actively looking for contributors.

However, if you have any suggestions, ideas, or have found a bug, the best way to get in touch is to create a new **Issue** in the GitHub repository. I will be happy to review your feedback.

## License

This project is licensed under the **Creative Commons BY-NC-SA 4.0** license. This means you are free to share and adapt the code for non-commercial purposes, provided you give appropriate credit and share any derivative works under the same license.

See the [LICENSE](LICENSE) file for more details.

## Project Status and Roadmap

### Current Status
**In development**: The project is being actively developed.

### Known Bugs/Limitations
- Sentry is integrated but requires further adjustments to function correctly
- Google OAuth is partially implemented but is currently inactive. It will be enabled after implementing the password recovery via email and user verification features
- The scroll mode in the reader temporarily does not render the next range of pages. Fixing this issue is a high priority
- The colors in light/dark mode require further refinement, as not all elements are fully readable in dark mode

### Roadmap (Future Plans)
- Implementation of comprehensive tests (unit, integration, E2E) for the frontend and backend
- **Performance optimization**: Continuous work on optimization to ensure the smooth operation of the application, especially when handling large files and intensive use
- Implementation of password recovery via email and user verification features
- Automatic translations and different language versions of the application
- A mobile application for phones
- Implementation of Docker and Kubernetes
- **UI/UX refinement**: After refining the core technical functions, the focus will be on expanding and improving the user interface. This will include refining the sidebar, adding more menu options, and creating engaging and intuitive transitions between views. A redesign of the user panel is also planned to make it more user-friendly and intuitive

## Support

Where users can seek help or report problems.

- **Reporting Bugs**: Use the [Issues](https://github.com/julia-Lukaszewska/reader-pane/issues) section on GitHub
- **Questions**: You can contact me via email: [j.lukas.dev@gmail.com](mailto:j.lukas.dev@gmail.com)

## Changelog

A record of the most important changes in the project.

### 0.1.0 - 2025-07-18
**First public release**: The repository was made public on GitHub, and a demo version was deployed.

**Added key functionalities**: user authentication, PDF file uploading, personal library, a PDF reader with basic modes, and a notes and rating system.