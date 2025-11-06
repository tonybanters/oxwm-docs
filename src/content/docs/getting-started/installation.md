---
title: Installation
description: How to install oxwm on your system
---

oxwm can be installed in several ways depending on your distribution and preferences.

## Prerequisites

Before installing oxwm, ensure you have the following system dependencies:

- X11 display server (Xorg)
- XFT library (`libxft`)
- Freetype library
- Fontconfig library
- pkg-config (for building)

### Arch Linux

```bash
sudo pacman -S xorg-server libx11 libxft freetype2 fontconfig pkg-config
```

### Debian/Ubuntu

```bash
sudo apt install xorg libx11-dev libxft-dev libfreetype6-dev libfontconfig1-dev pkg-config
```

### Fedora

```bash
sudo dnf install xorg-x11-server-Xorg libX11-devel libXft-devel freetype-devel fontconfig-devel pkg-config
```

## Installation Methods

### From Source (Cargo)

The recommended way to install oxwm is using Cargo:

```bash
# Install from GitHub
cargo install --git https://github.com/tonybanters/oxwm

# Or clone and build locally
git clone https://github.com/tonybanters/oxwm
cd oxwm
cargo build --release
sudo cp target/release/oxwm /usr/local/bin/
```

### Using Justfile

If you've cloned the repository, you can use the included justfile:

```bash
just install  # Builds and installs to ~/.local/bin/oxwm
```

Make sure `~/.local/bin` is in your PATH.

### Arch Linux (AUR)

For Arch Linux users, oxwm is available in the AUR:

```bash
yay -S oxwm-git
# or
paru -S oxwm-git
```

### NixOS

See the [NixOS Setup](/advanced/nixos/) guide for detailed instructions on installing oxwm with Nix flakes.

## Setting Up a Session

### Using a Display Manager

If you use a display manager (like LightDM, GDM, or SDDM), oxwm will automatically register as an available session through the desktop entry file.

To manually install the desktop entry:

```bash
sudo cp resources/oxwm.desktop /usr/share/xsessions/
```

Then select "oxwm" from your display manager's session menu.

### Using startx

If you prefer to use `startx`, add the following to your `~/.xinitrc`:

```bash
exec oxwm
```

Then start your X session with:

```bash
startx
```

## First Run

On first run, oxwm will automatically generate a default configuration file at `~/.config/oxwm/config.ron`.

You can also manually generate the config with:

```bash
oxwm --init
```

After installation, proceed to the [Quick Start](/getting-started/quick-start/) guide to learn the basics.

## Verification

To verify your installation, check the version:

```bash
oxwm --version
```

You should see output like:

```
oxwm 0.5.0
```

## Optional Dependencies

While not required, these tools enhance the oxwm experience:

- **dmenu** - Application launcher (used in default config)
- **maim** - Screenshot tool (used in default config)
- **st** / **alacritty** / **kitty** - Terminal emulator

Install your preferred terminal and update the `terminal` field in your config file.
