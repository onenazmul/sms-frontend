"use client";

import { useEffect, useState } from "react";

interface Meta {
  total: number;
  last_page: number;
}

export function useDataTable(endpoint: string) {
  const [rows, setRows] = useState<any[]>([]);
  const [meta, setMeta] = useState<Meta>({ total: 0, last_page: 1 });
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        per_page: String(limit),
        search,
      }).toString();

      const res = await fetch(`${endpoint}?${params}`);
      const text = await res.text();

      if (!res.ok) {
        console.error("API ERROR:", text);
        throw new Error("API Error");
      }

      const json = text ? JSON.parse(text) : {};

      // Auto-detect Laravel resource wrapper
      const key = Object.keys(json)[0]; // admissions
      const resource = json[key] || {};

      setRows(resource.data || []);
      setMeta({
        total: resource.total || 0,
        last_page: resource.last_page || 1,
      });
    } catch (error) {
      console.error("Load error:", error);
      setRows([]);
      setMeta({ total: 0, last_page: 1 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [page, limit, search]);

  return {
    rows,
    meta,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    reload: load,
  };
}
