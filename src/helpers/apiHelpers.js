import { NextResponse } from "next/server";

export const jsonError = (m, s = 400) =>
  NextResponse.json({ error: m }, { status: s });

export const buildSelect = (allFields, searchParams) => {
  const keys = Array.from(searchParams.keys());
  if (!keys.some((k) => allFields.includes(k))) {
    return allFields.reduce((acc, f) => {
      acc[f] = true;
      return acc;
    }, {});
  }
  return allFields.reduce((acc, f) => {
    if (searchParams.has(f)) acc[f] = true;
    return acc;
  }, {});
};

export const parsePagination = (searchParams) => {
  const hasPage = searchParams.has("page"),
    hasPageSize = searchParams.has("pageSize");
  if (!hasPage && !hasPageSize) return {};
  const page = parseInt(searchParams.get("page"), 10) || 1,
    pageSize = parseInt(searchParams.get("pageSize"), 10) || 10;
  if (page <= 0 || pageSize <= 0) return {};
  return { skip: (page - 1) * pageSize, take: pageSize };
};

export const safeParseId = (v) => {
  const id = typeof v === "string" ? parseInt(v, 10) : v;
  return !id || isNaN(id) ? null : id;
};
