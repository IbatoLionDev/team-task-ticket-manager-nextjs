"use client";

import { useState } from "react";

export function useClientForm({ url, onSuccess }) {
  const [fields, setFields] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      const result = await res.json();
      if (onSuccess) onSuccess(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    fields,
    handleChange,
    handleSubmit,
    error,
    loading,
  };
}
