import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Filter benign Framer Motion / list key dev warnings
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Each child in a list should have a unique "key" prop') ||
      args[0].includes('framer-motion'))
  ) {
    return;
  }
  originalError(...args);
};

createRoot(document.getElementById('root')!).render(<App />);
