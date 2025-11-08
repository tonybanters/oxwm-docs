---
title: Configuration Overview
description: Understanding oxwm configuration
---

oxwm uses a human-readable configuration file written in Lua, a lightweight and flexible scripting language.

## Configuration File Location

The configuration file is located at:

```
~/.config/oxwm/config.lua
```

This follows the XDG Base Directory specification.

## Generating Default Config

On first run, oxwm automatically generates a default configuration. You can also manually generate it:

```bash
oxwm --init
```

If a config already exists, it will be backed up with a timestamp.

## Using Custom Config Path

You can specify a custom configuration file:

```bash
oxwm --config /path/to/custom/config.lua
```

## Migrating from RON

If you have an existing RON configuration, oxwm provides an automatic migration tool:

```bash
oxwm --migrate
```

This will convert your `config.ron` to `config.lua`, preserving all settings and creating a backup of the old file.

## Hot Reloading

One of oxwm's best features is hot configuration reloading. After editing your config file, press:

```
Mod+Shift+R
```

Your changes take effect immediately without restarting your X session or losing window state.

## Configuration Structure

The config file is a Lua table that you return with the following main sections:

```lua
return {
    -- Appearance
    border_width = 2,
    border_focused = "#6dade3",
    border_unfocused = "#bbbbbb",
    font = "monospace:style=Bold:size=10",

    -- Window gaps
    gaps_enabled = true,
    gap_inner_horizontal = 5,
    gap_inner_vertical = 5,
    gap_outer_horizontal = 5,
    gap_outer_vertical = 5,

    -- Basics
    terminal = "st",
    modkey = "Mod4",

    -- Tags (workspaces)
    tags = { "1", "2", "3", "4", "5", "6", "7", "8", "9" },

    -- Layout configuration
    layout_symbols = {
        { name = "tiling", symbol = "[T]" },
        { name = "normie", symbol = "[F]" },
    },

    -- Keybindings
    keybindings = {
        -- ... keybinding definitions
    },

    -- Status bar
    status_blocks = {
        -- ... status block definitions
    },

    -- Color schemes
    scheme_normal = { foreground = "#bbbbbb", background = "#1a1b26", underline = "#444444" },
    scheme_occupied = { foreground = "#0db9d7", background = "#1a1b26", underline = "#0db9d7" },
    scheme_selected = { foreground = "#0db9d7", background = "#1a1b26", underline = "#ad8ee6" },
}
```

## Variables and Modularization

Lua's native features make configs clean and maintainable:

```lua
local terminal = "alacritty"
local modkey = "Mod4"
local color_blue = "#6dade3"

return {
    terminal = terminal,
    modkey = modkey,
    border_focused = color_blue,

    keybindings = {
        { modifiers = { modkey }, key = "Return", action = "Spawn", arg = terminal },
    },
}
```

You can also split your config into multiple files using `require()`:

```lua
-- keybindings.lua
return {
    { modifiers = { "Mod4" }, key = "Return", action = "Spawn", arg = "st" },
    -- ... more keybindings
}

-- config.lua
local keybindings = require("keybindings")

return {
    modkey = "Mod4",
    keybindings = keybindings,
}
```

## Color Format

Colors can be specified in two formats:

```lua
-- Hexadecimal with 0x prefix (like in C)
border_focused = 0x6dade3

-- Or as strings with # prefix
border_focused = "#6dade3"

-- Examples:
"#6dade3"  -- Light blue
"#ff0000"  -- Red
"#00ff00"  -- Green
"#0000ff"  -- Blue
"#1a1b26"  -- Dark gray
"#ffffff"  -- White
```

Both formats work identically - use whichever you prefer!

## Comments

Use `--` for single-line comments:

```lua
-- This is a comment
border_width = 2,  -- This is also a comment

--[[ This is a
     multi-line comment ]]
```

## Configuration Sections

Explore each section in detail:

- [Config File Format](/configuration/format/) - Lua syntax and structure
- [Appearance](/configuration/appearance/) - Borders, gaps, colors, fonts
- [Keybindings](/configuration/keybindings/) - Custom keyboard shortcuts
- [Status Bar](/configuration/status-bar/) - Status bar blocks and customization

## Validation

If oxwm fails to start after a config change:

1. Check for syntax errors in your Lua file
2. Ensure all required fields are present
3. Verify color codes are valid (6 hex digits)
4. Make sure you're returning the config table
5. Restore from backup: `~/.config/oxwm/config.lua.backup.*`

You can also test your Lua syntax directly:

```bash
lua -c ~/.config/oxwm/config.lua
```

Common mistakes:

- Missing commas between fields
- Using `:` instead of `=` for assignment
- Forgetting the `return` statement
- Missing quotes around string values
- Mismatched brackets `{}`, `[]`, `()`
