---
title: Key Actions
description: Complete reference of keybinding actions
---

This page documents all available actions that can be triggered by keybindings in oxwm.

## Action Format

Actions are specified in keybindings with the `action` field:

```ron
(modifiers: [Mod4], key: Q, action: Kill),
(modifiers: [Mod4], key: Return, action: Spawn, arg: "st"),
```

Some actions require an `arg` parameter.

## Window Management

### Kill

Close the currently focused window.

```ron
(modifiers: [Mod4], key: Q, action: Kill)
```

- **Requires arg:** No
- **Description:** Sends a close request to the focused window

### FocusDown

Focus the next window in the stack.

```ron
(modifiers: [Mod4], key: J, action: FocusDown)
```

- **Requires arg:** No
- **Description:** Moves focus to the next window (down in visual stack)

### FocusUp

Focus the previous window in the stack.

```ron
(modifiers: [Mod4], key: K, action: FocusUp)
```

- **Requires arg:** No
- **Description:** Moves focus to the previous window (up in visual stack)

### SwapDown

Swap the focused window with the next window.

```ron
(modifiers: [Mod4, Shift], key: J, action: SwapDown)
```

- **Requires arg:** No
- **Description:** Exchanges positions with the next window in stack

### SwapUp

Swap the focused window with the previous window.

```ron
(modifiers: [Mod4, Shift], key: K, action: SwapUp)
```

- **Requires arg:** No
- **Description:** Exchanges positions with the previous window in stack

### Exchange

Swap master and stack windows.

```ron
(modifiers: [Mod4, Shift], key: H, action: Exchange)
```

- **Requires arg:** No
- **Description:** Swaps the master window with the first stack window

### ToggleFloating

Toggle floating mode for the current window.

```ron
(modifiers: [Mod4, Shift], key: Space, action: ToggleFloating)
```

- **Requires arg:** No
- **Description:** Makes a tiled window float or a floating window tile

### ToggleFullscreen

Toggle fullscreen mode for the current window.

```ron
(modifiers: [Mod4, Shift], key: F, action: ToggleFullscreen)
```

- **Requires arg:** No
- **Description:** Makes window fullscreen (per-monitor) or restores it

## Smart Window Movement

These actions intelligently move windows, considering monitor boundaries.

### SmartMoveUp

Move window up or to the monitor above.

```ron
(modifiers: [Mod4, Control], key: K, action: SmartMoveUp)
```

- **Requires arg:** No
- **Description:** Moves window up in stack, or to monitor above if at top

### SmartMoveDown

Move window down or to the monitor below.

```ron
(modifiers: [Mod4, Control], key: J, action: SmartMoveDown)
```

- **Requires arg:** No
- **Description:** Moves window down in stack, or to monitor below if at bottom

### SmartMoveLeft

Move window left or to the monitor on the left.

```ron
(modifiers: [Mod4, Control], key: H, action: SmartMoveLeft)
```

- **Requires arg:** No
- **Description:** Moves window to master, or to left monitor

### SmartMoveRight

Move window right or to the monitor on the right.

```ron
(modifiers: [Mod4, Control], key: L, action: SmartMoveRight)
```

- **Requires arg:** No
- **Description:** Moves window to stack, or to right monitor

## Layout Management

### SetLayoutByName

Switch to a specific layout.

```ron
(modifiers: [Mod4], key: C, action: SetLayoutByName, arg: "tiling")
(modifiers: [Mod4], key: F, action: SetLayoutByName, arg: "normie")
```

- **Requires arg:** Yes (layout name)
- **Valid args:**
  - `"tiling"` - Master/stack tiling layout
  - `"normie"` - Floating layout
- **Description:** Switches to the specified layout

### NextLayout

Cycle to the next layout.

```ron
(modifiers: [Mod4], key: N, action: NextLayout)
```

- **Requires arg:** No
- **Description:** Cycles through available layouts (tiling → normie → tiling)

### ToggleGaps

Enable or disable window gaps.

```ron
(modifiers: [Mod4], key: A, action: ToggleGaps)
```

- **Requires arg:** No
- **Description:** Toggles gaps on/off for quick space optimization

## Tag (Workspace) Management

### ViewTag

Switch to a specific tag (workspace).

```ron
(modifiers: [Mod4], key: Key1, action: ViewTag, arg: "0")
(modifiers: [Mod4], key: Key2, action: ViewTag, arg: "1")
```

- **Requires arg:** Yes (tag index)
- **Valid args:** `"0"` through `"8"` (for 9 tags)
- **Description:** Shows the specified tag on the current monitor
- **Note:** Tag indices are 0-based (0-8 for tags 1-9)

### MoveToTag

Move the focused window to a specific tag.

```ron
(modifiers: [Mod4, Shift], key: Key1, action: MoveToTag, arg: "0")
(modifiers: [Mod4, Shift], key: Key2, action: MoveToTag, arg: "1")
```

- **Requires arg:** Yes (tag index)
- **Valid args:** `"0"` through `"8"` (for 9 tags)
- **Description:** Moves the focused window to the specified tag
- **Note:** Window leaves current tag and appears on target tag

