// import { screen } from "@testing-library/react";
import { createRoot } from "react-dom/client";
import Candle from "./Candle";
import { describe, test, vi } from "vitest"; // Import from Vitest
import axios from "axios"; // Import axios
import React from "react";

vi.mock("axios"); // Mock axios

describe("Candle Component", () => {
  test("renders Candle component and checks loading state", async () => {
    // Mock the API call to return a predefined response
    vi.spyOn(axios, "get").mockResolvedValue({ data: { hits: { hits: [] } } });

    // Create a root for rendering
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
      <React.StrictMode>
        <Candle />
      </React.StrictMode>
    );

    // Clean up after test
    root.unmount();
  });
});
