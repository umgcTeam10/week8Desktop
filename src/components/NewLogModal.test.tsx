import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { DesktopProvider, useDesktop } from "../context/DesktopContext";
import { NewLogModal } from "./NewLogModal";

function TestWrapper() {
  const { modal, openModal } = useDesktop();

  return (
    <>
      <button type="button" onClick={() => openModal("new-log")}>
        Open New Log
      </button>
      {modal === "new-log" && <NewLogModal />}
    </>
  );
}

function renderWithProvider() {
  return render(
    <DesktopProvider>
      <TestWrapper />
    </DesktopProvider>,
  );
}

describe("NewLogModal", () => {
  it("renders dialog with Blood Pressure fields when opened", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));

    expect(
      screen.getByRole("dialog", { name: /new log entry/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/log type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/systolic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diastolic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/heart rate/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("focuses the first focusable element when opened", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));

    expect(screen.getByLabelText(/log type/i)).toHaveFocus();
  });

  it("traps focus with Shift+Tab from first element to last element", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));

    const logTypeSelect = screen.getByLabelText(/log type/i);
    const saveButton = screen.getByRole("button", { name: /save/i });

    expect(logTypeSelect).toHaveFocus();

    await user.tab({ shift: true });

    expect(saveButton).toHaveFocus();
  });

  it("traps focus with Tab from last element back to first element", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));

    const logTypeSelect = screen.getByLabelText(/log type/i);
    const saveButton = screen.getByRole("button", { name: /save/i });

    saveButton.focus();
    expect(saveButton).toHaveFocus();

    await user.tab();

    expect(logTypeSelect).toHaveFocus();
  });

  it("SP-01: Save with empty Systolic shows required error", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(
      screen.getByText(/systolic value is required\./i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/systolic/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("SP-02: Systolic out of range shows validation error", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));
    await user.type(screen.getByLabelText(/systolic/i), "999");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(
      screen.getByText(/systolic value must be between 50 and 300 mmhg\./i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/systolic/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("switching log type away from Blood Pressure hides BP-only fields", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));

    expect(screen.getByLabelText(/systolic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diastolic/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/heart rate/i)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/log type/i), "Glucose");

    expect(screen.queryByLabelText(/systolic/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/diastolic/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/heart rate/i)).not.toBeInTheDocument();
  });

  it("allows saving a non-Blood Pressure log without systolic and closes", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));
    await user.selectOptions(screen.getByLabelText(/log type/i), "Glucose");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("HP-01: Valid Blood Pressure saves and closes", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));
    await user.type(screen.getByLabelText(/systolic/i), "120");
    await user.type(screen.getByLabelText(/diastolic/i), "80");
    await user.type(screen.getByLabelText(/heart rate/i), "72");
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Cancel closes modal", async () => {
    const user = userEvent.setup();
    renderWithProvider();

    await user.click(screen.getByRole("button", { name: /open new log/i }));
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
