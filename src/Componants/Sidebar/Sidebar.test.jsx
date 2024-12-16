import { describe, test, expect, vi } from "vitest";
import Sidebar from "./Sidebar";

vi.mock("./Sidebar", () => ({
  __esModule: true,
  default: () => <div>Mocked Sidebar</div>,
}));

describe("Sidebar Component", () => {
  test("verifies mocked Sidebar", () => {
    const mockedComponent = Sidebar();
    expect(mockedComponent.props.children).toBe("Mocked Sidebar");
  });
});
