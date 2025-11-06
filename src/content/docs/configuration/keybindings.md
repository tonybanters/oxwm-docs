---
title: Keybindings
description: Configure custom keyboard shortcuts
---

oxwm provides powerful and flexible keybinding configuration with support for single-key bindings and multi-key sequences (keychords).

## Modkey Configuration

First, set your primary modifier key:

```ron
modkey: Mod4,  // Super/Windows key (recommended)
```

Available modkeys:
- `Mod1` - Alt key
- `Mod2` - Num Lock (rarely used)
- `Mod3` - (rarely used)
- `Mod4` - Super/Windows key (recommended)
- `Mod5` - (rarely used)
- `Shift` - Shift key
- `Control` - Ctrl key

You can also use `Mod` as an alias for your configured modkey in keybindings.

## Keybinding Formats

### Single Key Binding

The most common format for simple keybindings:

```ron
keybindings: [
    (modifiers: [Mod4], key: Return, action: Spawn, arg: "st"),
    (modifiers: [Mod4, Shift], key: Q, action: Quit),
    (modifiers: [Mod4], key: J, action: FocusDown),
]
```

**Structure:**
- `modifiers`: List of modifier keys held down
- `key`: The key to press
- `action`: The action to perform
- `arg`: Argument for the action (optional, depends on action)

### Keychord (Multi-Key Sequence)

For vim/emacs-style multi-key sequences:

```ron
keybindings: [
    (
        keys: [
            (modifiers: [Mod4], key: Space),  // First: press Mod4+Space
            (modifiers: [], key: T),           // Then: press T
        ],
        action: Spawn,
        arg: "st"
    ),
]
```

Press `Escape` to cancel a keychord sequence midway.

## Available Modifiers

You can combine multiple modifiers:

```ron
// Single modifier
(modifiers: [Mod4], key: Return, action: Spawn, arg: "st"),

// Multiple modifiers
(modifiers: [Mod4, Shift], key: Q, action: Quit),
(modifiers: [Mod4, Control], key: J, action: SmartMoveDown),

// All available modifiers
Mod    // Alias for your configured modkey
Mod1   // Alt
Mod2   // Num Lock
Mod3
Mod4   // Super/Windows
Mod5
Shift
Control
```

## Available Actions

### Window Management

| Action | Argument | Description |
|--------|----------|-------------|
| `Kill` | None | Close focused window |
| `FocusDown` | None | Focus next window in stack |
| `FocusUp` | None | Focus previous window in stack |
| `SwapDown` | None | Swap with next window |
| `SwapUp` | None | Swap with previous window |
| `Exchange` | None | Exchange master and stack windows |
| `ToggleFloating` | None | Toggle floating for current window |
| `ToggleFullscreen` | None | Toggle fullscreen mode |

### Smart Window Movement

These actions intelligently move windows considering monitor boundaries:

| Action | Description |
|--------|-------------|
| `SmartMoveUp` | Move window up or to monitor above |
| `SmartMoveDown` | Move window down or to monitor below |
| `SmartMoveLeft` | Move window left or to monitor left |
| `SmartMoveRight` | Move window right or to monitor right |

### Layout Management

| Action | Argument | Description |
|--------|----------|-------------|
| `SetLayoutByName` | Layout name | Switch to specific layout |
| `NextLayout` | None | Cycle to next layout |
| `ToggleGaps` | None | Enable/disable gaps |

Layout names: `"tiling"`, `"normie"`

### Tag (Workspace) Management

| Action | Argument | Description |
|--------|----------|-------------|
| `ViewTag` | Tag index (0-8) | Switch to tag N |
| `MoveToTag` | Tag index (0-8) | Move window to tag N |

### Monitor Management

| Action | Description |
|--------|-------------|
| `FocusMonLeft` | Focus monitor to the left |
| `FocusMonRight` | Focus monitor to the right |

### System

| Action | Argument | Description |
|--------|----------|-------------|
| `Spawn` | Command string | Execute shell command |
| `Quit` | None | Exit oxwm |
| `Reload` | None | Reload configuration |

