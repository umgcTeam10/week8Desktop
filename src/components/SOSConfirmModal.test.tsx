import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SOSConfirmModal } from "./SOSConfirmModal";
import { useDesktop } from "../context/DesktopContext";

jest.mock("../context/DesktopContext", () => ({
  useDesktop: jest.fn(),
}));

const mockCloseModal = jest.fn();

function renderOpenModal() {
  (useDesktop as jest.Mock).mockReturnValue({
    closeModal: mockCloseModal,
  });

  return render(<SOSConfirmModal />);
}

function ModalHarness() {
  const [open, setOpen] = React.useState(false);

  (useDesktop as jest.Mock).mockReturnValue({
    closeModal: () => setOpen(false),
  });

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open SOS
      </button>
      {open && <SOSConfirmModal />}
    </>
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SOSConfirmModal", () => {
  it("renders the alertdialog with title and description", () => {
    renderOpenModal();

    expect(
      screen.getByRole("alertdialog", { name: /emergency sos/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /are you sure you want to trigger emergency sos\? this will notify your emergency contacts\./i,
      ),
    ).toBeInTheDocument();
  });

  it("renders Cancel and Confirm SOS buttons", () => {
    renderOpenModal();

    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /confirm sos/i }),
    ).toBeInTheDocument();
  });

  it("focuses the first focusable element when opened", () => {
    renderOpenModal();

    expect(screen.getByRole("button", { name: /cancel/i })).toHaveFocus();
  });

  it("traps focus with Shift+Tab from the first button to the last button", async () => {
    const user = userEvent.setup();
    renderOpenModal();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const confirmButton = screen.getByRole("button", { name: /confirm sos/i });

    expect(cancelButton).toHaveFocus();

    await user.tab({ shift: true });

    expect(confirmButton).toHaveFocus();
  });

  it("traps focus with Tab from the last button back to the first button", async () => {
    const user = userEvent.setup();
    renderOpenModal();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const confirmButton = screen.getByRole("button", { name: /confirm sos/i });

    confirmButton.focus();
    expect(confirmButton).toHaveFocus();

    await user.tab();

    expect(cancelButton).toHaveFocus();
  });

  it("clicking Cancel calls closeModal", () => {
    renderOpenModal();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("clicking Confirm SOS calls closeModal", () => {
    renderOpenModal();

    fireEvent.click(screen.getByRole("button", { name: /confirm sos/i }));

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it("Cancel closes the modal in a real open/close flow", async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    await user.click(screen.getByRole("button", { name: /open sos/i }));

    expect(
      screen.getByRole("alertdialog", { name: /emergency sos/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(
      screen.queryByRole("alertdialog", { name: /emergency sos/i }),
    ).not.toBeInTheDocument();
  });

  it("Confirm SOS closes the modal in a real open/close flow", async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);

    await user.click(screen.getByRole("button", { name: /open sos/i }));

    expect(
      screen.getByRole("alertdialog", { name: /emergency sos/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /confirm sos/i }));

    expect(
      screen.queryByRole("alertdialog", { name: /emergency sos/i }),
    ).not.toBeInTheDocument();
  });
});
