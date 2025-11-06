---
title: Status Blocks
description: Reference for status bar block commands
---

This page provides detailed reference for all status bar block commands available in oxwm.

## Block Structure

All status blocks share a common structure:

```ron
(
    format: "Display format with {}",
    command: "CommandType",
    command_arg: "optional argument",
    interval_secs: 60,
    color: 0xRRGGBB,
    underline: true
)
```

## DateTime

Display date and time with custom formatting.

### Configuration

```ron
(
    format: "{}",
    command: "DateTime",
    command_arg: "%Y-%m-%d %H:%M:%S",
    interval_secs: 1,
    color: 0x0db9d7,
    underline: true
)
```

### Fields

| Field | Value | Description |
|-------|-------|-------------|
| `format` | `"{}"` | Display format (use `{}` for placeholder) |
| `command` | `"DateTime"` | Command type |
| `command_arg` | strftime format | Date/time format string |
| `interval_secs` | Integer | Update interval in seconds |

### Format Specifiers

The `command_arg` uses strftime format codes:

#### Date

| Code | Output | Example |
|------|--------|---------|
| `%Y` | Year (4 digits) | 2025 |
| `%y` | Year (2 digits) | 25 |
| `%m` | Month (01-12) | 01 |
| `%B` | Month name (full) | January |
| `%b` | Month name (abbr) | Jan |
| `%d` | Day of month (01-31) | 15 |
| `%e` | Day of month (1-31, space-padded) | 15 |
| `%A` | Weekday (full) | Monday |
| `%a` | Weekday (abbr) | Mon |

#### Time

| Code | Output | Example |
|------|--------|---------|
| `%H` | Hour (00-23) | 15 |
| `%I` | Hour (01-12) | 03 |
| `%-I` | Hour (1-12, no padding) | 3 |
| `%M` | Minute (00-59) | 30 |
| `%S` | Second (00-59) | 45 |
| `%p` | AM/PM (uppercase) | PM |
| `%P` | am/pm (lowercase) | pm |

#### Combined

| Code | Output | Example |
|------|--------|---------|
| `%F` | Date (ISO 8601) | 2025-01-15 |
| `%T` | Time (24-hour) | 15:30:45 |
| `%r` | Time (12-hour with AM/PM) | 03:30:45 PM |

### Examples

```ron
// 24-hour time only
command_arg: "%H:%M"                        // 15:30

// 12-hour time
command_arg: "%-I:%M %P"                    // 3:30 pm

// Date only
command_arg: "%Y-%m-%d"                     // 2025-01-15
command_arg: "%a, %b %d"                    // Mon, Jan 15

// Date and time
command_arg: "%a, %b %d - %-I:%M %P"       // Mon, Jan 15 - 3:30 pm
command_arg: "%Y-%m-%d %H:%M:%S"           // 2025-01-15 15:30:45

// With icons
command_arg: "󰸘 %H:%M"                      // 󰸘 15:30
command_arg: "󰃭 %a, %b %d"                  // 󰃭 Mon, Jan 15
```

### Recommended Intervals

- With seconds: `interval_secs: 1`
- Without seconds: `interval_secs: 60`

---

## Ram

Display RAM (memory) usage.

### Configuration

```ron
(
    format: "RAM: {used}/{total} GB",
    command: "Ram",
    command_arg: "",
    interval_secs: 5,
    color: 0x7aa2f7,
    underline: true
)
```

### Fields

| Field | Value | Description |
|-------|-------|-------------|
| `format` | String with placeholders | Display format |
| `command` | `"Ram"` | Command type |
| `command_arg` | `""` | Not used (leave empty) |
| `interval_secs` | Integer | Update interval (recommended: 5-10) |

### Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{used}` | RAM in use (GB) | 8 |
| `{total}` | Total RAM (GB) | 16 |

### Examples

```ron
// Standard format
format: "RAM: {used}/{total} GB"           // RAM: 8/16 GB

// Short format
format: "{used}/{total}"                   // 8/16

// With icon
format: "󰍛 {used}/{total} GB"              // 󰍛 8/16 GB

// Used only
format: "RAM: {used}G"                     // RAM: 8G

// Percentage-style
format: "{used} of {total} GB"             // 8 of 16 GB
```

### Recommended Interval

`interval_secs: 5` - Good balance between accuracy and performance

---

## Battery

Display battery status with state-dependent formatting.

### Configuration

```ron
(
    format: "",  // Not used with battery_formats
    command: "Battery",
    battery_formats: (
        charging: "󰂄 {}%",
        discharging: "󰁹 {}%",
        full: "󰁹 {}%",
    ),
    interval_secs: 30,
    color: 0x9ece6a,
    underline: true
)
```

### Fields

| Field | Value | Description |
|-------|-------|-------------|
| `format` | `""` | Leave empty (use `battery_formats` instead) |
| `command` | `"Battery"` | Command type |
| `battery_formats` | Struct | Format for each battery state |
| `interval_secs` | Integer | Update interval (recommended: 30-60) |

### Battery Formats

```ron
battery_formats: (
    charging: "format string",     // When plugged in and charging
    discharging: "format string",  // When on battery
    full: "format string",         // When at 100% and plugged in
)
```

Each format string uses `{}` as a placeholder for the battery percentage.

### Examples

