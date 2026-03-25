import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { RoleSelectionScreen } from "./RoleSelectionScreen";
import { useDesktop } from "../context/DesktopContext";

jest.mock("../context/DesktopContext", () => ({
  useDesktop: jest.fn(),
}));

jest.mock("../components/LeftPanelWelcome", () => {
  const MockLeftPanelWelcome = () => (
    <div data-testid="left-panel-welcome">Left panel welcome</div>
  );

  return {
    __esModule: true,
    default: MockLeftPanelWelcome,
    LeftPanelWelcome: MockLeftPanelWelcome,
  };
});

const mockSetSelectedRole = jest.fn();
const mockSetAuthPhase = jest.fn();
const mockSetScreen = jest.fn();
const mockSetRole = jest.fn();
const mockSetUserRole = jest.fn();

let currentSelectedRole: string | null = null;

const setupDesktopMock = () => {
  (useDesktop as jest.Mock).mockImplementation(() => ({
    screen: "role-selection",
    role: null,
    selectedRole: currentSelectedRole,
    setSelectedRole: (value: string) => {
      currentSelectedRole = value;
      mockSetSelectedRole(value);
    },
    setAuthPhase: mockSetAuthPhase,
    setScreen: mockSetScreen,
    setRole: mockSetRole,
    setUserRole: mockSetUserRole,
  }));
};

const renderScreen = () => {
  setupDesktopMock();
  return render(<RoleSelectionScreen />);
};

beforeEach(() => {
  jest.clearAllMocks();
  currentSelectedRole = null;
});

describe("RoleSelectionScreen", () => {
  it("renders the left panel welcome section", () => {
    renderScreen();
    expect(screen.getByTestId("left-panel-welcome")).toBeInTheDocument();
  });

  it("renders the heading and helper text", () => {
    renderScreen();

    expect(
      screen.getByRole("heading", { name: /choose your role/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /this helps us show you the most relevant information and features for your needs\./i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/next:\s*sign in to your account/i),
    ).toBeInTheDocument();
  });

  it("renders the keyboard tip using the updated wording", () => {
    renderScreen();

    const keyboardTip = screen.getByRole("status");
    expect(keyboardTip).toBeInTheDocument();
    expect(keyboardTip).toHaveTextContent(/keyboard tip:/i);
    expect(keyboardTip).toHaveTextContent(
      /use\s*tab\s*to move between options,\s*space\s*to select a role,\s*then\s*enter\s*to continue\./i,
    );

    expect(within(keyboardTip).getByText(/^Tab$/i)).toBeInTheDocument();
    expect(within(keyboardTip).getByText(/^Space$/i)).toBeInTheDocument();
    expect(within(keyboardTip).getByText(/^Enter$/i)).toBeInTheDocument();
  });

  it("renders selectable role options inside a radiogroup", () => {
    renderScreen();

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /i'm a caregiver/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /i'm a care recipient/i }),
    ).toBeInTheDocument();
  });

  it("renders a disabled continue button before a role is selected", () => {
    renderScreen();

    expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled();
  });

  it("allows selecting a role and continuing to sign in", async () => {
    const user = userEvent.setup();
    const { rerender } = renderScreen();

    const caregiverOption = screen.getByRole("radio", {
      name: /i'm a caregiver/i,
    });

    await user.click(caregiverOption);

    expect(mockSetSelectedRole).toHaveBeenCalledWith("caregiver");

    rerender(<RoleSelectionScreen />);

    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).not.toBeDisabled();

    await user.click(continueButton);

    expect(mockSetAuthPhase).toHaveBeenCalledWith("signin");
  });
});
