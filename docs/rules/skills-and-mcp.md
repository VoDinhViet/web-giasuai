# Skills And MCP Rules

## Local Skills

- Project-local skills live under `.agents/skills/`.
- Keep skills short and project-specific.
- Do not add README or extra guide files inside a skill unless the skill needs progressive disclosure.
- Use skills to capture workflow and project conventions, not generic framework docs.

## shadcn/ui Skill

- Use the official skill installed at `.agents/skills/shadcn/SKILL.md` for shadcn/ui work.
- The skill was installed with:

```bash
pnpm dlx skills add shadcn/ui
```

- The skill reads this project's `components.json`, installed shadcn components, and registry docs.
- Follow existing local components before installing new registry items.

## shadcn MCP

- Project-level MCP config is in `.mcp.json`.
- The shadcn MCP server command is:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

- MCP lets supported AI clients browse/search/install shadcn registry items.
- No extra registry config is needed for the standard shadcn/ui registry.
- Additional registries must be configured in `components.json` only when a real registry URL is provided.
- Do not store private registry tokens in repo files; use environment variables.

## Codex Note

- shadcn's Codex MCP setup uses user-level `~/.codex/config.toml`, not a repo file.
- Do not edit user-level Codex config from this repo unless explicitly requested.
