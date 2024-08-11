import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

/**
 * The root rendering function for the React application.
 *
 * The application is wrapped in `React.StrictMode` to help identify potential issues in the application.
 * The `ThemeProvider` is used to manage and provide theme-related context (e.g., dark mode) throughout the application.
 *
 * The `App` component, which includes the main routing and structure of the application, is rendered inside the `ThemeProvider`.
 */
ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
