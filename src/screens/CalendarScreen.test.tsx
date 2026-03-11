import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderAuthenticatedApp } from "../testUtils";

describe("CalendarScreen", () => {
  // ── Existing tests (preserved) ────────────────────────────────────────────

  it("navigates to Calendar and shows schedule for selected day", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    expect(
      screen.getByRole("heading", { name: "Calendar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /schedule for monday, january 26, 2026/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Check-up")).toBeInTheDocument();
  });

  it("selecting a different day updates schedule details", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /tuesday, january 27, 2026/i }),
    );
    expect(
      screen.getByRole("heading", {
        name: /schedule for tuesday, january 27, 2026/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Lab results")).toBeInTheDocument();
  });

  it("month navigation updates the month label and supports empty days", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    await userEvent.click(screen.getByRole("button", { name: /next month/i }));
    expect(screen.getByText("February 2026")).toBeInTheDocument();
    expect(screen.getByText(/no appointments scheduled/i)).toBeInTheDocument();
  });

  // ── Accessibility additions ───────────────────────────────────────────────

  it("page content is inside the app <main> landmark", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("has a <nav> landmark for month navigation", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    expect(
      screen.getByRole("navigation", { name: /month navigation/i }),
    ).toBeInTheDocument();
  });

  it('calendar table has role="grid" for WAI-ARIA date picker pattern', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    expect(
      screen.getByRole("grid", { name: /january 2026 date picker/i }),
    ).toBeInTheDocument();
  });

  it("day buttons have descriptive aria-labels including today and event info", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    const todayBtn = screen.getByRole("button", {
      name: /monday, january 26, 2026.*today/i,
    });
    expect(todayBtn).toBeInTheDocument();
    expect(todayBtn).toHaveAttribute("aria-current", "date");
  });

  it('selected day button has aria-current="date"', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    const selectedBtn = screen.getByRole("button", { name: /selected/i });
    expect(selectedBtn).toHaveAttribute("aria-current", "date");
  });

  it("month label live region announces month changes", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    const nav = screen.getByRole("navigation", { name: /month navigation/i });
    const liveRegion = within(nav).getByText("January 2026");
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveAttribute("aria-atomic", "true");
  });

  it("previous month button navigates backward and updates month label", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /previous month/i }),
    );
    expect(screen.getByText("December 2025")).toBeInTheDocument();
  });

  it("schedule appointment list is labelled with the selected date", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
    expect(
      screen.getByRole("list", {
        name: /appointments for monday, january 26, 2026/i,
      }),
    ).toBeInTheDocument();
  });
});
