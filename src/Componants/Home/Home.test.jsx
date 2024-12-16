import { describe, test, expect, vi } from "vitest"; // Import from Vitest
import Home from "./Home";

vi.mock("./Home", () => ({
  __esModule: true,
  default: () => <div>Mocked Home Component</div>,
}));

describe("Home Component", () => {
  test("tests the mocked Home component", () => {
    const mockedHome = Home();
    expect(mockedHome.props.children).toBe("Mocked Home Component");
  });
});
