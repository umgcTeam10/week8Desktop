import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderAuthenticatedApp } from "../testUtils";

describe("MessagesScreen", () => {
  // ── Existing test (preserved) ─────────────────────────────────────────────

  it("navigates to Messages and shows conversation and SOS", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("heading", { name: "Robert Martinez" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /emergency sos/i }),
    ).toBeInTheDocument();
  });

  // ── Accessibility additions ───────────────────────────────────────────────

  it("page content is inside the app <main> landmark", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("left aside has an accessible label", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("complementary", {
        name: /contacts and conversations/i,
      }),
    ).toBeInTheDocument();
  });

  it("right aside has an accessible label", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("complementary", { name: /conversation context/i }),
    ).toBeInTheDocument();
  });

  it("Quick Contact section is labelled by its heading", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("region", { name: /quick contact/i }),
    ).toBeInTheDocument();
  });

  it("quick contact buttons have accessible names with name and role", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("button", { name: /sarah.*primary care/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /dr\..*doctor/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /nurse.*home care/i }),
    ).toBeInTheDocument();
  });

  it('message thread has role="log" for WAI-ARIA live region pattern', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(screen.getByRole("log")).toBeInTheDocument();
  });

  it("message thread is labelled with the contact name", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("log", { name: /message thread with robert martinez/i }),
    ).toBeInTheDocument();
  });

  it('typing indicator has aria-live="polite"', async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    const typingEl = screen.getByText(/robert is typing/i);
    expect(typingEl).toHaveAttribute("aria-live", "polite");
  });

  it("quick replies are grouped with an accessible label", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("group", { name: /quick reply options/i }),
    ).toBeInTheDocument();
  });

  it("compose message area is a labelled group", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("group", { name: /compose message/i }),
    ).toBeInTheDocument();
  });

  it("message input field has an accessible label", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("textbox", { name: /type your message/i }),
    ).toBeInTheDocument();
  });

  it("action buttons have accessible labels", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("button", { name: /attach file/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add emoji/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /video call/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /phone call/i }),
    ).toBeInTheDocument();
  });

  it("reminder card is a region labelled by its heading", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("region", { name: /upcoming reminder/i }),
    ).toBeInTheDocument();
  });

  it("shared files section is labelled by its heading", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("region", { name: /shared files/i }),
    ).toBeInTheDocument();
  });

  it("conversation actions are in a proper list with accessible label", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    expect(
      screen.getByRole("list", { name: /conversation actions/i }),
    ).toBeInTheDocument();
  });

  it("SOS button opens the confirm modal", async () => {
    await renderAuthenticatedApp();
    await userEvent.click(screen.getByRole("button", { name: /^messages$/i }));
    await userEvent.click(
      screen.getByRole("button", { name: /emergency sos/i }),
    );
    // SOS modal uses role="alertdialog" (not role="dialog")
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});
