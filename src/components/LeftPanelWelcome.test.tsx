import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LeftPanelWelcome } from "./LeftPanelWelcome";

describe("LeftPanelWelcome", () => {
  it("renders the aside with the correct accessible label", () => {
    render(<LeftPanelWelcome />);

    expect(
      screen.getByRole("complementary", {
        name: /careconnect information and support/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders branding content", () => {
    render(<LeftPanelWelcome />);

    expect(
      screen.getByRole("heading", { name: /careconnect/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/patient portal/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  it("renders the welcome message text", () => {
    render(<LeftPanelWelcome />);

    expect(
      screen.getByText(
        /sign in to access your appointments, medications, test results, and care team messages\./i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/we're here to support you every step of the way\./i),
    ).toBeInTheDocument();
  });

  it("renders the feature section content", () => {
    render(<LeftPanelWelcome />);

    expect(screen.getByText(/secure & private/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /your health information is protected with bank-level encryption and hipaa compliance\./i,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(/24\/7 access/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /view your health records, upcoming appointments, and messages anytime you need\./i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the help section content", () => {
    render(<LeftPanelWelcome />);

    expect(screen.getByText(/need help signing in\?/i)).toBeInTheDocument();

    const supportLink = screen.getByRole("link", { name: /call support/i });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveTextContent(
      /1-800-care-help\s*-\s*available 24\/7/i,
    );

    const helpCenterLink = screen.getByRole("link", { name: /help center/i });
    expect(helpCenterLink).toBeInTheDocument();
    expect(helpCenterLink).toHaveTextContent(/view sign-in guides and faqs/i);
  });

  it("renders all expected headings/text sections inside the welcome panel", () => {
    render(<LeftPanelWelcome />);

    const panel = screen.getByRole("complementary", {
      name: /careconnect information and support/i,
    });

    expect(within(panel).getByText(/careconnect/i)).toBeInTheDocument();
    expect(within(panel).getByText(/patient portal/i)).toBeInTheDocument();
    expect(within(panel).getByText(/welcome back/i)).toBeInTheDocument();
    expect(
      within(panel).getByText(/need help signing in\?/i),
    ).toBeInTheDocument();
  });
});
