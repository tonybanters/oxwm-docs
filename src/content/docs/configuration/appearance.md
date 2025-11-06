---
title: Appearance
description: Customize oxwm's visual appearance
---

This page covers all appearance-related configuration options in oxwm.

## Window Borders

### Border Width

Control the width of window borders in pixels:

```ron
border_width: 2,  // Recommended: 1-4
```

Set to `0` to disable borders entirely (not recommended as you lose visual focus indication).

### Border Colors

Customize border colors for focused and unfocused windows:

```ron
border_focused: 0x6dade3,    // Color when window has focus
border_unfocused: 0xbbbbbb,  // Color when window is not focused
```

Colors are specified in hexadecimal RGB format (`0xRRGGBB`).

**Popular color schemes:**

```ron
// Tokyo Night
border_focused: 0x7aa2f7,
border_unfocused: 0x414868,

// Dracula
border_focused: 0xbd93f9,
border_unfocused: 0x6272a4,

// Nord
border_focused: 0x88c0d0,
border_unfocused: 0x4c566a,

// Gruvbox
border_focused: 0xfb4934,
border_unfocused: 0x928374,

// Catppuccin Mocha
border_focused: 0x89b4fa,
border_unfocused: 0x6c7086,
```

## Window Gaps

Gaps are the spacing between windows and screen edges.

### Enable/Disable Gaps

```ron
gaps_enabled: true,  // Set to false to disable all gaps
```

You can also toggle gaps at runtime with `Mod+A`.

### Gap Configuration

Configure gaps independently for each direction:

```ron
gap_inner_horizontal: 5,  // Horizontal spacing between windows
gap_inner_vertical: 5,    // Vertical spacing between windows
gap_outer_horizontal: 5,  // Left and right screen edges
gap_outer_vertical: 5,    // Top and bottom screen edges
```

**Common gap configurations:**

```ron
// Minimal gaps (clean look)
gap_inner_horizontal: 3,
gap_inner_vertical: 3,
gap_outer_horizontal: 3,
gap_outer_vertical: 3,

// Comfortable gaps (recommended)
gap_inner_horizontal: 5,
gap_inner_vertical: 5,
gap_outer_horizontal: 5,
gap_outer_vertical: 5,

// Large gaps (spacious)
gap_inner_horizontal: 10,
gap_inner_vertical: 10,
gap_outer_horizontal: 10,
gap_outer_vertical: 10,

// Asymmetric gaps (top bar clearance)
gap_inner_horizontal: 5,
gap_inner_vertical: 5,
gap_outer_horizontal: 5,
gap_outer_vertical: 30,  // Extra space for status bar
```

## Font Configuration

The font setting controls the status bar font:

```ron
font: "monospace:style=Bold:size=10",
```

### Font Format

The format follows Fontconfig syntax:

```
"family:style=STYLE:size=SIZE"
```

**Examples:**

```ron
// System monospace font
font: "monospace:style=Bold:size=10",

// Specific font family
font: "JetBrains Mono:style=Bold:size=11",
font: "Fira Code:style=Medium:size=10",
font: "Hack:style=Regular:size=10",

// Multiple styles
font: "Liberation Mono:style=Bold Italic:size=10",

// Different sizes
font: "monospace:style=Bold:size=12",  // Larger
font: "monospace:style=Bold:size=8",   // Smaller
```

### Font Styles

Common font styles:
- `Regular`
- `Bold`
- `Italic`
- `Bold Italic`
- `Medium`
- `Light`

Not all fonts support all styles. Check available styles with:

```bash
fc-list "YourFontFamily" : style
```

### Troubleshooting Fonts

If your font doesn't appear correctly:

1. **Check if font is installed:**
```bash
fc-list | grep "YourFont"
```

2. **Verify font name:**
```bash
fc-match "YourFont:style=Bold"
```

3. **Fallback to monospace:**
```ron
font: "monospace:size=10",
```

## Status Bar Color Schemes

The status bar uses three color schemes for different tag states:

### Normal Scheme (Empty Tags)

Tags with no windows:

```ron
scheme_normal: (
    foreground: 0xbbbbbb,  // Text color
    background: 0x1a1b26,  // Background color
    underline: 0x444444    // Underline color
),
```

