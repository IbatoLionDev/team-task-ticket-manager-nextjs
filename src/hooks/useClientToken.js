"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";

export function useClientToken(cookieName = "token") {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = Cookies.get(cookieName);
    if (process.env.NODE_ENV === "development") {
      console.log(`[useClientToken] Token from cookie [${cookieName}]:`, token);
    }
    if (!token) {
      setUser(undefined);
      return;
    }
    try {
      const decoded = decodeJwt(token);
      if (process.env.NODE_ENV === "development") {
        console.log(`[useClientToken] Decoded token:`, decoded);
      }
      setUser(decoded);
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Invalid JWT token in cookies for useClientToken [${cookieName}]`,
          e
        );
      }
      setUser(undefined);
    }
  }, [cookieName]);

  return user;
}
