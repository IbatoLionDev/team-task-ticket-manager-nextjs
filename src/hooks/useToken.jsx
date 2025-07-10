import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function useToken({ cookieName = "token", select, initial } = {}) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const token = Cookies.get(cookieName);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setValue(select ? select(decoded) : decoded);
      } catch (e) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.warn(
            `Invalid JWT token in cookies for useToken [${cookieName}]`,
            e
          );
        }
        setValue(initial);
      }
    } else {
      setValue(initial);
    }
  }, [cookieName, select, initial]);

  return value;
}
