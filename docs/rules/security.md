# Security Rules

- Never expose secrets, tokens, passwords, password hashes, connection strings, or private keys.
- Enforce authorization at Server Action boundaries; UI hiding is not security.
- Validate input before API calls or mutations.
- Use authenticated helpers from `lib` instead of repeating auth header logic.
- Use parameterized APIs, ORM APIs, or query builders instead of raw string SQL from user input.
- Do not run database migrations, destructive commands, broad rewrites, or data deletion without explicit approval.
- User-facing text must be Vietnamese with proper accents.
- Code, identifiers, comments, and file names must be English.
