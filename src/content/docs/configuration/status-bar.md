---
title: Status Bar
description: Configure the oxwm status bar and blocks
---

oxwm includes a built-in status bar with a modular block system. Each block can display different information and update at its own interval.

## Status Bar Overview

The status bar displays:
- **Left side**: Tag indicators (clickable)
- **Center**: Layout symbol
- **Right side**: Status blocks (customizable)

## Status Block Configuration

Status blocks are defined in the `status_blocks` table:

```lua
status_blocks = {
    {
        format = "{}",
        command = "DateTime",
        command_arg = "%H:%M",
        interval_secs = 60,
        color = "#0db9d7",
        underline = true
    },
},
```

### Block Fields

| Field | Type | Description |
|-------|------|-------------|
| `format` | String | Display format with `{}` placeholders |
| `command` | String | Block type (see below) |
| `command_arg` | String | Command-specific argument |
| `interval_secs` | Integer | Update interval in seconds |
| `color` | Hex | Text color (0xRRGGBB) |
| `underline` | Boolean | Show underline indicator |

## Available Commands

### DateTime

Display date and time using strftime format:

```lua
{
    format = "{}",
    command = "DateTime",
    command_arg = "%a, %b %d - %-I:%M %P",  -- Mon, Jan 01 - 3:45 pm
    interval_secs = 1,  -- Update every second
    color = "#0db9d7",
    underline = true
},
```

**Common date/time formats:**

```lua
-- Time only
"%H:%M"           -- 15:30 (24-hour)
"%-I:%M %P"       -- 3:30 pm (12-hour)
"%H:%M:%S"        -- 15:30:45 (with seconds)

-- Date only
"%Y-%m-%d"        -- 2025-01-15
"%a, %b %d"       -- Mon, Jan 15
"%B %d, %Y"       -- January 15, 2025

-- Date and time
"%a %b %d - %-I:%M %P"     -- Mon Jan 15 - 3:30 pm
"%Y-%m-%d %H:%M"           -- 2025-01-15 15:30
```

For complete strftime format reference, see `man strftime`.

### Ram

Display RAM usage:

```lua
{
    format = "RAM: {used}/{total} GB",
    command = "Ram",
    command_arg = "",  -- Not used
    interval_secs = 5,
    color = "#7aa2f7",
    underline = true
},
```

**Available placeholders:**
- `{used}` - Used RAM in GB
- `{total}` - Total RAM in GB

**Format examples:**

```lua
format = "{used}/{total} GB"      -- 8/16 GB
format = "RAM: {used}G"           -- RAM: 8G
format = "󰍛 {used}/{total}"        -- With icon
```

### Battery

Display battery status with different formats for each state:

```lua
{
    format = "",  -- Not used with battery_formats
    command = "Battery",
    battery_formats = {
        charging = "󰂄 {}%",
        discharging = "󰁹 {}%",
        full = "󰁹 {}%",
    },
    interval_secs = 30,
    color = "#9ece6a",
    underline = true
},
```

**Battery format fields:**
- `charging` - Format when charging
- `discharging` - Format when on battery
- `full` - Format when fully charged

The `{}` placeholder is replaced with battery percentage.

**Format examples:**

```lua
-- With icons
battery_formats = {
    charging = "󰂄 {}%",     -- Charging icon
    discharging = "󰁹 {}%",  -- Battery icon
    full = "󰂅 {}%",         -- Full battery icon
},

-- Simple text
battery_formats = {
    charging = "CHG {}%",
    discharging = "BAT {}%",
    full = "FULL {}%",
},

-- Minimal
battery_formats = {
    charging = "+{}%",
    discharging = "{}%",
    full = "{}%",
},
```

### Shell

Execute a shell command and display its output:

```lua
{
    format = "{}",
    command = "Shell",
    command_arg = "uname -r",  -- Shell command to execute
    interval_secs = 3600,      -- Update every hour
    color = "#f7768e",
    underline = true
},
```

**Examples:**

```lua
-- Display kernel version
{ format = " {}", command = "Shell", command_arg = "uname -r",
  interval_secs = 18446744073709551615, color = "#f7768e", underline = true },

-- Display uptime
{ format = "UP: {}", command = "Shell",
  command_arg = "uptime -p | sed 's/up //'",
  interval_secs = 300, color = "#7dcfff", underline = true },

-- Display CPU temperature
{ format = "{}°C", command = "Shell",
  command_arg = "cat /sys/class/thermal/thermal_zone0/temp | awk '{print int($1/1000)}'",
  interval_secs = 5, color = "#f7768e", underline = true },

-- Display volume
{ format = "VOL: {}", command = "Shell",
  command_arg = "amixer get Master | grep -o '[0-9]*%' | head -1",
  interval_secs = 1, color = "#9ece6a", underline = true },
```

**Note:** Keep shell commands lightweight to avoid performance issues.

### Static

Display static text:

```lua
{ format = "oxwm", command = "Static",
  interval_secs = 999999999, color = "#bb9af7", underline = true },
```

