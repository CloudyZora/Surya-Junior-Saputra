import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
  interface Window {
    __PORTFOLIO_MOUNTED__?: boolean;
  }
}

window.__PORTFOLIO_MOUNTED__ = true;

createRoot(document.getElementById('root')!).render(<App />);