## Complete Keybinding Examples

### Basic Window Management

```ron
keybindings: [
    // Terminal
    (modifiers: [Mod4], key: Return, action: Spawn, arg: "st"),

    // Application launcher
    (modifiers: [Mod4], key: D, action: Spawn, arg: "dmenu_run"),

    // Close window
    (modifiers: [Mod4], key: Q, action: Kill),

    // Focus navigation
    (modifiers: [Mod4], key: J, action: FocusDown),
    (modifiers: [Mod4], key: K, action: FocusUp),

    // Window movement
    (modifiers: [Mod4, Shift], key: J, action: SwapDown),
    (modifiers: [Mod4, Shift], key: K, action: SwapUp),
    (modifiers: [Mod4, Shift], key: H, action: Exchange),
    (modifiers: [Mod4, Shift], key: L, action: Exchange),

    // Smart movement
    (modifiers: [Mod4, Control], key: J, action: SmartMoveDown),
    (modifiers: [Mod4, Control], key: K, action: SmartMoveUp),
    (modifiers: [Mod4, Control], key: H, action: SmartMoveLeft),
    (modifiers: [Mod4, Control], key: L, action: SmartMoveRight),
]
```

### Layout and Appearance

```ron
keybindings: [
    // Toggle floating
    (modifiers: [Mod4, Shift], key: Space, action: ToggleFloating),

    // Toggle fullscreen
    (modifiers: [Mod4, Shift], key: F, action: ToggleFullscreen),

    // Toggle gaps
    (modifiers: [Mod4], key: A, action: ToggleGaps),

    // Switch layouts
    (modifiers: [Mod4], key: C, action: SetLayoutByName, arg: "tiling"),
    (modifiers: [Mod4], key: F, action: SetLayoutByName, arg: "normie"),
    (modifiers: [Mod4], key: N, action: NextLayout),
]
```

### Tag (Workspace) Bindings

```ron
keybindings: [
    // View tags
    (modifiers: [Mod4], key: Key1, action: ViewTag, arg: "0"),
    (modifiers: [Mod4], key: Key2, action: ViewTag, arg: "1"),
    (modifiers: [Mod4], key: Key3, action: ViewTag, arg: "2"),
    (modifiers: [Mod4], key: Key4, action: ViewTag, arg: "3"),
    (modifiers: [Mod4], key: Key5, action: ViewTag, arg: "4"),
    (modifiers: [Mod4], key: Key6, action: ViewTag, arg: "5"),
    (modifiers: [Mod4], key: Key7, action: ViewTag, arg: "6"),
    (modifiers: [Mod4], key: Key8, action: ViewTag, arg: "7"),
    (modifiers: [Mod4], key: Key9, action: ViewTag, arg: "8"),

    // Move to tags
    (modifiers: [Mod4, Shift], key: Key1, action: MoveToTag, arg: "0"),
    (modifiers: [Mod4, Shift], key: Key2, action: MoveToTag, arg: "1"),
    (modifiers: [Mod4, Shift], key: Key3, action: MoveToTag, arg: "2"),
    (modifiers: [Mod4, Shift], key: Key4, action: MoveToTag, arg: "3"),
    (modifiers: [Mod4, Shift], key: Key5, action: MoveToTag, arg: "4"),
    (modifiers: [Mod4, Shift], key: Key6, action: MoveToTag, arg: "5"),
    (modifiers: [Mod4, Shift], key: Key7, action: MoveToTag, arg: "6"),
    (modifiers: [Mod4, Shift], key: Key8, action: MoveToTag, arg: "7"),
    (modifiers: [Mod4, Shift], key: Key9, action: MoveToTag, arg: "8"),
]
```

**Note:** Tag indices are 0-based (0-8 for 9 tags), not 1-based.

### Multi-Monitor Bindings

```ron
keybindings: [
    // Focus monitors
    (modifiers: [Mod4], key: Comma, action: FocusMonLeft),
    (modifiers: [Mod4], key: Period, action: FocusMonRight),
]
```

