import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

// ✅ FIX: StrictMode rimosso — causava doppio mount del canvas Three.js
// che appariva come omino duplicato in development
createRoot(root).render(<App />);