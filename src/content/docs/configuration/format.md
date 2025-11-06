---
title: Config File Format
description: Understanding RON configuration syntax
---

oxwm uses RON (Rusty Object Notation) for its configuration format. This page explains the syntax and structure.

## What is RON?

RON is a simple, readable data format similar to JSON but with Rust-like syntax. It's more human-friendly than JSON with features like:

- Trailing commas allowed
- Comments with `//`
- Struct-like syntax with field names
- Type-safe values

## Basic Syntax

### Structure

The entire config is a single struct (tuple struct in RON terminology):

```ron
(
    field1: value1,
    field2: value2,
    field3: value3,
)
```

### Data Types

**Integers:**
```ron
border_width: 2,
```

**Hexadecimal (for colors):**
```ron
border_focused: 0x6dade3,
```

**Strings:**
```ron
terminal: "alacritty",
font: "JetBrains Mono:style=Bold:size=11",
```

**Booleans:**
```ron
gaps_enabled: true,
```

**Enums (variants):**
```ron
modkey: Mod4,
```

**Lists:**
```ron
tags: ["1", "2", "3", "4", "5"],
```

**Nested Structs:**
```ron
scheme_normal: (
    foreground: 0xbbbbbb,
    background: 0x1a1b26,
    underline: 0x444444
),
```

## Preprocessor Directives

oxwm adds a custom preprocessor on top of RON for variable substitution.

### Variable Definition

Define variables at the top of your config:

```ron
#DEFINE $terminal = "alacritty"
#DEFINE $mod = Mod4
#DEFINE $blue = 0x6dade3
#DEFINE $gray = 0xbbbbbb
```

### Variable Usage

Use variables anywhere in your config:

```ron
(
    terminal: $terminal,
    modkey: $mod,
    border_focused: $blue,
    border_unfocused: $gray,

    keybindings: [
        (modifiers: [$mod], key: Return, action: Spawn, arg: $terminal),
        (modifiers: [$mod, Shift], key: Q, action: Quit),
    ],
)
```

### Variable Naming Rules

- Must start with `$`
- Can contain letters, numbers, and underscores
- Case-sensitive
- Must be defined before use

## Complete Example

Here's a minimal but complete configuration:

```ron
#DEFINE $terminal = "st"
#DEFINE $mod = Mod4

(
    // Appearance
    border_width: 2,
    border_focused: 0x6dade3,
    border_unfocused: 0xbbbbbb,
    font: "monospace:style=Bold:size=10",

    // Gaps
    gaps_enabled: true,
    gap_inner_horizontal: 5,
    gap_inner_vertical: 5,
    gap_outer_horizontal: 5,
    gap_outer_vertical: 5,

    // Basics
    terminal: $terminal,
    modkey: $mod,

    // Tags
    tags: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],

    // Layouts
    layout_symbols: [
        (name: "tiling", symbol: "[T]"),
        (name: "normie", symbol: "[F]"),
    ],

    // Keybindings
    keybindings: [
        (modifiers: [$mod], key: Return, action: Spawn, arg: $terminal),
        (modifiers: [$mod], key: D, action: Spawn, arg: "dmenu_run"),
        (modifiers: [$mod], key: Q, action: Kill),
        (modifiers: [$mod, Shift], key: Q, action: Quit),
        (modifiers: [$mod, Shift], key: R, action: Reload),
    ],

    // Status bar
    status_blocks: [
        (
            format: "{}",
            command: "DateTime",
            command_arg: "%H:%M",
            interval_secs: 60,
            color: 0x0db9d7,
            underline: true
        ),
    ],

    // Color schemes
    scheme_normal: (
        foreground: 0xbbbbbb,
        background: 0x1a1b26,
        underline: 0x444444
    ),
    scheme_occupied: (
        foreground: 0x0db9d7,
        background: 0x1a1b26,
        underline: 0x0db9d7
    ),
    scheme_selected: (
        foreground: 0x0db9d7,
        background: 0x1a1b26,
        underline: 0xad8ee6
    ),
)
```

## Keybinding Formats

oxwm supports two keybinding formats:

### Single Key Format

For simple single-key bindings:

```ron
(modifiers: [Mod4], key: Return, action: Spawn, arg: "st"),
(modifiers: [Mod4, Shift], key: Q, action: Quit),
```

### Keychord Format

For multi-key sequences (like vim or emacs):

```ron
(
    keys: [
        (modifiers: [Mod4], key: Space),  // First press: Mod4+Space
        (modifiers: [], key: T),           // Then press: T
    ],
    action: Spawn,
    arg: "st"
),
```

Press `Escape` to cancel a keychord sequence.

## Status Block Format

Status blocks have a specific structure:

```ron
(
    format: "RAM: {used}/{total} GB",  // Format string with placeholders
    command: "Ram",                     // Command type
    command_arg: "",                    // Optional argument (for Shell/DateTime)
    interval_secs: 5,                   // Update interval
    color: 0x7aa2f7,                   // Text color
    underline: true                     // Show underline
),
```

For battery blocks, use `battery_formats`:

```ron
(
    format: "",
    command: "Battery",
    battery_formats: (
        charging: "󰂄 {}%",
        discharging: "󰁹 {}%",
        full: "󰁹 {}%",
    ),
    interval_secs: 30,
    color: 0x9ece6a,
    underline: true
),
```

## Common Mistakes

### Missing Commas

```ron
// ❌ Wrong - missing comma
(
    border_width: 2
    border_focused: 0x6dade3
)

// ✅ Correct
(
    border_width: 2,
    border_focused: 0x6dade3,
)
```

### Wrong Bracket Types

```ron
// ❌ Wrong - using curly braces
{
    terminal: "st",
}

// ✅ Correct - using parentheses
(
    terminal: "st",
)
```

### Invalid Hex Colors

```ron
// ❌ Wrong - too few digits
border_focused: 0x6dae,

// ✅ Correct - exactly 6 hex digits
border_focused: 0x6dade3,
```

### Undefined Variables

```ron
// ❌ Wrong - variable not defined
(
    terminal: $my_terminal,
)

// ✅ Correct - define before use
#DEFINE $my_terminal = "st"

(
    terminal: $my_terminal,
)
```

## Tips

1. **Use trailing commas** - Makes adding/removing fields easier
2. **Define color variables** - Maintain consistent color scheme
3. **Comment liberally** - Document your customizations
4. **Test incrementally** - Make small changes and reload frequently with `Mod+Shift+R`
5. **Keep a backup** - oxwm creates backups, but make your own too

## Validation Tools

Check your config syntax:

```bash
# Try to start oxwm with your config (will show errors if invalid)
oxwm --config ~/.config/oxwm/config.ron
```

If there are syntax errors, oxwm will print the error and line number.
