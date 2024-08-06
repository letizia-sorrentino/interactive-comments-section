import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Button from "./Button";

describe("button", () => {
  test("button - default", () => {
    const { getByTestId } = render(
      <Button label="Button" onClick={() => {}} />
    );
    expect(getByTestId("button")).toBeDefined();
  });

  test("button - click ", () => {
    const mockFunction = vi.fn();
    const { getByTestId } = render(
      <Button label="Button" onClick={mockFunction} />
    );
    fireEvent.click(getByTestId("button"));
    expect(getByTestId("button")).toBeCalled;
  });
});
