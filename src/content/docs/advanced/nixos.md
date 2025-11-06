---
title: NixOS Setup
description: Install and configure oxwm on NixOS
---

oxwm provides first-class NixOS support through Nix flakes, making installation and configuration reproducible.

## Using Flakes

### Prerequisites

Ensure flakes are enabled in your NixOS configuration:

```nix
# /etc/nixos/configuration.nix
{
  nix.settings.experimental-features = [ "nix-command" "flakes" ];
}
```

Rebuild to apply:

```bash
sudo nixos-rebuild switch
```

### Adding oxwm to Your Flake

Update your `flake.nix`:

```nix
{
  description = "NixOS configuration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    oxwm.url = "github:tonybanters/oxwm";
  };

  outputs = { self, nixpkgs, oxwm, ... }: {
    nixosConfigurations.hostname = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ./configuration.nix
        oxwm.nixosModules.default
      ];
    };
  };
}
```

Replace `hostname` with your system's hostname.

### Enabling oxwm

In your `configuration.nix`:

```nix
{ config, pkgs, ... }:

{
  services.xserver = {
    enable = true;
    windowManager.oxwm = {
      enable = true;
    };
    displayManager.lightdm.enable = true;  # Or your preferred DM
  };
}
```

### Rebuild and Switch

```bash
sudo nixos-rebuild switch --flake .#hostname
```

## Using a Specific Version

### Pin to a Commit

```nix
inputs = {
  oxwm.url = "github:tonybanters/oxwm/commit-hash";
};
```

### Pin to a Tag

```nix
inputs = {
  oxwm.url = "github:tonybanters/oxwm/v0.5.0";
};
```

### Use a Local Checkout

```nix
inputs = {
  oxwm.url = "path:/home/user/projects/oxwm";
};
```

## Custom Package Options

### Using a Different oxwm Package

```nix
services.xserver.windowManager.oxwm = {
  enable = true;
  package = pkgs.callPackage ./path/to/custom/oxwm.nix { };
};
```

### Overlay for System-wide Availability

Make oxwm available throughout your system:

```nix
{ config, pkgs, oxwm, ... }:

{
  nixpkgs.overlays = [
    (final: prev: {
      oxwm = oxwm.packages.${prev.system}.default;
    })
  ];

  environment.systemPackages = with pkgs; [
    oxwm
  ];
}
```

## Configuration Management

### Declarative Configuration

Manage your oxwm config declaratively:

```nix
{ config, pkgs, ... }:

{
  home-manager.users.username = {
    xdg.configFile."oxwm/config.ron" = {
      source = ./oxwm-config.ron;
    };
  };
}
```

This requires home-manager. Add to your flake:

```nix
inputs = {
  home-manager.url = "github:nix-community/home-manager";
  home-manager.inputs.nixpkgs.follows = "nixpkgs";
};
```

### Using Nix Strings

Generate config from Nix:

```nix
{ config, pkgs, ... }:

{
  home-manager.users.username = {
    xdg.configFile."oxwm/config.ron".text = ''
      (
        border_width: 2,
        border_focused: 0x6dade3,
        border_unfocused: 0xbbbbbb,
        terminal: "${pkgs.alacritty}/bin/alacritty",
        modkey: Mod4,
        // ... rest of config
      )
    '';
  };
}
```

### Templating Configuration

Use Nix variables in your config:

```nix
{ config, pkgs, lib, ... }:

let
  terminal = "${pkgs.alacritty}/bin/alacritty";
  browser = "${pkgs.firefox}/bin/firefox";
  colors = {
    blue = "0x6dade3";
    gray = "0xbbbbbb";
  };
in {
  home-manager.users.username = {
    xdg.configFile."oxwm/config.ron".text = ''
      (
        terminal: "${terminal}",
        border_focused: ${colors.blue},
        border_unfocused: ${colors.gray},
        keybindings: [
          (modifiers: [Mod4], key: Return, action: Spawn, arg: "${terminal}"),
          (modifiers: [Mod4], key: B, action: Spawn, arg: "${browser}"),
        ],
        // ... rest of config
      )
    '';
  };
}
```

## Complete Example

Here's a full example combining everything:

### flake.nix

```nix
{
  description = "NixOS with oxwm";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    oxwm.url = "github:tonybanters/oxwm";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, oxwm, home-manager, ... }: {
    nixosConfigurations.myhost = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ./configuration.nix
        oxwm.nixosModules.default
        home-manager.nixosModules.home-manager
        {
          home-manager.useGlobalPkgs = true;
          home-manager.useUserPackages = true;
          home-manager.users.myuser = import ./home.nix;
        }
      ];
    };
  };
}
```

### configuration.nix

