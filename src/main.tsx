import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom" 
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import {store} from './store/store.ts'
import { Provider } from "react-redux"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TooltipProvider>
        <BrowserRouter> 
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  </StrictMode>
)