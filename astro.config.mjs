// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'oxwm',
			description: 'A lightweight, dynamic X11 window manager written in Rust',
			customCss: [
				'./src/styles/custom.css',
			],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			components: {
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/tonybanters/oxwm' }
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Configuration',
					items: [
						{ label: 'Basics', slug: 'configuration/basics' },
						{ label: 'Bar', slug: 'configuration/bar' },
						{ label: 'Appearance', slug: 'configuration/appearance' },
						{ label: 'Keybindings', slug: 'configuration/keybindings' },
					],
				},
				{
					label: 'API Reference',
					items: [
						{ label: 'Core API', slug: 'api-reference/core' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'LSP Setup', slug: 'guides/lsp-setup' },
						{ label: 'Multi-Monitor', slug: 'guides/multi-monitor' },
					],
				},
				{
					label: 'Advanced',
					items: [
						{ label: 'Building from Source', slug: 'advanced/building' },
						{ label: 'NixOS Setup', slug: 'advanced/nixos' },
					],
				},
			],
		}),
	],
});