## Complete Status Bar Examples

### Minimal

```lua
status_blocks = {
    { format = "{}", command = "DateTime", command_arg = "%H:%M",
      interval_secs = 60, color = "#0db9d7", underline = true },
}
```

### Standard

```lua
status_blocks = {
    { format = "RAM: {used}/{total} GB", command = "Ram", command_arg = "",
      interval_secs = 5, color = "#7aa2f7", underline = true },

    { format = "{}", command = "DateTime", command_arg = "%a, %b %d - %-I:%M %P",
      interval_secs = 1, color = "#0db9d7", underline = true },
}
```

### Laptop Setup

```lua
status_blocks = {
    { format = "", command = "Battery",
      battery_formats = {
          charging = "󰂄 {}%",
          discharging = "󰁹 {}%",
          full = "󰁹 {}%",
      },
      interval_secs = 30, color = "#9ece6a", underline = true },

    { format = "󰍛 {used}/{total}", command = "Ram", command_arg = "",
      interval_secs = 5, color = "#7aa2f7", underline = true },

    { format = "󰸘 {}", command = "DateTime", command_arg = "%a, %b %d - %-I:%M %P",
      interval_secs = 1, color = "#0db9d7", underline = true },
}
```

### Advanced

```lua
status_blocks = {
    -- System info
    { format = " {}", command = "Shell", command_arg = "uname -r",
      interval_secs = 18446744073709551615, color = "#f7768e", underline = true },

    -- Volume
    { format = "VOL: {}", command = "Shell",
      command_arg = "amixer get Master | grep -o '[0-9]*%' | head -1",
      interval_secs = 1, color = "#9ece6a", underline = true },

    -- CPU temp
    { format = "{}°C", command = "Shell",
      command_arg = "cat /sys/class/thermal/thermal_zone0/temp | awk '{print int($1/1000)}'",
      interval_secs = 5, color = "#ff9e64", underline = true },

    -- RAM
    { format = "󰍛 {used}/{total}", command = "Ram", command_arg = "",
      interval_secs = 5, color = "#7aa2f7", underline = true },

    -- Battery
    { format = "", command = "Battery",
      battery_formats = {
          charging = "󰂄 {}%",
          discharging = "󰁹 {}%",
          full = "󰁹 {}%",
      },
      interval_secs = 30, color = "#9ece6a", underline = true },

    -- Date and time
    { format = "󰸘 {}", command = "DateTime",
      command_arg = "%a, %b %d - %-I:%M %P",
      interval_secs = 1, color = "#0db9d7", underline = true },
}
```

## Update Intervals

Choose appropriate intervals for each block:

| Block Type | Recommended Interval | Reason |
|------------|---------------------|---------|
| DateTime | 1-60 seconds | Depends if showing seconds |
| Ram | 5 seconds | Balance updates with CPU usage |
| Battery | 30 seconds | Battery changes slowly |
| Shell (static) | `18446744073709551615` (max u64) | Never updates |
| Shell (dynamic) | 1-300 seconds | Depends on data source |

## Using Variables

```lua
local colors = {
    blue = "#7aa2f7",
    cyan = "#0db9d7",
    green = "#9ece6a",
}

return {
    status_blocks = {
        { format = "RAM: {used}/{total} GB", command = "Ram", command_arg = "",
          interval_secs = 5, color = colors.blue, underline = true },

        { format = "󰸘 {}", command = "DateTime", command_arg = "%H:%M",
          interval_secs = 60, color = colors.cyan, underline = true },
    },
}
```

## Performance Tips

1. **Use longer intervals** for blocks that don't change frequently
2. **Avoid expensive shell commands** - they run repeatedly
3. **Limit total blocks** - too many can impact performance
4. **Cache shell command results** when possible

## Troubleshooting

### Block not showing

1. Check command name is correct (case-sensitive)
2. Verify format string has `{}` placeholders where needed
3. For Battery: ensure battery device exists at `/sys/class/power_supply/BAT0/`
4. For Shell: test command in terminal first

### Icons not displaying

Install a Nerd Font:

```bash
# Arch Linux
yay -S nerd-fonts-complete

# Or manually install specific font
# Download from https://www.nerdfonts.com/
```

Update your font config:

```lua
font = "JetBrainsMono Nerd Font:style=Bold:size=11",
```

### Shell block showing nothing

1. Test the command: `bash -c "your command here"`
2. Ensure command outputs to stdout
3. Check for errors: add `2>&1` to see stderr
4. Simplify command to debug

## Color Coordination

Match your blocks to your color scheme:

```lua
-- Tokyo Night theme
status_blocks = {
    { color = "#7aa2f7" },  -- Blue
    { color = "#9ece6a" },  -- Green
    { color = "#0db9d7" },  -- Cyan
    { color = "#bb9af7" },  -- Purple
    { color = "#f7768e" },  -- Red
}
```

For more details on status block commands, see the [Status Blocks Reference](/reference/status-blocks/).
