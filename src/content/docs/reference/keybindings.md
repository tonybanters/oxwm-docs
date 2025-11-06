---
title: Default Keybindings
description: Complete list of default oxwm keybindings
---

This page lists all default keybindings in oxwm. The default modkey is `Mod4` (Super/Windows key).

## Applications

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Mod+Return` | Launch terminal | Opens default terminal (st) |
| `Mod+D` | Launch dmenu | Application launcher |
| `Mod+S` | Screenshot | Takes screenshot with maim |

## Window Management

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Mod+Q` | Kill window | Close focused window |
| `Mod+J` | Focus down | Focus next window in stack |
| `Mod+K` | Focus up | Focus previous window in stack |
| `Mod+Shift+J` | Swap down | Swap with next window |
| `Mod+Shift+K` | Swap up | Swap with previous window |
| `Mod+Shift+H` | Exchange left | Swap master and stack |
| `Mod+Shift+L` | Exchange right | Swap master and stack |

## Smart Window Movement

Move windows intelligently across monitors and within layouts:

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Mod+Ctrl+J` | Smart move down | Move window down or to monitor below |
| `Mod+Ctrl+K` | Smart move up | Move window up or to monitor above |
| `Mod+Ctrl+H` | Smart move left | Move window left or to monitor left |
| `Mod+Ctrl+L` | Smart move right | Move window right or to monitor right |

## Layout Management

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Mod+C` | Tiling layout | Switch to tiling (master/stack) layout |
| `Mod+F` | Floating layout | Switch to floating (normie) layout |
| `Mod+Shift+Space` | Toggle floating | Toggle floating for current window |
| `Mod+Shift+F` | Toggle fullscreen | Toggle fullscreen mode |
| `Mod+A` | Toggle gaps | Enable/disable window gaps |

## Tags (Workspaces)

### View Tags

Switch to a specific tag (workspace):

| Keybinding | Tag |
|------------|-----|
| `Mod+1` | Tag 1 |
| `Mod+2` | Tag 2 |
| `Mod+3` | Tag 3 |
| `Mod+4` | Tag 4 |
| `Mod+5` | Tag 5 |
| `Mod+6` | Tag 6 |
| `Mod+7` | Tag 7 |
| `Mod+8` | Tag 8 |
| `Mod+9` | Tag 9 |

### Move Window to Tag

Move focused window to a specific tag:

| Keybinding | Tag |
|------------|-----|
| `Mod+Shift+1` | Tag 1 |
| `Mod+Shift+2` | Tag 2 |
| `Mod+Shift+3` | Tag 3 |
| `Mod+Shift+4` | Tag 4 |
| `Mod+Shift+5` | Tag 5 |
| `Mod+Shift+6` | Tag 6 |
| `Mod+Shift+7` | Tag 7 |
| `Mod+Shift+8` | Tag 8 |
| `Mod+Shift+9` | Tag 9 |

## Multi-Monitor

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Mod+,` | Focus left monitor | Move focus to monitor on the left |
| `Mod+.` | Focus right monitor | Move focus to monitor on the right |

## Media Keys

These work without modifiers on most keyboards:

| Keybinding | Action | Description |
|------------|--------|-------------|
| `XF86AudioRaiseVolume` | Volume up | Increase volume by 5% (requires amixer) |
| `XF86AudioLowerVolume` | Volume down | Decrease volume by 5% (requires amixer) |
| `XF86AudioMute` | Mute toggle | Toggle audio mute (requires amixer) |
| `XF86MonBrightnessUp` | Brightness up | Increase screen brightness (requires brightnessctl) |
| `XF86MonBrightnessDown` | Brightness down | Decrease screen brightness (requires brightnessctl) |

## System

| Keybinding | Action | Description |
|------------|--------|-------------|
| `Mod+Shift+R` | Reload config | Hot reload configuration file |
| `Mod+Shift+Q` | Quit WM | Exit oxwm (logs out) |

## Quick Reference Card

### Essential Bindings

```
Mod+Return         Terminal
Mod+D              dmenu launcher
Mod+Q              Close window
Mod+Shift+Q        Quit oxwm
Mod+Shift+R        Reload config
```

### Navigation

```
Mod+J/K            Focus down/up
Mod+1-9            Switch to tag 1-9
Mod+,/.            Focus left/right monitor
```

### Window Management

```
Mod+Shift+J/K      Swap with next/prev
Mod+Ctrl+H/J/K/L   Smart move window
Mod+Shift+Space    Toggle floating
Mod+Shift+F        Fullscreen
```

### Layout

```
Mod+C              Tiling layout
Mod+F              Floating layout
Mod+A              Toggle gaps
```

## Customization

All these keybindings can be customized in `~/.config/oxwm/config.ron`.

See the [Keybindings Configuration](/configuration/keybindings/) guide for details on creating custom keybindings.

## Modifier Key Patterns

oxwm's default keybindings follow a logical pattern:

- **Mod** alone: Basic actions (focus, view, spawn)
- **Mod+Shift**: Modify/move actions (swap windows, move to tag, quit)
- **Mod+Control**: Advanced movement (smart move between monitors)

This pattern helps make keybindings intuitive and memorable.

## Required External Programs

Some default keybindings require external programs:

| Program | Keybindings | Installation |
|---------|-------------|--------------|
| st | `Mod+Return` | `pacman -S st` or compile from source |
| dmenu | `Mod+D` | `pacman -S dmenu` |
| maim | `Mod+S` | `pacman -S maim` |
| amixer | Volume keys | `pacman -S alsa-utils` |
| brightnessctl | Brightness keys | `pacman -S brightnessctl` |

Replace st with your preferred terminal in the config:

```ron
terminal: "alacritty",  // or kitty, wezterm, etc.
```

## Cheat Sheet

Print this for quick reference:

```
╔═══════════════════════════════════════════════════════════╗
║                    oxwm Keybindings                       ║
╠═══════════════════════════════════════════════════════════╣
║ BASIC                                                     ║
║  Mod+Return       Terminal    Mod+D          dmenu       ║
║  Mod+Q            Close       Mod+Shift+Q    Quit        ║
║                                                           ║
║ FOCUS                                                     ║
║  Mod+J/K          Down/Up     Mod+1-9        Tag 1-9     ║
║  Mod+,/.          Mon Left/Right                         ║
║                                                           ║
║ MOVE                                                      ║
║  Mod+Shift+J/K    Swap        Mod+Shift+1-9  To Tag 1-9  ║
║  Mod+Ctrl+HJKL    Smart Move                             ║
║                                                           ║
║ LAYOUT                                                    ║
║  Mod+C            Tiling      Mod+F          Floating    ║
║  Mod+Shift+Space  Toggle Float                           ║
║  Mod+Shift+F      Fullscreen  Mod+A          Toggle Gaps ║
║                                                           ║
║ SYSTEM                                                    ║
║  Mod+Shift+R      Reload Config                          ║
╚═══════════════════════════════════════════════════════════╝
```
