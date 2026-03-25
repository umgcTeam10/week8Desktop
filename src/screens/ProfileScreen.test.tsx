import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProfileScreen } from "./ProfileScreen";
import { useDesktop } from "../context/DesktopContext";

jest.mock("../context/DesktopContext", () => ({
  useDesktop: jest.fn(),
}));

const mockSetHighContrast = jest.fn();
const mockSetZoom = jest.fn();

const renderScreen = ({
  highContrast = false,
  zoom = 1,
}: {
  highContrast?: boolean;
  zoom?: number;
} = {}) => {
  (useDesktop as jest.Mock).mockReturnValue({
    highContrast,
    setHighContrast: mockSetHighContrast,
    zoom,
    setZoom: mockSetZoom,
  });

  return render(<ProfileScreen />);
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ProfileScreen", () => {
  it("renders the main page headings and sections", () => {
    renderScreen();

    expect(
      screen.getByRole("heading", { name: /profile & settings/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /^settings$/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /user profile/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /contact information/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /account statistics/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /notifications/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /preferences/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /accessibility/i }),
    ).toBeInTheDocument();
  });

  it("renders the profile summary and contact details", () => {
    renderScreen();

    const profileSummary = screen.getByRole("complementary", {
      name: /user profile summary/i,
    });

    expect(profileSummary).toBeInTheDocument();

    expect(within(profileSummary).getByText(/^SJ$/i)).toBeInTheDocument();
    expect(
      within(profileSummary).getByText(/sarah johnson/i),
    ).toBeInTheDocument();
    expect(
      within(profileSummary).getByText(/^caregiver$/i),
    ).toBeInTheDocument();

    expect(
      within(profileSummary).getByRole("button", { name: /edit profile/i }),
    ).toBeInTheDocument();

    expect(
      within(profileSummary).getByText(/sarah\.johnson@email\.com/i),
    ).toBeInTheDocument();

    expect(
      within(profileSummary).getByText(/\(555\)\s*123-4567/i),
    ).toBeInTheDocument();

    expect(
      within(profileSummary).getByText(/123 main st, city, st/i),
    ).toBeInTheDocument();
  });

  it("renders account statistics", () => {
    renderScreen();

    expect(screen.getByText(/member since/i)).toBeInTheDocument();
    expect(screen.getByText(/january 2024/i)).toBeInTheDocument();

    expect(screen.getByText(/active days/i)).toBeInTheDocument();
    expect(screen.getByText(/45 days/i)).toBeInTheDocument();

    expect(screen.getByText(/tasks completed/i)).toBeInTheDocument();
    expect(screen.getByText(/^128$/i)).toBeInTheDocument();
  });

  it("renders notification options checked by default", () => {
    renderScreen();

    const pushNotifications = screen.getByRole("checkbox", {
      name: /push notifications/i,
    });
    const emailNotifications = screen.getByRole("checkbox", {
      name: /email notifications/i,
    });
    const taskReminders = screen.getByRole("checkbox", {
      name: /task reminders/i,
    });

    expect(pushNotifications).toBeChecked();
    expect(emailNotifications).toBeChecked();
    expect(taskReminders).toBeChecked();

    expect(
      screen.getByText(/manage your notification settings/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/quiet hours/i)).toBeInTheDocument();
    expect(screen.getByText(/10:00 pm - 7:00 am/i)).toBeInTheDocument();
  });

  it("renders preferences content and time format controls", () => {
    renderScreen();

    expect(
      screen.getByText(/customize your careconnect experience/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/^language$/i)).toBeInTheDocument();
    expect(screen.getByText(/english \(us\)/i)).toBeInTheDocument();

    expect(screen.getByText(/^time format$/i)).toBeInTheDocument();

    const timeFormatGroup = screen.getByRole("group", {
      name: /time format/i,
    });

    expect(timeFormatGroup).toBeInTheDocument();

    const button12h = within(timeFormatGroup).getByRole("button", {
      name: /^12h$/i,
    });
    const button24h = within(timeFormatGroup).getByRole("button", {
      name: /^24h$/i,
    });

    expect(button12h).toBeInTheDocument();
    expect(button24h).toBeInTheDocument();

    expect(button12h).toHaveClass("active");
    expect(button12h).toHaveAttribute("aria-pressed", "true");
    expect(button24h).toHaveAttribute("aria-pressed", "false");

    expect(screen.getByText(/^date format$/i)).toBeInTheDocument();
    expect(screen.getByText(/mm\/dd\/yyyy/i)).toBeInTheDocument();
  });

  it("shows dark mode as disabled when highContrast is false", () => {
    renderScreen({ highContrast: false });

    const darkModeCheckbox = screen.getByRole("checkbox", {
      name: /dark mode/i,
    });

    expect(darkModeCheckbox).not.toBeChecked();
    expect(screen.getByText(/^currently\s*disabled$/i)).toBeInTheDocument();
  });

  it("shows dark mode as enabled when highContrast is true", () => {
    renderScreen({ highContrast: true });

    const darkModeCheckbox = screen.getByRole("checkbox", {
      name: /dark mode/i,
    });

    expect(darkModeCheckbox).toBeChecked();
    expect(screen.getByText(/^currently\s*enabled$/i)).toBeInTheDocument();
  });

  it("calls setHighContrast when dark mode is toggled on", () => {
    renderScreen({ highContrast: false });

    const darkModeCheckbox = screen.getByRole("checkbox", {
      name: /dark mode/i,
    });

    fireEvent.click(darkModeCheckbox);

    expect(mockSetHighContrast).toHaveBeenCalledTimes(1);
    expect(mockSetHighContrast).toHaveBeenCalledWith(true);
  });

  it("calls setHighContrast when dark mode is toggled off", () => {
    renderScreen({ highContrast: true });

    const darkModeCheckbox = screen.getByRole("checkbox", {
      name: /dark mode/i,
    });

    fireEvent.click(darkModeCheckbox);

    expect(mockSetHighContrast).toHaveBeenCalledTimes(1);
    expect(mockSetHighContrast).toHaveBeenCalledWith(false);
  });

  it("renders the text size slider with the correct default value", () => {
    renderScreen({ zoom: 1 });

    const slider = screen.getByRole("slider", { name: /text size/i });

    expect(slider).toBeInTheDocument();
    expect(slider).toHaveValue("16");
    expect(slider).toHaveAttribute("id", "text-size-slider");
    expect(slider).toHaveAttribute("min", "12");
    expect(slider).toHaveAttribute("max", "24");
    expect(slider).toHaveAttribute("aria-valuenow", "16");
    expect(slider).toHaveAttribute("aria-valuemin", "12");
    expect(slider).toHaveAttribute("aria-valuemax", "24");
  });

  it("renders the slider value correctly for a larger zoom", () => {
    renderScreen({ zoom: 1.25 });

    const slider = screen.getByRole("slider", { name: /text size/i });

    expect(slider).toHaveValue("20");
    expect(slider).toHaveAttribute("aria-valuenow", "20");
  });

  it("calls setZoom with the converted slider value", () => {
    renderScreen({ zoom: 1 });

    const slider = screen.getByRole("slider", { name: /text size/i });

    fireEvent.change(slider, { target: { value: "20" } });

    expect(mockSetZoom).toHaveBeenCalledTimes(1);
    expect(mockSetZoom).toHaveBeenCalledWith(1.25);
  });

  it("renders accessibility section content", () => {
    renderScreen();

    const accessibilityHeading = screen.getByRole("heading", {
      name: /accessibility/i,
    });

    // eslint-disable-next-line testing-library/no-node-access
    const accessibilitySection = accessibilityHeading.closest("section");

    expect(accessibilitySection).toBeInTheDocument();

    expect(
      within(accessibilitySection as HTMLElement).getByText(
        /adjust settings for better usability/i,
      ),
    ).toBeInTheDocument();

    expect(
      within(accessibilitySection as HTMLElement).getByText(/^text size$/i),
    ).toBeInTheDocument();

    expect(
      within(accessibilitySection as HTMLElement).getByText(/normal/i),
    ).toBeInTheDocument();

    expect(
      within(accessibilitySection as HTMLElement).getByText(/16/i),
    ).toBeInTheDocument();

    expect(
      within(accessibilitySection as HTMLElement).getByText(/px/i),
    ).toBeInTheDocument();
  });

  it("renders the search settings input", () => {
    renderScreen();

    expect(
      screen.getByRole("searchbox", { name: /search settings/i }),
    ).toBeInTheDocument();
  });
});
