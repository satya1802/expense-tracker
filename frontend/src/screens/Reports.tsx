// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Label, Select, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ChevronRight, ChevronDown, Clock, Filter, AlertCircle } = Icons;

const CURRENCY = { code: "USD", name: "US Dollar" };

const MONTHS = [
  { key: "2026-01", label: "Jan 2026", short: "JAN" },
  { key: "2026-02", label: "Feb 2026", short: "FEB" },
  { key: "2026-03", label: "Mar 2026", short: "MAR" },
  { key: "2026-04", label: "Apr 2026", short: "APR" },
  { key: "2026-05", label: "May 2026", short: "MAY" },
  { key: "2026-06", label: "Jun 2026", short: "JUN" },
  { key: "2026-07", label: "Jul 2026", short: "JUL" },
  { key: "2026-08", label: "Aug 2026", short: "AUG" },
  { key: "2026-09", label: "Sep 2026", short: "SEP" },
  { key: "2026-10", label: "Oct 2026", short: "OCT" },
  { key: "2026-11", label: "Nov 2026", short: "NOV", partial: true },
];

// amount per month, Jan 2026 -> Nov 2026, in the account currency (USD)
const CATEGORIES = [
  {
    id: "cat_8f21",
    name: "Groceries",
    is_default: true,
    avg_ticket: 29.5,
    monthly: [421.4, 396.85, 448.6, 409.15, 462.3, 438.2, 471.05, 402.6, 455.3, 489.75, 412.8],
  },
  {
    id: "cat_4b09",
    name: "Dining out",
    is_default: true,
    avg_ticket: 26.2,
    monthly: [254.7, 218.4, 289.25, 231.6, 276.95, 268.4, 322.8, 196.55, 241.9, 303.45, 236.15],
  },
  {
    id: "cat_1d77",
    name: "Transport",
    is_default: true,
    avg_ticket: 17.1,
    monthly: [196.3, 182.75, 203.1, 174.85, 219.4, 214.75, 198.6, 165.2, 207.35, 221.9, 188.4],
  },
  {
    id: "cat_6a52",
    name: "Utilities",
    is_default: true,
    avg_ticket: 58.0,
    monthly: [192.6, 188.2, 175.4, 161.9, 158.75, 168.0, 182.5, 174.0, 166.25, 171.8, 174.0],
  },
  {
    id: "cat_3e10",
    name: "Entertainment",
    is_default: true,
    avg_ticket: 22.5,
    monthly: [88.9, 76.5, 134.8, 97.4, 115.2, 121.5, 168.9, 94.75, 108.4, 132.6, 112.25],
  },
  {
    id: "cat_9c34",
    name: "Health",
    is_default: true,
    avg_ticket: 43.5,
    monthly: [142.3, 64.0, 58.25, 119.85, 81.6, 95.75, 145.1, 72.2, 88.55, 104.7, 86.9],
  },
  {
    id: "cat_2f88",
    name: "Subscriptions",
    is_default: true,
    avg_ticket: 18.5,
    monthly: [96.0, 96.0, 96.0, 96.0, 96.0, 96.0, 78.0, 83.0, 74.0, 73.0, 74.0],
  },
  {
    id: "cat_7h45",
    name: "Gifts",
    is_default: false,
    avg_ticket: 35.0,
    monthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

const PERIODS = [
  { key: "last6", label: "Last 6 months", from: 5, to: 10 },
  { key: "last3", label: "Last 3 months", from: 8, to: 10 },
  { key: "ytd", label: "Year to date", from: 0, to: 10 },
];

const MONEY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: CURRENCY.code,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function fmtMoney(n) {
  return MONEY.format(n);
}

function tint(hex, alpha) {
  const h = String(hex).replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function countFor(amount, avgTicket) {
  if (!amount) return 0;
  return Math.max(1, Math.round(amount / avgTicket));
}

export default function Screen() {
  const navigate = useNavigate();
  const P = brand.primaryColor;
  const A = brand.accentColor;
  const N = brand.neutralColor;
  const BG = brand.backgroundColor;

  const [periodKey, setPeriodKey] = React.useState("last6");
  const [categoryId, setCategoryId] = React.useState("all");
  const [sort, setSort] = React.useState({ key: "total", dir: "desc" });
  const [loading, setLoading] = React.useState(false);
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 420);
    return () => clearTimeout(t);
  }, [periodKey, categoryId]);

  const period = PERIODS.find((p) => p.key === periodKey) || PERIODS[0];
  const rangeIdx = [];
  for (let i = period.from; i <= period.to; i += 1) rangeIdx.push(i);
  const rangeLabel = `${MONTHS[period.from].label} – ${MONTHS[period.to].label}`;

  const activeCats =
    categoryId === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === categoryId);
  const catLabel = categoryId === "all" ? "All categories" : activeCats[0].name;

  const focusIdx = period.to;
  const focusMonth = MONTHS[focusIdx];

  const breakdown = activeCats
    .map((c) => ({
      id: c.id,
      name: c.name,
      is_default: c.is_default,
      total: c.monthly[focusIdx],
      count: countFor(c.monthly[focusIdx], c.avg_ticket),
    }))
    .filter((r) => (categoryId === "all" ? true : true));

  const focusTotal = breakdown.reduce((s, r) => s + r.total, 0);
  const focusCount = breakdown.reduce((s, r) => s + r.count, 0);

  const sorted = [...breakdown].sort((a, b) => {
    const dir = sort.dir === "asc" ? 1 : -1;
    if (sort.key === "name") return a.name.localeCompare(b.name) * dir;
    if (sort.key === "count") return (a.count - b.count) * dir || a.name.localeCompare(b.name);
    return (a.total - b.total) * dir || a.name.localeCompare(b.name);
  });

  const chartRows = [...breakdown]
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total);
  const zeroRows = breakdown.filter((r) => r.total === 0);
  const chartMax = chartRows.length ? chartRows[0].total : 0;

  const monthRows = rangeIdx.map((i) => {
    const total = activeCats.reduce((s, c) => s + c.monthly[i], 0);
    const prev = i > 0 ? activeCats.reduce((s, c) => s + c.monthly[i - 1], 0) : null;
    return { idx: i, month: MONTHS[i], total, prev };
  });
  const trendMax = monthRows.reduce((m, r) => Math.max(m, r.total), 0);
  const rangeTotal = monthRows.reduce((s, r) => s + r.total, 0);
  const rangeAvg = monthRows.length ? rangeTotal / monthRows.length : 0;
  const hasData = rangeTotal > 0 || focusTotal > 0;

  const panel = {
    border: `3px solid ${P}`,
    boxShadow: `6px 6px 0 ${P}`,
    backgroundColor: BG,
    borderRadius: brand.radius,
  };
  const field = {
    border: `3px solid ${P}`,
    backgroundColor: BG,
    borderRadius: brand.radius,
    color: P,
    minHeight: "44px",
    fontFamily: brand.fontBody,
    fontSize: "13px",
  };
  const headingFont = { fontFamily: brand.fontHeading, letterSpacing: "-0.01em" };
  const nums = { fontVariantNumeric: "tabular-nums" };
  const labelCls = "text-[11px] uppercase tracking-[0.18em]";

  const css = `
.rp :focus-visible{outline:3px solid ${A};outline-offset:2px}
@keyframes rpGrowX{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes rpGrowY{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes rpIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes rpDash{to{background-position:24px 0}}
.rp-bar{animation:rpGrowX .55s cubic-bezier(.2,.8,.2,1) both;transform-origin:left center}
.rp-col{animation:rpGrowY .6s cubic-bezier(.2,.8,.2,1) both;transform-origin:bottom center}
.rp-in{animation:rpIn .35s ease-out both}
.rp-row{transition:background-color .15s ease}
.rp-row:hover{background-color:${tint(P, 0.06)}}
.rp-link{text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:2px;text-decoration-color:${tint(P, 0.3)};transition:text-decoration-color .15s ease}
.rp-link:hover{text-decoration-color:${A};color:${A}}
.rp-dash{background-image:repeating-linear-gradient(90deg,${P} 0 8px,transparent 8px 16px);background-size:24px 100%;animation:rpDash .9s linear infinite}
.rp-sort{transition:color .15s ease}
.rp-sort:hover{color:${A}}
@media (prefers-reduced-motion: reduce){.rp *{animation:none !important;transition:none !important}}
`;

  function toggleSort(key) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "desc" ? "asc" : "desc" }
        : { key, dir: key === "name" ? "asc" : "desc" }
    );
  }

  function ariaSort(key) {
    if (sort.key !== key) return "none";
    return sort.dir === "asc" ? "ascending" : "descending";
  }

  function SortHead({ col, children, align }) {
    const active = sort.key === col;
    return (
      <button
        type="button"
        onClick={() => toggleSort(col)}
        className={`rp-sort inline-flex items-center gap-1.5 ${labelCls} ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
        style={{ color: active ? A : N, fontWeight: 600 }}
      >
        <span>{children}</span>
        <ChevronDown
          className="h-3.5 w-3.5"
          aria-hidden="true"
          style={{
            opacity: active ? 1 : 0.25,
            transform: active && sort.dir === "asc" ? "rotate(180deg)" : "none",
          }}
        />
      </button>
    );
  }

  const thStyle = {
    borderBottom: `3px solid ${P}`,
    padding: "0 16px 12px 16px",
    color: N,
    verticalAlign: "bottom",
  };
  const tdStyle = {
    borderBottom: `1px solid ${tint(P, 0.15)}`,
    padding: "14px 16px",
    fontSize: "13px",
  };

  function SectionHead({ num, kicker, title, children }) {
    return (
      <div
        className="flex flex-wrap items-end justify-between gap-5 p-5 sm:p-7"
        style={{ borderBottom: `3px solid ${P}` }}
      >
        <div className="min-w-0">
          <p className={labelCls} style={{ color: N, ...nums }}>
            {num} / {kicker}
          </p>
          <h2 className="mt-2 text-[24px] sm:text-[30px] leading-[1.05]" style={headingFont}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      className="rp min-h-full w-full"
      style={{ backgroundColor: BG, color: P, fontFamily: brand.fontBody }}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
        {/* ------------------------------------------------ page title */}
        <header data-wf="b-0-0" className="mb-8">
          <p className={labelCls} style={{ color: N }}>
            Private ledger · Reports
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h1 className="text-[46px] sm:text-[64px] leading-[0.92]" style={headingFont}>
              Reports
            </h1>
            <p
              className="flex items-center gap-2 text-[12px]"
              style={{ color: N, ...nums }}
            >
              <Clock className="h-4 w-4" aria-hidden="true" />
              Recomputed 09:42 · Sat 14 Nov 2026
            </p>
          </div>
          <div className="mt-5" style={{ borderTop: `3px solid ${P}` }} />
          <p className="mt-4 max-w-[64ch] text-[14px] leading-[1.6]" style={{ color: N }}>
            Where the money went, by category and by month. Every figure counts only the
            expenses logged to this account, in the single currency set for it.
          </p>
        </header>

        {/* ------------------------------------------------ filter bar */}
        <section
          data-wf="b-1-0"
          aria-label="Report filters"
          className="mb-10 p-5 sm:p-6"
          style={panel}
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <Label
                htmlFor="rp-period"
                className={`flex items-center gap-2 ${labelCls}`}
                style={{ color: P, fontWeight: 600 }}
              >
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                Period
              </Label>
              <Select
                id="rp-period"
                data-wf="i-1-0-0"
                value={periodKey}
                onChange={(e) => setPeriodKey(e.target.value)}
                className="mt-2 w-full px-3"
                style={field}
              >
                {PERIODS.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </Select>
              <p className="mt-2 text-[11px]" style={{ color: N, ...nums }}>
                {rangeLabel}
              </p>
            </div>

            <div>
              <Label
                htmlFor="rp-category"
                className={labelCls}
                style={{ color: P, fontWeight: 600 }}
              >
                Category
              </Label>
              <Select
                id="rp-category"
                data-wf="i-1-0-1"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-2 w-full px-3"
                style={field}
              >
                <option value="all">All categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.is_default ? "" : " (custom)"}
                  </option>
                ))}
              </Select>
              <p className="mt-2 text-[11px]" style={{ color: N, ...nums }}>
                {CATEGORIES.length} categories · 7 default, 1 custom
              </p>
            </div>

            <div>
              <Label
                htmlFor="rp-currency"
                className={labelCls}
                style={{ color: P, fontWeight: 600 }}
              >
                Currency
              </Label>
              <div
                id="rp-currency"
                data-wf="i-1-0-2"
                className="mt-2 flex items-center justify-between px-3"
                style={{ ...field, display: "flex", alignItems: "center" }}
              >
                <span style={nums}>{CURRENCY.code}</span>
                <span className="text-[11px]" style={{ color: N }}>
                  {CURRENCY.name}
                </span>
              </div>
              <p className="mt-2 text-[11px]" style={{ color: N }}>
                One currency per account ·{" "}
                <button
                  type="button"
                  className="rp-link"
                  style={{ color: P }}
                  onClick={() => navigate("settings")}
                >
                  change in Account settings
                </button>
              </p>
            </div>
          </div>

          <div
            className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4"
            style={{ borderTop: `1px dashed ${tint(P, 0.4)}` }}
          >
            <p className="text-[12px]" aria-live="polite" style={{ ...nums, color: P }}>
              {loading
                ? "Recomputing figures from your expense log…"
                : `Showing ${catLabel} · ${rangeLabel} · ${monthRows.length} months · ${CURRENCY.code}`}
            </p>
            {loading ? (
              <span className="rp-dash h-[6px] w-28" aria-hidden="true" />
            ) : (
              <span className="text-[11px]" style={{ color: N, ...nums }}>
                {fmtMoney(rangeTotal)} logged in range
              </span>
            )}
          </div>
        </section>

        <div
          aria-busy={loading ? "true" : "false"}
          className={loading ? "pointer-events-none" : ""}
          style={{ opacity: loading ? 0.38 : 1, transition: "opacity .2s ease" }}
        >
          {hasData ? (
            <>
              {/* ------------------------------------------ category chart */}
              <section data-wf="b-2-0" className="mb-12" style={panel}>
                <SectionHead
                  num="01"
                  kicker="By category"
                  title={`Spending by category — ${focusMonth.label}`}
                >
                  <div className="text-left sm:text-right">
                    <p className={labelCls} style={{ color: N }}>
                      Total · {focusMonth.label}
                    </p>
                    <p className="mt-1 text-[34px] leading-none" style={{ ...headingFont, ...nums }}>
                      {fmtMoney(focusTotal)}
                    </p>
                  </div>
                </SectionHead>

                <div className="p-5 sm:p-7">
                  <ol className="space-y-5">
                    {chartRows.map((r, i) => {
                      const share = focusTotal ? (r.total / focusTotal) * 100 : 0;
                      const width = chartMax ? (r.total / chartMax) * 100 : 0;
                      return (
                        <li
                          key={r.id}
                          className="rp-in grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 md:grid-cols-[11.5rem_1fr_9.5rem]"
                          style={{ animationDelay: `${i * 45}ms` }}
                        >
                          <span
                            className="order-1 text-[12px] uppercase tracking-[0.12em]"
                            style={{ fontWeight: 600 }}
                          >
                            {r.name}
                          </span>
                          <div
                            className="order-3 col-span-2 md:order-2 md:col-span-1"
                            style={{ borderBottom: `1px dashed ${tint(P, 0.25)}` }}
                          >
                            <div
                              className="rp-bar h-6"
                              style={{
                                width: `${width}%`,
                                backgroundColor: i === 0 ? A : P,
                                animationDelay: `${i * 45}ms`,
                              }}
                            />
                          </div>
                          <span
                            className="order-2 justify-self-end text-[13px] md:order-3"
                            style={nums}
                          >
                            {fmtMoney(r.total)}
                            <span className="ml-3 text-[12px]" style={{ color: N }}>
                              {share.toFixed(1)}%
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ol>

                  <div
                    className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px]"
                    style={{ borderTop: `1px dashed ${tint(P, 0.4)}`, color: N }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-6"
                        style={{ backgroundColor: A }}
                        aria-hidden="true"
                      />
                      Largest category this month
                    </span>
                    {zeroRows.length > 0 && (
                      <span style={nums}>
                        Not charted: {zeroRows.map((z) => z.name).join(", ")} — no spending
                        logged in {focusMonth.label}
                      </span>
                    )}
                    {focusMonth.partial && (
                      <span className="inline-flex items-center gap-2" style={nums}>
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {focusMonth.label} is month-to-date (1–14 Nov)
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* ------------------------------------------ breakdown table */}
              <section data-wf="b-3-0" className="mb-12" style={panel}>
                <SectionHead num="02" kicker="Ledger" title="Category breakdown">
                  <p className="text-[11px] max-w-[26ch]" style={{ color: N }}>
                    Select a category to open its expenses. Sort by any column.
                  </p>
                </SectionHead>

                <div className="overflow-x-auto p-5 sm:p-7">
                  <Table className="w-full min-w-[640px]" style={nums}>
                    <caption className="sr-only">
                      Spending by category for {focusMonth.label}, in {CURRENCY.code}
                    </caption>
                    <THead>
                      <TR>
                        <TH
                          data-wf="i-3-0-0"
                          scope="col"
                          className="text-left"
                          style={thStyle}
                          aria-sort={ariaSort("name")}
                        >
                          <SortHead col="name">Category</SortHead>
                        </TH>
                        <TH
                          data-wf="i-3-0-1"
                          scope="col"
                          className="text-right"
                          style={thStyle}
                          aria-sort={ariaSort("total")}
                        >
                          <SortHead col="total" align="right">
                            Total spent
                          </SortHead>
                        </TH>
                        <TH
                          data-wf="i-3-0-2"
                          scope="col"
                          className="text-left"
                          style={thStyle}
                          aria-sort={ariaSort("total")}
                        >
                          <span className={labelCls} style={{ color: N, fontWeight: 600 }}>
                            Share of spending
                          </span>
                        </TH>
                        <TH
                          data-wf="i-3-0-3"
                          scope="col"
                          className="text-right"
                          style={thStyle}
                          aria-sort={ariaSort("count")}
                        >
                          <SortHead col="count" align="right">
                            Expenses
                          </SortHead>
                        </TH>
                      </TR>
                    </THead>
                    <TBody>
                      {sorted.map((r) => {
                        const share = focusTotal ? (r.total / focusTotal) * 100 : 0;
                        const empty = r.count === 0;
                        return (
                          <TR
                            key={r.id}
                            className={empty ? "" : "rp-row cursor-pointer"}
                            onClick={empty ? undefined : () => navigate("expenses")}
                          >
                            <TD style={tdStyle}>
                              {empty ? (
                                <span className="inline-flex items-center gap-3">
                                  <span style={{ color: N }}>{r.name}</span>
                                  <Badge
                                    className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5"
                                    style={{
                                      border: `1px solid ${tint(P, 0.4)}`,
                                      color: N,
                                      backgroundColor: "transparent",
                                      borderRadius: brand.radius,
                                    }}
                                  >
                                    Custom
                                  </Badge>
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  className="rp-link text-left"
                                  style={{ color: P, fontWeight: 600 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("expenses");
                                  }}
                                >
                                  {r.name}
                                  <span className="sr-only">
                                    {` — view ${r.count} expenses in ${focusMonth.label}`}
                                  </span>
                                </button>
                              )}
                            </TD>
                            <TD className="text-right" style={tdStyle}>
                              {fmtMoney(r.total)}
                            </TD>
                            <TD style={tdStyle}>
                              <span className="flex items-center gap-3">
                                <span
                                  className="h-[8px] w-24 shrink-0"
                                  style={{ border: `1px solid ${tint(P, 0.35)}` }}
                                  aria-hidden="true"
                                >
                                  <span
                                    className="block h-full"
                                    style={{
                                      width: `${share}%`,
                                      backgroundColor: P,
                                      transition: "width .4s ease",
                                    }}
                                  />
                                </span>
                                <span className="w-14">{share.toFixed(1)}%</span>
                              </span>
                            </TD>
                            <TD className="text-right" style={tdStyle}>
                              {empty ? (
                                <span className="text-[12px]" style={{ color: N }}>
                                  None logged
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-2">
                                  {r.count}
                                  <ChevronRight
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                    style={{ color: N }}
                                  />
                                </span>
                              )}
                            </TD>
                          </TR>
                        );
                      })}
                      <TR>
                        <TD
                          style={{ ...tdStyle, borderTop: `3px solid ${P}`, borderBottom: "none" }}
                        >
                          <span className={labelCls} style={{ fontWeight: 600 }}>
                            Total
                          </span>
                        </TD>
                        <TD
                          className="text-right"
                          style={{
                            ...tdStyle,
                            borderTop: `3px solid ${P}`,
                            borderBottom: "none",
                            fontWeight: 600,
                          }}
                        >
                          {fmtMoney(focusTotal)}
                        </TD>
                        <TD
                          style={{ ...tdStyle, borderTop: `3px solid ${P}`, borderBottom: "none" }}
                        >
                          100.0%
                        </TD>
                        <TD
                          className="text-right"
                          style={{
                            ...tdStyle,
                            borderTop: `3px solid ${P}`,
                            borderBottom: "none",
                            fontWeight: 600,
                          }}
                        >
                          {focusCount}
                        </TD>
                      </TR>
                    </TBody>
                  </Table>
                </div>
              </section>

              {/* ------------------------------------------ trend chart */}
              <section data-wf="b-4-0" className="mb-12" style={panel}>
                <SectionHead
                  num="03"
                  kicker="Over time"
                  title={`Monthly spending trend — ${period.label.toLowerCase()}`}
                >
                  <div className="text-left sm:text-right">
                    <p className={labelCls} style={{ color: N }}>
                      Average per month
                    </p>
                    <p className="mt-1 text-[26px] leading-none" style={{ ...headingFont, ...nums }}>
                      {fmtMoney(rangeAvg)}
                    </p>
                  </div>
                </SectionHead>

                <div className="p-5 sm:p-7">
                  <div className="relative" style={{ height: "248px" }}>
                    <div
                      className="absolute inset-x-0 flex items-center"
                      style={{ bottom: `${(rangeAvg / trendMax) * 84}%` }}
                      aria-hidden="true"
                    >
                      <span
                        className="block w-full"
                        style={{ borderTop: `2px dashed ${tint(P, 0.45)}` }}
                      />
                    </div>
                    <ol
                      className="absolute inset-0 flex items-stretch gap-2 sm:gap-4"
                      style={{ borderBottom: `3px solid ${P}` }}
                    >
                      {monthRows.map((r, i) => {
                        const h = trendMax ? (r.total / trendMax) * 84 : 0;
                        const partial = r.month.partial;
                        return (
                          <li key={r.month.key} className="relative flex-1">
                            <div
                              className="rp-col absolute inset-x-0 bottom-0"
                              style={{
                                height: `${h}%`,
                                backgroundColor: partial ? BG : P,
                                border: partial ? `3px solid ${P}` : "none",
                                backgroundImage: partial
                                  ? `repeating-linear-gradient(45deg, ${A} 0 6px, ${BG} 6px 12px)`
                                  : "none",
                                animationDelay: `${i * 60}ms`,
                              }}
                            />
                            <span
                              className="absolute inset-x-0 text-center text-[11px]"
                              style={{ bottom: `calc(${h}% + 8px)`, ...nums, color: P }}
                            >
                              {fmtMoney(r.total)}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  <ol className="mt-3 flex items-start gap-2 sm:gap-4">
                    {monthRows.map((r) => (
                      <li key={r.month.key} className="flex-1 text-center">
                        <span className={labelCls} style={{ color: N, ...nums }}>
                          {r.month.short}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div
                    className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px]"
                    style={{ borderTop: `1px dashed ${tint(P, 0.4)}`, color: N }}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-6"
                        style={{
                          border: `2px solid ${P}`,
                          backgroundImage: `repeating-linear-gradient(45deg, ${A} 0 4px, ${BG} 4px 8px)`,
                        }}
                        aria-hidden="true"
                      />
                      Month-to-date, not a full month
                    </span>
                    <span className="inline-flex items-center gap-2" style={nums}>
                      <span
                        className="inline-block w-6"
                        style={{ borderTop: `2px dashed ${tint(P, 0.6)}` }}
                        aria-hidden="true"
                      />
                      Average {fmtMoney(rangeAvg)} per month
                    </span>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------ month totals */}
              <section data-wf="b-5-0" className="mb-6" style={panel}>
                <SectionHead num="04" kicker="Comparison" title="Month-by-month totals">
                  <p className="text-[11px] max-w-[26ch]" style={{ color: N }}>
                    Most recent first. Change compares each month with the one before it.
                  </p>
                </SectionHead>

                <div className="overflow-x-auto p-5 sm:p-7">
                  <Table className="w-full min-w-[560px]" style={nums}>
                    <caption className="sr-only">
                      Total spending per month for {rangeLabel}, with change against the previous
                      month
                    </caption>
                    <THead>
                      <TR>
                        <TH
                          data-wf="i-5-0-0"
                          scope="col"
                          className="text-left"
                          style={thStyle}
                        >
                          <span className={labelCls} style={{ color: N, fontWeight: 600 }}>
                            Month
                          </span>
                        </TH>
                        <TH
                          data-wf="i-5-0-1"
                          scope="col"
                          className="text-right"
                          style={thStyle}
                        >
                          <span className={labelCls} style={{ color: N, fontWeight: 600 }}>
                            Total spent
                          </span>
                        </TH>
                        <TH
                          data-wf="i-5-0-2"
                          scope="col"
                          className="text-right"
                          style={thStyle}
                        >
                          <span className={labelCls} style={{ color: N, fontWeight: 600 }}>
                            Change vs previous
                          </span>
                        </TH>
                      </TR>
                    </THead>
                    <TBody>
                      {[...monthRows].reverse().map((r) => {
                        const delta = r.prev == null ? null : r.total - r.prev;
                        const pct =
                          r.prev && r.prev !== 0 ? Math.abs((delta / r.prev) * 100) : null;
                        const up = delta != null && delta > 0;
                        return (
                          <TR key={r.month.key}>
                            <TD style={tdStyle}>
                              <span className="inline-flex items-center gap-3">
                                <span style={{ fontWeight: 600 }}>{r.month.label}</span>
                                {r.month.partial && (
                                  <Badge
                                    className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5"
                                    style={{
                                      border: `1px solid ${P}`,
                                      color: P,
                                      backgroundColor: "transparent",
                                      borderRadius: brand.radius,
                                    }}
                                  >
                                    Month to date
                                  </Badge>
                                )}
                              </span>
                            </TD>
                            <TD className="text-right" style={tdStyle}>
                              {fmtMoney(r.total)}
                            </TD>
                            <TD className="text-right" style={tdStyle}>
                              {delta == null ? (
                                <span style={{ color: N }}>— no earlier month logged</span>
                              ) : (
                                <span className="inline-flex items-center justify-end gap-2">
                                  <ChevronDown
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                    style={{ transform: up ? "rotate(180deg)" : "none" }}
                                  />
                                  <span>
                                    {up ? "+" : "−"}
                                    {fmtMoney(Math.abs(delta)).replace("$", "$")}
                                  </span>
                                  {pct != null && (
                                    <span style={{ color: N }}>
                                      ({up ? "+" : "−"}
                                      {pct.toFixed(1)}%)
                                    </span>
                                  )}
                                </span>
                              )}
                            </TD>
                          </TR>
                        );
                      })}
                      <TR>
                        <TD
                          style={{ ...tdStyle, borderTop: `3px solid ${P}`, borderBottom: "none" }}
                        >
                          <span className={labelCls} style={{ fontWeight: 600 }}>
                            Range total
                          </span>
                        </TD>
                        <TD
                          className="text-right"
                          style={{
                            ...tdStyle,
                            borderTop: `3px solid ${P}`,
                            borderBottom: "none",
                            fontWeight: 600,
                          }}
                        >
                          {fmtMoney(rangeTotal)}
                        </TD>
                        <TD
                          className="text-right"
                          style={{ ...tdStyle, borderTop: `3px solid ${P}`, borderBottom: "none" }}
                        >
                          <span style={{ color: N }}>
                            {fmtMoney(rangeAvg)} average per month
                          </span>
                        </TD>
                      </TR>
                    </TBody>
                  </Table>
                </div>
              </section>
            </>
          ) : (
            /* ------------------------------------------ empty state */
            <section data-wf="b-6-0" className="mb-6 p-8 sm:p-12" style={panel}>
              <p className={labelCls} style={{ color: N, ...nums }}>
                01–04 / Nothing to plot
              </p>
              <div
                className="mt-6 inline-block"
                style={{ border: `3px solid ${P}`, padding: "10px 14px" }}
                aria-hidden="true"
              >
                <span
                  className="block h-[6px] w-28"
                  style={{
                    backgroundImage: `repeating-linear-gradient(90deg, ${P} 0 8px, transparent 8px 16px)`,
                  }}
                />
              </div>
              <Empty
                className="mt-6 text-left"
                title="Not enough data yet"
                description={`Log expenses to see your category breakdown and trends. Nothing is recorded under ${catLabel} between ${MONTHS[period.from].label} and ${MONTHS[period.to].label}.`}
              />
            </section>
          )}
        </div>

        <footer
          className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-5 text-[11px]"
          style={{ borderTop: `3px solid ${P}`, color: N }}
        >
          <p style={nums}>
            Figures in {CURRENCY.code} · {rangeLabel} · visible only to you
          </p>
        </footer>
      </div>
    </div>
  );
}
