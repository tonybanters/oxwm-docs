---
title: Multi-Monitor Setup
description: Configure and use oxwm with multiple monitors
---

oxwm provides first-class multi-monitor support through Xinerama, with independent tag selection and per-monitor features.

## Features

- **Automatic detection** - Monitors are detected automatically via Xinerama
- **Independent tags** - Each monitor can display different tags
- **Per-monitor fullscreen** - Fullscreen mode works per-monitor, not globally
- **Smart window movement** - Move windows between monitors intelligently
- **Persistent focus** - Focus state tracked separately per monitor

## Requirements

### Xinerama Support

oxwm uses Xinerama for multi-monitor detection. This is typically enabled by default in modern X11 setups.

Verify Xinerama is active:

```bash
xrandr --query | grep -i connected
```

You should see multiple monitors listed:

```
HDMI-1 connected 1920x1080+0+0
DP-1 connected 1920x1080+1920+0
```

## Monitor Configuration

### Using xrandr

Configure your monitor layout with xrandr:

```bash
# List available outputs
xrandr

# Basic dual monitor setup (side-by-side)
xrandr --output HDMI-1 --auto --output DP-1 --auto --right-of HDMI-1

# Vertical arrangement
xrandr --output HDMI-1 --auto --output DP-1 --auto --above HDMI-1

# Different resolutions
xrandr --output HDMI-1 --mode 1920x1080 --output DP-1 --mode 2560x1440 --right-of HDMI-1

# Primary monitor
xrandr --output HDMI-1 --primary
```

### Automatic Configuration

Create a script to run on startup:

```bash
#!/bin/bash
# ~/.config/oxwm/monitor-setup.sh

xrandr --output HDMI-1 --mode 1920x1080 --pos 0x0 --primary \
       --output DP-1 --mode 1920x1080 --pos 1920x0
```

Make it executable:

```bash
chmod +x ~/.config/oxwm/monitor-setup.sh
```

Run it before starting oxwm (in `.xinitrc`):

```bash
# ~/.xinitrc
~/.config/oxwm/monitor-setup.sh
exec oxwm
```

### Using autorandr

For more sophisticated setups, use autorandr:

```bash
# Install
sudo pacman -S autorandr  # Arch
sudo apt install autorandr  # Debian/Ubuntu

# Save current setup as a profile
autorandr --save work

# Save another profile
autorandr --save home

# Auto-detect and switch
autorandr --change
```

Add to `.xinitrc`:

```bash
autorandr --change
exec oxwm
```

## Using Multiple Monitors

### Monitor Navigation

Switch focus between monitors:

| Keybinding | Action |
|------------|--------|
| `Mod+,` | Focus monitor to the left |
| `Mod+.` | Focus monitor to the right |

Monitors are arranged in a circular list, so you can cycle through them.

### Independent Tags

Each monitor maintains its own tag selection:

1. **Monitor 1** can show tag 1
2. **Monitor 2** can show tag 5
3. Both are independent and updated separately

Switch tags on the focused monitor:
- `Mod+1` through `Mod+9` changes tags on the current monitor only

### Moving Windows Between Monitors

#### Smart Movement

Use smart move commands to move windows between monitors:

```ron
// In your keybindings
(modifiers: [Mod4, Control], key: H, action: SmartMoveLeft),
(modifiers: [Mod4, Control], key: L, action: SmartMoveRight),
```

- **SmartMoveLeft**: Moves window to master position or to left monitor
- **SmartMoveRight**: Moves window to stack position or to right monitor

#### Workflow

1. Focus a window on monitor 1
2. Press `Mod+Ctrl+L` repeatedly
3. Window moves through positions, eventually to monitor 2

### Per-Monitor Fullscreen

Toggle fullscreen with `Mod+Shift+F`:

- Fullscreen is **per-monitor**, not global
- Other monitors remain unaffected
- Previous bug (global fullscreen) has been fixed

## Common Layouts

### Horizontal (Side-by-Side)

```bash
# Primary on left, secondary on right
xrandr --output HDMI-1 --primary --auto --pos 0x0 \
       --output DP-1 --auto --pos 1920x0
```

**Use case**: Equal importance, extended workspace

### Vertical (Stacked)

```bash
# Primary on bottom, secondary on top
xrandr --output HDMI-1 --primary --auto --pos 0x1080 \
       --output DP-1 --auto --pos 0x0
```

**Use case**: Reference material on top, work on bottom

### Mixed Orientations

```bash
# Portrait secondary on left of landscape primary
xrandr --output HDMI-1 --primary --auto --pos 1080x420 \
       --output DP-1 --rotate left --pos 0x0
```

**Use case**: Code on primary, documentation on portrait

### Triple Monitor

```bash
# Three monitors in a row
xrandr --output HDMI-1 --primary --auto --pos 1920x0 \
       --output DP-1 --auto --pos 0x0 \
       --output DP-2 --auto --pos 3840x0
```

## Workflow Examples

### Development Setup

**Monitor 1** (Primary):
- Tag 1: IDE
- Tag 2: Terminal

