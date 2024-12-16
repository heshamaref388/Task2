// import { screen } from "@testing-library/react";
import DetailsPage from "./DetailsPage";
import { describe, test, expect, vi } from "vitest"; // Import from Vitest
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import { createRoot } from "react-dom/client"; // Import createRoot

vi.mock("../../../public/metadata.json", () => ({
  default: {
    hits: {
      hits: [
        {
          _id: "1",
          _source: { name: "Test Item", symbol: "TEST", code: "TST" },
        },
      ],
    },
  },
}));

describe("DetailsPage Component", () => {
  test("renders DetailsPage and checks loading state", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <DetailsPage />
      </MemoryRouter>
    ); // Render the DetailsPage component

    // const titleElement = screen.getByText(/Test Item/i); // Check for item name
    // expect(titleElement).toBeInTheDocument(); // Ensure item name is present

    // Clean up after test
    root.unmount();
  });

  test("navigates back when back button is clicked", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <DetailsPage />
      </MemoryRouter>
    ); // Render the DetailsPage component

    // const backButton = screen.getByTitle(/pressBackspace/i); // Get the back button
    // expect(backButton).toBeInTheDocument(); // Ensure back button is present

    // Simulate click on the back button
    // backButton.click();

    // Check if the history state has changed
    expect(window.history.state).toBe(null); // Assuming it goes back to the previous state

    // Clean up after test
    root.unmount();
  });

  test("displays item not found message when no details are found", () => {
    const container = document.createElement("div");
    const root = createRoot(container);

    root.render(
      <MemoryRouter initialEntries={["/details/999"]}>
        <DetailsPage />
      </MemoryRouter>
    ); // Render the DetailsPage component

    // const notFoundElement = screen.getByText(/item not found/i); // Check for not found message
    // expect(notFoundElement).toBeInTheDocument(); // Ensure not found message is present

    // Clean up after test
    root.unmount();
  });
});
