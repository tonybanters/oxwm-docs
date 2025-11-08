---
title: Appearance
description: Customize oxwm's visual appearance
---

This page covers all appearance-related configuration options in oxwm.

## Window Borders

### Border Width

Control the width of window borders in pixels:

```lua
border_width = 2,  -- Recommended: 1-4
```

Set to `0` to disable borders entirely (not recommended as you lose visual focus indication).

### Border Colors

Customize border colors for focused and unfocused windows:

```lua
border_focused = "#6dade3",    -- Color when window has focus
border_unfocused = "#bbbbbb",  -- Color when window is not focused
```

Colors are specified in hexadecimal RGB format (`"#RRGGBB"` or `0xRRGGBB`).

**Popular color schemes:**

```lua
-- Tokyo Night
border_focused = "#7aa2f7",
border_unfocused = "#414868",

-- Dracula
border_focused = "#bd93f9",
border_unfocused = "#6272a4",

-- Nord
border_focused = "#88c0d0",
border_unfocused = "#4c566a",

-- Gruvbox
border_focused = "#fb4934",
border_unfocused = "#928374",

-- Catppuccin Mocha
border_focused = "#89b4fa",
border_unfocused = "#6c7086",
```

## Window Gaps

Gaps are the spacing between windows and screen edges.

### Enable/Disable Gaps

```lua
gaps_enabled = true,  -- Set to false to disable all gaps
```

You can also toggle gaps at runtime with `Mod+A`.

### Gap Configuration

Configure gaps independently for each direction:

```lua
gap_inner_horizontal = 5,  -- Horizontal spacing between windows
gap_inner_vertical = 5,    -- Vertical spacing between windows
gap_outer_horizontal = 5,  -- Left and right screen edges
gap_outer_vertical = 5,    -- Top and bottom screen edges
```

**Common gap configurations:**

```lua
-- Minimal gaps (clean look)
gap_inner_horizontal = 3,
gap_inner_vertical = 3,
gap_outer_horizontal = 3,
gap_outer_vertical = 3,

-- Comfortable gaps (recommended)
gap_inner_horizontal = 5,
gap_inner_vertical = 5,
gap_outer_horizontal = 5,
gap_outer_vertical = 5,

-- Large gaps (spacious)
gap_inner_horizontal = 10,
gap_inner_vertical = 10,
gap_outer_horizontal = 10,
gap_outer_vertical = 10,

-- Asymmetric gaps (top bar clearance)
gap_inner_horizontal = 5,
gap_inner_vertical = 5,
gap_outer_horizontal = 5,
gap_outer_vertical = 30,  -- Extra space for status bar
```

## Font Configuration

The font setting controls the status bar font:

```lua
font = "monospace:style=Bold:size=10",
```

### Font Format

The format follows Fontconfig syntax:

```
"family:style=STYLE:size=SIZE"
```

**Examples:**

