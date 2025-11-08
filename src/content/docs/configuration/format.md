---
title: Config File Format
description: Understanding Lua configuration syntax
---

oxwm uses Lua for its configuration format. This page explains the syntax and structure.

## What is Lua?

Lua is a lightweight, embeddable scripting language that's perfect for configuration. It's highly readable and flexible with features like:

- Simple table-based syntax
- Comments with `--`
- Variables and functions for modularization
- Support for `require()` to split configs into modules

## Basic Syntax

### Structure

The entire config is a Lua table that you return from the config file:

```lua
return {
    field1 = value1,
    field2 = value2,
    field3 = value3,
}
```

### Data Types

**Integers:**
```lua
border_width = 2,
```

**Hexadecimal (for colors):**
```lua
border_focused = 0x6dade3,  -- or "#6dade3" (both work)
```

**Strings:**
```lua
terminal = "alacritty",
font = "JetBrains Mono:style=Bold:size=11",
```

**Booleans:**
```lua
gaps_enabled = true,
```

**String values (for modkeys, actions):**
```lua
modkey = "Mod4",
```

**Lists (tables):**
```lua
tags = { "1", "2", "3", "4", "5" },
```

**Nested Tables:**
```lua
scheme_normal = {
    foreground = "#bbbbbb",
    background = "#1a1b26",
    underline = "#444444"
},
```

## Variables and Modularization

Lua's native variable system makes configs clean and maintainable.

### Variable Definition

Define variables at the top of your config using `local`:

```lua
local terminal = "alacritty"
local modkey = "Mod4"
local blue = "#6dade3"
local gray = "#bbbbbb"
```

### Variable Usage

Use variables anywhere in your config:

```lua
return {
    terminal = terminal,
    modkey = modkey,
    border_focused = blue,
    border_unfocused = gray,

    keybindings = {
        { modifiers = { modkey }, key = "Return", action = "Spawn", arg = terminal },
        { modifiers = { modkey, "Shift" }, key = "Q", action = "Quit" },
    },
}
```

### Color Palettes

Create organized color schemes with tables:

```lua
local colors = {
    fg = "#bbbbbb",
    bg = "#1a1b26",
    blue = "#6dade3",
    red = "#f7768e",
    cyan = "#0db9d7",
}

return {
    border_focused = colors.blue,
    scheme_normal = {
        foreground = colors.fg,
        background = colors.bg,
    },
}
```

### Modular Configs with `require()`

Split your config into multiple files:

```lua
-- ~/.config/oxwm/keybindings.lua
return {
    { modifiers = { "Mod4" }, key = "Return", action = "Spawn", arg = "st" },
    { modifiers = { "Mod4" }, key = "Q", action = "KillClient" },
}

-- ~/.config/oxwm/config.lua
local keybindings = require("keybindings")

return {
    modkey = "Mod4",
    keybindings = keybindings,
}
```

## Complete Example

Here's a minimal but complete configuration:

```lua
local terminal = "st"
local modkey = "Mod4"

-- Color palette
local colors = {
    fg = "#bbbbbb",
    bg = "#1a1b26",
    blue = "#6dade3",
    cyan = "#0db9d7",
    purple = "#ad8ee6",
}

return {
    -- Appearance
    border_width = 2,
    border_focused = colors.blue,
    border_unfocused = colors.fg,
    font = "monospace:style=Bold:size=10",

    -- Gaps
    gaps_enabled = true,
    gap_inner_horizontal = 5,
    gap_inner_vertical = 5,
    gap_outer_horizontal = 5,
    gap_outer_vertical = 5,

    -- Basics
    terminal = terminal,
    modkey = modkey,

    -- Tags
    tags = { "1", "2", "3", "4", "5", "6", "7", "8", "9" },

    -- Layouts
    layout_symbols = {
        { name = "tiling", symbol = "[T]" },
        { name = "normie", symbol = "[F]" },
    },

    -- Keybindings
    keybindings = {
        { modifiers = { modkey }, key = "Return", action = "Spawn", arg = terminal },
        { modifiers = { modkey }, key = "D", action = "Spawn", arg = "dmenu_run" },
        { modifiers = { modkey }, key = "Q", action = "KillClient" },
        { modifiers = { modkey, "Shift" }, key = "Q", action = "Quit" },
        { modifiers = { modkey, "Shift" }, key = "R", action = "Restart" },
    },

    -- Status bar
    status_blocks = {
        {
            format = "{}",
            command = "DateTime",
            command_arg = "%H:%M",
            interval_secs = 60,
            color = colors.cyan,
            underline = true
        },
    },

    -- Color schemes
    scheme_normal = {
        foreground = colors.fg,
        background = colors.bg,
        underline = "#444444"
    },
    scheme_occupied = {
        foreground = colors.cyan,
        background = colors.bg,
        underline = colors.cyan
    },
    scheme_selected = {
        foreground = colors.cyan,
        background = colors.bg,
        underline = colors.purple
    },
}
```

