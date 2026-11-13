// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Table, THead, TBody, TR, TH, TD, Empty } = UI;

const CURRENCY = "USD";

const INITIAL_CATEGORIES = [
  { id: "cat_01", name: "Groceries", is_default: true, created_at: "2026-08-02" },
  { id: "cat_02", name: "Dining out", is_default: true, created_at: "2026-08-02" },
  { id: "cat_03", name: "Transport", is_default: true, created_at: "2026-08-02" },
  { id: "cat_04", name: "Rent", is_default: true, created_at: "2026-08-02" },
  { id: "cat_05", name: "Utilities", is_default: true, created_at: "2026-08-02" },
  { id: "cat_06", name: "Pet care", is_default: false, created_at: "2026-10-18" },
];

// budgets.monthly_limit keyed by category_id (Rent has no limit set yet)
const INITIAL_BUDGETS = {
  cat_01: 300,
  cat_02: 180,
  cat_03: 120,
  cat_05: 220,
  cat_06: 80,
};

// Spent this period (period_month = 2026-11), from GET /reports/dashboard
const SPENT_NOV = {
  cat_01: 276.4,
  cat_02: 225.2,
  cat_03: 64.8,
  cat_04: 1450.0,
  cat_05: 138.75,
  cat_06: 62.5,
};

// Wireframe item ids for the named alert rows, so they stay tied to the
// wireframe whatever order the live alert list comes back in.
const WF_ALERT_IDS = {
  cat_01: "i-1-0-0",
  cat_02: "i-1-0-1",
};

