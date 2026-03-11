import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderAuthenticatedApp } from "../testUtils";

describe("ProfileScreen", () => {
  // ── Existing tests (preserved) ────────────────────────────────────────────

  it("navigates to Profile and shows Notifications, Preferences, Accessibility", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(
      screen.getByRole("heading", { name: /profile & settings/i }),
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

  it("text size slider is present", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(screen.getByLabelText(/text size/i)).toBeInTheDocument();
  });

  // ── Accessibility additions ───────────────────────────────────────────────

  it("page content is inside the app <main> landmark", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("has a labelled <aside> landmark for the profile summary panel", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(
      screen.getByRole("complementary", { name: /user profile summary/i }),
    ).toBeInTheDocument();
  });

  it("Account Statistics section is labelled by its heading", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(
      screen.getByRole("region", { name: /account statistics/i }),
    ).toBeInTheDocument();
  });

  it("checkboxes are labelled by their wrapping <label> text", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(
      screen.getByRole("checkbox", { name: /push notifications/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /email notifications/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /task reminders/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /dark mode/i }),
    ).toBeInTheDocument();
  });

  it("Time Format segmented control has group role and aria-labelledby", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    const group = screen.getByRole("group", { name: /time format/i });
    expect(group).toBeInTheDocument();
    expect(
      within(group).getByRole("button", { name: "12h" }),
    ).toBeInTheDocument();
    expect(
      within(group).getByRole("button", { name: "24h" }),
    ).toBeInTheDocument();
  });

  it("Time Format buttons have correct aria-pressed state", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(screen.getByRole("button", { name: "12h" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "24h" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("slider range input is associated with its label via htmlFor/id", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    const slider = screen.getByRole("slider", { name: /text size/i });
    expect(slider).toHaveAttribute("id", "text-size-slider");
    expect(slider).toHaveAttribute("min", "12");
    expect(slider).toHaveAttribute("max", "24");
  });

  it("search settings input has accessible label", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /profile/i }));
    expect(
      screen.getByRole("searchbox", { name: /search settings/i }),
    ).toBeInTheDocument();
  });
});
