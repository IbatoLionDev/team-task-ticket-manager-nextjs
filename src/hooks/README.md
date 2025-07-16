# Custom React Hooks Documentation

This document provides an overview and usage details for the custom React hooks available in this project under the `src/hooks/` directory.

---

## useIsMobile

Detects if the current viewport width is less than the mobile breakpoint (768px) and returns a boolean indicating if the device is mobile.

**Usage:**

```js
import { useIsMobile } from "../hooks/use-mobile";

const isMobile = useIsMobile();
```

**Returns:** `boolean` — `true` if viewport width is less than 768px, otherwise `false`.

---

## useApiToken

Fetches data from a given API URL with an optional Bearer token for authorization. Returns the fetched data or `null` if the fetch fails or the response is not ok.

**Parameters:**

- `apiUrl` (string): The API endpoint URL to fetch data from.
- `token` (string | undefined): Optional Bearer token for authorization.

**Usage:**

```js
import { useApiToken } from "../hooks/useApiToken";

const data = useApiToken("/api/data", "your-token-here");
```

**Returns:** The fetched data or `null`.

---

## useClientForm

Manages form state and submission for client-side forms. Handles field changes, submits form data as JSON to a specified URL via POST, manages loading and error states, and calls an `onSuccess` callback on successful submission.

**Parameters:**

- `url` (string): The URL to submit the form data to.
- `onSuccess` (function): Callback function invoked with the result on successful submission.

**Usage:**

```js
import { useClientForm } from "../hooks/useClientForm";

const { fields, handleChange, handleSubmit, error, loading } = useClientForm({
  url: "/api/submit",
  onSuccess: (result) => console.log("Form submitted", result),
});
```

**Returns:** An object containing:

- `fields`: Current form field values.
- `handleChange(name, value)`: Function to update a field value.
- `handleSubmit(event)`: Function to handle form submission.
- `error`: Error message string if submission failed.
- `loading`: Boolean indicating if submission is in progress.

---

## useClientToken

Reads a JWT token from a cookie (default cookie name `"token"`), decodes it, and returns the decoded user object. Returns `undefined` if no valid token is found. Logs token info in development mode.

**Parameters:**

- `cookieName` (string, optional): The name of the cookie to read the token from. Defaults to `"token"`.

**Usage:**

```js
import { useClientToken } from "../hooks/useClientToken";

const user = useClientToken();
```

**Returns:** The decoded user object from the JWT token or `undefined`.

---

## useClientFetch

Fetches data from a specified API endpoint on the client side using the GET method. Returns an object containing the fetched data, loading state, error state, and a refetch function to reload the data.

**Parameters:**

- `url` (string): The API endpoint URL to fetch data from.
- `method` (string): HTTP method, typically "GET".

**Usage:**

```js
import { useClientFetch } from "../hooks/useClientFetch";

const { data, loading, error, refetch } = useClientFetch("/api/project", "GET");
```

**Returns:** An object with:

- `data`: The fetched data or `null` if not loaded.
- `loading`: Boolean indicating if the fetch is in progress.
- `error`: Error message if the fetch failed.
- `refetch`: Function to manually refetch the data.

---

## Notes

- These hooks are designed to simplify common client-side tasks such as responsive design detection, API data fetching with authentication, form handling, and token management.
