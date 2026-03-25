import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppSidebar } from "./AppSidebar";
import { useDesktop } from "../context/DesktopContext";

jest.mock("../context/DesktopContext", () => ({
  useDesktop: jest.fn(),
}));

const mockSetScreen = jest.fn();

const renderSidebar = (screenValue = "dashboard") => {
  (useDesktop as jest.Mock).mockReturnValue({
    screen: screenValue,
    setScreen: mockSetScreen,
  });

  return render(<AppSidebar />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AppSidebar", () => {
  it("renders the sidebar navigation and brand", () => {
    renderSidebar();

    const navigation = screen.getByRole("navigation", {
      name: /main navigation/i,
    });

    expect(navigation).toBeInTheDocument();
    expect(screen.getByText(/careconnect/i)).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    renderSidebar();

    const navigation = screen.getByRole("navigation", {
      name: /main navigation/i,
    });

    expect(
      within(navigation).getByRole("button", { name: /dashboard/i }),
    ).toBeInTheDocument();

    expect(
      within(navigation).getByRole("button", { name: /health logs/i }),
    ).toBeInTheDocument();

    expect(
      within(navigation).getByRole("button", { name: /messages/i }),
    ).toBeInTheDocument();

    expect(
      within(navigation).getByRole("button", { name: /calendar/i }),
    ).toBeInTheDocument();

    expect(
      within(navigation).getByRole("button", { name: /tasks/i }),
    ).toBeInTheDocument();

    expect(
      within(navigation).getByRole("button", { name: /profile/i }),
    ).toBeInTheDocument();

    expect(within(navigation).getAllByRole("button")).toHaveLength(6);
  });

  it("marks the current screen as active and applies aria-current", () => {
    renderSidebar("messages");

    const messagesButton = screen.getByRole("button", { name: /messages/i });
    const dashboardButton = screen.getByRole("button", { name: /dashboard/i });

    expect(messagesButton).toHaveClass("active");
    expect(messagesButton).toHaveAttribute("aria-current", "page");

    expect(dashboardButton).not.toHaveClass("active");
    expect(dashboardButton).not.toHaveAttribute("aria-current");
  });

  it.each([
    ["dashboard", /dashboard/i],
    ["health-logs", /health logs/i],
    ["messages", /messages/i],
    ["calendar", /calendar/i],
    ["tasks", /tasks/i],
    ["profile", /profile/i],
  ])("calls setScreen with %s when clicked", (expectedScreen, buttonName) => {
    renderSidebar();

    fireEvent.click(screen.getByRole("button", { name: buttonName }));
    expect(mockSetScreen).toHaveBeenCalledWith(expectedScreen);
  });
});