const money = (n) => {
  const sign = n < 0 ? "−" : "";
  return (
    sign +
    "$" +
    Math.abs(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};

const statusOf = (limit, spent) => {
  if (limit == null) return { key: "none", label: "No limit set" };
  if (spent > limit) return { key: "over", label: "Over limit" };
  if (limit > 0 && spent / limit >= 0.8) return { key: "near", label: "Nearing limit" };
  return { key: "ok", label: "On track" };
};

const parseAmount = (raw) => {
  const cleaned = String(raw).trim().replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  if (!/^\d*\.?\d{0,2}$/.test(cleaned)) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return n;
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const paper = brand.backgroundColor;
  const neutral = brand.neutralColor;
  const accent = brand.accentColor;
  const head = brand.fontHeading;
  const body = brand.fontBody;

  const [categories, setCategories] = React.useState(INITIAL_CATEGORIES);
  const [budgets, setBudgets] = React.useState(INITIAL_BUDGETS);
  const [spent] = React.useState(SPENT_NOV);

  const [limitCat, setLimitCat] = React.useState("");
  const [limitAmount, setLimitAmount] = React.useState("");
  const [limitError, setLimitError] = React.useState("");
  const [limitSaved, setLimitSaved] = React.useState("");
  const [savingLimit, setSavingLimit] = React.useState(false);

  const [newName, setNewName] = React.useState("");
  const [catError, setCatError] = React.useState("");
  const [catSaved, setCatSaved] = React.useState("");

  const [renameId, setRenameId] = React.useState(null);
  const [renameValue, setRenameValue] = React.useState("");
  const [renameError, setRenameError] = React.useState("");

  const [freshIds, setFreshIds] = React.useState([]);

  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  const rows = React.useMemo(
    () =>
      categories.map((c) => {
        const limit = budgets[c.id] != null ? budgets[c.id] : null;
        const used = spent[c.id] != null ? spent[c.id] : 0;
        const st = statusOf(limit, used);
        const pct = limit && limit > 0 ? Math.round((used / limit) * 100) : null;
        return {
          ...c,
          limit,
          used,
          remaining: limit != null ? limit - used : null,
          status: st,
          pct,
        };
      }),
    [categories, budgets, spent]
  );

  const alerts = React.useMemo(
    () =>
      rows
        .filter((r) => r.status.key === "near" || r.status.key === "over")
        .map((r, i) => ({
          id: r.id,
          wf: WF_ALERT_IDS[r.id] || "i-1-0-" + i,
          kind: r.status.key,
          text:
            r.status.key === "near"
              ? r.name + " — nearing limit: " + r.pct + "% of " + money(r.limit) + " used"
              : r.name + " — exceeded limit by " + money(r.used - r.limit),
        })),
    [rows]
  );

  const totals = React.useMemo(() => {
    let limit = 0;
    let used = 0;
    rows.forEach((r) => {
      if (r.limit != null) {
        limit += r.limit;
        used += r.used;
      }
    });
    return { limit, used, remaining: limit - used };
  }, [rows]);

  const budgetedCount = rows.filter((r) => r.limit != null).length;

  // ---- handlers -------------------------------------------------------
  const onPickCategory = (id) => {
    setLimitCat(id);
    setLimitError("");
    setLimitSaved("");
    setLimitAmount(budgets[id] != null ? budgets[id].toFixed(2) : "");
  };

  const submitLimit = (e) => {
    e.preventDefault();
    setLimitSaved("");
    if (!limitCat) {
      setLimitError("Choose which category this limit belongs to.");
      return;
    }
    const amount = parseAmount(limitAmount);
    if (amount === null || amount <= 0) {
      setLimitError(
        "Monthly limit must be a positive amount, for example 300.00. Your entry was kept so you can fix it."
      );
      return;
    }
    setLimitError("");
    setSavingLimit(true);
    later(() => {
      const cat = categories.find((c) => c.id === limitCat);
      setBudgets((b) => ({ ...b, [limitCat]: amount }));
      setSavingLimit(false);
      setLimitSaved(
        "Saved. " + cat.name + " is capped at " + money(amount) + " for November 2026."
      );
      setFreshIds((f) => [...f, limitCat]);
    }, 520);
  };

  const submitCategory = (e) => {
    e.preventDefault();
    setCatSaved("");
    const name = newName.trim();
    if (name === "") {
      setCatError("Give the category a name — “Bike repairs”, say.");
      return;
    }
    const clash = categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
    if (clash) {
      setCatError("You already have a category called “" + name + "”. Pick another name.");
      return;
    }
    const id = "cat_" + String(Date.now()).slice(-6);
    setCategories((cs) => [...cs, { id, name, is_default: false, created_at: "2026-11-14" }]);
    setFreshIds((f) => [...f, id]);
    setNewName("");
    setCatError("");
    setCatSaved("Added “" + name + "”. It is selectable when logging an expense or setting a limit.");
  };

  const startRename = (c) => {
    setRenameId(c.id);
    setRenameValue(c.name);
    setRenameError("");
  };

  const cancelRename = () => {
    setRenameId(null);
    setRenameValue("");
    setRenameError("");
  };

  const saveRename = (id) => {
    const name = renameValue.trim();
    if (name === "") {
      setRenameError("Category name cannot be empty.");
      return;
    }
    if (categories.some((c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase())) {
      setRenameError("“" + name + "” is already one of your categories.");
      return;
    }
    setCategories((cs) => cs.map((c) => (c.id === id ? { ...c, name } : c)));
    setFreshIds((f) => [...f, id]);
    setRenameId(null);
    setRenameValue("");
    setRenameError("");
  };

  // ---- shared style objects -------------------------------------------
  const panel = {
    backgroundColor: "#ffffff",
    borderColor: ink,
    borderWidth: "3px",
    borderStyle: "solid",
    borderRadius: 0,
    boxShadow: "6px 6px 0 " + ink,
  };
  const field = {
    borderColor: ink,
    borderWidth: "3px",
    borderStyle: "solid",
    borderRadius: 0,
    backgroundColor: "#ffffff",
    color: ink,
    fontFamily: body,
  };
  const mono = { fontFamily: body, fontVariantNumeric: "tabular-nums" };

  const css = `
    .bq-focus:focus-visible { outline: 3px solid ${accent}; outline-offset: 3px; }
    .bq-focus-inv:focus-visible { outline: 3px solid ${paper}; outline-offset: 3px; }
    .bq-row { transition: background-color .15s ease; }
    .bq-row:hover { background-color: rgba(10,10,10,.045); }
    .bq-alert { transition: transform .15s ease, background-color .15s ease; }
    .bq-alert:hover { transform: translateX(4px); }
    .bq-btn { transition: transform .12s ease, box-shadow .12s ease, background-color .12s ease; }
    .bq-btn:hover:not(:disabled) { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 ${ink}; }
    .bq-btn:active:not(:disabled) { transform: translate(2px,2px); box-shadow: 0 0 0 ${ink}; }
    .bq-in { animation: bq-in .3s ease-out both; }
    @keyframes bq-in { from { opacity:0; transform: translateY(-8px); } to { opacity:1; transform:none; } }
    .bq-pulse { animation: bq-pulse 1.1s ease-in-out infinite; }
    @keyframes bq-pulse { 0%,100% { opacity:.35 } 50% { opacity:1 } }
    @media (prefers-reduced-motion: reduce) {
      .bq-in, .bq-pulse { animation: none; }
      .bq-row, .bq-alert, .bq-btn { transition: none; }
      .bq-alert:hover, .bq-btn:hover:not(:disabled) { transform: none; }
    }
  `;

  const sectionHead = (num, title, right) => (
    <div
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b-[3px] pb-3"
      style={{ borderColor: ink }}
    >
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-bold tracking-[0.3em]" style={{ ...mono, color: accent }}>
          {num}
        </span>
        <h2 className="text-2xl leading-none sm:text-[28px]" style={{ fontFamily: head, color: ink }}>
          {title}
        </h2>
      </div>
      {right ? (
        <span className="text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: neutral }}>
          {right}
        </span>
      ) : null}
    </div>
  );

  const statusCell = (st, pct) => {
    const base =
      "inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em]";
    if (st.key === "over") {
      return (
        <span className={base} style={{ ...mono, backgroundColor: ink, color: paper }}>
          <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {st.label}
        </span>
      );
    }
    if (st.key === "near") {
      return (
        <span
          className={base}
          style={{ ...mono, color: ink, border: "2px dashed " + ink, backgroundColor: "transparent" }}
        >
          <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {st.label} {pct != null ? pct + "%" : ""}
        </span>
      );
    }
    if (st.key === "ok") {
      return (
        <span className={base} style={{ ...mono, color: ink, border: "2px solid " + ink }}>
          <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {st.label}
        </span>
      );
    }
    return (
      <span className={base} style={{ ...mono, color: neutral, border: "2px solid " + neutral }}>
        <Icons.X className="h-3.5 w-3.5" aria-hidden="true" />
        {st.label}
      </span>
    );
  };

  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6"
      style={{ backgroundColor: paper, fontFamily: body, color: ink }}
    >
      <style>{css}</style>

      {/* ── b-0-0 page title ─────────────────────────────────────────── */}
      <header data-wf="b-0-0" className="mb-10">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.34em]" style={{ ...mono, color: neutral }}>
          Ledger — Budgets desk
        </p>
        <h1
          className="max-w-4xl text-[38px] leading-[1.05] sm:text-[52px]"
          style={{ fontFamily: head, color: ink }}
        >
          Budgets &amp; categories <span style={{ color: neutral }}>—</span> November 2026
        </h1>
        <div className="mt-5 border-t-[3px] pt-3" style={{ borderColor: ink }}>
          <p className="text-[12px] uppercase tracking-[0.16em]" style={{ ...mono, color: neutral }}>
            Currency {CURRENCY} · {budgetedCount} of {categories.length} categories budgeted ·{" "}
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2 w-2" style={{ backgroundColor: neutral }} aria-hidden="true" />
              Figures synced 09:42 today
            </span>
          </p>
        </div>
      </header>

      {/* ── b-1-0 alerts ─────────────────────────────────────────────── */}
      <section data-wf="b-1-0" className="mb-12" aria-labelledby="alerts-heading">
        <div style={{ ...panel, backgroundColor: ink, color: paper }} className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-[3px] pb-3" style={{ borderColor: paper }}>
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-bold tracking-[0.3em]" style={{ ...mono, color: accent }}>
                01
              </span>
              <h2 id="alerts-heading" className="text-2xl leading-none sm:text-[28px]" style={{ fontFamily: head, color: paper }}>
                Alerts this month
              </h2>
            </div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: paper }}>
              {alerts.length} active · in-app only
            </span>
          </div>

          {alerts.length === 0 ? (
            <p className="pt-6 text-sm leading-relaxed" style={{ ...mono, color: paper, maxWidth: "62ch" }}>
              Nothing flagged. Every category with a limit is under 80% used for November 2026 — we will
              raise a notice here the moment one crosses.
            </p>
          ) : (
            <ul className="divide-y-[1px] pt-2" style={{ borderColor: "rgba(244,244,240,.3)" }}>
              {alerts.map((a) => (
                <li key={a.id} style={{ borderColor: "rgba(244,244,240,.3)" }} className="border-b last:border-b-0">
                  <button
                    type="button"
                    data-wf={a.wf}
                    onClick={() => navigate("expenses")}
                    className="bq-alert bq-focus-inv flex w-full items-center gap-4 px-1 py-4 text-left"
                    style={{ color: paper, minHeight: "44px" }}
                  >
                    <Icons.Bell className="h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                    <span className="flex-1 text-sm leading-relaxed sm:text-[15px]" style={mono}>
                      <span className="font-bold uppercase tracking-[0.12em]">
                        {a.kind === "over" ? "Over" : "Near"}
                      </span>
                      <span aria-hidden="true"> · </span>
                      {a.text}
                    </span>
                    <span className="hidden text-[11px] uppercase tracking-[0.18em] sm:inline" style={mono}>
                      See expenses
                    </span>
                    <Icons.ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── b-2-0 monthly budgets table ──────────────────────────────── */}
      <section data-wf="b-2-0" className="mb-14" aria-labelledby="budgets-heading">
        <div style={panel} className="p-6 sm:p-8">
          <div id="budgets-heading">
            {sectionHead("02", "Monthly budgets", "Period 2026-11")}
          </div>

          {rows.length === 0 ? (
            <div className="pt-6">
              <Empty
                title="No categories to budget yet"
                description="Add a category below and it will appear here, ready for a monthly limit."
              />
            </div>
          ) : (
            <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <Table className="w-full min-w-[680px]" style={{ ...mono, borderCollapse: "collapse" }}>
                <caption className="sr-only">
                  Monthly budget per category for November 2026, in US dollars
                </caption>
                <THead>
                  <TR style={{ borderBottom: "3px solid " + ink }}>
                    <TH
                      data-wf="i-2-0-0"
                      scope="col"
                      className="py-3 pr-4 text-left text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: neutral }}
                    >
                      Category
                    </TH>
                    <TH
                      data-wf="i-2-0-1"
                      scope="col"
                      className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: neutral }}
                    >
                      Monthly limit
                    </TH>
                    <TH
                      data-wf="i-2-0-2"
                      scope="col"
                      className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: neutral }}
                    >
                      Spent
                    </TH>
                    <TH
                      data-wf="i-2-0-3"
                      scope="col"
                      className="py-3 px-4 text-right text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: neutral }}
                    >
                      Remaining
                    </TH>
                    <TH
                      data-wf="i-2-0-4"
                      scope="col"
                      className="py-3 pl-4 text-left text-[11px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: neutral }}
                    >
                      Status
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {rows.map((r) => (
                    <TR
                      key={r.id}
                      className={"bq-row" + (freshIds.includes(r.id) ? " bq-in" : "")}
                      style={{ borderBottom: "1px solid rgba(10,10,10,.18)" }}
                    >
                      <TD className="py-5 pr-4 align-top">
                        <div className="text-[15px] font-bold" style={{ color: ink }}>
                          {r.name}
                        </div>
                        <div
                          className="mt-2 h-2 w-32"
                          aria-hidden="true"
                          style={{ border: "2px solid " + (r.limit == null ? neutral : ink) }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width:
                                r.limit != null && r.limit > 0
                                  ? Math.min(100, (r.used / r.limit) * 100) + "%"
                                  : "0%",
                              backgroundColor: ink,
                            }}
                          />
                        </div>
                        <div className="mt-2 text-[11px] uppercase tracking-[0.16em]" style={{ color: neutral }}>
                          {r.is_default ? "Default" : "Custom"}
                        </div>
                      </TD>
                      <TD className="py-5 px-4 text-right align-top text-[15px]">
                        {r.limit != null ? money(r.limit) : <span style={{ color: neutral }}>—</span>}
                      </TD>
                      <TD className="py-5 px-4 text-right align-top text-[15px]">{money(r.used)}</TD>
                      <TD className="py-5 px-4 text-right align-top text-[15px] font-bold">
                        {r.remaining != null ? (
                          <span>
                            {money(r.remaining)}
                            {r.remaining < 0 ? (
                              <span className="block text-[11px] font-normal uppercase tracking-[0.14em]" style={{ color: neutral }}>
                                over
                              </span>
                            ) : null}
                          </span>
                        ) : (
                          <span style={{ color: neutral }}>—</span>
                        )}
                      </TD>
                      <TD className="py-5 pl-4 align-top">{statusCell(r.status, r.pct)}</TD>
                    </TR>
                  ))}
                  <TR style={{ borderTop: "3px solid " + ink }}>
                    <TD className="py-4 pr-4 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: neutral }}>
                      Totals · budgeted only
                    </TD>
                    <TD className="py-4 px-4 text-right text-[15px] font-bold">{money(totals.limit)}</TD>
                    <TD className="py-4 px-4 text-right text-[15px] font-bold">{money(totals.used)}</TD>
                    <TD className="py-4 px-4 text-right text-[15px] font-bold">{money(totals.remaining)}</TD>
                    <TD className="py-4 pl-4 text-[11px] uppercase tracking-[0.16em]" style={{ color: neutral }}>
                      {CURRENCY}
                    </TD>
                  </TR>
                </TBody>
              </Table>
            </div>
          )}
        </div>
      </section>

      {/* ── b-3-0 / b-3-1 set monthly limit ──────────────────────────── */}
      <section className="mb-10" aria-labelledby="limit-heading">
        <div style={panel} className="p-6 sm:p-8">
          <div id="limit-heading">{sectionHead("03", "Set monthly limit", "PUT /budgets/{category_id}")}</div>

          <form onSubmit={submitLimit} className="mt-6 grid grid-cols-12 gap-6">
            <div data-wf="b-3-0" className="col-span-12 grid gap-6 sm:grid-cols-2 md:col-span-8">
              <div>
                <Label
                  htmlFor="limit-category"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: neutral, fontFamily: body }}
                >
                  Category
                </Label>
                <Select
                  id="limit-category"
                  data-wf="i-3-0-0"
                  value={limitCat}
                  onChange={(e) => onPickCategory(e.target.value)}
                  className="bq-focus w-full px-3 py-3 text-[15px]"
                  style={field}
                  aria-describedby="limit-help"
                >
                  <option value="">Choose a category…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                      {budgets[c.id] != null ? " — now " + money(budgets[c.id]) : " — no limit"}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="limit-amount"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: neutral, fontFamily: body }}
                >
                  Monthly limit ({CURRENCY})
                </Label>
                <Input
                  id="limit-amount"
                  data-wf="i-3-0-1"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="300.00"
                  value={limitAmount}
                  onChange={(e) => {
                    setLimitAmount(e.target.value);
                    setLimitError("");
                  }}
                  className="bq-focus w-full px-3 py-3 text-[15px]"
                  style={{ ...field, fontVariantNumeric: "tabular-nums" }}
                  aria-invalid={limitError ? "true" : undefined}
                  aria-describedby="limit-help"
                />
              </div>
            </div>

            <div className="col-span-12 flex items-end md:col-span-4">
              <Button
                type="submit"
                data-wf="b-3-1"
                disabled={savingLimit}
                className="bq-btn bq-focus w-full px-6 py-4 text-[13px] font-bold uppercase tracking-[0.2em]"
                style={{
                  backgroundColor: savingLimit ? neutral : accent,
                  color: "#ffffff",
                  border: "3px solid " + ink,
                  borderRadius: 0,
                  boxShadow: "4px 4px 0 " + ink,
                  fontFamily: body,
                  minHeight: "56px",
                  cursor: savingLimit ? "progress" : "pointer",
                }}
              >
                {savingLimit ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="bq-pulse inline-block h-3 w-3" style={{ backgroundColor: "#fff" }} aria-hidden="true" />
                    Saving limit…
                  </span>
                ) : (
                  "Save limit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* ── b-4-0 limit helper / validation ──────────────────────────── */}
      <div data-wf="b-4-0" id="limit-help" aria-live="polite" className="mb-14">
        {limitError ? (
          <p
            className="flex items-start gap-3 border-[3px] px-4 py-3 text-sm leading-relaxed"
            style={{ ...mono, borderColor: ink, backgroundColor: "#ffffff", color: ink, maxWidth: "70ch" }}
          >
            <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{limitError}</span>
          </p>
        ) : limitSaved ? (
          <p
            className="bq-in flex items-start gap-3 border-[3px] px-4 py-3 text-sm leading-relaxed"
            style={{ ...mono, borderColor: ink, backgroundColor: ink, color: paper, maxWidth: "70ch" }}
          >
            <Icons.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{limitSaved}</span>
          </p>
        ) : (
          <p className="text-sm leading-relaxed" style={{ ...mono, color: neutral, maxWidth: "70ch" }}>
            Monthly limit must be a positive amount, for example 300.00. Limits reset each calendar month;
            spending starts again at zero on 1 December.
          </p>
        )}
      </div>

      {/* ── b-5-0 / b-5-1 add category ───────────────────────────────── */}
      <section className="mb-10" aria-labelledby="add-cat-heading">
        <div style={panel} className="p-6 sm:p-8">
          <div id="add-cat-heading">{sectionHead("04", "Add category", "POST /categories")}</div>

          <form onSubmit={submitCategory} className="mt-6 grid grid-cols-12 gap-6">
            <div data-wf="b-5-0" className="col-span-12 md:col-span-8">
              <Label
                htmlFor="new-category"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: neutral, fontFamily: body }}
              >
                Category name
              </Label>
              <Input
                id="new-category"
                data-wf="i-5-0-0"
                autoComplete="off"
                placeholder="Bike repairs"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setCatError("");
                }}
                className="bq-focus w-full px-3 py-3 text-[15px]"
                style={field}
                aria-invalid={catError ? "true" : undefined}
                aria-describedby="category-help"
              />
            </div>

            <div className="col-span-12 flex items-end md:col-span-4">
              <Button
                type="submit"
                data-wf="b-5-1"
                className="bq-btn bq-focus inline-flex w-full items-center justify-center gap-2 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.2em]"
                style={{
                  backgroundColor: "#ffffff",
                  color: ink,
                  border: "3px solid " + ink,
                  borderRadius: 0,
                  boxShadow: "4px 4px 0 " + ink,
                  fontFamily: body,
                  minHeight: "56px",
                }}
              >
                <Icons.Plus className="h-4 w-4" aria-hidden="true" />
                Add category
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* ── b-6-0 your categories ────────────────────────────────────── */}
      <section data-wf="b-6-0" className="mb-10" aria-labelledby="cats-heading">
        <div style={panel} className="p-6 sm:p-8">
          <div id="cats-heading">
            {sectionHead("05", "Your categories", categories.length + " total")}
          </div>

          {categories.length === 0 ? (
            <div className="pt-6">
              <Empty
                title="Your category list is empty"
                description="Add your first category above — something like Groceries or Transport — and it will be ready for expenses and budgets."
              />
            </div>
          ) : (
            <ul className="pt-2">
              {categories.map((c, i) => {
                const editing = renameId === c.id;
                return (
                  <li
                    key={c.id}
                    className={(freshIds.includes(c.id) ? "bq-in " : "") + "border-b py-4 last:border-b-0"}
                    style={{ borderColor: "rgba(10,10,10,.18)" }}
                  >
                    {editing ? (
                      <div
                        className="flex flex-col gap-3 sm:flex-row sm:items-end"
                        onKeyDown={(e) => {
                          if (e.key === "Escape") cancelRename();
                        }}
                      >
                        <div className="flex-1">
                          <Label
                            htmlFor={"rename-" + c.id}
                            className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em]"
                            style={{ color: neutral, fontFamily: body }}
                          >
                            Rename “{c.name}”
                          </Label>
                          <Input
                            id={"rename-" + c.id}
                            autoFocus
                            autoComplete="off"
                            value={renameValue}
                            onChange={(e) => {
                              setRenameValue(e.target.value);
                              setRenameError("");
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                saveRename(c.id);
                              }
                            }}
                            className="bq-focus w-full px-3 py-3 text-[15px]"
                            style={field}
                            aria-invalid={renameError ? "true" : undefined}
                            aria-describedby={renameError ? "rename-error-" + c.id : undefined}
                          />
                          {renameError ? (
                            <p
                              id={"rename-error-" + c.id}
                              className="mt-2 flex items-center gap-2 text-[13px]"
                              style={{ ...mono, color: ink }}
                            >
                              <Icons.AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                              {renameError}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            onClick={() => saveRename(c.id)}
                            className="bq-btn bq-focus inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.16em]"
                            style={{
                              backgroundColor: ink,
                              color: paper,
                              border: "3px solid " + ink,
                              borderRadius: 0,
                              fontFamily: body,
                              minHeight: "44px",
                            }}
                          >
                            <Icons.Check className="h-4 w-4" aria-hidden="true" />
                            Save name
                          </Button>
                          <Button
                            type="button"
                            onClick={cancelRename}
                            className="bq-btn bq-focus inline-flex items-center gap-2 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.16em]"
                            style={{
                              backgroundColor: "transparent",
                              color: ink,
                              border: "3px solid " + ink,
                              borderRadius: 0,
                              fontFamily: body,
                              minHeight: "44px",
                            }}
                          >
                            <Icons.X className="h-4 w-4" aria-hidden="true" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                        <div className="flex min-w-0 items-baseline gap-3">
                          <span
                            className="text-[11px] tracking-[0.2em]"
                            style={{ ...mono, color: neutral }}
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="truncate text-[16px] font-bold" style={{ ...mono, color: ink }}>
                            {c.name}
                          </span>
                          <span
                            className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                            style={{
                              ...mono,
                              color: c.is_default ? neutral : ink,
                              border: "1px solid " + (c.is_default ? neutral : ink),
                            }}
                          >
                            {c.is_default ? "Default" : "Custom"}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[12px]" style={{ ...mono, color: neutral }}>
                            {budgets[c.id] != null
                              ? "Limit " + money(budgets[c.id])
                              : "No limit set"}
                          </span>
                          <Button
                            type="button"
                            data-wf={"i-6-0-" + i}
                            onClick={() => startRename(c)}
                            className="bq-focus inline-flex items-center gap-2 px-3 py-2 text-[12px] font-bold uppercase tracking-[0.16em] underline underline-offset-4"
                            style={{
                              backgroundColor: "transparent",
                              color: ink,
                              border: "none",
                              borderRadius: 0,
                              fontFamily: body,
                              minHeight: "44px",
                            }}
                          >
                            <Icons.Edit className="h-4 w-4" aria-hidden="true" />
                            Rename
                            <span className="sr-only"> {c.name}</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {/* ── b-7-0 category helper / validation ───────────────────────── */}
      <div data-wf="b-7-0" id="category-help" aria-live="polite" className="mb-14">
        {catError ? (
          <p
            className="flex items-start gap-3 border-[3px] px-4 py-3 text-sm leading-relaxed"
            style={{ ...mono, borderColor: ink, backgroundColor: "#ffffff", color: ink, maxWidth: "70ch" }}
          >
            <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{catError}</span>
          </p>
        ) : catSaved ? (
          <p
            className="bq-in flex items-start gap-3 border-[3px] px-4 py-3 text-sm leading-relaxed"
            style={{ ...mono, borderColor: ink, backgroundColor: ink, color: paper, maxWidth: "70ch" }}
          >
            <Icons.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{catSaved}</span>
          </p>
        ) : (
          <p className="text-sm leading-relaxed" style={{ ...mono, color: neutral, maxWidth: "70ch" }}>
            Category name cannot be empty or match an existing category. Renaming updates the name
            everywhere — past expenses, budgets and reports.
          </p>
        )}
      </div>

      {/* ── b-8-0 reports link ───────────────────────────────────────── */}
      <div className="border-t-[3px] pt-6" style={{ borderColor: ink }}>
        <button
          type="button"
          data-wf="b-8-0"
          onClick={() => navigate("reports")}
          className="bq-focus inline-flex items-center gap-3 text-[15px] font-bold uppercase tracking-[0.16em] underline underline-offset-[6px]"
          style={{ ...mono, color: ink, minHeight: "44px" }}
        >
          View full spending reports
          <Icons.ArrowRight className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