### Occupied Scheme (Tags with Windows)

Tags that contain windows but aren't currently visible:

```ron
scheme_occupied: (
    foreground: 0x0db9d7,
    background: 0x1a1b26,
    underline: 0x0db9d7
),
```

### Selected Scheme (Current Tag)

The currently viewed tag:

```ron
scheme_selected: (
    foreground: 0x0db9d7,
    background: 0x1a1b26,
    underline: 0xad8ee6
),
```

### Example Color Schemes

**Tokyo Night:**
```ron
scheme_normal: (
    foreground: 0xa9b1d6,
    background: 0x1a1b26,
    underline: 0x414868
),
scheme_occupied: (
    foreground: 0x7aa2f7,
    background: 0x1a1b26,
    underline: 0x7aa2f7
),
scheme_selected: (
    foreground: 0x7dcfff,
    background: 0x1a1b26,
    underline: 0xbb9af7
),
```

**Gruvbox Dark:**
```ron
scheme_normal: (
    foreground: 0xa89984,
    background: 0x282828,
    underline: 0x3c3836
),
scheme_occupied: (
    foreground: 0xfb4934,
    background: 0x282828,
    underline: 0xfb4934
),
scheme_selected: (
    foreground: 0xfabd2f,
    background: 0x282828,
    underline: 0x83a598
),
```

## Tags

Customize your workspace tag labels:

```ron
tags: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
```

You can use any strings, including Unicode:

```ron
// Icon-based tags
tags: ["", "", "", "", "", "", "󰭹", "", ""],

// Named tags
tags: ["web", "code", "term", "chat", "mail", "music", "misc", "8", "9"],

// Descriptive tags
tags: ["main", "dev", "test", "doc", "media", "vm", "tmp", "8", "9"],
```

**Note:** Keep tag labels short (1-3 characters) for better status bar readability.

## Layout Symbols

Customize the layout indicator symbols in the status bar:

```ron
layout_symbols: [
    (name: "tiling", symbol: "[T]"),
    (name: "normie", symbol: "[F]"),
],
```

**Examples:**

```ron
// Icon-based
layout_symbols: [
    (name: "tiling", symbol: "󰙀"),
    (name: "normie", symbol: "󰖲"),
],

// Descriptive
layout_symbols: [
    (name: "tiling", symbol: "[Tile]"),
    (name: "normie", symbol: "[Float]"),
],

// Minimal
layout_symbols: [
    (name: "tiling", symbol: "T"),
    (name: "normie", symbol: "F"),
],
```

## Complete Appearance Example

Here's a complete appearance configuration:

```ron
(
    // Borders
    border_width: 2,
    border_focused: 0x7aa2f7,
    border_unfocused: 0x414868,

    // Gaps
    gaps_enabled: true,
    gap_inner_horizontal: 5,
    gap_inner_vertical: 5,
    gap_outer_horizontal: 5,
    gap_outer_vertical: 5,

    // Font
    font: "JetBrains Mono:style=Bold:size=11",

    // Tags
    tags: ["", "", "", "", "", "", "󰭹", "", ""],

    // Layouts
    layout_symbols: [
        (name: "tiling", symbol: "󰙀"),
        (name: "normie", symbol: "󰖲"),
    ],

    // Status bar color schemes (Tokyo Night)
    scheme_normal: (
        foreground: 0xa9b1d6,
        background: 0x1a1b26,
        underline: 0x414868
    ),
    scheme_occupied: (
        foreground: 0x7aa2f7,
        background: 0x1a1b26,
        underline: 0x7aa2f7
    ),
    scheme_selected: (
        foreground: 0x7dcfff,
        background: 0x1a1b26,
        underline: 0xbb9af7
    ),

    // ... other config fields
)
```

## Tips

1. **Use variables for colors** to maintain consistency:
```ron
#DEFINE $bg = 0x1a1b26
#DEFINE $blue = 0x7aa2f7
#DEFINE $purple = 0xbb9af7
```

2. **Test changes with hot reload** (`Mod+Shift+R`) to see results immediately

3. **Match your terminal theme** for a cohesive look

4. **Use Nerd Fonts** for icon support in tags and layout symbols