```ron
// With charging icons
battery_formats: (
    charging: "󰂄 {}%",       // 󰂄 75%
    discharging: "󰁹 {}%",    // 󰁹 75%
    full: "󰂅 {}%",           // 󰂅 100%
)

// Text-based
battery_formats: (
    charging: "CHG {}%",     // CHG 75%
    discharging: "BAT {}%",  // BAT 75%
    full: "FULL {}%",        // FULL 100%
)

// Minimal
battery_formats: (
    charging: "+{}%",        // +75%
    discharging: "{}%",      // 75%
    full: "{}%",             // 100%
)

// Different charging icons based on level (static)
battery_formats: (
    charging: "⚡{}%",        // ⚡75%
    discharging: "🔋{}%",    // 🔋75%
    full: "✓ {}%",           // ✓ 100%
)
```

### System Requirements

- Battery device at `/sys/class/power_supply/BAT0/`
- Linux power supply subsystem

If your battery path is different, Battery block may not work (this would need code modification).

### Recommended Interval

`interval_secs: 30` - Battery levels change slowly

---

## Shell

Execute a shell command and display its output.

### Configuration

```ron
(
    format: "{}",
    command: "Shell",
    command_arg: "uname -r",
    interval_secs: 3600,
    color: 0xf7768e,
    underline: true
)
```

### Fields

| Field | Value | Description |
|-------|-------|-------------|
| `format` | `"{}"` | Display format (use `{}` for output) |
| `command` | `"Shell"` | Command type |
| `command_arg` | Shell command | Command to execute |
| `interval_secs` | Integer | Update interval (varies by use case) |

### Examples

```ron
// Kernel version (static)
(format: " {}", command: "Shell", command_arg: "uname -r",
 interval_secs: 18446744073709551615, color: 0xf7768e, underline: true)

// Uptime
(format: "UP: {}", command: "Shell",
 command_arg: "uptime -p | sed 's/up //'",
 interval_secs: 300, color: 0x7dcfff, underline: true)

// CPU temperature
(format: "{}°C", command: "Shell",
 command_arg: "cat /sys/class/thermal/thermal_zone0/temp | awk '{print int($1/1000)}'",
 interval_secs: 5, color: 0xff9e64, underline: true)

// Volume level
(format: "VOL: {}", command: "Shell",
 command_arg: "amixer get Master | grep -o '[0-9]*%' | head -1",
 interval_secs: 1, color: 0x9ece6a, underline: true)

// Disk usage
(format: "DISK: {}", command: "Shell",
 command_arg: "df -h / | awk 'NR==2 {print $5}'",
 interval_secs: 60, color: 0xbb9af7, underline: true)

// Network status
(format: "{}", command: "Shell",
 command_arg: "nmcli -t -f active,ssid dev wifi | grep '^yes' | cut -d: -f2",
 interval_secs: 10, color: 0x0db9d7, underline: true)

// Package updates (Arch)
(format: " {}", command: "Shell",
 command_arg: "checkupdates | wc -l",
 interval_secs: 3600, color: 0xf7768e, underline: true)
```

### Performance Tips

1. **Use appropriate intervals** - Don't run expensive commands every second
2. **Cache static data** - Use max interval (`18446744073709551615`) for unchanging info
3. **Keep commands lightweight** - Avoid complex pipelines when possible
4. **Test performance** - Run your command in terminal first with `time`

### Command Guidelines

**Good commands:**
- Read from `/sys` or `/proc`
- Simple text processing with `awk`, `sed`, `grep`
- Single-purpose utilities

**Avoid:**
- Network requests
- Disk-intensive operations
- Commands that might hang
- Complex pipelines

### Recommended Intervals

| Data Type | Interval | Example |
|-----------|----------|---------|
| Static | `18446744073709551615` | Kernel version |
| Very slow | `3600` (1 hour) | Package updates |
| Slow | `300` (5 min) | Uptime |
| Medium | `60` (1 min) | Disk usage |
| Fast | `10` | Network status |
| Real-time | `1-5` | CPU temp, volume |

---

## Complete Example

Here's a comprehensive status bar configuration:

```ron
status_blocks: [
    // System info (static)
    (
        format: " {}",
        command: "Shell",
        command_arg: "uname -r",
        interval_secs: 18446744073709551615,
        color: 0xf7768e,
        underline: true
    ),

    // CPU temperature
    (
        format: "{}°C",
        command: "Shell",
        command_arg: "cat /sys/class/thermal/thermal_zone0/temp | awk '{print int($1/1000)}'",
        interval_secs: 5,
        color: 0xff9e64,
        underline: true
    ),

    // RAM usage
    (
        format: "󰍛 {used}/{total}",
        command: "Ram",
        command_arg: "",
        interval_secs: 5,
        color: 0x7aa2f7,
        underline: true
    ),

    // Battery status
    (
        format: "",
        command: "Battery",
        battery_formats: (
            charging: "󰂄 {}%",
            discharging: "󰁹 {}%",
            full: "󰁹 {}%",
        ),
        interval_secs: 30,
        color: 0x9ece6a,
        underline: true
    ),

    // Date and time
    (
        format: "󰸘 {}",
        command: "DateTime",
        command_arg: "%a, %b %d - %-I:%M %P",
        interval_secs: 1,
        color: 0x0db9d7,
        underline: true
    ),
],
```

## Troubleshooting

### Block not displaying

1. Check command name is exact (case-sensitive)
2. Verify `format` has `{}` placeholder
3. Test shell commands in terminal first
4. Check system requirements (battery device, etc.)

### Icons not showing

Install a Nerd Font and update your font config:

```ron
font: "JetBrainsMono Nerd Font:style=Bold:size=11"
```

### Shell command output garbled

1. Ensure command outputs plain text
2. Strip ANSI color codes if present
3. Trim output to reasonable length
4. Test with `bash -c "your command"`

## See Also

- [Status Bar Configuration](/configuration/status-bar/) - Usage guide and examples
- [Appearance](/configuration/appearance/) - Color customization
