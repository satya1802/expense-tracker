// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Select, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, X, ChevronRight, Bell, Clock, AlertCircle, CheckCircle } = Icons;

const USER = {
  email: "satya.ganaraju@quorq.ai",
  currency: "USD",
  symbol: "$",
};

const PERIOD = {
  label: "November 2026",
  short: "Nov 2026",
  range: "1 – 14 Nov 2026",
  updated: "14 Nov 2026, 09:42",
};

const BUDGET_ROWS = [
  { id: "cat_groceries", name: "Groceries", spent: 276.0, limit: 300.0, count: 8 },
  { id: "cat_dining", name: "Dining out", spent: 245.2, limit: 200.0, count: 9 },
  { id: "cat_shopping", name: "Shopping", spent: 212.85, limit: 450.0, count: 4 },
  { id: "cat_utilities", name: "Utilities", spent: 148.4, limit: 220.0, count: 3 },
  { id: "cat_transport", name: "Transport", spent: 132.75, limit: 200.0, count: 6 },
  { id: "cat_health", name: "Health", spent: 96.0, limit: 150.0, count: 2 },
  { id: "cat_fun", name: "Entertainment", spent: 88.3, limit: 150.0, count: 3 },
  { id: "cat_subs", name: "Subscriptions", spent: 85.0, limit: 130.0, count: 2 },
  { id: "cat_travel", name: "Travel", spent: 0.0, limit: 100.0, count: 0 },
];

const ALERTS = [
  {
    wf: "i-1-0-0",
    id: "alert_2026_11_groceries",
    kind: "nearing",
    category: "Groceries",
    headline: "nearing limit: $276.00 of $300.00 spent",
    detail: "92% of the limit used with 16 days left in the month.",
  },
  {
    wf: "i-1-0-1",
    id: "alert_2026_11_dining",
    kind: "over",
    category: "Dining out",
    headline: "over limit by $45.20 ($245.20 of $200.00)",
    detail: "9 expenses logged against this category since 1 Nov.",
  },
];

