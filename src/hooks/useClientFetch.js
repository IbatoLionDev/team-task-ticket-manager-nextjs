"use client";

import { useState, useEffect, useCallback } from "react";

export function useClientFetch(url, method = "GET", options = {}) {
  const { onSuccess } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
      });
      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Fetch failed");
        return;
      }
      const jsonData = await response.json();
      setData(jsonData);
      if (typeof onSuccess === "function") {
        onSuccess(jsonData);
      }
    } catch (err) {
      setError(err.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  }, [url, method, onSuccess]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
