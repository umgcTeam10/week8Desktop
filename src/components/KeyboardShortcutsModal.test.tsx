import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { useDesktop } from "../context/DesktopContext";

jest.mock("../context/DesktopContext", () => ({
  useDesktop: jest.fn(),
}));

const mockCloseModal = jest.fn();

function renderOpenModal() {
  (useDesktop as jest.Mock).mockReturnValue({
    closeModal: mockCloseModal,
  });

  return render(<KeyboardShortcutsModal />);
}

function ModalHarness() {
  const [open, setOpen] = React.useState(false);

  (useDesktop as jest.Mock).mockReturnValue({
    closeModal: () => setOpen(false),
  });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Keyboard Shortcuts
      </button>
      {open && <KeyboardShortcutsModal />}
    </>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("KeyboardShortcutsModal", () => {
  it("renders the dialog with title and description", () => {
    renderOpenModal();

    const dialog = screen.getByRole("dialog", {
      name: /keyboard shortcuts/i,
    });

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      screen.getByRole("heading", { name: /keyboard shortcuts/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /use these shortcuts to navigate careconnect efficiently\./i,
      ),
    ).toBeInTheDocument();
  });

  it("renders both dismiss and close buttons", () => {
    renderOpenModal();

    expect(
      screen.getByRole("button", { name: /dismiss shortcuts/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /^close$/i }),
    ).toBeInTheDocument();
  });

  it("renders the shortcut section headings", () => {
    renderOpenModal();

    expect(
      screen.getByRole("heading", { name: /form navigation/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /actions/i }),
    ).toBeInTheDocument();
  });

  it("renders the form navigation shortcuts", () => {
    renderOpenModal();

    expect(screen.getByLabelText(/^tab$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/move to next field or button/i),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/shift\s*\+\s*tab/i)).toBeInTheDocument();
    expect(
      screen.getByText(/move to previous field or button/i),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/alt\s*\+\s*e/i)).toBeInTheDocument();
    expect(screen.getByText(/focus email field/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/alt\s*\+\s*p/i)).toBeInTheDocument();
    expect(screen.getByText(/focus password field/i)).toBeInTheDocument();
  });

  it("renders the action shortcuts", () => {
    renderOpenModal();

    expect(screen.getByLabelText(/^esc$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/dismisses dialogs and cancels current action/i),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/^(ctrl|cmd)\+h$/i)).toBeInTheDocument();
    expect(screen.getByText(/^health logs$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^(ctrl|cmd)\+m$/i)).toBeInTheDocument();
    expect(screen.getByText(/^messages$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^(ctrl|cmd)\+k$/i)).toBeInTheDocument();
    expect(screen.getByText(/^calendar$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^(ctrl|cmd)\+n$/i)).toBeInTheDocument();
    expect(screen.getByText(/^new log$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^(ctrl|cmd)\+s$/i)).toBeInTheDocument();
    expect(screen.getByText(/^save$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^(ctrl|cmd)\+f$/i)).toBeInTheDocument();
    expect(screen.getByText(/^search$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^(ctrl|cmd)\+,$/i)).toBeInTheDocument();
    expect(screen.getByText(/profile & settings/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/^(ctrl|cmd)\+shift\+e$/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/emergency sos \(confirmation required\)/i),
    ).toBeInTheDocument();
  });

  it("focuses the dismiss button when opened", () => {
    renderOpenModal();

    expect(
      screen.getByRole("button", { name: /dismiss shortcuts/i }),
    ).toHaveFocus();
  });

  it("tabs from dismiss button to footer close button and back with shift+tab", async () => {
    const user = userEvent.setup();
    renderOpenModal();

    const dismissButton = screen.getByRole("button", {
      name: /dismiss shortcuts/i,
    });
    const closeButton = screen.getByRole("button", { name: /^close$/i });

    expect(dismissButton).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(dismissButton).toHaveFocus();
  });

  it("clicking the dismiss button calls closeModal", () => {
    renderOpenModal();

    fireEvent.click(screen.getByRole("button", { name: /dismiss shortcuts/i }));

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("clicking the footer close button calls closeModal", () => {
    renderOpenModal();

    fireEvent.click(screen.getByRole("button", { name: /^close$/i }));

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("opens and closes through the dismiss button in a real flow", async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    await user.click(
      screen.getByRole("button", { name: /open keyboard shortcuts/i }),
    );

    expect(
      screen.getByRole("dialog", { name: /keyboard shortcuts/i }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /dismiss shortcuts/i }),
    );

    expect(
      screen.queryByRole("dialog", { name: /keyboard shortcuts/i }),
    ).not.toBeInTheDocument();
  });

  it("opens and closes through the footer close button in a real flow", async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    await user.click(
      screen.getByRole("button", { name: /open keyboard shortcuts/i }),
    );

    expect(
      screen.getByRole("dialog", { name: /keyboard shortcuts/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^close$/i }));

    expect(
      screen.queryByRole("dialog", { name: /keyboard shortcuts/i }),
    ).not.toBeInTheDocument();
  });
});
