"use client";

import { useState, useCallback } from "react";

export function useClientFetch({ url, method = "GET", onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const execute = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url, {
        method,
        credentials: "include",
      });
      if (response.ok === false) {
        const errorText = await response.text();
        setError(errorText || "Fetch failed");
        setLoading(false);
        return;
      }
      const data = await response.json();
      if (typeof onSuccess === "function") onSuccess(data);
    } catch (err) {
      setError(err.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  }, [url, method, onSuccess]);

  return { execute, loading, error };
}