## Keybinding Formats

oxwm supports two keybinding formats:

### Single Key Format

For simple single-key bindings:

```lua
{ modifiers = { "Mod4" }, key = "Return", action = "Spawn", arg = "st" },
{ modifiers = { "Mod4", "Shift" }, key = "Q", action = "Quit" },
```

### Keychord Format

For multi-key sequences (like vim or emacs):

```lua
{
    keys = {
        { modifiers = { "Mod4" }, key = "Space" },  -- First press: Mod4+Space
        { modifiers = { }, key = "T" },             -- Then press: T
    },
    action = "Spawn",
    arg = "st"
},
```

Press `Escape` to cancel a keychord sequence.

## Status Block Format

Status blocks have a specific structure:

```lua
{
    format = "RAM: {used}/{total} GB",  -- Format string with placeholders
    command = "Ram",                     -- Command type
    command_arg = "",                    -- Optional argument (for Shell/DateTime)
    interval_secs = 5,                   -- Update interval
    color = "#7aa2f7",                   -- Text color
    underline = true                     -- Show underline
},
```

For battery blocks, use `battery_formats`:

```lua
{
    format = "",
    command = "Battery",
    battery_formats = {
        charging = "󰂄 {}%",
        discharging = "󰁹 {}%",
        full = "󰁹 {}%",
    },
    interval_secs = 30,
    color = "#9ece6a",
    underline = true
},
```

## Common Mistakes

### Missing Commas

```lua
-- ❌ Wrong - missing comma
return {
    border_width = 2
    border_focused = "#6dade3"
}

-- ✅ Correct
return {
    border_width = 2,
    border_focused = "#6dade3",
}
```

### Wrong Assignment Operator

```lua
-- ❌ Wrong - using colon
return {
    terminal: "st",
}

-- ✅ Correct - using equals
return {
    terminal = "st",
}
```

### Invalid Color Format

```lua
-- ❌ Wrong - missing quotes for hex string
border_focused = #6dade3,

-- ✅ Correct - quotes or 0x prefix
border_focused = "#6dade3",  -- or 0x6dade3
```

### Using Global Variables

```lua
-- ❌ Wrong - no local keyword
terminal = "st"

return {
    terminal = terminal,
}

-- ✅ Correct - use local
local terminal = "st"

return {
    terminal = terminal,
}
```

### Forgetting to Return

```lua
-- ❌ Wrong - no return statement
{
    terminal = "st",
}

-- ✅ Correct - must return the table
return {
    terminal = "st",
}
```

## Tips

1. **Use trailing commas** - Makes adding/removing fields easier
2. **Use local variables** - Define color palettes and reuse them
3. **Comment liberally** - Use `--` to document your customizations
4. **Split large configs** - Use `require()` to modularize
5. **Test incrementally** - Make small changes and reload frequently with `Mod+Shift+R`
6. **Keep a backup** - oxwm creates backups, but make your own too

## Migrating from RON

If you have an old RON config, use the migration tool:

```bash
oxwm --migrate
```

This will automatically convert your `config.ron` to `config.lua`, preserving all settings and creating a backup of your old config.

## Validation Tools

Check your config syntax:

```bash
# Try to start oxwm with your config (will show errors if invalid)
oxwm --config ~/.config/oxwm/config.lua

# Or test Lua syntax directly
lua -c ~/.config/oxwm/config.lua
```

If there are syntax errors, oxwm will print the error and line number.
