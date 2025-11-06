---
title: Building from Source
description: Compile oxwm from source code
---

This guide covers building oxwm from source for development or custom installations.

## Prerequisites

### System Dependencies

Install the required development libraries:

#### Arch Linux

```bash
sudo pacman -S base-devel rust xorg-server libx11 libxft freetype2 fontconfig pkg-config git
```

#### Debian/Ubuntu

```bash
sudo apt install build-essential rustc cargo git \
    xorg libx11-dev libxft-dev libfreetype6-dev libfontconfig1-dev pkg-config
```

#### Fedora

```bash
sudo dnf install @development-tools rust cargo git \
    xorg-x11-server-Xorg libX11-devel libXft-devel freetype-devel fontconfig-devel pkg-config
```

### Rust Toolchain

If Rust isn't available in your distribution's repos, install via rustup:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

Verify installation:

```bash
rustc --version
cargo --version
```

oxwm requires Rust 2024 edition (Rust 1.82+).

## Cloning the Repository

```bash
git clone https://github.com/tonybanters/oxwm
cd oxwm
```

## Building

### Development Build

For testing and development with debug symbols:

```bash
cargo build
```

The binary will be at `target/debug/oxwm`.

Run directly:

```bash
./target/debug/oxwm --version
```

### Release Build

For optimal performance:

```bash
cargo build --release
```

The optimized binary will be at `target/release/oxwm`.

Release builds are significantly faster and smaller than debug builds.

## Installation

### System-wide Installation

Install to `/usr/local/bin`:

```bash
sudo cp target/release/oxwm /usr/local/bin/
sudo chmod +x /usr/local/bin/oxwm
```

Install the desktop entry for display managers:

```bash
sudo cp resources/oxwm.desktop /usr/share/xsessions/
```

Install the man page (optional):

```bash
sudo mkdir -p /usr/local/share/man/man1
sudo cp resources/oxwm.1 /usr/local/share/man/man1/
sudo mandb  # Update man database
```

### User-local Installation

Install to `~/.local/bin` (no sudo required):

```bash
mkdir -p ~/.local/bin
cp target/release/oxwm ~/.local/bin/
```

Ensure `~/.local/bin` is in your PATH:

```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$HOME/.local/bin:$PATH"
```

Install desktop entry for user:

```bash
mkdir -p ~/.local/share/xsessions
cp resources/oxwm.desktop ~/.local/share/xsessions/
```

### Using Just

The repository includes a justfile for convenient installation:

```bash
# Install just if not already installed
cargo install just

# Build and install to ~/.local/bin
just install

# Or view available commands
just --list
```

## Testing

### Single Monitor Test

Test oxwm in a nested X server (Xephyr):

```bash
# Install Xephyr
sudo pacman -S xorg-server-xephyr  # Arch
sudo apt install xserver-xephyr     # Debian/Ubuntu

# Run test
just test

# Or manually:
Xephyr -screen 1920x1080 :1 &
DISPLAY=:1 ./target/release/oxwm
```

### Multi-Monitor Test

Test with simulated dual monitors:

```bash
just test-multimon
```

### Clean Test

Test without loading existing config:

```bash
just test-clean
```

## Development Setup

### Development Environment

For active development:

```bash
# Watch and rebuild on changes
cargo watch -x build

# Or with testing
cargo watch -x "build --release" -x "test"
```

Install cargo-watch:

```bash
cargo install cargo-watch
```

### Running Tests

```bash
# Run all tests
cargo test

# Run with output
cargo test -- --nocapture

# Run specific test
cargo test test_name
```

### Code Formatting

```bash
# Check formatting
cargo fmt -- --check

# Apply formatting
cargo fmt
```

### Linting

```bash
# Run clippy for lints
cargo clippy

# Strict mode
cargo clippy -- -D warnings
```

## Building Specific Features

### Debug Logging

Build with additional debug output:

```bash
# Set environment variable for verbose logging
RUST_LOG=debug cargo run
```

### Different Rust Editions

The project uses Rust 2024 edition (specified in `Cargo.toml`):

```toml
[package]
edition = "2024"
```

## Troubleshooting

### Compilation Errors

**Missing X11 headers:**

```
error: failed to run custom build command for `x11`
```

Solution: Install X11 development packages (`libx11-dev`)

**Missing XFT headers:**

```
error: failed to link shared library
```

Solution: Install XFT development packages (`libxft-dev`)

**Rust version too old:**

```
error: edition 2024 is unstable
```

Solution: Update Rust toolchain:

```bash
rustup update stable
```

### Linker Errors

If you get linker errors about missing libraries:

```bash
# Check pkg-config can find libraries
pkg-config --libs x11 xft freetype2 fontconfig

# If missing, install development packages
```

### Performance Issues (Debug Build)

If the debug build is too slow:

```bash
# Use release build instead
cargo build --release
./target/release/oxwm
```

Release builds are 10-100x faster than debug builds.

## Cross-Compilation

### For Different Architectures

```bash
# Install target
rustup target add aarch64-unknown-linux-gnu

# Build
cargo build --target aarch64-unknown-linux-gnu --release
```

Cross-compilation may require additional system libraries for the target architecture.

## Creating Distribution Packages

### Debian Package

Create a `.deb` package:

```bash
# Install cargo-deb
cargo install cargo-deb

# Create package
cargo deb

# Install
sudo dpkg -i target/debian/oxwm_*.deb
```

### Arch Package

Use the included PKGBUILD:

```bash
# From the repository root
cd resources
makepkg -si
```

Or install from AUR:

```bash
yay -S oxwm-git
```

### RPM Package

Create an RPM package:

```bash
# Install cargo-rpm
cargo install cargo-rpm

# Initialize rpm build
cargo rpm init

# Build
cargo rpm build
```

## Updating

To update your build:

```bash
cd oxwm
git pull
cargo build --release
sudo cp target/release/oxwm /usr/local/bin/
```

## Uninstalling

### System Installation

```bash
sudo rm /usr/local/bin/oxwm
sudo rm /usr/share/xsessions/oxwm.desktop
sudo rm /usr/local/share/man/man1/oxwm.1
```

### User Installation

```bash
rm ~/.local/bin/oxwm
rm ~/.local/share/xsessions/oxwm.desktop
```

## Build Times

Typical build times on modern hardware:

- **Clean debug build:** 30-60 seconds
- **Clean release build:** 1-2 minutes
- **Incremental build:** 1-5 seconds

## Next Steps

- Set up a [development workflow](#development-setup)
- Configure [NixOS](/advanced/nixos/) for reproducible builds
- Explore the source code structure at `src/`
- Contribute to the project on [GitHub](https://github.com/tonybanters/oxwm)
