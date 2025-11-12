---
title: Keybindings
description: Configure custom keyboard shortcuts
sidebar:
  order: 4
---

OXWM provides flexible keybinding configuration using the `oxwm.key.bind()` function.

## Basic Keybinding

Bind a key combination to an action.

```lua
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("st"))
```

| Parameter  | Type   | Description |
|------------|--------|-------------|
| modifiers  | table  | List of modifier keys (e.g., `{ "Mod4" }`, `{ "Mod4", "Shift" }`) |
| key        | string | Key name (e.g., `"Return"`, `"J"`, `"Space"`) |
| action     | table  | Action to perform (returned by action functions) |

**Available modifiers:**
- `Mod1` - Alt key
- `Mod4` - Super/Windows key (recommended)
- `Control` - Ctrl key
- `Shift` - Shift key

## Actions

### Spawn Command

Execute a shell command.

```lua
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("st"))
```

| Parameter | Type          | Description |
|-----------|---------------|-------------|
| command   | string/table  | Command to execute (string for simple commands, table for command with args) |

**Examples:**

```lua
-- Simple command
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("st"))

-- Command with arguments
oxwm.key.bind({ "Mod4" }, "D", oxwm.spawn({ "sh", "-c", "dmenu_run -l 10" }))

-- Complex shell command
oxwm.key.bind({ "Mod4" }, "S", oxwm.spawn({
    "sh", "-c", "maim -s | xclip -selection clipboard -t image/png"
}))
```

### Window Management

```lua
oxwm.key.bind({ "Mod4" }, "Q", oxwm.client.kill())
oxwm.key.bind({ "Mod4" }, "J", oxwm.client.focus_down())
oxwm.key.bind({ "Mod4" }, "K", oxwm.client.focus_up())
```

| Function | Description |
|----------|-------------|
| `oxwm.client.kill()` | Close focused window |
| `oxwm.client.focus_down()` | Focus next window in stack |
| `oxwm.client.focus_up()` | Focus previous window in stack |
| `oxwm.client.swap_down()` | Swap with next window |
| `oxwm.client.swap_up()` | Swap with previous window |
| `oxwm.client.toggle_floating()` | Toggle floating mode |
| `oxwm.client.toggle_fullscreen()` | Toggle fullscreen mode |

### Smart Window Movement

Move windows across monitor boundaries.

```lua
oxwm.key.bind({ "Mod4", "Control" }, "J", oxwm.client.smart_move_down())
```

| Function | Description |
|----------|-------------|
| `oxwm.client.smart_move_up()` | Move window up or to monitor above |
| `oxwm.client.smart_move_down()` | Move window down or to monitor below |
| `oxwm.client.smart_move_left()` | Move window left or to monitor left |
| `oxwm.client.smart_move_right()` | Move window right or to monitor right |

### Layout Management

```lua
oxwm.key.bind({ "Mod4" }, "A", oxwm.toggle_gaps())
oxwm.key.bind({ "Mod4" }, "Space", oxwm.layout.next())
```

| Function | Description |
|----------|-------------|
| `oxwm.toggle_gaps()` | Toggle window gaps on/off |
| `oxwm.layout.next()` | Cycle to next layout |
| `oxwm.layout.set("tiling")` | Set specific layout ("tiling" or "normie") |

### Tag Management

```lua
oxwm.key.bind({ "Mod4" }, "1", oxwm.tag.view(1))
oxwm.key.bind({ "Mod4", "Shift" }, "1", oxwm.tag.move_client(1))
```

| Function | Parameter | Description |
|----------|-----------|-------------|
| `oxwm.tag.view(index)` | integer | Switch to tag N (1-9) |
| `oxwm.tag.move_client(index)` | integer | Move focused window to tag N (1-9) |

### Monitor Management

```lua
oxwm.key.bind({ "Mod4" }, "Comma", oxwm.focus_monitor(-1))
oxwm.key.bind({ "Mod4" }, "Period", oxwm.focus_monitor(1))
```

| Function | Parameter | Description |
|----------|-----------|-------------|
| `oxwm.focus_monitor(index)` | integer | Focus monitor (-1 for previous, 1 for next) |

### System Control

```lua
oxwm.key.bind({ "Mod4", "Shift" }, "R", oxwm.restart())
oxwm.key.bind({ "Mod4", "Shift" }, "Q", oxwm.quit())
```

| Function | Description |
|----------|-------------|
| `oxwm.restart()` | Reload configuration |
| `oxwm.quit()` | Exit window manager |
| `oxwm.recompile()` | Recompile and restart (dev builds only) |
| `oxwm.show_keybinds()` | Show keybind overlay |

## Complete Examples

### Basic Window Management

