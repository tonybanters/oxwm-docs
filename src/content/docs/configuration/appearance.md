---
title: Appearance
description: Customize OXWM's visual appearance
sidebar:
  order: 2
---

Configure OXWM's window borders, gaps, and fonts.

## Window Borders

### Border Width

Set the width of window borders in pixels.

```lua
oxwm.border.set_width(2)
```

| Parameter | Type    | Description |
|-----------|---------|-------------|
| width     | integer | Border width in pixels (0-10, recommended: 1-4) |

Set to `0` to disable borders entirely.

### Border Colors

Set border colors for focused and unfocused windows.

```lua
oxwm.border.set_focused_color("#6dade3")
oxwm.border.set_unfocused_color("#bbbbbb")
```

| Parameter | Type           | Description |
|-----------|----------------|-------------|
| color     | string/integer | Hex string like `"#6dade3"` or integer like `0x6dade3` |

**Popular color schemes:**

```lua
-- Tokyo Night
oxwm.border.set_focused_color("#7aa2f7")
oxwm.border.set_unfocused_color("#414868")

-- Dracula
oxwm.border.set_focused_color("#bd93f9")
oxwm.border.set_unfocused_color("#6272a4")

-- Nord
oxwm.border.set_focused_color("#88c0d0")
oxwm.border.set_unfocused_color("#4c566a")

-- Gruvbox
oxwm.border.set_focused_color("#fb4934")
oxwm.border.set_unfocused_color("#928374")

-- Catppuccin Mocha
oxwm.border.set_focused_color("#89b4fa")
oxwm.border.set_unfocused_color("#6c7086")
```

## Window Gaps

Gaps control the spacing between windows and screen edges.

### Enable/Disable Gaps

```lua
oxwm.gaps.set_enabled(true)
```

| Parameter | Type    | Description |
|-----------|---------|-------------|
| enabled   | boolean | Enable or disable all gaps |

You can also toggle gaps at runtime with `Mod+A`.

### Inner Gaps

Set spacing between windows.

```lua
oxwm.gaps.set_inner(5, 5)
```

| Parameter | Type    | Description |
|-----------|---------|-------------|
| horizontal | integer | Horizontal spacing between windows |
| vertical   | integer | Vertical spacing between windows |

### Outer Gaps

Set spacing from screen edges.

```lua
oxwm.gaps.set_outer(5, 5)
```

| Parameter | Type    | Description |
|-----------|---------|-------------|
| horizontal | integer | Left and right screen edge spacing |
| vertical   | integer | Top and bottom screen edge spacing |

**Common gap configurations:**

```lua
-- Minimal gaps (clean look)
oxwm.gaps.set_inner(3, 3)
oxwm.gaps.set_outer(3, 3)

-- Comfortable gaps (recommended)
oxwm.gaps.set_inner(5, 5)
oxwm.gaps.set_outer(5, 5)

-- Large gaps (spacious)
oxwm.gaps.set_inner(10, 10)
oxwm.gaps.set_outer(10, 10)

-- Asymmetric gaps (extra top space for bar)
oxwm.gaps.set_inner(5, 5)
oxwm.gaps.set_outer(5, 30)
```

## Font Configuration

Set the status bar font.

```lua
oxwm.bar.set_font("monospace:style=Bold:size=10")
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| font      | string | Font specification in XFT format: `"family:style=Style:size=Size"` |

**Font format:**

```
"family:style=STYLE:size=SIZE"
```

**Examples:**

```lua
-- System monospace font
oxwm.bar.set_font("monospace:style=Bold:size=10")

-- Specific font family
oxwm.bar.set_font("JetBrains Mono:style=Bold:size=11")
oxwm.bar.set_font("Fira Code:style=Medium:size=10")
oxwm.bar.set_font("Hack:style=Regular:size=10")

-- Multiple styles
oxwm.bar.set_font("Liberation Mono:style=Bold Italic:size=10")

-- Different sizes
oxwm.bar.set_font("monospace:style=Bold:size=12")  -- Larger
oxwm.bar.set_font("monospace:style=Bold:size=8")   -- Smaller
```

**Common font styles:**
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

**Troubleshooting fonts:**

1. Check if font is installed:
```bash
fc-list | grep "YourFont"
```

2. Verify font name:
```bash
fc-match "YourFont:style=Bold"
```

3. Fallback to monospace:
```lua
oxwm.bar.set_font("monospace:size=10")
```

## Complete Appearance Example

```lua
local colors = {
    bg = "#1a1b26",
    fg = "#a9b1d6",
    blue = "#7aa2f7",
    dark = "#414868",
}

-- Borders
oxwm.border.set_width(2)
oxwm.border.set_focused_color(colors.blue)
oxwm.border.set_unfocused_color(colors.dark)

-- Gaps
oxwm.gaps.set_enabled(true)
oxwm.gaps.set_inner(5, 5)
oxwm.gaps.set_outer(5, 5)

-- Font
oxwm.bar.set_font("JetBrains Mono:style=Bold:size=11")
```

## Tips

- **Use color variables** to maintain consistency across your config
- **Test changes with hot reload** (`Mod+Shift+R`) to see results immediately
- **Match your terminal theme** for a cohesive look
- **Use Nerd Fonts** for icon support in tags and bar blocks
