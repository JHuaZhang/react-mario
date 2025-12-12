import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { registerDefaultComponents } from 'react-mario-core';

// 在应用启动时注册默认组件
registerDefaultComponents();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