```lua
-- System monospace font
font = "monospace:style=Bold:size=10",

-- Specific font family
font = "JetBrains Mono:style=Bold:size=11",
font = "Fira Code:style=Medium:size=10",
font = "Hack:style=Regular:size=10",

-- Multiple styles
font = "Liberation Mono:style=Bold Italic:size=10",

-- Different sizes
font = "monospace:style=Bold:size=12",  -- Larger
font = "monospace:style=Bold:size=8",   -- Smaller
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
```lua
font = "monospace:size=10",
```

## Status Bar Color Schemes

The status bar uses three color schemes for different tag states:

### Normal Scheme (Empty Tags)

Tags with no windows:

```lua
scheme_normal = {
    foreground = "#bbbbbb",  -- Text color
    background = "#1a1b26",  -- Background color
    underline = "#444444"    -- Underline color
},
```

### Occupied Scheme (Tags with Windows)

Tags that contain windows but aren't currently visible:

```lua
scheme_occupied = {
    foreground = "#0db9d7",
    background = "#1a1b26",
    underline = "#0db9d7"
},
```

### Selected Scheme (Current Tag)

The currently viewed tag:

```lua
scheme_selected = {
    foreground = "#0db9d7",
    background = "#1a1b26",
    underline = "#ad8ee6"
},
```

### Example Color Schemes

**Tokyo Night:**
```lua
scheme_normal = {
    foreground = "#a9b1d6",
    background = "#1a1b26",
    underline = "#414868"
},
scheme_occupied = {
    foreground = "#7aa2f7",
    background = "#1a1b26",
    underline = "#7aa2f7"
},
scheme_selected = {
    foreground = "#7dcfff",
    background = "#1a1b26",
    underline = "#bb9af7"
},
```

**Gruvbox Dark:**
```lua
scheme_normal = {
    foreground = "#a89984",
    background = "#282828",
    underline = "#3c3836"
},
scheme_occupied = {
    foreground = "#fb4934",
    background = "#282828",
    underline = "#fb4934"
},
scheme_selected = {
    foreground = "#fabd2f",
    background = "#282828",
    underline = "#83a598"
},
```

## Tags

Customize your workspace tag labels:

```lua
tags = { "1", "2", "3", "4", "5", "6", "7", "8", "9" },
```

You can use any strings, including Unicode:

```lua
-- Icon-based tags
tags = { "", "", "", "", "", "", "󰭹", "", "" },

-- Named tags
tags = { "web", "code", "term", "chat", "mail", "music", "misc", "8", "9" },

-- Descriptive tags
tags = { "main", "dev", "test", "doc", "media", "vm", "tmp", "8", "9" },
```

**Note:** Keep tag labels short (1-3 characters) for better status bar readability.

## Layout Symbols

Customize the layout indicator symbols in the status bar:

```lua
layout_symbols = {
    { name = "tiling", symbol = "[T]" },
    { name = "normie", symbol = "[F]" },
},
```

**Examples:**

```lua
-- Icon-based
layout_symbols = {
    { name = "tiling", symbol = "󰙀" },
    { name = "normie", symbol = "󰖲" },
},

-- Descriptive
layout_symbols = {
    { name = "tiling", symbol = "[Tile]" },
    { name = "normie", symbol = "[Float]" },
},

-- Minimal
layout_symbols = {
    { name = "tiling", symbol = "T" },
    { name = "normie", symbol = "F" },
},
```

## Complete Appearance Example

Here's a complete appearance configuration:

```lua
return {
    -- Borders
    border_width = 2,
    border_focused = "#7aa2f7",
    border_unfocused = "#414868",

    -- Gaps
    gaps_enabled = true,
    gap_inner_horizontal = 5,
    gap_inner_vertical = 5,
    gap_outer_horizontal = 5,
    gap_outer_vertical = 5,

    -- Font
    font = "JetBrains Mono:style=Bold:size=11",

    -- Tags
    tags = { "", "", "", "", "", "", "󰭹", "", "" },

    -- Layouts
    layout_symbols = {
        { name = "tiling", symbol = "󰙀" },
        { name = "normie", symbol = "󰖲" },
    },

    -- Status bar color schemes (Tokyo Night)
    scheme_normal = {
        foreground = "#a9b1d6",
        background = "#1a1b26",
        underline = "#414868"
    },
    scheme_occupied = {
        foreground = "#7aa2f7",
        background = "#1a1b26",
        underline = "#7aa2f7"
    },
    scheme_selected = {
        foreground = "#7dcfff",
        background = "#1a1b26",
        underline = "#bb9af7"
    },

    -- ... other config fields
}
```

## Tips

1. **Use variables for colors** to maintain consistency:
```lua
local colors = {
    bg = "#1a1b26",
    blue = "#7aa2f7",
    purple = "#bb9af7",
}

return {
    border_focused = colors.blue,
    scheme_selected = {
        foreground = colors.blue,
        background = colors.bg,
        underline = colors.purple,
    },
}
```

2. **Test changes with hot reload** (`Mod+Shift+R`) to see results immediately

3. **Match your terminal theme** for a cohesive look

4. **Use Nerd Fonts** for icon support in tags and layout symbols