## Monitor Management

### FocusMonLeft

Focus the monitor to the left.

```ron
(modifiers: [Mod4], key: Comma, action: FocusMonLeft)
```

- **Requires arg:** No
- **Description:** Moves focus to the monitor on the left (cycles)

### FocusMonRight

Focus the monitor to the right.

```ron
(modifiers: [Mod4], key: Period, action: FocusMonRight)
```

- **Requires arg:** No
- **Description:** Moves focus to the monitor on the right (cycles)

## System Actions

### Spawn

Execute a shell command.

```ron
(modifiers: [Mod4], key: Return, action: Spawn, arg: "st")
(modifiers: [Mod4], key: D, action: Spawn, arg: "dmenu_run")
```

- **Requires arg:** Yes (command string)
- **Valid args:** Any shell command
- **Description:** Spawns a new process with the given command
- **Examples:**
  ```ron
  arg: "alacritty"                    // Simple command
  arg: "firefox https://example.com"  // Command with arguments
  arg: "maim -s | xclip -selection clipboard -t image/png"  // Pipeline
  ```

### Quit

Exit oxwm (log out).

```ron
(modifiers: [Mod4, Shift], key: Q, action: Quit)
```

- **Requires arg:** No
- **Description:** Closes oxwm and ends your X session
- **Warning:** This logs you out immediately

### Reload

Hot reload the configuration file.

```ron
(modifiers: [Mod4, Shift], key: R, action: Reload)
```

- **Requires arg:** No
- **Description:** Reloads `~/.config/oxwm/config.ron` without restarting
- **Notes:**
  - Window state is preserved
  - New keybindings take effect immediately
  - If config is invalid, old config remains active

## Action Summary Table

| Action | Arg Required | Description |
|--------|--------------|-------------|
| `Kill` | No | Close focused window |
| `FocusDown` | No | Focus next window |
| `FocusUp` | No | Focus previous window |
| `SwapDown` | No | Swap with next window |
| `SwapUp` | No | Swap with previous window |
| `Exchange` | No | Swap master and stack |
| `ToggleFloating` | No | Toggle floating mode |
| `ToggleFullscreen` | No | Toggle fullscreen |
| `SmartMoveUp` | No | Smart move up/to monitor above |
| `SmartMoveDown` | No | Smart move down/to monitor below |
| `SmartMoveLeft` | No | Smart move left/to left monitor |
| `SmartMoveRight` | No | Smart move right/to right monitor |
| `SetLayoutByName` | Yes (layout name) | Switch to layout |
| `NextLayout` | No | Cycle layouts |
| `ToggleGaps` | No | Toggle window gaps |
| `ViewTag` | Yes (tag index) | Switch to tag |
| `MoveToTag` | Yes (tag index) | Move window to tag |
| `FocusMonLeft` | No | Focus left monitor |
| `FocusMonRight` | No | Focus right monitor |
| `Spawn` | Yes (command) | Execute shell command |
| `Quit` | No | Exit oxwm |
| `Reload` | No | Reload config |

## Usage Patterns

### Window Navigation

```ron
// Focus navigation (J/K pattern like vim)
(modifiers: [Mod4], key: J, action: FocusDown),
(modifiers: [Mod4], key: K, action: FocusUp),

// Movement (Shift + J/K)
(modifiers: [Mod4, Shift], key: J, action: SwapDown),
(modifiers: [Mod4, Shift], key: K, action: SwapUp),

// Smart movement (Control + HJKL)
(modifiers: [Mod4, Control], key: H, action: SmartMoveLeft),
(modifiers: [Mod4, Control], key: J, action: SmartMoveDown),
(modifiers: [Mod4, Control], key: K, action: SmartMoveUp),
(modifiers: [Mod4, Control], key: L, action: SmartMoveRight),
```

### Tag Management

```ron
// View tags (1-9)
(modifiers: [Mod4], key: Key1, action: ViewTag, arg: "0"),
(modifiers: [Mod4], key: Key2, action: ViewTag, arg: "1"),
// ... etc

// Move to tags (Shift + 1-9)
(modifiers: [Mod4, Shift], key: Key1, action: MoveToTag, arg: "0"),
(modifiers: [Mod4, Shift], key: Key2, action: MoveToTag, arg: "1"),
// ... etc
```

### Application Launching

```ron
(modifiers: [Mod4], key: Return, action: Spawn, arg: "alacritty"),
(modifiers: [Mod4], key: B, action: Spawn, arg: "firefox"),
(modifiers: [Mod4], key: E, action: Spawn, arg: "thunar"),
(modifiers: [Mod4], key: D, action: Spawn, arg: "dmenu_run"),
```

## Tips

1. **Group related actions** with similar modifiers
2. **Use variables** for repeated commands:
   ```ron
   #DEFINE $terminal = "alacritty"
   (modifiers: [Mod4], key: Return, action: Spawn, arg: $terminal)
   ```
3. **Test actions immediately** with `Mod+Shift+R` (Reload)
4. **Combine with keychords** for complex workflows

See [Keybindings Configuration](/configuration/keybindings/) for more examples and patterns.
