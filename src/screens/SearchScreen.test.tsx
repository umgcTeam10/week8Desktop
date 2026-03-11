import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DesktopProvider } from "../context/DesktopContext";
import { SearchScreen } from "./SearchScreen";

function renderSearchScreen() {
  return render(
    <DesktopProvider>
      <SearchScreen />
    </DesktopProvider>,
  );
}

describe("SearchScreen", () => {
  // ── Heading ──────────────────────────────────────────────────────────────
  it("renders the Search page heading", () => {
    renderSearchScreen();
    expect(
      screen.getByRole("heading", { name: /search/i }),
    ).toBeInTheDocument();
  });

  it("has a Search heading at level 2", () => {
    renderSearchScreen();
    expect(
      screen.getByRole("heading", { level: 2, name: /search/i }),
    ).toBeInTheDocument();
  });

  // ── Input ─────────────────────────────────────────────────────────────────
  it("has a search input with an accessible label", () => {
    renderSearchScreen();
    expect(
      screen.getByRole("searchbox", { name: /search/i }),
    ).toBeInTheDocument();
  });

  // ── Sections only render after a query is typed ───────────────────────────
  it("shows the Health logs section after typing a query", async () => {
    renderSearchScreen();
    await userEvent.type(
      screen.getByRole("searchbox", { name: /search/i }),
      "blood",
    );
    expect(
      screen.getByRole("region", { name: /health logs/i }),
    ).toBeInTheDocument();
  });

  it("shows the Messages section after typing a query", async () => {
    renderSearchScreen();
    await userEvent.type(
      screen.getByRole("searchbox", { name: /search/i }),
      "appointment",
    );
    expect(
      screen.getByRole("region", { name: /^messages$/i }),
    ).toBeInTheDocument();
  });

  // ── Matching results ──────────────────────────────────────────────────────
  it("shows matching health log results when query matches", async () => {
    renderSearchScreen();
    await userEvent.type(
      screen.getByRole("searchbox", { name: /search/i }),
      "blood",
    );
    expect(
      screen.getByRole("list", { name: /search results - health logs/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/no matching logs/i)).not.toBeInTheDocument();
  });

  it("shows matching message results when query matches", async () => {
    renderSearchScreen();
    await userEvent.type(
      screen.getByRole("searchbox", { name: /search/i }),
      "appointment",
    );
    expect(
      screen.getByRole("list", { name: /search results - messages/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/no matching messages/i)).not.toBeInTheDocument();
  });

  // ── Empty-state text (matches actual SearchScreen.tsx output) ─────────────
  it('shows "No matching logs." when no health log results are found', async () => {
    renderSearchScreen();
    await userEvent.type(
      screen.getByRole("searchbox", { name: /search/i }),
      "zzznomatch999",
    );
    expect(screen.getByText(/no matching logs/i)).toBeInTheDocument();
  });

  it('shows "No matching messages." when no message results are found', async () => {
    renderSearchScreen();
    await userEvent.type(
      screen.getByRole("searchbox", { name: /search/i }),
      "zzznomatch999",
    );
    expect(screen.getByText(/no matching messages/i)).toBeInTheDocument();
  });
});
