---
title: Available Keys
description: Complete list of key names for keybinding configuration
---

This page lists all available key names you can use in your keybinding configuration.

## How to Use

In your config file, use these exact key names (case-sensitive):

```ron
keybindings: [
    (modifiers: [Mod4], key: Return, action: Spawn, arg: "st"),
    (modifiers: [Mod4], key: A, action: ToggleGaps),
]
```

## Letters

All uppercase (case-sensitive):

| Keys |
|------|
| `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M` |
| `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z` |

## Numbers

Top row number keys:

| Key | Name |
|-----|------|
| 0 | `Key0` |
| 1 | `Key1` |
| 2 | `Key2` |
| 3 | `Key3` |
| 4 | `Key4` |
| 5 | `Key5` |
| 6 | `Key6` |
| 7 | `Key7` |
| 8 | `Key8` |
| 9 | `Key9` |

**Note:** Number keys use the `Key` prefix (e.g., `Key1`, not just `1`).

## Function Keys

| Keys |
|------|
| `F1` `F2` `F3` `F4` `F5` `F6` |
| `F7` `F8` `F9` `F10` `F11` `F12` |

## Navigation Keys

| Key | Name |
|-----|------|
| ← | `Left` |
| ↑ | `Up` |
| → | `Right` |
| ↓ | `Down` |
| Home | `Home` |
| End | `End` |
| Page Up | `PageUp` |
| Page Down | `PageDown` |

## Special Keys

| Key | Name | Description |
|-----|------|-------------|
| Enter | `Return` | Main Enter/Return key |
| Space | `Space` | Spacebar |
| Tab | `Tab` | Tab key |
| Esc | `Escape` | Escape key |
| Backspace | `Backspace` | Backspace key |
| Delete | `Delete` | Delete key |
| Insert | `Insert` | Insert key |
| Print Screen | `Print` | Print Screen key |

## Symbol Keys

| Symbol | Key Name | Description |
|--------|----------|-------------|
| `-` | `Minus` | Minus/hyphen |
| `=` | `Equal` | Equal sign |
| `[` | `BracketLeft` | Left square bracket |
| `]` | `BracketRight` | Right square bracket |
| `;` | `Semicolon` | Semicolon |
| `'` | `Apostrophe` | Apostrophe/single quote |
| `` ` `` | `Grave` | Grave accent/backtick |
| `\` | `Backslash` | Backslash |
| `,` | `Comma` | Comma |
| `.` | `Period` | Period/dot |
| `/` | `Slash` | Forward slash |

## Media Keys

These are special function keys found on many keyboards:

| Key | Name | Typical Label |
|-----|------|---------------|
| Volume Up | `AudioRaiseVolume` | 🔊+ or Vol+ |
| Volume Down | `AudioLowerVolume` | 🔊- or Vol- |
| Mute | `AudioMute` | 🔇 or Mute |
| Brightness Up | `MonBrightnessUp` | ☀️+ |
| Brightness Down | `MonBrightnessDown` | ☀️- |

**Usage example:**

```ron
// Media keys typically don't need modifiers
keybindings: [
    (modifiers: [], key: AudioRaiseVolume, action: Spawn, arg: "amixer set Master 5%+"),
    (modifiers: [], key: AudioLowerVolume, action: Spawn, arg: "amixer set Master 5%-"),
    (modifiers: [], key: AudioMute, action: Spawn, arg: "amixer set Master toggle"),
    (modifiers: [], key: MonBrightnessUp, action: Spawn, arg: "brightnessctl set +5%"),
    (modifiers: [], key: MonBrightnessDown, action: Spawn, arg: "brightnessctl set 5%-"),
]
```

## Examples

### Letter Keys

```ron
(modifiers: [Mod4], key: A, action: ToggleGaps),
(modifiers: [Mod4], key: B, action: Spawn, arg: "firefox"),
(modifiers: [Mod4, Shift], key: C, action: Kill),
```

### Number Keys

```ron
// View tags
(modifiers: [Mod4], key: Key1, action: ViewTag, arg: "0"),
(modifiers: [Mod4], key: Key2, action: ViewTag, arg: "1"),

// Move to tags
(modifiers: [Mod4, Shift], key: Key1, action: MoveToTag, arg: "0"),
(modifiers: [Mod4, Shift], key: Key2, action: MoveToTag, arg: "1"),
```

### Function Keys

```ron
(modifiers: [Mod4], key: F1, action: Spawn, arg: "firefox"),
(modifiers: [Mod4], key: F2, action: Spawn, arg: "thunar"),
(modifiers: [Mod4], key: F12, action: Spawn, arg: "pavucontrol"),
```

### Navigation Keys

```ron
(modifiers: [Mod4], key: Left, action: SmartMoveLeft),
(modifiers: [Mod4], key: Right, action: SmartMoveRight),
(modifiers: [Mod4], key: Up, action: SmartMoveUp),
(modifiers: [Mod4], key: Down, action: SmartMoveDown),
```

### Symbol Keys

```ron
(modifiers: [Mod4], key: Minus, action: Spawn, arg: "volume-down"),
(modifiers: [Mod4], key: Equal, action: Spawn, arg: "volume-up"),
(modifiers: [Mod4], key: BracketLeft, action: Spawn, arg: "brightness-down"),
(modifiers: [Mod4], key: BracketRight, action: Spawn, arg: "brightness-up"),
```

### Special Keys

```ron
(modifiers: [Mod4], key: Return, action: Spawn, arg: "st"),
(modifiers: [Mod4], key: Space, action: NextLayout),
(modifiers: [Mod4], key: Tab, action: FocusDown),
(modifiers: [Mod4, Shift], key: Tab, action: FocusUp),
```

## Keysym Implementation

oxwm uses X11 keysyms for keyboard input, which provides several advantages:

1. **International keyboard support** - Works with any keyboard layout
2. **Layout-independent** - Physical key position matters, not the character
3. **No performance overhead** - Keysym matching is instant

This means your keybindings work regardless of whether you use QWERTY, AZERTY, Dvorak, or any other layout.

## Testing Keys

To find the keysym name for any key:

```bash
# Install xev (usually included with X11)
xev

# Press keys in the xev window
# Look for "keysym" in the output
```

Compare the keysym value with the ones in oxwm to find the corresponding name.

## Troubleshooting

### Key not recognized

1. **Check capitalization** - Key names are case-sensitive (`Return` not `return`)
2. **Use correct number format** - Numbers need `Key` prefix (`Key1` not `1`)
3. **Verify key exists** - Not all keys are supported (yet)

### Keybinding conflicts

If a key doesn't work:

1. Check for duplicate bindings in your config
2. Verify the application isn't capturing the key first
3. Test with a different key combination

### International keyboards

If you have issues with non-QWERTY layouts:

- Keybindings use **physical position**, not the character
- A German QWERTZ keyboard's `Y` key is at the QWERTY `Z` position
- Use the key name for the QWERTY position (`Z` for German Y key)

## Modifier Keys

For modifier key reference, see:

| Modifier | Common Use |
|----------|------------|
| `Mod1` | Alt key |
| `Mod4` | Super/Windows key |
| `Shift` | Shift key |
| `Control` | Ctrl key |

See [Keybindings Configuration](/configuration/keybindings/) for more details on modifiers.

## Adding New Keys

Currently, oxwm supports the keys listed on this page. If you need a key that's not listed:

1. Check the [GitHub repository](https://github.com/tonybanters/oxwm) for updates
2. Open an issue requesting the key
3. The key may need to be added to `src/keyboard/keysyms.rs`
