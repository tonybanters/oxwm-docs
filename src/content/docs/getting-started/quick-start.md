---
title: Quick Start
description: Get up and running with oxwm
---

This guide will help you get started with oxwm after installation.

## Basic Concepts

### Tags (Workspaces)

oxwm uses **tags** instead of traditional workspaces. By default, you have 9 tags (labeled 1-9). Windows can belong to multiple tags simultaneously, and you can view one or more tags at once.

- Switch to tag: `Mod+1` through `Mod+9`
- Move window to tag: `Mod+Shift+1` through `Mod+Shift+9`

### Layouts

oxwm supports two layout modes:

- **Tiling**: Master window on the left (50% width), stack windows on the right
- **Normie (Floating)**: Windows float freely like a traditional window manager

Toggle between layouts:
- `Mod+C` - Switch to tiling layout
- `Mod+F` - Switch to floating layout
- Toggle individual window floating: `Mod+Shift+Space`

### Modkey

By default, the modkey is `Mod4` (Super/Windows key). All keybindings use this as the primary modifier.

You can change this in your config file to `Mod1` (Alt) or other modifiers.

## Essential Keybindings

Here are the most important keybindings to get started (assuming default `Mod4`/Super key):

### Applications

| Keybinding | Action |
|------------|--------|
| `Mod+Return` | Launch terminal |
| `Mod+D` | Open dmenu (application launcher) |
| `Mod+Q` | Close focused window |

### Window Navigation

| Keybinding | Action |
|------------|--------|
| `Mod+J` | Focus next window (down in stack) |
| `Mod+K` | Focus previous window (up in stack) |
| `Mod+Shift+J` | Swap with next window |
| `Mod+Shift+K` | Swap with previous window |

### Tags (Workspaces)

| Keybinding | Action |
|------------|--------|
| `Mod+1` to `Mod+9` | Switch to tag 1-9 |
| `Mod+Shift+1` to `Mod+Shift+9` | Move window to tag 1-9 |

### Layout Management

| Keybinding | Action |
|------------|--------|
| `Mod+Shift+Space` | Toggle floating for current window |
| `Mod+Shift+F` | Toggle fullscreen |
| `Mod+A` | Toggle gaps |

### Multi-Monitor

| Keybinding | Action |
|------------|--------|
| `Mod+,` | Focus left monitor |
| `Mod+.` | Focus right monitor |

### System

| Keybinding | Action |
|------------|--------|
| `Mod+Shift+R` | Reload configuration |
| `Mod+Shift+Q` | Quit oxwm |

## Your First Session

1. **Log in to oxwm** using your display manager or `startx`

2. **Open a terminal**: Press `Mod+Return` (Super+Enter)

3. **Launch applications**: Press `Mod+D` to open dmenu, then type an application name

4. **Navigate windows**: Use `Mod+J` and `Mod+K` to cycle through windows

5. **Try different tags**: Press `Mod+2` to switch to tag 2, `Mod+3` for tag 3, etc.

6. **Move windows between tags**: Focus a window, then press `Mod+Shift+3` to move it to tag 3

7. **Experiment with layouts**: Open multiple windows and use `Mod+Shift+Space` to make some float

## Customizing Your Setup

The configuration file is located at `~/.config/oxwm/config.ron`.

### Change Your Terminal

Edit the `terminal` field:

```ron
terminal: "alacritty",  // or "kitty", "wezterm", etc.
```

### Change Border Colors

```ron
border_focused: 0x6dade3,    // Blue when focused
border_unfocused: 0xbbbbbb,  // Gray when unfocused
```

### Adjust Gaps

```ron
gap_inner_horizontal: 5,
gap_inner_vertical: 5,
gap_outer_horizontal: 5,
gap_outer_vertical: 5,
```

### Reload Configuration

After making changes, press `Mod+Shift+R` to reload the config without restarting your session.

## Next Steps

- Learn more about [configuration options](/configuration/overview/)
- Explore [keybinding customization](/configuration/keybindings/)
- Set up your [status bar](/configuration/status-bar/)
- View the complete [keybindings reference](/reference/keybindings/)

## Getting Help

If you encounter issues:

1. Check that your config file syntax is valid (RON format)
2. Look at the default config: `oxwm --init` (backs up existing config)
3. Visit the [GitHub repository](https://github.com/tonybanters/oxwm) to report bugs
