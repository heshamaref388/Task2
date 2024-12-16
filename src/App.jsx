import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Componants/ThemeContext/ThemeContext"; // Import ThemeProvider
import Home from "./Componants/Home/Home";
import DetailsPage from "./Componants/DetailsPage/DetailsPage";
import { lazy, Suspense } from "react";

const Candle = lazy(() => import("./Componants/Candle/Candle"));

function App() {
  return (
    <ThemeProvider>
      {" "}
      {/* Wrap the application in ThemeProvider */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/candle/:symbol" element={<Candle />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