```lua
-- Terminal
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("st"))

-- Application launcher
oxwm.key.bind({ "Mod4" }, "D", oxwm.spawn("dmenu_run"))

-- Close window
oxwm.key.bind({ "Mod4" }, "Q", oxwm.client.kill())

-- Focus navigation
oxwm.key.bind({ "Mod4" }, "J", oxwm.client.focus_down())
oxwm.key.bind({ "Mod4" }, "K", oxwm.client.focus_up())

-- Window movement
oxwm.key.bind({ "Mod4", "Shift" }, "J", oxwm.client.swap_down())
oxwm.key.bind({ "Mod4", "Shift" }, "K", oxwm.client.swap_up())

-- Smart movement
oxwm.key.bind({ "Mod4", "Control" }, "J", oxwm.client.smart_move_down())
oxwm.key.bind({ "Mod4", "Control" }, "K", oxwm.client.smart_move_up())
oxwm.key.bind({ "Mod4", "Control" }, "H", oxwm.client.smart_move_left())
oxwm.key.bind({ "Mod4", "Control" }, "L", oxwm.client.smart_move_right())
```

### Layout and Appearance

```lua
-- Toggle floating
oxwm.key.bind({ "Mod4", "Shift" }, "Space", oxwm.client.toggle_floating())

-- Toggle fullscreen
oxwm.key.bind({ "Mod4", "Shift" }, "F", oxwm.client.toggle_fullscreen())

-- Toggle gaps
oxwm.key.bind({ "Mod4" }, "A", oxwm.toggle_gaps())

-- Switch layouts
oxwm.key.bind({ "Mod4" }, "Space", oxwm.layout.next())
oxwm.key.bind({ "Mod4" }, "T", oxwm.layout.set("tiling"))
oxwm.key.bind({ "Mod4" }, "F", oxwm.layout.set("normie"))
```

### Tag Bindings

```lua
-- View tags
for i = 1, 9 do
    oxwm.key.bind({ "Mod4" }, tostring(i), oxwm.tag.view(i))
end

-- Move to tags
for i = 1, 9 do
    oxwm.key.bind({ "Mod4", "Shift" }, tostring(i), oxwm.tag.move_client(i))
end
```

### Application Shortcuts

```lua
-- Terminal
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("alacritty"))

-- Browser
oxwm.key.bind({ "Mod4" }, "B", oxwm.spawn("firefox"))

-- File manager
oxwm.key.bind({ "Mod4" }, "E", oxwm.spawn("thunar"))

-- Screenshot
oxwm.key.bind({ "Mod4" }, "S", oxwm.spawn({
    "sh", "-c", "maim -s | xclip -selection clipboard -t image/png"
}))

-- Lock screen
oxwm.key.bind({ "Mod4" }, "L", oxwm.spawn("i3lock -c 000000"))
```

### Media Keys

```lua
-- Volume control
oxwm.key.bind({}, "AudioRaiseVolume", oxwm.spawn("amixer set Master 5%+"))
oxwm.key.bind({}, "AudioLowerVolume", oxwm.spawn("amixer set Master 5%-"))
oxwm.key.bind({}, "AudioMute", oxwm.spawn("amixer set Master toggle"))

-- Brightness
oxwm.key.bind({}, "MonBrightnessUp", oxwm.spawn("brightnessctl set +5%"))
oxwm.key.bind({}, "MonBrightnessDown", oxwm.spawn("brightnessctl set 5%-"))
```

### System Control

```lua
-- Reload config
oxwm.key.bind({ "Mod4", "Shift" }, "R", oxwm.restart())

-- Quit WM
oxwm.key.bind({ "Mod4", "Shift" }, "Q", oxwm.quit())

-- Show keybinds
oxwm.key.bind({ "Mod4", "Shift" }, "Slash", oxwm.show_keybinds())
```

## Using Variables

Organize keybindings with Lua variables.

```lua
local terminal = "alacritty"
local browser = "firefox"
local modkey = "Mod4"

oxwm.set_modkey(modkey)

oxwm.key.bind({ modkey }, "Return", oxwm.spawn(terminal))
oxwm.key.bind({ modkey }, "B", oxwm.spawn(browser))
oxwm.key.bind({ modkey, "Shift" }, "Q", oxwm.quit())
```

## Available Key Names

Common keys:
- Letters: `A` through `Z`
- Numbers: `1` through `9`, `0`
- Function: `F1` through `F12`
- Navigation: `Up`, `Down`, `Left`, `Right`
- Special: `Return`, `Space`, `Tab`, `Escape`, `Backspace`
- Media: `AudioRaiseVolume`, `AudioLowerVolume`, `AudioMute`
- Brightness: `MonBrightnessUp`, `MonBrightnessDown`
- Punctuation: `Comma`, `Period`, `Slash`, `Backslash`, `Semicolon`

## Tips

- **Start with defaults** and modify gradually
- **Test immediately** with `Mod+Shift+R` after changes
- **Use patterns** - e.g., Shift for "reverse" actions
- **Group related actions** with similar key combinations
- **Document your changes** with comments in your config
