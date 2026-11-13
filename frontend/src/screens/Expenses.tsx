// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Plus, X, ChevronRight, Clock, Trash, Edit, Filter, Download, AlertCircle, CheckCircle } = Icons;

const CATEGORIES = [
  { id: "cat-01", name: "Groceries", is_default: true },
  { id: "cat-02", name: "Rent & Housing", is_default: true },
  { id: "cat-03", name: "Transport", is_default: true },
  { id: "cat-04", name: "Dining Out", is_default: true },
  { id: "cat-05", name: "Utilities", is_default: true },
  { id: "cat-06", name: "Health", is_default: true },
  { id: "cat-07", name: "Entertainment", is_default: true },
  { id: "cat-08", name: "Shopping", is_default: true },
  { id: "cat-09", name: "Coffee & Pastry", is_default: false },
  { id: "cat-10", name: "Bike Maintenance", is_default: false },
];

const INITIAL_EXPENSES = [
  { id: "exp-1041", category_id: "cat-01", amount: 86.42, spent_on: "2026-11-13", note: "Weekly shop — Fairway Market" },
  { id: "exp-1040", category_id: "cat-09", amount: 6.25, spent_on: "2026-11-13", note: "Cortado, Caffe Reggio" },
  { id: "exp-1039", category_id: "cat-03", amount: 34.0, spent_on: "2026-11-12", note: "Metro card top-up" },
  { id: "exp-1038", category_id: "cat-04", amount: 58.9, spent_on: "2026-11-11", note: "Dinner with Priya — Mezze Bar" },
  { id: "exp-1037", category_id: "cat-05", amount: 112.35, spent_on: "2026-11-10", note: "Con Edison — October statement" },
  { id: "exp-1036", category_id: "cat-06", amount: 25.0, spent_on: "2026-11-09", note: "Pharmacy — allergy refill" },
  { id: "exp-1035", category_id: "cat-07", amount: 19.99, spent_on: "2026-11-08", note: "Film tickets, Angelika" },
  { id: "exp-1034", category_id: "cat-10", amount: 48.6, spent_on: "2026-11-07", note: "Brake pads + tune-up" },
  { id: "exp-1033", category_id: "cat-01", amount: 41.18, spent_on: "2026-11-06", note: "" },
  { id: "exp-1032", category_id: "cat-08", amount: 129.0, spent_on: "2026-11-05", note: "Winter boots" },
  { id: "exp-1031", category_id: "cat-02", amount: 1850.0, spent_on: "2026-11-03", note: "November rent" },
  { id: "exp-1030", category_id: "cat-03", amount: 12.75, spent_on: "2026-11-02", note: "Airport bus, LGA" },
  { id: "exp-1029", category_id: "cat-09", amount: 4.5, spent_on: "2026-11-01", note: "" },
  { id: "exp-1028", category_id: "cat-04", amount: 23.4, spent_on: "2026-11-01", note: "Lunch — Hanoi House" },
  { id: "exp-1027", category_id: "cat-01", amount: 94.07, spent_on: "2026-10-30", note: "Weekly shop + candy" },
  { id: "exp-1026", category_id: "cat-05", amount: 98.12, spent_on: "2026-10-28", note: "Con Edison — September statement" },
  { id: "exp-1025", category_id: "cat-07", amount: 64.0, spent_on: "2026-10-24", note: "Concert, Bowery Ballroom" },
  { id: "exp-1024", category_id: "cat-02", amount: 1850.0, spent_on: "2026-10-18", note: "October rent" },
  { id: "exp-1023", category_id: "cat-06", amount: 180.0, spent_on: "2026-10-11", note: "Dentist co-pay" },
  { id: "exp-1022", category_id: "cat-01", amount: 77.55, spent_on: "2026-09-29", note: "" },
  { id: "exp-1021", category_id: "cat-03", amount: 310.0, spent_on: "2026-09-20", note: "Train, NYC → Boston return" },
  { id: "exp-1020", category_id: "cat-08", amount: 52.3, spent_on: "2026-09-14", note: "Desk lamp" },
];

