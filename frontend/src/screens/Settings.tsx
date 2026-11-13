// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Card, CardContent, Input, Label, Select, Checkbox, Badge, Separator } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { X, Settings, Trash, AlertCircle, CheckCircle } = Icons;

const ACCOUNT = {
  email: "alex@example.com",
  created_at: "2 Mar 2026",
  signed_in_since: "14 Nov 2026, 09:12",
  last_activity: "2 minutes ago",
  synced_at: "14 Nov 2026, 09:14",
  session_lifetime: "30 days of inactivity",
  device: "Chrome 141 · macOS · Lisbon",
  expenses_count: 318,
  budgets_count: 7,
  custom_categories_count: 4,
};

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", sample: "$1,284.50" },
  { code: "EUR", name: "Euro", symbol: "€", sample: "1.284,50 €" },
  { code: "GBP", name: "Pound Sterling", symbol: "£", sample: "£1,284.50" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", sample: "¥128,450" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$", sample: "CA$1,284.50" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", sample: "A$1,284.50" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", sample: "₹1,28,450.00" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", sample: "CHF 1’284.50" },
];

const EMAIL_SERVICE_READY = true;

function hexToRgba(hex, alpha) {
  const h = String(hex || "#000000").replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const paper = brand.backgroundColor;
  const accent = brand.accentColor;
  const neutral = brand.neutralColor;

  const mono = { fontFamily: brand.fontBody, fontVariantNumeric: "tabular-nums" };
  const serif = { fontFamily: brand.fontHeading };
  const hardShadow = { boxShadow: "6px 6px 0 " + ink };
  const smallShadow = { boxShadow: "4px 4px 0 " + ink };
  const block = { border: "3px solid " + ink, borderRadius: 0, backgroundColor: paper };
  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus:outline-2 focus:outline-offset-2";

  // ---------- saved (server) values vs. draft values ----------
  const [savedCurrency, setSavedCurrency] = React.useState("USD");
  const [savedAlerts, setSavedAlerts] = React.useState(true);
  const [currency, setCurrency] = React.useState("USD");
  const [alerts, setAlerts] = React.useState(true);

  const [saveState, setSaveState] = React.useState("idle"); // idle | saving | saved | error
  const attemptsRef = React.useRef(0);

  const [signingOut, setSigningOut] = React.useState(false);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [confirmError, setConfirmError] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  const dialogRef = React.useRef(null);
  const confirmInputRef = React.useRef(null);
  const deleteBtnRef = React.useRef(null);
  const statusRef = React.useRef(null);

  const dirty = currency !== savedCurrency || alerts !== savedAlerts;
  const active = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const savedCur = CURRENCIES.find((c) => c.code === savedCurrency) || CURRENCIES[0];

  // ---------- save (PATCH /me) ----------
  React.useEffect(() => {
    if (saveState !== "saving") return undefined;
    const t = setTimeout(() => {
      attemptsRef.current += 1;
      if (attemptsRef.current === 1) {
        setSaveState("error");
      } else {
        setSavedCurrency(currency);
        setSavedAlerts(alerts);
        setSaveState("saved");
      }
    }, 850);
    return () => clearTimeout(t);
  }, [saveState, currency, alerts]);

  React.useEffect(() => {
    if (!signingOut) return undefined;
    const t = setTimeout(() => navigate("auth"), 700);
    return () => clearTimeout(t);
  }, [signingOut]);

  React.useEffect(() => {
    if (!deleting) return undefined;
    const t = setTimeout(() => navigate("auth"), 1200);
    return () => clearTimeout(t);
  }, [deleting]);

  React.useEffect(() => {
    if (modalOpen && confirmInputRef.current) confirmInputRef.current.focus();
  }, [modalOpen]);

  const onSubmitAccount = (e) => {
    e.preventDefault();
    if (!dirty || saveState === "saving") return;
    setSaveState("saving");
  };

  const closeModal = () => {
    setModalOpen(false);
    setConfirmText("");
    setConfirmError("");
    if (deleteBtnRef.current) deleteBtnRef.current.focus();
  };

  const onDialogKeyDown = (e) => {
    if (deleting) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      closeModal();
      return;
    }
    if (e.key === "Tab" && dialogRef.current) {
      const nodes = dialogRef.current.querySelectorAll("button, input, select, textarea, a[href]");
      const list = Array.prototype.slice.call(nodes).filter((n) => !n.disabled);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const confirmDelete = () => {
    if (confirmText.trim() !== "DELETE") {
      setConfirmError("That didn’t match. Type DELETE in capitals — nothing has been removed.");
      if (confirmInputRef.current) confirmInputRef.current.focus();
      return;
    }
    setConfirmError("");
    setDeleting(true);
  };

  const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.18em]";
  const fieldCls =
    "w-full h-12 px-3 text-[15px] bg-transparent border-[3px] rounded-none " + focusRing;

  const sectionHead = (num, title, note) => (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b-[3px] pb-3" style={{ borderColor: ink }}>
      <div className="flex items-baseline gap-4">
        <span className="text-[12px] font-bold tracking-[0.22em]" style={{ ...mono, color: accent }}>
          {num}
        </span>
        <h2 className="text-[26px] leading-none" style={{ ...serif, color: ink }}>
          {title}
        </h2>
      </div>
      {note ? (
        <span className="text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: neutral }}>
          {note}
        </span>
      ) : null}
    </div>
  );

  return (
    <div className="w-full min-h-full px-5 py-8 sm:px-8 lg:px-12" style={{ backgroundColor: paper, color: ink, ...mono }}>
      <style>{`
        @keyframes wfRise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wfPop { from { opacity: 0; transform: translate(-6px,-6px); } to { opacity: 1; transform: translate(0,0); } }
        @keyframes wfBlink { 0%,100% { opacity: 1; } 50% { opacity: .25; } }
        .wf-rise { animation: wfRise .22s ease-out both; }
        .wf-pop { animation: wfPop .18s ease-out both; }
        .wf-blink { animation: wfBlink 1.1s steps(2,end) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wf-rise, .wf-pop, .wf-blink { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-5xl">
        {/* ---------- Row 1 : masthead ---------- */}
        <header data-wf="b-0-0" className="mb-10">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: hexToRgba(ink, 0.25) }}>
            <span className="text-[11px] uppercase tracking-[0.3em]" style={{ color: neutral }}>
              Ledger · Settings
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: neutral }}>
              Synced {ACCOUNT.synced_at}
            </span>
          </div>
          <h1 className="mt-6 text-[40px] leading-[1.05] sm:text-[56px]" style={{ ...serif, color: ink }}>
            Account settings
          </h1>
          <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.6]" style={{ color: neutral }}>
            Your currency, your alerts, your session — and the door out. Free to use, no plan, no billing,
            ever. Member since {ACCOUNT.created_at}.
          </p>
        </header>

        {/* ---------- Row 2 : Account form ---------- */}
        <form data-wf="b-1-0" onSubmit={onSubmitAccount} noValidate className="p-6 sm:p-8" style={{ ...block, ...hardShadow }}>
          {sectionHead("§ 01", "Account", "PATCH /me")}

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Email */}
            <div className="md:col-span-5">
              <Label htmlFor="account-email" className={labelCls} style={{ color: ink }}>
                Email
              </Label>
              <Input
                data-wf="i-1-0-0"
                id="account-email"
                type="email"
                value={ACCOUNT.email}
                readOnly
                aria-readonly="true"
                aria-describedby="account-email-help"
                className={fieldCls + " cursor-default"}
                style={{ ...mono, borderColor: hexToRgba(ink, 0.45), color: neutral, backgroundColor: hexToRgba(ink, 0.04) }}
                onChange={() => {}}
              />
              <p id="account-email-help" className="mt-2 text-[12px] leading-[1.55]" style={{ color: neutral }}>
                Sign-in address. Budget alert emails go here.
              </p>
            </div>

            {/* Currency */}
            <div className="md:col-span-7">
              <Label htmlFor="account-currency" className={labelCls} style={{ color: ink }}>
                Currency
              </Label>
              <Select
                data-wf="i-1-0-1"
                id="account-currency"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  if (saveState === "saved" || saveState === "error") setSaveState("idle");
                }}
                aria-describedby="account-currency-help"
                className={fieldCls + " font-semibold"}
                style={{ ...mono, borderColor: ink, color: ink, backgroundColor: paper }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name} ({c.symbol})
                  </option>
                ))}
              </Select>
              <p id="account-currency-help" className="mt-2 text-[12px] leading-[1.55]" style={{ color: neutral }}>
                Used for all expenses, budgets and reports. One currency per account — amounts are not converted.
              </p>

              {/* Signature: type specimen of the chosen currency */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-4 py-4" style={{ ...block, ...smallShadow }}>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em]" style={{ color: accent }}>
                    Specimen — how amounts will read
                  </span>
                  <div className="mt-2 text-[30px] leading-none font-semibold" style={{ ...mono, color: ink }}>
                    {active.sample}
                  </div>
                </div>
                <div className="text-right text-[11px] uppercase tracking-[0.18em]" style={{ color: neutral }}>
                  <div>{active.code}</div>
                  <div className="mt-1">{ACCOUNT.expenses_count} expenses restated</div>
                </div>
              </div>
            </div>

            {/* Email alerts */}
            <div className="md:col-span-12">
              <div className="h-px w-full" style={{ backgroundColor: hexToRgba(ink, 0.2) }} />
              <div className="mt-6 flex items-start gap-4">
                <Checkbox
                  data-wf="i-1-0-2"
                  id="email-alerts"
                  checked={alerts}
                  onChange={(e) => {
                    setAlerts(e.target.checked);
                    if (saveState === "saved" || saveState === "error") setSaveState("idle");
                  }}
                  aria-describedby="email-alerts-help"
                  className={"mt-[2px] h-6 w-6 shrink-0 rounded-none border-[3px] " + focusRing}
                  style={{ borderColor: ink, accentColor: accent, outlineColor: accent }}
                />
                <div className="min-w-0">
                  <Label htmlFor="email-alerts" className="block text-[15px] font-semibold leading-tight" style={{ color: ink }}>
                    Email me budget alerts
                  </Label>
                  <p id="email-alerts-help" className="mt-2 max-w-[64ch] text-[12px] leading-[1.6]" style={{ color: neutral }}>
                    {alerts
                      ? "You’ll get an email when a category reaches 80% of its monthly limit, and again if it goes over."
                      : "Email is off. Nearing and over-limit alerts still appear in the app on your dashboard."}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge
                      className="rounded-none border-[2px] px-2 py-[3px] text-[10px] uppercase tracking-[0.18em]"
                      style={{ ...mono, borderColor: ink, backgroundColor: "transparent", color: ink }}
                    >
                      {EMAIL_SERVICE_READY ? "Mail service: connected" : "Mail service: not configured"}
                    </Badge>
                    <span className="text-[11px]" style={{ color: neutral }}>
                      Last alert sent 11 Nov — Groceries, 84% of {savedCur.symbol}520.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Row 3 : helper text + primary action ---------- */}
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            <p data-wf="b-2-0" className="md:col-span-8 max-w-[70ch] text-[13px] leading-[1.65]" style={{ color: neutral }}>
              Your account currency is USD by default. Changing it updates how all amounts are displayed —
              figures already logged keep their value, they are simply shown with the {active.code} symbol.
            </p>
            <div className="md:col-span-4">
              <Button
                data-wf="b-2-1"
                type="submit"
                disabled={!dirty || saveState === "saving"}
                aria-describedby="save-state"
                className={
                  "w-full h-14 rounded-none border-[3px] text-[14px] font-bold uppercase tracking-[0.18em] transition-transform duration-150 " +
                  focusRing +
                  (dirty && saveState !== "saving"
                    ? " hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]"
                    : " cursor-not-allowed")
                }
                style={{
                  ...mono,
                  borderColor: ink,
                  backgroundColor: dirty ? accent : hexToRgba(ink, 0.06),
                  color: dirty ? paper : neutral,
                  boxShadow: dirty && saveState !== "saving" ? "6px 6px 0 " + ink : "none",
                  outlineColor: ink,
                }}
              >
                {saveState === "saving" ? (
                  <span className="inline-flex items-center gap-2">
                    Saving<span className="wf-blink" aria-hidden="true">…</span>
                  </span>
                ) : (
                  "Save changes"
                )}
              </Button>
              <p id="save-state" className="mt-2 text-center text-[11px] uppercase tracking-[0.16em]" style={{ color: neutral }}>
                {dirty ? "Unsaved changes" : "Everything saved"}
              </p>
            </div>
          </div>

          {/* save result states */}
          <div ref={statusRef} role="status" aria-live="polite" className="mt-6">
            {saveState === "saved" ? (
              <div
                className="wf-rise flex items-start gap-3 border-[3px] px-4 py-3"
                style={{ borderColor: ink, backgroundColor: hexToRgba(accent, 0.1) }}
              >
                <CheckCircle className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" style={{ color: accent }} />
                <p className="text-[13px] leading-[1.6]" style={{ color: ink }}>
                  <span className="font-bold uppercase tracking-[0.14em]">Saved.</span>{" "}
                  Amounts now read in {savedCur.code} ({savedCur.sample}).{" "}
                  {savedAlerts ? "Budget alert emails are on." : "Budget alert emails are off — in-app alerts continue."}
                </p>
              </div>
            ) : null}

            {saveState === "error" ? (
              <div className="wf-rise border-[3px]" style={{ borderColor: ink, backgroundColor: paper }}>
                <div className="flex items-center gap-2 px-4 py-2" style={{ backgroundColor: ink, color: paper }}>
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em]">Not saved</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                  <p className="max-w-[60ch] text-[13px] leading-[1.6]" style={{ color: ink }}>
                    The server didn’t answer. Nothing was lost — {active.code} and your alert choice are still
                    set above, exactly as you left them.
                  </p>
                  <Button
                    type="submit"
                    className={"h-11 rounded-none border-[3px] px-5 text-[12px] font-bold uppercase tracking-[0.18em] " + focusRing}
                    style={{ ...mono, borderColor: ink, backgroundColor: paper, color: ink, outlineColor: accent }}
                  >
                    Try saving again
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </form>

        {/* ---------- Row 4 : session card ---------- */}
        <Card
          data-wf="b-3-0"
          className="mt-12 rounded-none border-0 bg-transparent p-0 shadow-none"
        >
          <div className="p-6 sm:p-8" style={{ ...block, ...hardShadow }}>
            {sectionHead("§ 02", "Session", "POST /auth/logout")}
            <CardContent className="p-0">
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: neutral }}>
                    Signed in since
                  </div>
                  <div className="mt-2 text-[16px] font-semibold" style={{ ...mono, color: ink }}>
                    {ACCOUNT.signed_in_since}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: neutral }}>
                    Last activity
                  </div>
                  <div className="mt-2 text-[16px] font-semibold" style={{ ...mono, color: ink }}>
                    {ACCOUNT.last_activity}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: neutral }}>
                    Device
                  </div>
                  <div className="mt-2 text-[16px] font-semibold" style={{ ...mono, color: ink }}>
                    {ACCOUNT.device}
                  </div>
                </div>
              </div>
              <p className="mt-6 max-w-[70ch] text-[13px] leading-[1.65]" style={{ color: neutral }}>
                Signed in since {ACCOUNT.signed_in_since} — sessions end automatically after a period of
                inactivity ({ACCOUNT.session_lifetime}). After that you’ll be asked to log in again before any
                of your data loads.
              </p>
            </CardContent>
          </div>
        </Card>

        {/* ---------- Row 5 : sign out ---------- */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <Button
              data-wf="b-4-0"
              type="button"
              onClick={() => setSigningOut(true)}
              disabled={signingOut}
              className={
                "w-full h-14 rounded-none border-[3px] text-[13px] font-bold uppercase tracking-[0.18em] transition-transform duration-150 " +
                focusRing +
                (signingOut ? " cursor-wait" : " hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]")
              }
              style={{
                ...mono,
                borderColor: ink,
                backgroundColor: paper,
                color: ink,
                boxShadow: signingOut ? "none" : "6px 6px 0 " + ink,
                outlineColor: accent,
              }}
            >
              {signingOut ? (
                <span className="inline-flex items-center gap-2">
                  Ending session<span className="wf-blink" aria-hidden="true">…</span>
                </span>
              ) : (
                "Sign out"
              )}
            </Button>
          </div>
          <p className="md:col-span-6 self-center text-[12px] leading-[1.6]" style={{ color: neutral }}>
            Ends this session on this device. Your expenses, budgets and categories stay exactly as they are.
          </p>
        </div>

        {/* ---------- Row 6 : delete warning ---------- */}
        <div className="mt-14">
          {sectionHead("§ 03", "Delete account", "DELETE /me")}
          <p data-wf="b-5-0" className="mt-6 max-w-[70ch] text-[14px] leading-[1.7]" style={{ color: ink }}>
            Deleting your account permanently removes your expenses, budgets and custom categories, and ends
            your session. This cannot be undone.
          </p>
          <ul className="mt-5 max-w-[70ch] divide-y" style={{ borderColor: hexToRgba(ink, 0.18) }}>
            <li className="flex items-center justify-between py-3 text-[13px]" style={{ borderColor: hexToRgba(ink, 0.18) }}>
              <span style={{ color: neutral }}>Expenses logged</span>
              <span className="font-semibold" style={{ ...mono, color: ink }}>{ACCOUNT.expenses_count}</span>
            </li>
            <li className="flex items-center justify-between border-t py-3 text-[13px]" style={{ borderColor: hexToRgba(ink, 0.18) }}>
              <span style={{ color: neutral }}>Monthly budgets</span>
              <span className="font-semibold" style={{ ...mono, color: ink }}>{ACCOUNT.budgets_count}</span>
            </li>
            <li className="flex items-center justify-between border-t py-3 text-[13px]" style={{ borderColor: hexToRgba(ink, 0.18) }}>
              <span style={{ color: neutral }}>Custom categories</span>
              <span className="font-semibold" style={{ ...mono, color: ink }}>{ACCOUNT.custom_categories_count}</span>
            </li>
          </ul>
          <p className="mt-4 max-w-[70ch] text-[12px] leading-[1.6]" style={{ color: neutral }}>
            Want a copy first? Export everything as CSV from your expense list before you delete.
          </p>
        </div>

        {/* ---------- Row 7 : delete button ---------- */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <Button
              data-wf="b-6-0"
              ref={deleteBtnRef}
              type="button"
              onClick={() => setModalOpen(true)}
              aria-haspopup="dialog"
              className={
                "w-full h-14 rounded-none border-[3px] text-[13px] font-bold uppercase tracking-[0.18em] transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] " +
                focusRing
              }
              style={{ ...mono, borderColor: ink, backgroundColor: ink, color: paper, boxShadow: "6px 6px 0 " + accent, outlineColor: accent }}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Trash className="h-4 w-4" aria-hidden="true" />
                Delete account
              </span>
            </Button>
          </div>
          <p className="md:col-span-6 self-center text-[12px] leading-[1.6]" style={{ color: neutral }}>
            You’ll be asked to type DELETE to confirm. Nothing is removed before that.
          </p>
        </div>

        <div className="mt-16 mb-4">
          <Separator className="opacity-30" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.22em]" style={{ color: neutral }}>
            Free to use · No billing details, no plans · Your data stays yours
          </p>
        </div>
      </div>

      {/* ---------- Rows 8 & 9 : confirmation modal ---------- */}
      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ backgroundColor: hexToRgba(ink, 0.6) }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleting) closeModal();
          }}
        >
          <div
            data-wf="b-7-0"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-desc"
            onKeyDown={onDialogKeyDown}
            className="wf-pop w-full max-w-xl"
            style={{ ...block, boxShadow: "10px 10px 0 " + accent }}
          >
            <div className="flex items-center justify-between px-6 py-3" style={{ backgroundColor: ink, color: paper }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ ...mono }}>
                Confirm deletion
              </span>
              <button
                type="button"
                onClick={closeModal}
                disabled={deleting}
                aria-label="Close deletion dialog"
                className={"h-8 w-8 inline-flex items-center justify-center border-[2px] " + focusRing}
                style={{ borderColor: paper, color: paper, outlineColor: paper }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-8">
              <h2 id="delete-dialog-title" className="text-[28px] leading-[1.1]" style={{ ...serif, color: ink }}>
                Permanently delete your account and all data?
              </h2>
              <p id="delete-dialog-desc" className="mt-4 max-w-[60ch] text-[13px] leading-[1.65]" style={{ color: neutral }}>
                {ACCOUNT.expenses_count} expenses, {ACCOUNT.budgets_count} budgets and{" "}
                {ACCOUNT.custom_categories_count} custom categories belonging to {ACCOUNT.email} will be erased
                and your session will end immediately. There is no recovery and no export afterwards.
              </p>

              <div className="mt-7">
                <Label htmlFor="confirm-delete" className={labelCls} style={{ color: ink }}>
                  Type DELETE to confirm
                </Label>
                <Input
                  data-wf="i-7-0-0"
                  id="confirm-delete"
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    if (confirmError) setConfirmError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      confirmDelete();
                    }
                  }}
                  ref={confirmInputRef}
                  autoComplete="off"
                  spellCheck="false"
                  disabled={deleting}
                  aria-invalid={confirmError ? "true" : "false"}
                  aria-describedby={confirmError ? "confirm-delete-error" : "confirm-delete-help"}
                  className={fieldCls + " text-[16px] font-bold tracking-[0.3em] uppercase"}
                  style={{ ...mono, borderColor: ink, color: ink, backgroundColor: paper, outlineColor: accent }}
                />
                {confirmError ? (
                  <p
                    id="confirm-delete-error"
                    role="alert"
                    className="wf-rise mt-3 inline-flex items-start gap-2 border-[2px] px-3 py-2 text-[12px] leading-[1.55]"
                    style={{ borderColor: ink, backgroundColor: hexToRgba(ink, 0.06), color: ink }}
                  >
                    <AlertCircle className="mt-[2px] h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="font-bold uppercase tracking-[0.14em]">Error — </span>
                      {confirmError}
                    </span>
                  </p>
                ) : (
                  <p id="confirm-delete-help" className="mt-3 text-[12px]" style={{ color: neutral }}>
                    Capital letters, exactly: DELETE
                  </p>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Button
                  data-wf="b-8-0"
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className={
                    "h-14 rounded-none border-[3px] text-[12px] font-bold uppercase tracking-[0.16em] transition-transform duration-150 " +
                    focusRing +
                    (deleting ? " cursor-wait" : " hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px]")
                  }
                  style={{
                    ...mono,
                    borderColor: ink,
                    backgroundColor: ink,
                    color: paper,
                    boxShadow: deleting ? "none" : "5px 5px 0 " + accent,
                    outlineColor: accent,
                  }}
                >
                  {deleting ? (
                    <span className="inline-flex items-center gap-2">
                      Erasing everything<span className="wf-blink" aria-hidden="true">…</span>
                    </span>
                  ) : (
                    "Yes, delete everything"
                  )}
                </Button>
                <Button
                  data-wf="b-8-1"
                  type="button"
                  onClick={closeModal}
                  disabled={deleting}
                  className={
                    "h-14 rounded-none border-[3px] text-[12px] font-bold uppercase tracking-[0.16em] transition-transform duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] " +
                    focusRing
                  }
                  style={{ ...mono, borderColor: ink, backgroundColor: paper, color: ink, boxShadow: "5px 5px 0 " + ink, outlineColor: accent }}
                >
                  Cancel
                </Button>
              </div>

              <p role="status" aria-live="polite" className="mt-5 text-[11px] uppercase tracking-[0.18em]" style={{ color: neutral }}>
                {deleting ? "Removing records, then signing you out" : "Cancel keeps your account exactly as it is"}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
