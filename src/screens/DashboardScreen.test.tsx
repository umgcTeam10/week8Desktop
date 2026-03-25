import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DashboardScreen } from "./DashboardScreen";
import { useDesktop } from "../context/DesktopContext";

jest.mock("../context/DesktopContext", () => ({
  useDesktop: jest.fn(),
}));

const mockSetScreen = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useDesktop as jest.Mock).mockReturnValue({
    setScreen: mockSetScreen,
  });
});

describe("DashboardScreen", () => {
  it("renders the heading and subtitle", () => {
    render(<DashboardScreen />);

    expect(
      screen.getByRole("heading", { name: /home dashboard/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/monday,\s*january 26,\s*2026\s*\|\s*4:02 pm/i),
    ).toBeInTheDocument();
  });

  it("renders the status banner and opens calendar when View is clicked", () => {
    render(<DashboardScreen />);

    const statusBanner = screen.getByRole("status");
    expect(statusBanner).toBeInTheDocument();
    expect(statusBanner).toHaveTextContent(/physical therapy appointment/i);
    expect(statusBanner).toHaveTextContent(/02:00 pm/i);

    const viewButton = within(statusBanner).getByRole("button", {
      name: /view/i,
    });

    fireEvent.click(viewButton);

    expect(mockSetScreen).toHaveBeenCalledWith("calendar");
  });

  it("renders the health today section and summary cards", () => {
    render(<DashboardScreen />);

    expect(
      screen.getByRole("heading", { name: /your health today/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/here's your care summary for today/i),
    ).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const cardsContainer = document.querySelector(".dashboard-cards");
    expect(cardsContainer).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const cards = cardsContainer?.querySelectorAll(".dashboard-card");
    expect(cards).toHaveLength(3);

    const completedCard = cards?.[0] as HTMLElement;
    const pendingCard = cards?.[1] as HTMLElement;
    const appointmentsCard = cards?.[2] as HTMLElement;

    expect(within(completedCard).getByText(/^1$/)).toBeInTheDocument();
    expect(within(completedCard).getByText(/completed/i)).toBeInTheDocument();

    expect(within(pendingCard).getByText(/^2$/)).toBeInTheDocument();
    expect(within(pendingCard).getByText(/pending/i)).toBeInTheDocument();

    expect(within(appointmentsCard).getByText(/^3$/)).toBeInTheDocument();
    expect(
      within(appointmentsCard).getByText(/appointments/i),
    ).toBeInTheDocument();
  });

  it("renders the wellness section and button", () => {
    render(<DashboardScreen />);

    expect(
      screen.getByText(/take a moment to log your mood and any symptoms/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /log wellness check/i }),
    ).toBeInTheDocument();
  });

  it("renders today's tasks and opens tasks screen when View All is clicked", () => {
    render(<DashboardScreen />);

    expect(
      screen.getByRole("heading", { name: /today's tasks/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/blood pressure check/i)).toBeInTheDocument();
    expect(screen.getByText(/prepare lunch/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /view all/i }));
    expect(mockSetScreen).toHaveBeenCalledWith("tasks");
  });

  it("renders the next appointment section using mock data", () => {
    render(<DashboardScreen />);

    expect(
      screen.getByRole("heading", { name: /next appointment/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/check-up/i)).toBeInTheDocument();
    expect(
      screen.getByText(/knee rehabilitation session/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /set reminder/i }),
    ).toBeInTheDocument();
  });

  it("renders care team section and opens messages screen when Send Message is clicked", () => {
    render(<DashboardScreen />);

    expect(
      screen.getByText(/need help or have questions\? reach out anytime/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(mockSetScreen).toHaveBeenCalledWith("messages");
  });
});