### System Control

```ron
keybindings: [
    // Reload config
    (modifiers: [Mod4, Shift], key: R, action: Reload),

    // Quit WM
    (modifiers: [Mod4, Shift], key: Q, action: Quit),
]
```

### Application Shortcuts

```ron
keybindings: [
    // Terminal
    (modifiers: [Mod4], key: Return, action: Spawn, arg: "alacritty"),

    // Browser
    (modifiers: [Mod4], key: B, action: Spawn, arg: "firefox"),

    // File manager
    (modifiers: [Mod4], key: E, action: Spawn, arg: "thunar"),

    // Screenshot
    (modifiers: [Mod4], key: S, action: Spawn, arg: "maim -s | xclip -selection clipboard -t image/png"),

    // Lock screen
    (modifiers: [Mod4], key: L, action: Spawn, arg: "i3lock -c 000000"),
]
```

### Media Keys

```ron
keybindings: [
    // Volume control
    (modifiers: [], key: AudioRaiseVolume, action: Spawn, arg: "amixer set Master 5%+"),
    (modifiers: [], key: AudioLowerVolume, action: Spawn, arg: "amixer set Master 5%-"),
    (modifiers: [], key: AudioMute, action: Spawn, arg: "amixer set Master toggle"),

    // Brightness
    (modifiers: [], key: MonBrightnessUp, action: Spawn, arg: "brightnessctl set +5%"),
    (modifiers: [], key: MonBrightnessDown, action: Spawn, arg: "brightnessctl set 5%-"),
]
```

### Keychord Examples

```ron
keybindings: [
    // Mod+Space, then T = terminal
    (
        keys: [
            (modifiers: [Mod4], key: Space),
            (modifiers: [], key: T),
        ],
        action: Spawn,
        arg: "st"
    ),

    // Mod+Space, then B = browser
    (
        keys: [
            (modifiers: [Mod4], key: Space),
            (modifiers: [], key: B),
        ],
        action: Spawn,
        arg: "firefox"
    ),

    // Mod+Space, then Q = quit
    (
        keys: [
            (modifiers: [Mod4], key: Space),
            (modifiers: [], key: Q),
        ],
        action: Quit
    ),
]
```

## Using Variables

Reduce repetition with preprocessor variables:

```ron
#DEFINE $mod = Mod4
#DEFINE $terminal = "alacritty"
#DEFINE $browser = "firefox"

(
    modkey: $mod,

    keybindings: [
        (modifiers: [$mod], key: Return, action: Spawn, arg: $terminal),
        (modifiers: [$mod], key: B, action: Spawn, arg: $browser),
        (modifiers: [$mod, Shift], key: Q, action: Quit),
    ],
)
```

## Available Key Names

See the [Available Keys](/reference/keys/) reference page for a complete list of key names.

Common keys:
- Letters: `A` through `Z`
- Numbers: `Key0` through `Key9`
- Function: `F1` through `F12`
- Navigation: `Up`, `Down`, `Left`, `Right`
- Special: `Return`, `Space`, `Tab`, `Escape`, `Backspace`
- Media: `AudioRaiseVolume`, `AudioLowerVolume`, `AudioMute`
- Brightness: `MonBrightnessUp`, `MonBrightnessDown`

## Tips

1. **Start with defaults** and modify gradually
2. **Use keychords** for less common actions to avoid conflicts
3. **Group related actions** with similar modifiers (e.g., Shift for "reverse" actions)
4. **Test immediately** with `Mod+Shift+R` after changes
5. **Keep it memorable** - use patterns that make sense to you
6. **Document your changes** with comments in your config

## Troubleshooting

### Keybinding not working

1. Check key name is correct (case-sensitive)
2. Verify modifier names are correct
3. Ensure no conflicting bindings
4. Check if the application is capturing the key first

### International keyboards

oxwm uses keysyms, which work with all keyboard layouts. The physical key position matters, not the character it produces in your layout.

For the [default keybindings reference](/reference/keybindings/), visit the Reference section.
