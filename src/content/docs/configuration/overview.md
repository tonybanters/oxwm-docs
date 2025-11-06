---
title: Configuration Overview
description: Understanding oxwm configuration
---

oxwm uses a human-readable configuration file written in RON (Rusty Object Notation) format with a custom preprocessor for variables.

## Configuration File Location

The configuration file is located at:

```
~/.config/oxwm/config.ron
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
oxwm --config /path/to/custom/config.ron
```

## Hot Reloading

One of oxwm's best features is hot configuration reloading. After editing your config file, press:

```
Mod+Shift+R
```

Your changes take effect immediately without restarting your X session or losing window state.

## Configuration Structure

The config file is a single RON struct with the following main sections:

```ron
(
    // Appearance
    border_width: 2,
    border_focused: 0x6dade3,
    border_unfocused: 0xbbbbbb,
    font: "monospace:style=Bold:size=10",

    // Window gaps
    gaps_enabled: true,
    gap_inner_horizontal: 5,
    gap_inner_vertical: 5,
    gap_outer_horizontal: 5,
    gap_outer_vertical: 5,

    // Basics
    terminal: "st",
    modkey: Mod4,

    // Tags (workspaces)
    tags: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],

    // Layout configuration
    layout_symbols: [
        (name: "tiling", symbol: "[T]"),
        (name: "normie", symbol: "[F]"),
    ],

    // Keybindings
    keybindings: [
        // ... keybinding definitions
    ],

    // Status bar
    status_blocks: [
        // ... status block definitions
    ],

    // Color schemes
    scheme_normal: (foreground: 0xbbbbbb, background: 0x1a1b26, underline: 0x444444),
    scheme_occupied: (foreground: 0x0db9d7, background: 0x1a1b26, underline: 0x0db9d7),
    scheme_selected: (foreground: 0x0db9d7, background: 0x1a1b26, underline: 0xad8ee6),
)
```

## Preprocessor Variables

oxwm's config preprocessor supports variable definitions for reducing repetition:

```ron
#DEFINE $terminal = "alacritty"
#DEFINE $mod = Mod4
#DEFINE $color_blue = 0x6dade3

(
    terminal: $terminal,
    modkey: $mod,
    border_focused: $color_blue,

    keybindings: [
        (modifiers: [$mod], key: Return, action: Spawn, arg: $terminal),
    ],
)
```

Variables must be defined before use with the `#DEFINE` directive.

## Color Format

Colors use hexadecimal format with 24-bit RGB:

```ron
0xRRGGBB

// Examples:
0x6dade3  // Light blue
0xff0000  // Red
0x00ff00  // Green
0x0000ff  // Blue
0x1a1b26  // Dark gray
0xffffff  // White
```

## Comments

Use `//` for single-line comments:

```ron
// This is a comment
border_width: 2,  // This is also a comment
```

## Configuration Sections

Explore each section in detail:

- [Config File Format](/configuration/format/) - RON syntax and structure
- [Appearance](/configuration/appearance/) - Borders, gaps, colors, fonts
- [Keybindings](/configuration/keybindings/) - Custom keyboard shortcuts
- [Status Bar](/configuration/status-bar/) - Status bar blocks and customization

## Validation

If oxwm fails to start after a config change:

1. Check for syntax errors in your RON file
2. Ensure all required fields are present
3. Verify hex color codes are valid (6 digits after `0x`)
4. Check that variable names match their definitions
5. Restore from backup: `~/.config/oxwm/config.ron.backup.*`

Common mistakes:

- Missing commas between fields
- Mismatched brackets `()`, `[]`
- Undefined variables
- Invalid key names
- Incorrect enum values (e.g., `Mod5` instead of `Mod4`)