function money(n) {
  const sign = n < 0 ? "−" : "";
  return (
    sign +
    USER.symbol +
    Math.abs(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function statusOf(row) {
  if (row.limit <= 0) return { word: "No limit", tone: "quiet" };
  if (row.spent === 0) return { word: "Unused", tone: "quiet" };
  const pct = row.spent / row.limit;
  if (pct >= 1) return { word: "Over", tone: "over" };
  if (pct >= 0.8) return { word: "Nearing", tone: "nearing" };
  return { word: "On track", tone: "ok" };
}

export default function Screen() {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(null);
  const [view, setView] = React.useState("data");
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef(null);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const totals = React.useMemo(() => {
    const spent = BUDGET_ROWS.reduce((a, r) => a + r.spent, 0);
    const limit = BUDGET_ROWS.reduce((a, r) => a + r.limit, 0);
    const count = BUDGET_ROWS.reduce((a, r) => a + r.count, 0);
    return { spent, limit, remaining: limit - spent, count };
  }, []);

  const maxSpent = Math.max(...BUDGET_ROWS.map((r) => r.spent));

  const ink = brand.primaryColor;
  const paper = brand.backgroundColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;

  const cardStyle = {
    border: "3px solid " + ink,
    boxShadow: "6px 6px 0 " + ink,
    background: "#ffffff",
    borderRadius: brand.radius,
  };

  const sectionLabel = (num, text) => (
    <div className="flex items-baseline gap-3">
      <span
        className="text-[11px] tracking-[0.2em] font-bold"
        style={{ color: accent, fontFamily: brand.fontBody }}
      >
        §{num}
      </span>
      <span
        className="text-[11px] uppercase tracking-[0.22em]"
        style={{ color: muted, fontFamily: brand.fontBody }}
      >
        {text}
      </span>
    </div>
  );

  const selectedRow = BUDGET_ROWS.find((r) => r.id === selected) || null;

  return (
    <div
      className="bs-root w-full min-h-full px-4 sm:px-6 lg:px-10 py-8 lg:py-12"
      style={{
        background: paper,
        color: ink,
        fontFamily: brand.fontBody,
        ["--bs-ink"]: ink,
        ["--bs-accent"]: accent,
        ["--bs-paper"]: paper,
      }}
    >
      <style>{`
        .bs-root *:focus-visible { outline: 3px solid var(--bs-accent); outline-offset: 3px; }
        .bs-press { transition: transform .12s ease, box-shadow .12s ease; }
        .bs-press:hover { transform: translate(3px, 3px); box-shadow: 0 0 0 0 var(--bs-ink) !important; }
        .bs-press:active { transform: translate(6px, 6px); box-shadow: none !important; }
        .bs-line { transition: background-color .12s ease; }
        .bs-line:hover { background-color: rgba(10,10,10,0.06); }
        .bs-bar { transition: width .4s cubic-bezier(.2,.7,.3,1), background-color .15s ease; }
        @keyframes bsRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes bsPulse { 0%,100% { opacity: .35; } 50% { opacity: .7; } }
        .bs-rise { animation: bsRise .34s ease both; }
        .bs-pulse { animation: bsPulse 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bs-rise, .bs-pulse { animation: none !important; }
          .bs-press, .bs-bar, .bs-line { transition: none !important; }
          .bs-press:hover, .bs-press:active { transform: none; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1200px]">
        {/* ── Row 1 ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
          <div data-wf="b-0-0" className="md:col-span-8">
            <div
              className="text-[11px] uppercase tracking-[0.3em] mb-3"
              style={{ color: muted }}
            >
              The Ledger / Personal edition
            </div>
            <h1
              className="leading-[0.95] tracking-tight"
              style={{
                fontFamily: brand.fontHeading,
                fontSize: "clamp(2.25rem, 5.2vw, 3.5rem)",
                fontWeight: 700,
              }}
            >
              Dashboard — {PERIOD.label}
            </h1>
            <p
              className="mt-4 text-[12px] leading-relaxed"
              style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
            >
              Private to {USER.email} · all figures in {USER.currency} · updated{" "}
              {PERIOD.updated}
            </p>
          </div>

          <div className="md:col-span-4 flex md:justify-end">
            <Button
              data-wf="b-0-1"
              onClick={() => navigate("expenses")}
              className="bs-press inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] w-full md:w-auto text-[12px] uppercase tracking-[0.18em] font-bold"
              style={{
                background: accent,
                color: "#ffffff",
                border: "3px solid " + ink,
                boxShadow: "6px 6px 0 " + ink,
                borderRadius: brand.radius,
                fontFamily: brand.fontBody,
              }}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Add expense
            </Button>
          </div>
        </div>

        <div
          className="mt-8 mb-10"
          style={{ borderTop: "3px solid " + ink }}
          aria-hidden="true"
        />

        {loading ? (
          <div className="bs-rise" aria-live="polite">
            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: muted }}>
              Pulling {PERIOD.short} figures from your account…
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={"bs-pulse h-28 " + (i === 0 ? "md:col-span-2" : "")}
                  style={{
                    border: "3px solid " + ink,
                    background: "rgba(10,10,10,0.08)",
                    borderRadius: brand.radius,
                  }}
                />
              ))}
            </div>
            <div
              className="bs-pulse h-64 mt-8"
              style={{
                border: "3px solid " + ink,
                background: "rgba(10,10,10,0.08)",
                borderRadius: brand.radius,
              }}
            />
          </div>
        ) : view === "data" ? (
          <div className="bs-rise space-y-10 lg:space-y-14">
            {/* ── Row 2 : Budget alerts ───────────────── */}
            <section data-wf="b-1-0" aria-labelledby="alerts-heading">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                <div>
                  {sectionLabel("01", "In-app alerts · " + PERIOD.short)}
                  <h2
                    id="alerts-heading"
                    className="mt-1"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "clamp(1.5rem,2.6vw,1.9rem)",
                      fontWeight: 700,
                    }}
                  >
                    Budget alerts
                  </h2>
                </div>
                <span
                  className="text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: muted, fontVariantNumeric: "tabular-nums" }}
                >
                  2 active · threshold 80% of limit
                </span>
              </div>

              {ALERTS.length === 0 ? (
                <div
                  className="px-6 py-6 text-[13px]"
                  style={{ border: "3px dashed " + ink, color: muted }}
                >
                  Nothing is near a limit this month. Alerts appear here the moment a
                  category crosses 80%.
                </div>
              ) : (
                <ul className="space-y-4">
                  {ALERTS.map((a) => {
                    const over = a.kind === "over";
                    return (
                      <li key={a.id}>
                        <button
                          type="button"
                          data-wf={a.wf}
                          onClick={() => navigate("budgets")}
                          className="bs-press w-full text-left flex items-start gap-4 px-5 py-5 sm:px-6"
                          style={{
                            border: "3px solid " + ink,
                            boxShadow: "6px 6px 0 " + (over ? accent : ink),
                            background: "#ffffff",
                            borderRadius: brand.radius,
                          }}
                        >
                          <span
                            className="shrink-0 inline-flex items-center justify-center w-10 h-10"
                            style={{
                              border: "3px solid " + ink,
                              background: over ? accent : "transparent",
                              color: over ? "#ffffff" : ink,
                            }}
                          >
                            <Bell className="w-4 h-4" aria-hidden="true" />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                              <span
                                className="text-[15px] sm:text-[16px] font-bold"
                                style={{ fontVariantNumeric: "tabular-nums" }}
                              >
                                {a.category} — {a.headline}
                              </span>
                              <Badge
                                className="text-[10px] uppercase tracking-[0.18em] px-2 py-[3px] font-bold"
                                style={{
                                  border: "2px solid " + ink,
                                  background: over ? ink : "transparent",
                                  color: over ? "#ffffff" : ink,
                                  borderRadius: brand.radius,
                                }}
                              >
                                {over ? "Over limit" : "Nearing limit"}
                              </Badge>
                            </span>
                            <span
                              className="block mt-2 text-[12px]"
                              style={{ color: muted }}
                            >
                              {a.detail} Open budgets to adjust the limit.
                            </span>
                          </span>
                          <ChevronRight
                            className="w-5 h-5 shrink-0 mt-2"
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* ── Row 3 : This month ──────────────────── */}
            <section data-wf="b-2-0" aria-labelledby="month-heading">
              <div className="mb-4">
                {sectionLabel("02", PERIOD.range)}
                <h2
                  id="month-heading"
                  className="mt-1"
                  style={{
                    fontFamily: brand.fontHeading,
                    fontSize: "clamp(1.5rem,2.6vw,1.9rem)",
                    fontWeight: 700,
                  }}
                >
                  This month
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                <div
                  data-wf="i-2-0-0"
                  className="md:col-span-2 px-6 py-7"
                  style={{ ...cardStyle, background: ink, color: paper }}
                >
                  <div
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: "rgba(244,244,240,0.72)" }}
                  >
                    Spent
                  </div>
                  <div
                    className="mt-3 leading-none"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "clamp(2.75rem,6vw,4rem)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 700,
                    }}
                  >
                    {money(totals.spent)}
                  </div>
                  <div
                    className="mt-5 h-3 w-full"
                    style={{ border: "2px solid " + paper }}
                    role="img"
                    aria-label={
                      Math.round((totals.spent / totals.limit) * 100) +
                      " percent of the total monthly budget used"
                    }
                  >
                    <div
                      className="bs-bar h-full"
                      style={{
                        width: (totals.spent / totals.limit) * 100 + "%",
                        background: accent,
                      }}
                    />
                  </div>
                  <div
                    className="mt-3 text-[12px]"
                    style={{
                      color: "rgba(244,244,240,0.78)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    68% of {money(totals.limit)} budgeted · {USER.currency}
                  </div>
                </div>

                <div data-wf="i-2-0-1" className="px-5 py-6" style={cardStyle}>
                  <div
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: muted }}
                  >
                    Budgeted
                  </div>
                  <div
                    className="mt-3 leading-none"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "clamp(1.9rem,3.4vw,2.4rem)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 700,
                    }}
                  >
                    {money(totals.limit)}
                  </div>
                  <div className="mt-3 text-[12px]" style={{ color: muted }}>
                    Across 9 categories
                  </div>
                </div>

                <div data-wf="i-2-0-2" className="px-5 py-6" style={cardStyle}>
                  <div
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: muted }}
                  >
                    Remaining
                  </div>
                  <div
                    className="mt-3 leading-none"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "clamp(1.9rem,3.4vw,2.4rem)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 700,
                    }}
                  >
                    {money(totals.remaining)}
                  </div>
                  <div className="mt-3 text-[12px]" style={{ color: muted }}>
                    16 days left in {PERIOD.short}
                  </div>
                </div>

                <div data-wf="i-2-0-3" className="px-5 py-6" style={cardStyle}>
                  <div
                    className="text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: muted }}
                  >
                    Expenses logged
                  </div>
                  <div
                    className="mt-3 leading-none"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "clamp(1.9rem,3.4vw,2.4rem)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 700,
                    }}
                  >
                    {totals.count}
                  </div>
                  <div className="mt-3 text-[12px]" style={{ color: muted }}>
                    Last entry 14 Nov, 08:10
                  </div>
                </div>
              </div>
            </section>

            {/* ── Row 4 : Chart + table ───────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <section
                data-wf="b-3-0"
                className="lg:col-span-7"
                aria-labelledby="chart-heading"
              >
                <div className="mb-4">
                  {sectionLabel("03", "Category breakdown")}
                  <h2
                    id="chart-heading"
                    className="mt-1"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "clamp(1.5rem,2.6vw,1.9rem)",
                      fontWeight: 700,
                    }}
                  >
                    Spending by category — {PERIOD.label}
                  </h2>
                </div>

                <div className="px-5 py-6 sm:px-7 sm:py-7" style={cardStyle}>
                  <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: muted }}>
                    Select a bar for the detail line
                  </p>
                  <ul className="mt-5 space-y-3">
                    {BUDGET_ROWS.map((r) => {
                      const st = statusOf(r);
                      const isSel = selected === r.id;
                      const w = maxSpent > 0 ? (r.spent / maxSpent) * 100 : 0;
                      const over = st.tone === "over";
                      return (
                        <li key={r.id}>
                          <button
                            type="button"
                            aria-pressed={isSel}
                            onClick={() => setSelected(isSel ? null : r.id)}
                            className="w-full text-left flex items-center gap-3 sm:gap-4 py-1"
                          >
                            <span
                              className="w-[86px] sm:w-[104px] shrink-0 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] truncate"
                              style={{ color: isSel ? ink : muted, fontWeight: isSel ? 700 : 400 }}
                            >
                              {r.name}
                            </span>
                            <span
                              className="flex-1 h-6"
                              style={{ border: "2px solid " + ink, background: paper }}
                            >
                              <span
                                className="bs-bar block h-full"
                                style={{
                                  width: Math.max(w, r.spent > 0 ? 2 : 0) + "%",
                                  background: over
                                    ? "repeating-linear-gradient(45deg," +
                                      ink +
                                      " 0 5px, transparent 5px 10px)"
                                    : isSel
                                    ? accent
                                    : ink,
                                }}
                              />
                            </span>
                            <span
                              className="w-[82px] sm:w-[92px] shrink-0 text-right text-[12px]"
                              style={{
                                fontVariantNumeric: "tabular-nums",
                                fontWeight: isSel ? 700 : 400,
                              }}
                            >
                              {money(r.spent)}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6" style={{ borderTop: "2px dashed " + ink }} />
                  <div className="mt-4 min-h-[44px] flex flex-wrap items-center gap-x-4 gap-y-2">
                    {selectedRow ? (
                      <>
                        <p
                          className="text-[12px] flex-1 min-w-[220px]"
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          <strong>{selectedRow.name}</strong> — {money(selectedRow.spent)} across{" "}
                          {selectedRow.count}{" "}
                          {selectedRow.count === 1 ? "expense" : "expenses"} ·{" "}
                          {Math.round((selectedRow.spent / totals.spent) * 100)}% of the month ·{" "}
                          {Math.round((selectedRow.spent / selectedRow.limit) * 100)}% of its{" "}
                          {money(selectedRow.limit)} limit
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelected(null)}
                          className="text-[11px] uppercase tracking-[0.18em] px-3 py-2"
                          style={{ border: "2px solid " + ink, color: ink }}
                        >
                          <X className="w-3 h-3 inline mr-1 -mt-[2px]" aria-hidden="true" />
                          Clear
                        </button>
                      </>
                    ) : (
                      <p className="text-[12px]" style={{ color: muted }}>
                        Hatched bars are over their monthly limit. Travel has no spending logged
                        yet this month.
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section
                data-wf="b-3-1"
                className="lg:col-span-5"
                aria-labelledby="table-heading"
              >
                <div className="mb-4">
                  {sectionLabel("04", "Monthly limits")}
                  <h2
                    id="table-heading"
                    className="mt-1"
                    style={{
                      fontFamily: brand.fontHeading,
                      fontSize: "clamp(1.5rem,2.6vw,1.9rem)",
                      fontWeight: 700,
                    }}
                  >
                    Budget status
                  </h2>
                </div>

                <div className="overflow-x-auto" style={cardStyle}>
                  <Table
                    className="w-full text-left"
                    style={{ fontVariantNumeric: "tabular-nums", borderCollapse: "collapse" }}
                  >
                    <THead>
                      <TR style={{ borderBottom: "3px solid " + ink }}>
                        <TH
                          data-wf="i-3-1-0"
                          scope="col"
                          className="px-4 py-3 text-[10px] uppercase tracking-[0.18em] font-bold"
                        >
                          Category
                        </TH>
                        <TH
                          data-wf="i-3-1-1"
                          scope="col"
                          className="px-3 py-3 text-right text-[10px] uppercase tracking-[0.18em] font-bold"
                        >
                          Spent
                        </TH>
                        <TH
                          data-wf="i-3-1-2"
                          scope="col"
                          className="px-3 py-3 text-right text-[10px] uppercase tracking-[0.18em] font-bold"
                        >
                          Limit
                        </TH>
                        <TH
                          data-wf="i-3-1-3"
                          scope="col"
                          className="px-4 py-3 text-right text-[10px] uppercase tracking-[0.18em] font-bold"
                        >
                          Remaining
                        </TH>
                      </TR>
                    </THead>
                    <TBody>
                      {BUDGET_ROWS.map((r) => {
                        const st = statusOf(r);
                        const rem = r.limit - r.spent;
                        const isSel = selected === r.id;
                        return (
                          <TR
                            key={r.id}
                            className="bs-line"
                            style={{
                              borderTop: "1px solid rgba(10,10,10,0.18)",
                              background: isSel ? "rgba(29,63,255,0.08)" : "transparent",
                              boxShadow: isSel ? "inset 4px 0 0 " + accent : "none",
                            }}
                          >
                            <TD className="px-4 py-3 align-middle">
                              <button
                                type="button"
                                onClick={() => navigate("budgets")}
                                className="text-left"
                                aria-label={
                                  "Open budget for " +
                                  r.name +
                                  ", " +
                                  st.word.toLowerCase() +
                                  ", " +
                                  money(r.spent) +
                                  " of " +
                                  money(r.limit) +
                                  " spent"
                                }
                              >
                                <span className="block text-[13px] font-bold">{r.name}</span>
                                <span
                                  className="mt-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em]"
                                  style={{
                                    color: st.tone === "ok" || st.tone === "quiet" ? muted : ink,
                                    fontWeight: st.tone === "over" ? 700 : 400,
                                  }}
                                >
                                  {st.tone === "over" ? (
                                    <AlertCircle className="w-3 h-3" aria-hidden="true" />
                                  ) : st.tone === "nearing" ? (
                                    <Bell className="w-3 h-3" aria-hidden="true" />
                                  ) : st.tone === "quiet" ? (
                                    <Clock className="w-3 h-3" aria-hidden="true" />
                                  ) : (
                                    <CheckCircle className="w-3 h-3" aria-hidden="true" />
                                  )}
                                  {st.word}
                                </span>
                              </button>
                            </TD>
                            <TD className="px-3 py-3 text-right text-[12px] align-middle">
                              {money(r.spent)}
                            </TD>
                            <TD
                              className="px-3 py-3 text-right text-[12px] align-middle"
                              style={{ color: muted }}
                            >
                              {money(r.limit)}
                            </TD>
                            <TD
                              className="px-4 py-3 text-right text-[12px] align-middle"
                              style={{ fontWeight: rem < 0 ? 700 : 400 }}
                            >
                              {money(rem)}
                            </TD>
                          </TR>
                        );
                      })}
                      <TR style={{ borderTop: "3px solid " + ink }}>
                        <TD className="px-4 py-3 text-[10px] uppercase tracking-[0.18em] font-bold">
                          Total
                        </TD>
                        <TD className="px-3 py-3 text-right text-[12px] font-bold">
                          {money(totals.spent)}
                        </TD>
                        <TD className="px-3 py-3 text-right text-[12px] font-bold">
                          {money(totals.limit)}
                        </TD>
                        <TD className="px-4 py-3 text-right text-[12px] font-bold">
                          {money(totals.remaining)}
                        </TD>
                      </TR>
                    </TBody>
                  </Table>
                </div>
                <p className="mt-3 text-[11px]" style={{ color: muted }}>
                  Select a category to edit its monthly limit in Budgets &amp; categories.
                </p>
              </section>
            </div>
          </div>
        ) : null}

        {/* ── Row 5 : Empty state ───────────────────────── */}
        <section
          data-wf="b-4-0"
          hidden={loading || view !== "empty"}
          className="bs-rise"
          aria-labelledby="empty-heading"
        >
          <div className="mb-4">
            {sectionLabel("01", "First run · " + PERIOD.short)}
            <h2
              id="empty-heading"
              className="mt-1"
              style={{
                fontFamily: brand.fontHeading,
                fontSize: "clamp(1.5rem,2.6vw,1.9rem)",
                fontWeight: 700,
              }}
            >
              Nothing logged yet
            </h2>
          </div>
          <div className="px-6 py-10 sm:px-10 sm:py-14" style={cardStyle}>
            <div
              className="mx-auto mb-8 w-28 h-20 flex items-end justify-center gap-2"
              aria-hidden="true"
            >
              <span style={{ border: "3px solid " + ink, width: 18, height: "28%" }} />
              <span style={{ border: "3px solid " + ink, width: 18, height: "52%" }} />
              <span style={{ border: "3px solid " + ink, width: 18, height: "78%", background: accent }} />
              <span style={{ border: "3px solid " + ink, width: 18, height: "40%" }} />
            </div>
            <Empty
              title="No expenses yet"
              description="Log your first expense to see your spending here. Your spend, budget status and alerts for November 2026 fill this page as soon as there is something to count."
              action={
                <Button
                  onClick={() => navigate("expenses")}
                  className="bs-press inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] text-[12px] uppercase tracking-[0.18em] font-bold"
                  style={{
                    background: accent,
                    color: "#ffffff",
                    border: "3px solid " + ink,
                    boxShadow: "6px 6px 0 " + ink,
                    borderRadius: brand.radius,
                    fontFamily: brand.fontBody,
                  }}
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Add your first expense
                </Button>
              }
              className="text-center"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
