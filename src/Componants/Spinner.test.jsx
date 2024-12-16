import { describe, test, expect, vi } from "vitest";
import Loading from "./Spinner";

// إنشاء mock لمكون Loading
vi.mock("./Spinner", () => ({
  __esModule: true,
  default: () => <div>Mocked Loading Component</div>,
}));

describe("Mocked Loading Component", () => {
  test("tests the mocked Loading component", () => {
    const mockedComponent = Loading();
    expect(mockedComponent.props.children).toBe("Mocked Loading Component");
  });
});
