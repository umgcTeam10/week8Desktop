import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SignInScreen } from "./SignInScreen";
import { useDesktop } from "../context/DesktopContext";

jest.mock("../context/DesktopContext", () => ({
  useDesktop: jest.fn(),
}));

jest.mock("../components/LeftPanelWelcome", () => ({
  LeftPanelWelcome: () => (
    <div data-testid="left-panel-welcome">Welcome Panel</div>
  ),
}));

const mockSetAuthPhase = jest.fn();
const mockSetError = jest.fn();

const renderScreen = () => {
  (useDesktop as jest.Mock).mockReturnValue({
    setAuthPhase: mockSetAuthPhase,
    setError: mockSetError,
    error: null,
  });

  return render(<SignInScreen />);
};

const getErrorSummary = () => {
  const alerts = screen.getAllByRole("alert");
  const summary = alerts.find(
    (el) =>
      el.className.includes("error-summary") ||
      /let's fix/i.test(el.textContent || ""),
  );

  if (!summary) {
    throw new Error("Error summary not found");
  }

  return summary;
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SignInScreen", () => {
  it("renders the main sign-in UI", () => {
    renderScreen();

    expect(screen.getByTestId("left-panel-welcome")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /sign in to your account/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /enter your credentials to access your healthcare portal/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /skip to sign-in form/i }),
    ).toBeInTheDocument();

    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent(/use tab to navigate, enter to activate/i);

    expect(screen.getByLabelText(/email address \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password \*/i)).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: /remember me on this device/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /^sign in$/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /email me a sign-in link/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /sign in with windows hello \/ passkey/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /show password/i }),
    ).toBeInTheDocument();
  });

  it("focuses the email field when Alt+E is pressed", () => {
    renderScreen();

    const emailInput = screen.getByLabelText(/email address \*/i);
    fireEvent.keyDown(window, { key: "e", altKey: true });

    expect(emailInput).toHaveFocus();
  });

  it("focuses the password field when Alt+P is pressed", () => {
    renderScreen();

    const passwordInput = screen.getByLabelText(/password \*/i);
    fireEvent.keyDown(window, { key: "p", altKey: true });

    expect(passwordInput).toHaveFocus();
  });

  it("allows the remember me checkbox to be toggled", () => {
    renderScreen();

    const checkbox = screen.getByRole("checkbox", {
      name: /remember me on this device/i,
    });

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("shows two validation errors when submitting an empty form", () => {
    renderScreen();

    fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

    const errorSummary = getErrorSummary();

    expect(errorSummary).toBeInTheDocument();
    expect(errorSummary).toHaveTextContent(
      /let's fix\s*2\s*things?\s*to sign in/i,
    );
    expect(errorSummary).toHaveTextContent(
      /we found a couple of issues with the information you entered/i,
    );
    expect(errorSummary).toHaveTextContent(
      /email address\s*—\s*email address is required\./i,
    );
    expect(errorSummary).toHaveTextContent(
      /password\s*—\s*password is required\./i,
    );

    expect(
      screen.getAllByText(/^Email address is required\.$/i)[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/^Password is required\.$/i)[0],
    ).toBeInTheDocument();

    expect(mockSetError).toHaveBeenCalledWith("Let's fix 2 things to sign in.");
    expect(mockSetAuthPhase).not.toHaveBeenCalled();

    expect(screen.getByLabelText(/email address \*/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByLabelText(/password \*/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("shows email format and short password validation messages", () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/email address \*/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.change(screen.getByLabelText(/password \*/i), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(
      screen.getAllByText(
        /^Please enter a complete email address \(e\.g\., name@example\.com\)$/i,
      )[0],
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(
        /^Password must be at least 8 characters long \(currently 5\)$/i,
      )[0],
    ).toBeInTheDocument();

    expect(mockSetError).toHaveBeenCalledWith("Let's fix 2 things to sign in.");
    expect(mockSetAuthPhase).not.toHaveBeenCalled();
  });

  it("shows the singular error message when only one field is invalid", () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/email address \*/i), {
      target: { value: "person@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password \*/i), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

    const errorSummary = getErrorSummary();

    expect(errorSummary).toBeInTheDocument();
    expect(errorSummary).toHaveTextContent(
      /let's fix\s*1\s*thing\s*to sign in/i,
    );
    expect(errorSummary).toHaveTextContent(
      /password\s*—\s*password is required\./i,
    );

    expect(
      screen.getAllByText(/^Password is required\.$/i)[0],
    ).toBeInTheDocument();

    expect(mockSetError).toHaveBeenCalledWith("Let's fix 1 thing to sign in.");
    expect(mockSetAuthPhase).not.toHaveBeenCalled();
  });

  it("shows field errors after blur when fields are invalid", () => {
    renderScreen();

    const emailInput = screen.getByLabelText(/email address \*/i);
    const passwordInput = screen.getByLabelText(/password \*/i);

    fireEvent.change(emailInput, { target: { value: "bad-email" } });
    fireEvent.blur(emailInput);

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.blur(passwordInput);

    fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");

    expect(
      screen.getAllByText(
        /^Please enter a complete email address \(e\.g\., name@example\.com\)$/i,
      )[0],
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(
        /^Password must be at least 8 characters long \(currently 3\)$/i,
      )[0],
    ).toBeInTheDocument();
  });

  it("submits successfully with valid credentials", () => {
    renderScreen();

    fireEvent.change(screen.getByLabelText(/email address \*/i), {
      target: { value: "person@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password \*/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(mockSetError).toHaveBeenCalledWith(null);
    expect(mockSetAuthPhase).toHaveBeenCalledTimes(1);
    expect(mockSetAuthPhase).toHaveBeenCalledWith("authenticated");
  });

  it("renders helper text and forgot password link", () => {
    renderScreen();

    expect(
      screen.getByText(
        /use the email address associated with your careconnect account/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/enter the password for your account/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /forgot password\?/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/optional: use biometrics or a security key/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/or use a secure alternative/i),
    ).toBeInTheDocument();
  });
});
