"use client";

import { Check, Minus, X } from "@phosphor-icons/react";

export const STATUS = {
  yes: "yes",
  no: "no",
  partial: "partial",
  limited: "limited",
  lanOnly: "lanOnly",
};

const TABLE_CELL_TEXT =
  "font-inter text-xs leading-relaxed text-[#4D4D4D] sm:text-sm";
const TABLE_HEADER_TEXT =
  "font-funnel-sans text-xs font-semibold leading-snug text-[#121212] sm:text-sm";

function StatusIcon({ status }) {
  if (status === STATUS.yes) {
    return (
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B5E20]">
        <Check size={14} weight="bold" aria-hidden="true" />
      </span>
    );
  }
  if (status === STATUS.no) {
    return (
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FCE8E6] text-[#B3261E]">
        <X size={14} weight="bold" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F4F1] text-[#73411F]">
      <Minus size={14} weight="bold" aria-hidden="true" />
    </span>
  );
}

function StatusCell({
  status,
  label,
  compact = false,
  detail = null,
  align = "center",
}) {
  const textAlign = align === "end" ? "text-right" : "text-center";
  const flexAlign = align === "end" ? "items-end" : "items-center";

  if (compact) {
    return (
      <div className={`flex flex-col gap-1 ${flexAlign}`}>
        <StatusIcon status={status} />
        {detail ? (
          <span className={`${textAlign} ${TABLE_CELL_TEXT}`}>{detail}</span>
        ) : null}
        <span className="sr-only">
          {detail ? `${label} (${detail})` : label}
        </span>
      </div>
    );
  }

  return (
    <span className={`block ${textAlign} ${TABLE_CELL_TEXT}`}>{label}</span>
  );
}

function TextCell({ label, align = "center" }) {
  const textAlign = align === "end" ? "text-right" : "text-center";

  return (
    <span className={`block ${textAlign} ${TABLE_CELL_TEXT}`}>{label}</span>
  );
}

function renderCell(cell, { align = "center" } = {}) {
  if (cell.kind === "status") {
    return (
      <StatusCell
        status={cell.status}
        label={cell.label}
        compact={cell.compact}
        detail={cell.detail}
        align={align}
      />
    );
  }

  return <TextCell label={cell.label} align={align} />;
}

export function status(statusKey, label, { compact = false, detail = null } = {}) {
  return { kind: "status", status: statusKey, label, compact, detail };
}

export function text(label) {
  return { kind: "text", label };
}

/** Mobile: stacked feature cards. Desktop: scrollable table with sticky labels. */
export default function ComparisonMatrix({
  columns,
  rows,
  sections,
  highlightColumnIndex = 0,
}) {
  const tableRows = sections
    ? sections.flatMap((section) => [
        { kind: "section", title: section.title },
        ...section.rows,
      ])
    : rows;

  return (
    <>
      {/* Mobile / tablet stacked cards */}
      <div className="space-y-3 lg:hidden">
        {tableRows.map((row) => {
          if (row.kind === "section") {
            return (
              <p
                key={row.title}
                className="pt-2 font-funnel-sans text-sm font-semibold uppercase tracking-[0.12em] text-[#73411F] sm:text-base"
              >
                {row.title}
              </p>
            );
          }

          return (
            <article
              key={row.feature}
              className={`border border-[#D3D2CD] p-4 sm:p-5 ${
                row.highlighted ? "bg-[#FBF8F3]" : "bg-white"
              }`}
            >
              {row.feature ? (
                <h3
                  className={`font-funnel-sans text-base font-semibold sm:text-lg ${
                    row.highlighted ? "text-[#73411F]" : "text-[#121212]"
                  }`}
                >
                  {row.feature}
                </h3>
              ) : null}
              <ul className={row.feature ? "mt-4" : ""}>
                {columns.map((col, colIndex) => {
                  const cell = row.values[colIndex];
                  const isHighlighted = colIndex === highlightColumnIndex;

                  return (
                    <li
                      key={`${row.feature}-${col}`}
                      className={`grid grid-cols-[minmax(0,1fr)_minmax(5.5rem,9.5rem)] items-center gap-x-4 px-2 py-3 ${
                        colIndex > 0 ? "border-t border-[#E8E7E2]" : ""
                      } ${isHighlighted ? "rounded-md bg-[#FBF8F3]" : ""}`}
                    >
                      <span
                        className={`min-w-0 font-funnel-sans text-sm ${
                          isHighlighted
                            ? "font-semibold text-[#73411F]"
                            : "font-medium text-[#121212]"
                        }`}
                      >
                        {col}
                      </span>
                      <div className="flex justify-end">
                        {renderCell(cell, { align: "end" })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto border border-[#D3D2CD] bg-white">
          <table className="w-full min-w-[1040px] border-collapse">
            <thead>
              <tr className="border-b border-[#D3D2CD] bg-[#F5F4F1]">
                <th
                  className={`sticky left-0 z-30 w-48 min-w-48 border-r border-[#D3D2CD] bg-[#F5F4F1] px-5 py-4 text-left ${TABLE_HEADER_TEXT}`}
                >
                  {/* feature column */}
                </th>
                {columns.map((col, index) => (
                  <th
                    key={col}
                    className={`min-w-[9.5rem] border-r border-[#D3D2CD] px-5 py-4 text-center last:border-r-0 ${TABLE_HEADER_TEXT} ${
                      index === highlightColumnIndex
                        ? "bg-[#FBF8F3] text-[#73411F]"
                        : "text-[#121212]"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(() => {
                let dataRowIndex = 0;

                return tableRows.map((row) => {
                  if (row.kind === "section") {
                    return (
                      <tr key={row.title} className="border-b border-[#D3D2CD]">
                        <th
                          colSpan={columns.length + 1}
                          scope="colgroup"
                          className="sticky left-0 bg-[#F5F4F1] px-5 py-3 text-left font-funnel-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#73411F] sm:text-sm"
                        >
                          {row.title}
                        </th>
                      </tr>
                    );
                  }

                  const zebra = dataRowIndex % 2 === 1 && !row.highlighted;
                  dataRowIndex += 1;

                  return (
                    <tr
                      key={row.feature}
                      className={`border-b border-[#D3D2CD] last:border-b-0 ${
                        row.highlighted
                          ? "bg-[#FBF8F3]"
                          : zebra
                            ? "bg-[#FAFAF8]"
                            : ""
                      }`}
                    >
                      <th
                        scope="row"
                        className={`sticky left-0 z-20 w-48 min-w-48 border-r border-[#D3D2CD] px-5 py-4 text-center align-middle ${TABLE_HEADER_TEXT} ${
                          row.highlighted
                            ? "bg-[#FBF8F3] text-[#73411F]"
                            : zebra
                              ? "bg-[#FAFAF8] text-[#121212]"
                              : "bg-white text-[#121212]"
                        }`}
                      >
                        {row.feature}
                      </th>
                      {row.values.map((cell, cellIndex) => {
                        const highlighted = cellIndex === highlightColumnIndex;
                        const stickyBg = row.highlighted
                          ? "bg-[#FBF8F3]"
                          : zebra
                            ? "bg-[#FAFAF8]"
                            : "bg-white";

                        return (
                          <td
                            key={`${row.feature}-${cellIndex}`}
                            className={`min-w-[9.5rem] border-r border-[#D3D2CD] px-5 py-4 text-center align-middle last:border-r-0 ${
                              highlighted ? "bg-[#FBF8F3]/80" : stickyBg
                            }`}
                          >
                            {renderCell(cell)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