const MONTH_OPTIONS = [
  { key: "2026-11", label: "November 2026" },
  { key: "2026-10", label: "October 2026" },
  { key: "2026-09", label: "September 2026" },
  { key: "all", label: "All months" },
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TODAY = "2026-11-14";

const money = (n) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatDate = (iso) => {
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTH_NAMES[Number(m) - 1]} ${y}`;
};

const tint = (hex, alpha) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const paper = brand.backgroundColor;
  const accent = brand.accentColor;
  const muted = brand.neutralColor;

  const [expenses, setExpenses] = React.useState(INITIAL_EXPENSES);
  const [form, setForm] = React.useState({ amount: "", category_id: "", spent_on: TODAY, note: "" });
  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);
  const [pendingSave, setPendingSave] = React.useState(null);
  const [flash, setFlash] = React.useState(null);
  const [month, setMonth] = React.useState("2026-11");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [pendingDelete, setPendingDelete] = React.useState(null);
  const [exportState, setExportState] = React.useState("idle");

  const amountRef = React.useRef(null);
  const dialogRef = React.useRef(null);
  const cancelRef = React.useRef(null);
  const deleteTriggerRef = React.useRef(null);

  // Commit a validated save after a short write delay so the button shows its loading state.
  React.useEffect(() => {
    if (!pendingSave) return undefined;
    const t = setTimeout(() => {
      const categoryName = CATEGORIES.find((c) => c.id === pendingSave.category_id).name;
      setExpenses((prev) => {
        if (pendingSave.id) {
          return prev.map((e) => (e.id === pendingSave.id ? { ...e, ...pendingSave } : e));
        }
        return [{ ...pendingSave, id: `exp-${1042 + prev.length - INITIAL_EXPENSES.length}` }, ...prev];
      });
      setFlash({
        kind: pendingSave.id ? "updated" : "created",
        text: `${pendingSave.id ? "Updated" : "Logged"} ${money(pendingSave.amount)} · ${categoryName} · ${formatDate(pendingSave.spent_on)}`,
      });
      setForm({ amount: "", category_id: "", spent_on: TODAY, note: "" });
      setEditingId(null);
      setMonth(pendingSave.spent_on.slice(0, 7));
      setPendingSave(null);
    }, 450);
    return () => clearTimeout(t);
  }, [pendingSave]);

  React.useEffect(() => {
    if (exportState !== "working") return undefined;
    const t = setTimeout(() => setExportState("done"), 900);
    return () => clearTimeout(t);
  }, [exportState]);

  React.useEffect(() => {
    if (pendingDelete && cancelRef.current) cancelRef.current.focus();
  }, [pendingDelete]);

  const categoryName = (id) => {
    const c = CATEGORIES.find((x) => x.id === id);
    return c ? c.name : "Uncategorised";
  };

  const sorted = React.useMemo(
    () => [...expenses].sort((a, b) => (a.spent_on < b.spent_on ? 1 : a.spent_on > b.spent_on ? -1 : a.id < b.id ? 1 : -1)),
    [expenses]
  );

  const visible = sorted.filter(
    (e) =>
      (month === "all" || e.spent_on.slice(0, 7) === month) &&
      (categoryFilter === "all" || e.category_id === categoryFilter)
  );

  const visibleTotal = visible.reduce((sum, e) => sum + e.amount, 0);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (pendingSave) return;
    const next = {};
    const amount = Number(form.amount);
    if (form.amount.trim() === "") next.amount = "Enter the amount you spent.";
    else if (Number.isNaN(amount)) next.amount = "Use digits only, e.g. 24.90.";
    else if (amount <= 0) next.amount = "Amount must be greater than 0.";
    else if (amount > 99999.99) next.amount = "Single entries cap at 99,999.99 — split it into two.";
    if (!form.category_id) next.category_id = "Pick a category for this expense.";
    if (!form.spent_on) next.spent_on = "Set the date you spent it.";
    else if (form.spent_on > TODAY) next.spent_on = "Dates in the future can't be logged yet.";

    setErrors(next);
    const count = Object.keys(next).length;
    if (count > 0) {
      setFlash(null);
      setFormError(
        count === 1
          ? "One field needs fixing before this entry can be saved. Your values are kept."
          : `${count} fields need fixing before this entry can be saved. Your values are kept.`
      );
      return;
    }
    setFormError("");
    setFlash(null);
    setPendingSave({
      id: editingId,
      category_id: form.category_id,
      amount: Math.round(amount * 100) / 100,
      spent_on: form.spent_on,
      note: form.note.trim(),
      currency: "USD",
    });
  }

  function startEdit(expense) {
    setEditingId(expense.id);
    setForm({
      amount: expense.amount.toFixed(2),
      category_id: expense.category_id,
      spent_on: expense.spent_on,
      note: expense.note || "",
    });
    setErrors({});
    setFormError("");
    setFlash(null);
    if (amountRef.current) amountRef.current.focus();
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ amount: "", category_id: "", spent_on: TODAY, note: "" });
    setErrors({});
    setFormError("");
  }

  function confirmDelete() {
    const target = pendingDelete;
    setExpenses((prev) => prev.filter((e) => e.id !== target.id));
    if (editingId === target.id) cancelEdit();
    setPendingDelete(null);
    setFlash({
      kind: "deleted",
      text: `Deleted ${money(target.amount)} · ${categoryName(target.category_id)} · ${formatDate(target.spent_on)}. It no longer counts toward budgets or reports.`,
    });
    if (deleteTriggerRef.current && document.body.contains(deleteTriggerRef.current)) {
      deleteTriggerRef.current.focus();
    } else if (amountRef.current) {
      amountRef.current.focus();
    }
  }

  function closeDialog() {
    setPendingDelete(null);
    if (deleteTriggerRef.current) deleteTriggerRef.current.focus();
  }

  function onDialogKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeDialog();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll("button, [href], input, select, textarea");
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const block = {
    border: `3px solid ${ink}`,
    boxShadow: `6px 6px 0 ${ink}`,
    borderRadius: 0,
    backgroundColor: paper,
  };
  const fieldStyle = {
    border: `3px solid ${ink}`,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    color: ink,
    fontFamily: brand.fontBody,
    fontVariantNumeric: "tabular-nums",
    height: 48,
  };
  const labelStyle = {
    fontFamily: brand.fontBody,
    color: ink,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontSize: 11,
    fontWeight: 700,
  };
  const headingStyle = { fontFamily: brand.fontHeading, color: ink };
  const monoLabel = "text-[11px] font-bold uppercase tracking-[0.18em]";

  const SectionMark = ({ num, children, id }) => (
    <div className="flex items-baseline gap-3">
      <span className={monoLabel} style={{ fontFamily: brand.fontBody, color: accent }}>
        {num}
      </span>
      <h2 className="text-2xl md:text-3xl leading-none" style={headingStyle} id={id}>
        {children}
      </h2>
    </div>
  );

  return (
    <div
      className="w-full min-h-full px-4 sm:px-6 lg:px-10 py-8"
      style={{ backgroundColor: paper, fontFamily: brand.fontBody, color: ink }}
    >
      <style>{`
        .bs-focus:focus-visible { outline: 3px solid ${accent}; outline-offset: 2px; }
        .bs-press { transition: transform 120ms ease, box-shadow 120ms ease; }
        .bs-press:hover { transform: translate(3px, 3px); box-shadow: 3px 3px 0 ${ink} !important; }
        .bs-press:active { transform: translate(6px, 6px); box-shadow: 0 0 0 ${ink} !important; }
        .bs-row { animation: bs-enter 260ms ease-out both; }
        .bs-panel { animation: bs-enter 180ms ease-out both; }
        .bs-sheet { animation: bs-sheet 200ms ease-out both; }
        @keyframes bs-enter { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        @keyframes bs-sheet { from { opacity: 0; transform: translate(-10px, -10px); } to { opacity: 1; transform: none; } }
        .bs-ledger tbody tr:hover { background-color: ${tint(accent, 0.06)}; }
        @media (prefers-reduced-motion: reduce) {
          .bs-row, .bs-panel, .bs-sheet { animation: none !important; }
          .bs-press { transition: none !important; }
          .bs-press:hover, .bs-press:active { transform: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        {/* ROW 1 — title + export */}
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8" data-wf="b-0-0">
            <p className={monoLabel} style={{ color: muted }}>
              Ledger · USD · satya.ganaraju@quorq.ai
            </p>
            <h1
              className="mt-2 text-5xl sm:text-6xl md:text-7xl leading-[0.88] tracking-tight"
              style={headingStyle}
            >
              Expenses
            </h1>
            <p className="mt-3 text-sm leading-relaxed max-w-[62ch]" style={{ color: muted }}>
              {expenses.length} entries on record. Every amount here is logged by hand, in US dollars.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:justify-end" data-wf="b-0-1">
            <div className="w-full md:w-auto">
              <Button
                type="button"
                className="bs-focus bs-press w-full md:w-auto h-12 px-6 text-xs font-bold uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2"
                style={{
                  backgroundColor: paper,
                  color: ink,
                  border: `3px solid ${ink}`,
                  boxShadow: `6px 6px 0 ${ink}`,
                  borderRadius: 0,
                  fontFamily: brand.fontBody,
                }}
                onClick={() => setExportState("working")}
                disabled={exportState === "working"}
                aria-live="off"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {exportState === "working" ? "Preparing CSV…" : "Export CSV"}
              </Button>
              <p className="mt-3 text-[11px] leading-snug md:text-right" style={{ color: muted }} aria-live="polite">
                {exportState === "working" && "Writing amount, category, date and note…"}
                {exportState === "done" &&
                  (expenses.length === 0
                    ? "expenses-2026-11-14.csv ready — headers only, no entries yet."
                    : `expenses-2026-11-14.csv ready — ${expenses.length} rows.`)}
                {exportState === "idle" && "One row per expense: amount, category, date, note."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8" style={{ borderTop: `3px solid ${ink}` }} />

        {/* ROWS 2 + 3 — add / edit expense */}
        <form onSubmit={handleSubmit} noValidate className="mt-8">
          <section
            className="p-6 sm:p-8"
            style={block}
            data-wf="b-1-0"
            aria-labelledby="add-expense-heading"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SectionMark num="01" id="add-expense-heading">
                {editingId ? "Edit expense" : "Add expense"}
              </SectionMark>
              {editingId && (
                <div className="flex items-center gap-3">
                  <Badge
                    className="text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      backgroundColor: accent,
                      color: "#ffffff",
                      borderRadius: 0,
                      border: `3px solid ${ink}`,
                      fontFamily: brand.fontBody,
                    }}
                  >
                    Editing {editingId}
                  </Badge>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bs-focus text-[11px] font-bold uppercase tracking-[0.14em] underline underline-offset-4"
                    style={{ color: muted }}
                  >
                    Discard changes
                  </button>
                </div>
              )}
            </div>

            <div className="mt-7 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Label htmlFor="amount" style={labelStyle}>
                  Amount (USD)
                </Label>
                <div className="mt-2 flex items-stretch">
                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center px-3 text-base font-bold"
                    style={{
                      border: `3px solid ${ink}`,
                      borderRight: "none",
                      backgroundColor: ink,
                      color: paper,
                      height: 48,
                    }}
                  >
                    $
                  </span>
                  <Input
                    id="amount"
                    data-wf="i-1-0-0"
                    ref={amountRef}
                    inputMode="decimal"
                    placeholder="0.00"
                    className="bs-focus w-full text-base font-bold"
                    style={{ ...fieldStyle, borderLeft: "none" }}
                    value={form.amount}
                    onChange={(e) => update("amount", e.target.value)}
                    aria-invalid={errors.amount ? "true" : undefined}
                    aria-describedby={errors.amount ? "amount-error" : undefined}
                  />
                </div>
                {errors.amount && (
                  <p id="amount-error" className="bs-panel mt-2 text-[12px] font-bold" style={{ color: accent }}>
                    {errors.amount}
                  </p>
                )}
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <Label htmlFor="category" style={labelStyle}>
                  Category
                </Label>
                <Select
                  id="category"
                  data-wf="i-1-0-1"
                  className="bs-focus mt-2 w-full text-sm"
                  style={fieldStyle}
                  value={form.category_id}
                  onChange={(e) => update("category_id", e.target.value)}
                  aria-invalid={errors.category_id ? "true" : undefined}
                  aria-describedby={errors.category_id ? "category-error" : "category-hint"}
                >
                  <option value="">Choose a category…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                      {c.is_default ? "" : " (custom)"}
                    </option>
                  ))}
                </Select>
                {errors.category_id ? (
                  <p id="category-error" className="bs-panel mt-2 text-[12px] font-bold" style={{ color: accent }}>
                    {errors.category_id}
                  </p>
                ) : (
                  <p id="category-hint" className="mt-2 text-[11px]" style={{ color: muted }}>
                    8 default + 2 of your own.
                  </p>
                )}
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-2">
                <Label htmlFor="spent_on" style={labelStyle}>
                  Date
                </Label>
                <Input
                  id="spent_on"
                  data-wf="i-1-0-2"
                  type="date"
                  max={TODAY}
                  className="bs-focus mt-2 w-full text-sm"
                  style={fieldStyle}
                  value={form.spent_on}
                  onChange={(e) => update("spent_on", e.target.value)}
                  aria-invalid={errors.spent_on ? "true" : undefined}
                  aria-describedby={errors.spent_on ? "date-error" : undefined}
                />
                {errors.spent_on && (
                  <p id="date-error" className="bs-panel mt-2 text-[12px] font-bold" style={{ color: accent }}>
                    {errors.spent_on}
                  </p>
                )}
              </div>

              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <Label htmlFor="note" style={labelStyle}>
                  Note (optional)
                </Label>
                <Input
                  id="note"
                  data-wf="i-1-0-3"
                  className="bs-focus mt-2 w-full text-sm"
                  style={fieldStyle}
                  placeholder="What was it for?"
                  maxLength={120}
                  value={form.note}
                  onChange={(e) => update("note", e.target.value)}
                />
                <p className="mt-2 text-[11px]" style={{ color: muted }}>
                  {120 - form.note.length} characters left.
                </p>
              </div>
            </div>
          </section>

          {/* ROW 3 — guidance + primary action */}
          <div className="mt-6 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8" data-wf="b-2-0">
              {formError ? (
                <div
                  className="bs-panel flex items-start gap-3 p-4"
                  role="alert"
                  style={{ border: `3px solid ${ink}`, backgroundColor: tint(accent, 0.1) }}
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                  <p className="text-sm font-bold leading-relaxed" style={{ color: ink }}>
                    {formError}
                  </p>
                </div>
              ) : flash ? (
                <div
                  className="bs-panel flex items-start gap-3 p-4"
                  role="status"
                  style={{ border: `3px solid ${ink}`, backgroundColor: "#ffffff" }}
                >
                  {flash.kind === "deleted" ? (
                    <Trash className="mt-0.5 h-5 w-5 shrink-0" style={{ color: ink }} aria-hidden="true" />
                  ) : (
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                  )}
                  <p className="text-sm leading-relaxed" style={{ color: ink }}>
                    <span className={monoLabel} style={{ color: accent }}>
                      {flash.kind} ·{" "}
                    </span>
                    {flash.text}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFlash(null)}
                    aria-label="Dismiss this confirmation"
                    className="bs-focus ml-auto shrink-0"
                    style={{ color: muted }}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <p className="text-sm leading-relaxed max-w-[68ch]" style={{ color: muted }}>
                  Amount must be greater than 0. Category and date are required.
                </p>
              )}
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end" data-wf="b-2-1">
              <Button
                type="submit"
                disabled={!!pendingSave}
                className="bs-focus bs-press w-full md:w-auto h-14 px-8 text-sm font-bold uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2"
                style={{
                  backgroundColor: pendingSave ? muted : accent,
                  color: "#ffffff",
                  border: `3px solid ${ink}`,
                  boxShadow: `6px 6px 0 ${ink}`,
                  borderRadius: 0,
                  fontFamily: brand.fontBody,
                }}
              >
                {pendingSave ? (
                  <>
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Save expense
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-10" style={{ borderTop: `3px dashed ${tint(ink, 0.5)}` }} />

        {/* ROW 4 — filter bar */}
        <section className="mt-8" data-wf="b-3-0" aria-label="Filter logged expenses">
          <div
            className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:gap-8"
            style={{ border: `3px solid ${ink}`, backgroundColor: "#ffffff" }}
          >
            <div className="sm:w-56">
              <Label htmlFor="month-filter" style={labelStyle}>
                Month
              </Label>
              <Select
                id="month-filter"
                data-wf="i-3-0-0"
                className="bs-focus mt-2 w-full text-sm"
                style={{ ...fieldStyle, backgroundColor: paper }}
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {MONTH_OPTIONS.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </Select>
            </div>
            <div className="sm:w-64">
              <Label htmlFor="category-filter" className="inline-flex items-center gap-2" style={labelStyle}>
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                Category
              </Label>
              <Select
                id="category-filter"
                data-wf="i-3-0-1"
                className="bs-focus mt-2 w-full text-sm"
                style={{ ...fieldStyle, backgroundColor: paper }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </div>
            <p className="text-[11px] sm:ml-auto sm:text-right sm:pb-3 inline-flex items-center gap-2" style={{ color: muted }}>
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Saved copy · last synced 14 Nov 2026, 09:12
            </p>
          </div>
        </section>

        {/* ROW 5 — ledger table */}
        <section className="mt-8" aria-labelledby="ledger-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionMark num="02" id="ledger-heading">
              Logged expenses
              <span className="block text-sm font-normal tracking-normal mt-1" style={{ fontFamily: brand.fontBody, color: muted }}>
                most recent first
              </span>
            </SectionMark>
            <p className="text-sm" style={{ color: ink, fontVariantNumeric: "tabular-nums" }}>
              <span className={monoLabel} style={{ color: muted }}>
                Showing{" "}
              </span>
              <span className="font-bold">{visible.length}</span>
              <span style={{ color: muted }}> of {expenses.length} · </span>
              <span className="font-bold">{money(visibleTotal)}</span>
            </p>
          </div>

          {visible.length > 0 ? (
            <div className="mt-5 overflow-x-auto" style={block} data-wf="b-4-0">
              <Table
                className="bs-ledger w-full border-collapse text-sm"
                style={{ fontVariantNumeric: "tabular-nums", fontFamily: brand.fontBody }}
              >
                <caption className="sr-only">
                  Logged expenses, most recent first, with amount, category, date and note.
                </caption>
                <THead>
                  <TR style={{ backgroundColor: ink }}>
                    <TH
                      data-wf="i-4-0-0"
                      scope="col"
                      className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                      style={{ color: paper }}
                    >
                      Date
                    </TH>
                    <TH
                      data-wf="i-4-0-1"
                      scope="col"
                      className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                      style={{ color: paper }}
                    >
                      Category
                    </TH>
                    <TH
                      data-wf="i-4-0-2"
                      scope="col"
                      className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                      style={{ color: paper }}
                    >
                      Amount
                    </TH>
                    <TH
                      data-wf="i-4-0-3"
                      scope="col"
                      className="hidden px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.18em] md:table-cell"
                      style={{ color: paper }}
                    >
                      Note
                    </TH>
                    <TH
                      data-wf="i-4-0-4"
                      scope="col"
                      className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                      style={{ color: paper }}
                    >
                      Edit / Delete
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {visible.map((e) => {
                    const isEditing = editingId === e.id;
                    return (
                      <TR
                        key={e.id}
                        className="bs-row align-top"
                        style={{
                          borderTop: `1px solid ${tint(ink, 0.15)}`,
                          backgroundColor: isEditing ? tint(accent, 0.08) : "transparent",
                        }}
                      >
                        <TD className="px-5 py-4 whitespace-nowrap" style={{ color: ink }}>
                          {formatDate(e.spent_on)}
                          <span className="block text-[11px]" style={{ color: muted }}>
                            {e.id}
                          </span>
                        </TD>
                        <TD className="px-5 py-4" style={{ color: ink }}>
                          <span className="font-bold">{categoryName(e.category_id)}</span>
                          {e.note ? (
                            <span className="mt-1 block text-[12px] md:hidden" style={{ color: muted }}>
                              {e.note}
                            </span>
                          ) : null}
                          {isEditing && (
                            <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
                              Open in form above
                            </span>
                          )}
                        </TD>
                        <TD className="px-5 py-4 text-right font-bold whitespace-nowrap" style={{ color: ink }}>
                          {money(e.amount)}
                        </TD>
                        <TD className="hidden px-5 py-4 md:table-cell" style={{ color: e.note ? muted : tint(ink, 0.4) }}>
                          {e.note || "— no note —"}
                        </TD>
                        <TD className="px-5 py-4" data-wf="i-4-0-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(e)}
                              className="bs-focus inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em]"
                              style={{ border: `2px solid ${ink}`, color: ink, backgroundColor: paper }}
                            >
                              <Edit className="h-3.5 w-3.5" aria-hidden="true" />
                              Edit
                              <span className="sr-only">
                                {" "}
                                {money(e.amount)} on {formatDate(e.spent_on)}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                deleteTriggerRef.current = event.currentTarget;
                                setPendingDelete(e);
                              }}
                              className="bs-focus inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em]"
                              style={{ border: `2px solid ${ink}`, color: paper, backgroundColor: ink }}
                            >
                              <Trash className="h-3.5 w-3.5" aria-hidden="true" />
                              Delete
                              <span className="sr-only">
                                {" "}
                                {money(e.amount)} on {formatDate(e.spent_on)}
                              </span>
                            </button>
                          </div>
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            </div>
          ) : (
            /* ROW 8 — empty states */
            <div className="mt-5 p-8" style={block} data-wf="b-7-0">
              <div className="mb-6 flex gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <span
                    key={i}
                    style={{
                      display: "block",
                      width: 10,
                      height: i % 3 === 0 ? 34 : 18,
                      backgroundColor: i === 0 ? accent : tint(ink, 0.18),
                    }}
                  />
                ))}
              </div>
              {expenses.length === 0 ? (
                <Empty
                  title="No expenses logged yet"
                  description="No expenses logged yet — add your first expense using the form above. Amount, category and date are all it takes."
                />
              ) : (
                <Empty
                  title="Nothing in this slice of the ledger"
                  description={`No expenses for ${
                    MONTH_OPTIONS.find((m) => m.key === month).label
                  }${categoryFilter === "all" ? "" : ` in ${categoryName(categoryFilter)}`}. Widen the filter above, or log an entry using the form above.`}
                />
              )}
            </div>
          )}
        </section>

        {/* ROWS 6 + 7 — delete confirmation */}
        {pendingDelete && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: tint(ink, 0.6) }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeDialog();
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-title"
              aria-describedby="delete-body"
              onKeyDown={onDialogKeyDown}
              data-wf="b-5-0"
              className="bs-sheet w-full max-w-xl p-7 sm:p-9"
              style={{
                backgroundColor: paper,
                border: `3px solid ${ink}`,
                boxShadow: `10px 10px 0 ${ink}, 0 24px 48px ${tint(ink, 0.35)}`,
                borderRadius: 0,
              }}
            >
              <p className={monoLabel} style={{ color: accent }}>
                Confirm removal
              </p>
              <h2 id="delete-title" className="mt-3 text-3xl md:text-4xl leading-tight" style={headingStyle}>
                Delete this expense?
              </h2>
              <p id="delete-body" className="mt-4 text-sm leading-relaxed" style={{ color: muted }}>
                It will no longer count toward your budgets or reports.
              </p>

              <dl
                className="mt-6 text-sm"
                style={{ border: `3px solid ${ink}`, backgroundColor: "#ffffff", fontVariantNumeric: "tabular-nums" }}
              >
                <div className="flex justify-between gap-4 px-4 py-3" style={{ borderBottom: `1px solid ${tint(ink, 0.15)}` }}>
                  <dt className={monoLabel} style={{ color: muted }}>
                    Amount
                  </dt>
                  <dd className="font-bold" style={{ color: ink }}>
                    {money(pendingDelete.amount)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3" style={{ borderBottom: `1px solid ${tint(ink, 0.15)}` }}>
                  <dt className={monoLabel} style={{ color: muted }}>
                    Category
                  </dt>
                  <dd style={{ color: ink }}>{categoryName(pendingDelete.category_id)}</dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3" style={{ borderBottom: `1px solid ${tint(ink, 0.15)}` }}>
                  <dt className={monoLabel} style={{ color: muted }}>
                    Date
                  </dt>
                  <dd style={{ color: ink }}>{formatDate(pendingDelete.spent_on)}</dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className={monoLabel} style={{ color: muted }}>
                    Note
                  </dt>
                  <dd className="text-right" style={{ color: pendingDelete.note ? ink : tint(ink, 0.45) }}>
                    {pendingDelete.note || "— no note —"}
                  </dd>
                </div>
              </dl>

              <div className="mt-7 grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-6" data-wf="b-6-0">
                  <Button
                    type="button"
                    onClick={confirmDelete}
                    className="bs-focus bs-press w-full h-12 px-5 text-xs font-bold uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: ink,
                      color: paper,
                      border: `3px solid ${ink}`,
                      boxShadow: `6px 6px 0 ${accent}`,
                      borderRadius: 0,
                      fontFamily: brand.fontBody,
                    }}
                  >
                    <Trash className="h-4 w-4" aria-hidden="true" />
                    Delete expense
                  </Button>
                </div>
                <div className="col-span-12 sm:col-span-6" data-wf="b-6-1">
                  <Button
                    ref={cancelRef}
                    type="button"
                    onClick={closeDialog}
                    className="bs-focus bs-press w-full h-12 px-5 text-xs font-bold uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: paper,
                      color: ink,
                      border: `3px solid ${ink}`,
                      boxShadow: `6px 6px 0 ${ink}`,
                      borderRadius: 0,
                      fontFamily: brand.fontBody,
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              <p className="mt-5 text-[11px]" style={{ color: muted }}>
                Press Esc to keep this entry.
              </p>
            </div>
          </div>
        )}

        {/* ROW 9 — onward link */}
        <div className="mt-10 pt-6" style={{ borderTop: `3px solid ${ink}` }}>
          <button
            type="button"
            data-wf="b-8-0"
            onClick={() => navigate("reports")}
            className="bs-focus group inline-flex items-center gap-3 text-left"
            style={{ color: ink }}
          >
            <span
              className="text-lg md:text-xl underline decoration-2 underline-offset-[6px]"
              style={{ fontFamily: brand.fontHeading, textDecorationColor: accent }}
            >
              See how this month compares with previous months
            </span>
            <ChevronRight className="h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
