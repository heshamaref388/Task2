import { describe, test, expect } from "vitest";
import { ThemeProvider } from "./ThemeContext";
import Home from "../Home/Home";

describe("ThemeContext Component", () => {
  test("matches the snapshot", () => {
    const tree = (
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
