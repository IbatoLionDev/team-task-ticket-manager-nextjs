"use client";

import { useState, useEffect } from "react";

export function useClientFetch(url, onSuccess, method = "GET") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(url, {
          method,
          credentials: "include",
        });
        if (!response.ok) {
          const errorText = await response.text();
          if (isMounted) setError(errorText || "Fetch failed");
          setLoading(false);
          return;
        }
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
          if (onSuccess) onSuccess(jsonData);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Fetch error");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, method]);

  return { data, loading, error };
}