```nix
{ config, pkgs, ... }:

{
  # Enable flakes
  nix.settings.experimental-features = [ "nix-command" "flakes" ];

  # X11 with oxwm
  services.xserver = {
    enable = true;
    windowManager.oxwm.enable = true;
    displayManager.lightdm = {
      enable = true;
      greeters.gtk.theme.name = "Adwaita-dark";
    };
  };

  # Essential packages for oxwm
  environment.systemPackages = with pkgs; [
    alacritty  # Terminal
    dmenu      # Application launcher
    maim       # Screenshots
    xclip      # Clipboard
  ];

  # User account
  users.users.myuser = {
    isNormalUser = true;
    extraGroups = [ "wheel" "video" "audio" ];
  };

  system.stateVersion = "24.05";
}
```

### home.nix

```nix
{ config, pkgs, ... }:

{
  home.stateVersion = "24.05";

  # oxwm configuration
  xdg.configFile."oxwm/config.ron".text = ''
    (
      border_width: 2,
      border_focused: 0x7aa2f7,
      border_unfocused: 0x414868,
      font: "monospace:style=Bold:size=10",

      gaps_enabled: true,
      gap_inner_horizontal: 5,
      gap_inner_vertical: 5,
      gap_outer_horizontal: 5,
      gap_outer_vertical: 5,

      terminal: "${pkgs.alacritty}/bin/alacritty",
      modkey: Mod4,

      tags: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],

      layout_symbols: [
        (name: "tiling", symbol: "[T]"),
        (name: "normie", symbol: "[F]"),
      ],

      keybindings: [
        (modifiers: [Mod4], key: Return, action: Spawn, arg: "${pkgs.alacritty}/bin/alacritty"),
        (modifiers: [Mod4], key: D, action: Spawn, arg: "${pkgs.dmenu}/bin/dmenu_run"),
        (modifiers: [Mod4], key: B, action: Spawn, arg: "${pkgs.firefox}/bin/firefox"),
        (modifiers: [Mod4], key: Q, action: Kill),
        (modifiers: [Mod4, Shift], key: Q, action: Quit),
        (modifiers: [Mod4, Shift], key: R, action: Reload),
      ],

      status_blocks: [
        (format: "RAM: {used}/{total} GB", command: "Ram", command_arg: "",
         interval_secs: 5, color: 0x7aa2f7, underline: true),
        (format: "{}", command: "DateTime", command_arg: "%H:%M",
         interval_secs: 60, color: 0x0db9d7, underline: true),
      ],

      scheme_normal: (foreground: 0xa9b1d6, background: 0x1a1b26, underline: 0x414868),
      scheme_occupied: (foreground: 0x7aa2f7, background: 0x1a1b26, underline: 0x7aa2f7),
      scheme_selected: (foreground: 0x7dcfff, background: 0x1a1b26, underline: 0xbb9af7),
    )
  '';
}
```

## Development Environment

### Development Shell

Create a development environment with oxwm:

```bash
nix develop github:tonybanters/oxwm
```

This provides all dependencies needed to build oxwm.

### Flake-based Development

In your project:

```nix
{
  inputs.oxwm.url = "github:tonybanters/oxwm";

  outputs = { self, nixpkgs, oxwm }: {
    devShells.x86_64-linux.default = oxwm.devShells.x86_64-linux.default;
  };
}
```

Then:

```bash
nix develop
cargo build
```

## Testing in VM

Test oxwm in a NixOS VM before committing:

```bash
nixos-rebuild build-vm --flake .#myhost
./result/bin/run-myhost-vm
```

## Updating

### Update oxwm

```bash
# Update flake inputs
nix flake update oxwm

# Rebuild
sudo nixos-rebuild switch --flake .#hostname
```

### Pin a Specific Version

Update your `flake.lock` selectively:

```bash
nix flake lock --update-input oxwm
```

## Troubleshooting

### oxwm not available in session list

Ensure the module is imported and enabled:

```nix
services.xserver.windowManager.oxwm.enable = true;
```

Rebuild and restart your display manager:

```bash
sudo nixos-rebuild switch
sudo systemctl restart display-manager.service
```

### Config not applied

Check file location:

```bash
ls -la ~/.config/oxwm/config.ron
```

Verify home-manager is active:

```bash
home-manager generations
```

### Build fails

Update nixpkgs:

```bash
nix flake update nixpkgs
sudo nixos-rebuild switch --flake .#hostname
```

## Advantages of NixOS

1. **Reproducibility** - Same configuration always produces same result
2. **Rollback** - Easily revert to previous generations
3. **Declarative** - Entire system configuration in one place
4. **Atomic updates** - Changes are all-or-nothing
5. **Multiple versions** - Can have multiple oxwm versions simultaneously

## Additional Resources

- [NixOS Manual](https://nixos.org/manual/nixos/stable/)
- [Home Manager Manual](https://nix-community.github.io/home-manager/)
- [Nix Flakes](https://nixos.wiki/wiki/Flakes)
- [oxwm GitHub](https://github.com/tonybanters/oxwm)

## Next Steps

- Explore [configuration options](/configuration/overview/)
- Set up [multi-monitor](/advanced/multi-monitor/) support
- Customize [keybindings](/configuration/keybindings/)
