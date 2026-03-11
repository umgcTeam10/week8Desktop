import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { DesktopProvider } from "../context/DesktopContext";
import { SearchScreen } from "./SearchScreen";
import { MessagesScreen } from "./MessagesScreen";
import { CalendarScreen } from "./CalendarScreen";
import { ProfileScreen } from "./ProfileScreen";

expect.extend(toHaveNoViolations);

function wrap(ui: React.ReactElement) {
  const { container } = render(<DesktopProvider>{ui}</DesktopProvider>);
  return container;
}

describe("axe: SearchScreen", () => {
  it("has no accessibility violations", async () => {
    const container = wrap(<SearchScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("axe: MessagesScreen", () => {
  it("has no accessibility violations", async () => {
    const container = wrap(<MessagesScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("axe: CalendarScreen", () => {
  it("has no accessibility violations", async () => {
    const container = wrap(<CalendarScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("axe: ProfileScreen", () => {
  it("has no accessibility violations", async () => {
    const container = wrap(<ProfileScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
