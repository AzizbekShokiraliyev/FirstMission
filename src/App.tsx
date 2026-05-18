import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx"; // Tepada tuzgan routes.tsx faylingiz yo'li
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { store } from './store/store.ts';
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider.tsx";

const App = () => {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          
          <RouterProvider router={router} />

        </ThemeProvider>
      </TooltipProvider>
    </Provider>
  );
};

export default App;