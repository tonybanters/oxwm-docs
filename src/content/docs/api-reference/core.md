---
title: Core API
description: Core OXWM configuration functions
---

This page documents the main `oxwm.*` functions for basic configuration.

## Terminal

Set the default terminal emulator.

```lua
oxwm.set_terminal("st")
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| terminal  | string | Command to launch terminal |

**Examples:**
```lua
oxwm.set_terminal("st")
oxwm.set_terminal("alacritty")
oxwm.set_terminal("kitty")
```

Used by the default `Mod+Return` keybinding.

## Modkey

Set the primary modifier key for keybindings.

```lua
oxwm.set_modkey("Mod4")
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| modkey    | string | Modifier key name |

**Available modkeys:**
- `Mod1` - Alt key
- `Mod4` - Super/Windows key (recommended)
- `Control` - Ctrl key
- `Shift` - Shift key

**Examples:**
```lua
oxwm.set_modkey("Mod4")  -- Super key (default)
oxwm.set_modkey("Mod1")  -- Alt key
```

## Tags

Configure workspace tags.

```lua
oxwm.set_tags({ "1", "2", "3", "4", "5", "6", "7", "8", "9" })
```

| Parameter | Type  | Description |
|-----------|-------|-------------|
| tags      | table | Array of tag names/labels |

**Examples:**
```lua
-- Numeric tags
oxwm.set_tags({ "1", "2", "3", "4", "5", "6", "7", "8", "9" })

-- Named tags
oxwm.set_tags({ "web", "code", "term", "chat", "music" })

-- Icon tags (requires Nerd Font)
oxwm.set_tags({ "", "", "", "", "" })
```

## Layout Symbols

Override the display symbol for a layout.

```lua
oxwm.set_layout_symbol("tiling", "[T]")
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| name      | string | Layout name ("tiling" or "normie") |
| symbol    | string | Symbol to display in status bar |

**Examples:**
```lua
oxwm.set_layout_symbol("tiling", "[T]")
oxwm.set_layout_symbol("normie", "[F]")

-- With icons
oxwm.set_layout_symbol("tiling", "")
oxwm.set_layout_symbol("normie", "")
```

## Spawn

Create a spawn action for keybindings.

```lua
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("st"))
```

| Parameter | Type         | Description |
|-----------|--------------|-------------|
| command   | string/table | Command to execute (string for simple commands, table for command with args) |

**Returns:** Action table for use with `oxwm.key.bind()`

**Examples:**
```lua
-- Simple command
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("st"))

-- Command with arguments (as table)
oxwm.key.bind({ "Mod4" }, "D", oxwm.spawn({ "sh", "-c", "dmenu_run -l 10" }))

-- Complex shell command
oxwm.key.bind({ "Mod4" }, "S", oxwm.spawn({
    "sh", "-c", "maim -s | xclip -selection clipboard -t image/png"
}))
```

## Window Manager Actions

### Quit

Exit the window manager.

```lua
oxwm.key.bind({ "Mod4", "Shift" }, "Q", oxwm.quit())
```

**Returns:** Action table for use with `oxwm.key.bind()`

### Restart

Reload the window manager configuration.

```lua
oxwm.key.bind({ "Mod4", "Shift" }, "R", oxwm.restart())
```

**Returns:** Action table for use with `oxwm.key.bind()`

Restarts the WM process, preserving window states and tags.

### Recompile

Recompile and restart (for development builds only).

```lua
oxwm.key.bind({ "Mod4", "Shift" }, "C", oxwm.recompile())
```

**Returns:** Action table for use with `oxwm.key.bind()`

Only useful when running OXWM from source.

### Toggle Gaps

Toggle window gaps on/off.

```lua
oxwm.key.bind({ "Mod4" }, "A", oxwm.toggle_gaps())
```

**Returns:** Action table for use with `oxwm.key.bind()`

### Show Keybinds

Display keybind overlay showing important shortcuts.

```lua
oxwm.key.bind({ "Mod4", "Shift" }, "Slash", oxwm.show_keybinds())
```

**Returns:** Action table for use with `oxwm.key.bind()`

### Focus Monitor

Switch focus to a different monitor.

```lua
oxwm.key.bind({ "Mod4" }, "Comma", oxwm.focus_monitor(-1))
```

| Parameter | Type    | Description |
|-----------|---------|-------------|
| index     | integer | Monitor index (-1 for previous, 1 for next) |

**Returns:** Action table for use with `oxwm.key.bind()`

**Examples:**
```lua
oxwm.key.bind({ "Mod4" }, "Comma", oxwm.focus_monitor(-1))   -- Previous monitor
oxwm.key.bind({ "Mod4" }, "Period", oxwm.focus_monitor(1))   -- Next monitor
```

## Autostart

Add a command to run at startup.

```lua
oxwm.autostart("picom")
```

| Parameter | Type   | Description |
|-----------|--------|-------------|
| command   | string | Shell command to execute on startup |

**Examples:**
```lua
oxwm.autostart("picom")
oxwm.autostart("feh --bg-scale ~/wallpaper.jpg")
oxwm.autostart("nm-applet")
```

Each command runs once when OXWM starts.
