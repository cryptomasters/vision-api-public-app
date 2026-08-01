# Vision API public application

Static, dependency-free public application surface for `Vision API
20260726-01`. It contains a home page, UI-only sign-in and registration
surfaces, and the verified Privacy Policy and Data Deletion instructions.

This repository contains only the public static surface. No authentication
backend is connected, and submitted form values are neither stored nor
transmitted.

## Local preview

Serve this directory with any static HTTP server and open `index.html`.

## Verification

- `npm run check:js`
- `npm test`

The test locks the five pages, local asset references, verified legal copy,
no-network/no-storage behavior, safe form fallbacks, truthful UI-only states,
keyboard focus transfer, and minimum text contrast tokens.

## Routes

- `index.html`
- `sign-in.html`
- `register.html`
- `privacy.html`
- `data-deletion.html`