**Monitor 2** (Secondary):
- Tag 3: Browser (documentation)
- Tag 4: Chat applications

Navigate:
- `Mod+,` / `Mod+.` to switch monitor focus
- `Mod+1`, `Mod+2`, etc. to switch tags on focused monitor

### Content Creation

**Monitor 1**: Editor/Creative tool (fullscreen)
**Monitor 2**: Reference material, file browser

Use `Mod+Shift+F` on monitor 1 for distraction-free editing.

## Configuration Tips

### Status Bar Behavior

The status bar appears on each monitor and shows:
- **Left**: Tags (current monitor's tag selection)
- **Center**: Layout symbol (current monitor's layout)
- **Right**: Status blocks (same across all monitors)

### Per-Monitor Gaps

Gaps are global, not per-monitor. Toggle with `Mod+A` affects all monitors.

### Keybinding Suggestions

```ron
keybindings: [
    // Focus monitors
    (modifiers: [Mod4], key: Comma, action: FocusMonLeft),
    (modifiers: [Mod4], key: Period, action: FocusMonRight),

    // Smart move between monitors
    (modifiers: [Mod4, Control], key: H, action: SmartMoveLeft),
    (modifiers: [Mod4, Control], key: J, action: SmartMoveDown),
    (modifiers: [Mod4, Control], key: K, action: SmartMoveUp),
    (modifiers: [Mod4, Control], key: L, action: SmartMoveRight),

    // Fullscreen (per-monitor)
    (modifiers: [Mod4, Shift], key: F, action: ToggleFullscreen),
]
```

## Troubleshooting

### Monitors not detected

Check Xinerama status:

```bash
xdpyinfo | grep -i xinerama
```

Should show:
```
XINERAMA extension version 1.1
```

If not enabled, check your X11 configuration.

### Wrong monitor order

oxwm uses Xinerama's reported order. Adjust with xrandr:

```bash
# Set primary monitor
xrandr --output HDMI-1 --primary

# Rearrange positions
xrandr --output HDMI-1 --pos 0x0 --output DP-1 --pos 1920x0
```

Restart oxwm to re-detect.

### Window appears on wrong monitor

Windows appear on the focused monitor. If a window appears on the wrong one:

1. Focus it with `Mod+J` / `Mod+K`
2. Move it with `Mod+Ctrl+H` / `Mod+Ctrl+L`

### Focus tracking issues

If focus gets stuck:

1. Press `Mod+,` or `Mod+.` to cycle focus
2. Reload config: `Mod+Shift+R`
3. Restart oxwm if persistent

### Fullscreen spans all monitors

This bug has been fixed in recent versions. Update to the latest version:

```bash
cargo install --git https://github.com/tonybanters/oxwm --force
```

## Testing Multi-Monitor

Test with Xephyr (simulated monitors):

```bash
# From oxwm repository
just test-multimon

# Or manually
Xephyr +xinerama -screen 1920x1080 -screen 1920x1080 :1 &
DISPLAY=:1 ./target/release/oxwm
```

## Advanced Configurations

### Non-Rectangular Layouts

With monitors at different heights:

```bash
# Align tops
xrandr --output HDMI-1 --pos 0x0 --mode 1920x1080 \
       --output DP-1 --pos 1920x0 --mode 2560x1440

# Align bottoms
xrandr --output HDMI-1 --pos 0x360 --mode 1920x1080 \
       --output DP-1 --pos 1920x0 --mode 2560x1440
```

### DPI Scaling

For mixed DPI displays:

```bash
# Set DPI for X
xrandr --dpi 96

# Or per-monitor (requires compositor support)
xrandr --output HDMI-1 --scale 1x1 --output DP-1 --scale 1.5x1.5
```

Note: oxwm respects X11 DPI settings for the status bar font.

### Monitor Hotplug

For dynamic monitor connection (docking stations):

Create a udev rule or use autorandr:

```bash
# Auto-detect on change
autorandr --change
```

Run `autorandr --change` in your oxwm config with a keybinding:

```ron
(modifiers: [Mod4, Shift], key: M, action: Spawn, arg: "autorandr --change")
```

## Performance Notes

- Multi-monitor support has minimal performance overhead
- Each monitor maintains its own window list
- Xinerama queries are cached until monitor configuration changes
- Status bar rendering is optimized (only redraws on changes)

## Best Practices

1. **Use xrandr scripts** for consistent setup
2. **Set a primary monitor** for predictable behavior
3. **Use smart movement** instead of manual tag switching
4. **Assign related tasks** to adjacent tags on the same monitor
5. **Test configurations** with Xephyr before committing

## Related Resources

- [Xrandr Documentation](https://wiki.archlinux.org/title/Xrandr)
- [Autorandr](https://github.com/phillipberndt/autorandr)
- [Xinerama](https://www.x.org/wiki/Development/Documentation/Xinerama/)

## Next Steps

- Configure [keybindings](/configuration/keybindings/) for multi-monitor workflow
- Set up [autorandr profiles](https://github.com/phillipberndt/autorandr) for different locations
- Optimize your [status bar](/configuration/status-bar/) for multi-monitor display
