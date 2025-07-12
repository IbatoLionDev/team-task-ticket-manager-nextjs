"use client";
import { useEffect, useState } from "react";

export function useApiToken(apiUrl, token) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : undefined;
        const res = await fetch(apiUrl, { headers });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setData(null);
        }
      } catch {
        setData(null);
      }
    }
    if (apiUrl) {
      fetchData();
    }
  }, [apiUrl, token]);

  return data;
}
