// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Switch } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ArrowLeft, ArrowRight } = Icons;

const PRODUCT = "Expense Tracker";
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

// Accounts that already exist in this prototype's ledger.
const REGISTERED = ["mara.oyelaran@fastmail.com", "j.tanaka@hey.com"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("login");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | submitting | error | success
  const [fieldErr, setFieldErr] = React.useState({ email: null, password: null });
  const [formErr, setFormErr] = React.useState(null); // 'credentials' | 'taken'
  const timer = React.useRef(null);
  const loginTabRef = React.useRef(null);
  const signupTabRef = React.useRef(null);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const thick = `3px solid ${brand.primaryColor}`;
  const hard = `8px 8px 0 ${brand.primaryColor}`;
  const field = {
    border: thick,
    borderRadius: brand.radius,
    height: 52,
    backgroundColor: "transparent",
    fontFamily: MONO,
    fontVariantNumeric: "tabular-nums",
    color: brand.primaryColor,
  };
  const busy = status === "submitting";

  const css = `
.bs-focus:focus-visible{outline:3px solid ${brand.accentColor};outline-offset:3px}
@keyframes bs-rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes bs-blink{0%,100%{opacity:1}50%{opacity:.35}}
.bs-rise{animation:bs-rise .22s ease-out both}
.bs-blink{animation:bs-blink 1s steps(2,end) infinite}
@media (prefers-reduced-motion: reduce){
  .bs-rise,.bs-blink{animation:none}
  .bs-press{transition:none}
}
.bs-press{transition:transform .08s ease-out, box-shadow .08s ease-out}
.bs-press:active:not(:disabled){transform:translate(3px,3px)}
`;

  function switchTab(next) {
    setTab(next);
    setFormErr(null);
    setFieldErr({ email: null, password: null });
    setStatus("idle");
  }

  function onTabKey(e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = tab === "login" ? "signup" : "login";
    switchTab(next);
    (next === "login" ? loginTabRef : signupTabRef).current?.focus();
  }

  function submit(mode) {
    clearTimeout(timer.current);
    const addr = email.trim().toLowerCase();
    const next = {
      email: !addr
        ? "Enter the email on your account."
        : !EMAIL_RE.test(addr)
        ? "That is not a valid email — try mara@fastmail.com."
        : null,
      password: !password
        ? "Enter your password."
        : password.length < 8
        ? "Password must be at least 8 characters."
        : null,
    };
    setFieldErr(next);
    setFormErr(null);
    if (next.email || next.password) {
      setStatus("idle");
      return;
    }
    setStatus("submitting");
    timer.current = setTimeout(() => {
      const known = REGISTERED.includes(addr);
      if (mode === "login" && !known) {
        setStatus("error");
        setFormErr("credentials");
        return;
      }
      if (mode === "signup" && known) {
        setStatus("error");
        setFormErr("taken");
        return;
      }
      setStatus("success");
      navigate("dashboard");
    }, 700);
  }

  const tabs = [
    { key: "login", label: "Log in", wf: "i-1-0-0", ref: loginTabRef },
    { key: "signup", label: "Sign up", wf: "i-1-0-1", ref: signupTabRef },
  ];

  return (
    <div
      className="flex min-h-screen flex-col px-5 py-6 sm:px-10 sm:py-8"
      style={{ color: brand.primaryColor, fontFamily: brand.fontBody, backgroundColor: brand.backgroundColor }}
    >
      <style>{css}</style>

      <header
        className="flex flex-wrap items-baseline justify-between gap-2 pb-4"
        style={{ borderBottom: thick, fontFamily: MONO }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em]">Personal spending ledger</p>
        <p className="text-xs uppercase" style={{ fontVariantNumeric: "tabular-nums", color: brand.neutralColor }}>
          Vol. 01 — No. 11 — Nov 2026
        </p>
      </header>

      <div className="grid flex-1 items-start gap-10 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,460px)] lg:gap-16 lg:py-12">
        {/* b-0-0 — page title */}
        <div data-wf="b-0-0" className="lg:sticky lg:top-10">
          <h1
            className="font-bold leading-[0.84] tracking-tight"
            style={{ fontFamily: brand.fontHeading, fontSize: "clamp(54px, 9vw, 116px)" }}
          >
            {PRODUCT}
            <span style={{ color: brand.accentColor }}>.</span>
          </h1>
          <p
            className="mt-6 max-w-[46ch] text-sm leading-relaxed"
            style={{ fontFamily: MONO, color: brand.neutralColor }}
          >
            One account, one currency, one private ledger. Your expenses, budgets and
            categories are visible only to you — nobody else reads this page.
          </p>
        </div>

        <main
          className="p-6 sm:p-8"
          style={{ border: thick, boxShadow: hard, borderRadius: brand.radius, backgroundColor: brand.backgroundColor }}
        >
          {/* b-1-0 — tabs */}
          <div
            data-wf="b-1-0"
            role="tablist"
            aria-label="Account access"
            className="grid grid-cols-2"
            style={{ border: thick }}
          >
            {tabs.map((t, i) => {
              const on = tab === t.key;
              return (
                <button
                  key={t.key}
                  data-wf={t.wf}
                  ref={t.ref}
                  type="button"
                  role="tab"
                  id={`tab-${t.key}`}
                  aria-selected={on}
                  aria-controls="auth-panel"
                  tabIndex={on ? 0 : -1}
                  onKeyDown={onTabKey}
                  onClick={() => switchTab(t.key)}
                  className="bs-focus h-12 text-xs font-bold uppercase tracking-[0.2em]"
                  style={{
                    fontFamily: MONO,
                    backgroundColor: on ? brand.primaryColor : "transparent",
                    color: on ? brand.backgroundColor : brand.primaryColor,
                    borderLeft: i === 1 ? thick : "none",
                  }}
                >
                  {on ? "▸ " : ""}
                  {t.label}
                </button>
              );
            })}
          </div>

          <div id="auth-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={-1} className="focus:outline-none">
            {status === "success" ? (
              <div className="bs-rise mt-8" role="status">
                <p className="text-3xl font-bold leading-tight" style={{ fontFamily: brand.fontHeading }}>
                  {tab === "login" ? "Signed in." : "Account created."}
                </p>
                <p className="mt-3 text-sm" style={{ fontFamily: MONO, color: brand.neutralColor }}>
                  Opening the dashboard for {email.trim().toLowerCase()} — default categories are
                  already waiting for your first expense.
                </p>
              </div>
            ) : (
              <form
                data-wf="b-2-0"
                className="mt-8"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(tab);
                }}
              >
                <h2 className="text-2xl font-bold leading-tight" style={{ fontFamily: brand.fontHeading }}>
                  {tab === "login" ? "Log in to your account" : "Create your account"}
                </h2>

                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="auth-email"
                      className="block text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ fontFamily: MONO }}
                    >
                      01 / Email
                    </label>
                    <input
                      data-wf="i-2-0-0"
                      id="auth-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      disabled={busy}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={fieldErr.email ? true : undefined}
                      aria-describedby={fieldErr.email ? "auth-email-err" : undefined}
                      className="bs-focus w-full px-3 text-sm outline-none disabled:opacity-60"
                      style={field}
                    />
                    {fieldErr.email && (
                      <p
                        id="auth-email-err"
                        className="bs-rise flex items-start gap-2 text-xs"
                        style={{ fontFamily: MONO, color: brand.accentColor }}
                      >
                        <Icons.AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{fieldErr.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="auth-password"
                      className="block text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ fontFamily: MONO }}
                    >
                      02 / Password
                    </label>
                    <input
                      data-wf="i-2-0-1"
                      id="auth-password"
                      name="password"
                      type="password"
                      autoComplete={tab === "login" ? "current-password" : "new-password"}
                      value={password}
                      disabled={busy}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-invalid={fieldErr.password ? true : undefined}
                      aria-describedby={
                        ["auth-rules", fieldErr.password ? "auth-password-err" : null].filter(Boolean).join(" ")
                      }
                      className="bs-focus w-full px-3 text-sm outline-none disabled:opacity-60"
                      style={field}
                    />
                    {fieldErr.password && (
                      <p
                        id="auth-password-err"
                        className="bs-rise flex items-start gap-2 text-xs"
                        style={{ fontFamily: MONO, color: brand.accentColor }}
                      >
                        <Icons.AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{fieldErr.password}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* b-3-0 — rules and sign-in failure */}
                <div data-wf="b-3-0" className="mt-6" aria-live="polite">
                  <p id="auth-rules" className="text-xs leading-relaxed" style={{ fontFamily: MONO, color: brand.neutralColor }}>
                    Password must be at least 8 characters.
                  </p>
                  {formErr && (
                    <div
                      className="bs-rise mt-3 flex items-start gap-3 p-3"
                      role="alert"
                      style={{ border: thick, borderLeft: `8px solid ${brand.accentColor}`, borderRadius: brand.radius }}
                    >
                      <Icons.AlertCircle className="mt-px h-4 w-4 shrink-0" aria-hidden="true" style={{ color: brand.accentColor }} />
                      <p className="text-xs leading-relaxed" style={{ fontFamily: MONO }}>
                        <span className="font-bold uppercase tracking-[0.2em]">
                          {formErr === "credentials" ? "Not signed in" : "Email in use"}
                        </span>
                        <br />
                        {formErr === "credentials"
                          ? "Email or password is incorrect — please try again."
                          : "That email already has an account. Switch to Log in to reach your ledger."}
                      </p>
                    </div>
                  )}
                </div>

                {/* Row: b-4-0 / b-4-1 */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    data-wf="b-4-0"
                    type={tab === "login" ? "submit" : "button"}
                    disabled={busy}
                    onClick={tab === "login" ? undefined : () => { switchTab("login"); submit("login"); }}
                    className="bs-focus bs-press h-14 w-full text-xs font-bold uppercase tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-70"
                    style={
                      tab === "login"
                        ? {
                            backgroundColor: brand.primaryColor,
                            color: brand.backgroundColor,
                            border: thick,
                            borderRadius: brand.radius,
                            boxShadow: `4px 4px 0 ${brand.accentColor}`,
                            fontFamily: MONO,
                          }
                        : {
                            backgroundColor: "transparent",
                            color: brand.primaryColor,
                            border: thick,
                            borderRadius: brand.radius,
                            fontFamily: MONO,
                          }
                    }
                  >
                    {busy && tab === "login" ? <span className="bs-blink">Checking…</span> : "Log in"}
                  </button>

                  <button
                    data-wf="b-4-1"
                    type={tab === "signup" ? "submit" : "button"}
                    disabled={busy}
                    onClick={tab === "signup" ? undefined : () => { switchTab("signup"); submit("signup"); }}
                    className="bs-focus bs-press h-14 w-full text-xs font-bold uppercase tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-70"
                    style={
                      tab === "signup"
                        ? {
                            backgroundColor: brand.primaryColor,
                            color: brand.backgroundColor,
                            border: thick,
                            borderRadius: brand.radius,
                            boxShadow: `4px 4px 0 ${brand.accentColor}`,
                            fontFamily: MONO,
                          }
                        : {
                            backgroundColor: "transparent",
                            color: brand.primaryColor,
                            border: thick,
                            borderRadius: brand.radius,
                            fontFamily: MONO,
                          }
                    }
                  >
                    {busy && tab === "signup" ? <span className="bs-blink">Creating…</span> : "Create account"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>

      <footer
        className="flex flex-wrap items-baseline justify-between gap-2 pt-3 text-xs uppercase"
        style={{ borderTop: thick, fontFamily: MONO }}
      >
        {/* b-5-0 */}
        <span data-wf="b-5-0" className="font-bold tracking-[0.12em]">
          Free to use. No billing details, no plans, no fees.
        </span>
        <span style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}>© 2026 {PRODUCT}</span>
      </footer>
    </div>
  );
}
