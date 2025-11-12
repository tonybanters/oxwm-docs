---
title: Quick Start
description: Get up and running with OXWM in minutes
---

This guide will get you up and running with OXWM quickly.

## First Launch

After [installing OXWM](/getting-started/installation/), simply start it:

```bash
# From your .xinitrc
exec oxwm

# Or select OXWM from your display manager
```

On first launch, OXWM automatically creates a default configuration at `~/.config/oxwm/config.lua`.

## Understanding the Config

OXWM uses a clean, functional Lua API. Here's what your initial config looks like:

```lua
-- Set basic options
oxwm.set_terminal("st")
oxwm.set_modkey("Mod4")  -- Mod4 = Super/Windows key
oxwm.set_tags({ "1", "2", "3", "4", "5", "6", "7", "8", "9" })

-- Configure borders
oxwm.border.set_width(2)
oxwm.border.set_focused_color("#6dade3")
oxwm.border.set_unfocused_color("#bbbbbb")

-- Configure gaps
oxwm.gaps.set_enabled(true)
oxwm.gaps.set_inner(5, 5)  -- horizontal, vertical
oxwm.gaps.set_outer(5, 5)

-- Set up keybindings
oxwm.key.bind({ "Mod4" }, "Return", oxwm.spawn("st"))
oxwm.key.bind({ "Mod4" }, "Q", oxwm.client.kill())
```

## Default Keybindings

| Keybinding | Action |
|------------|--------|
| `Mod+Return` | Spawn terminal |
| `Mod+D` | Launch dmenu |
| `Mod+Q` | Close window |
| `Mod+Shift+Q` | Quit OXWM |
| `Mod+Shift+R` | Reload config (hot-reload!) |
| `Mod+H/J/K/L` | Focus window (vim-style) |
| `Mod+Shift+H/J/K/L` | Swap windows |
| `Mod+1-9` | Switch to tag |
| `Mod+Shift+1-9` | Move window to tag |
| `Mod+A` | Toggle gaps |
| `Mod+Shift+F` | Toggle fullscreen |
| `Mod+Shift+Space` | Toggle floating |
| `Mod+Shift+/` | Show keybind overlay |

## Making Your First Edit

1. Open your config:
   ```bash
   $EDITOR ~/.config/oxwm/config.lua
   ```

2. Change your terminal (example):
   ```lua
   oxwm.set_terminal("alacritty")  -- or kitty, wezterm, etc.
   ```

3. Save and press `Mod+Shift+R` to reload!

Your change takes effect **instantly** without restarting X.

## LSP Support & Autocomplete

OXWM includes full LSP support with type definitions. If you use a Lua language server:

1. The `oxwm.lua` file is automatically installed to `~/.config/oxwm/`
2. Your editor will provide autocomplete and documentation for all `oxwm.*` functions
3. Set up your editor (see [LSP Setup Guide](/guides/lsp-setup/))

## Next Steps

- [Configuration Basics](/configuration/basics/) - Learn about all configuration options
- [Bar Configuration](/configuration/bar/) - Customize your status bar
- [Keybindings](/configuration/keybindings/) - Set up custom keyboard shortcuts
- [API Reference](/api-reference/core/) - Complete API documentation
- [Hot Reload Guide](/guides/hot-reload/) - Master instant configuration changes

## Common Customizations

### Change Your Modkey

```lua
-- Use Alt instead of Super
oxwm.set_modkey("Mod1")

-- Available modkeys: Mod1 (Alt), Mod4 (Super), Control, Shift
```

### Disable Gaps

```lua
oxwm.gaps.set_enabled(false)
```

### Change Border Colors

```lua
-- Hex strings
oxwm.border.set_focused_color("#ff0000")    -- Red
oxwm.border.set_unfocused_color("#666666")  -- Gray

-- Or hex integers
oxwm.border.set_focused_color(0xff0000)
```

### Add a Keybinding

```lua
-- Launch Firefox with Mod+B
oxwm.key.bind({ "Mod4" }, "B", oxwm.spawn("firefox"))
```

## Getting Help

- Check the [API Reference](/api-reference/core/) for all available functions
- Your LSP will show function signatures and documentation
- Join our community for support
