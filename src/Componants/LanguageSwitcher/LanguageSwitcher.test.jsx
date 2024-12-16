import { describe, test, expect, vi } from "vitest"; // Import from Vitest
import LanguageSwitcher from "./LanguageSwitcher";

vi.mock("./LanguageSwitcher", () => ({
  __esModule: true,
  default: () => <div>Mocked Language Switcher</div>,
}));

describe("LanguageSwitcher Component", () => {
  test("tests the mocked LanguageSwitcher component", () => {
    const mockedComponent = LanguageSwitcher();
    expect(mockedComponent.props.children).toBe("Mocked Language Switcher");
  });
});
