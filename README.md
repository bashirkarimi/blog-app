# 📝 Blog App Monorepo

A modern, full-stack blog platform built with Next.js 15, Sanity CMS, and Turborepo. This monorepo showcases best practices for building scalable content-driven applications with cutting-edge web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.5-ef4444?style=flat-square)](https://turbo.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

## ✨ Features

- 🚀 **Next.js 15** with App Router and React Server Components
- 🎨 **Tailwind CSS v4** with custom design tokens
- 📦 **Turborepo** for blazing-fast builds
- 🗄️ **Sanity CMS** for structured content management
- 🧩 **Modular Architecture** with shared UI components
- 📱 **Fully Responsive** design system
- 🎯 **Type-Safe** with TypeScript throughout
- 🔥 **Hot Module Replacement** with Turbopack
- 📐 **ESLint & Prettier** configured for code quality

## 📦 What's Inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager and includes the following packages and apps:

### Apps

```
apps/
├── blog/          # Main Next.js blog application (port 3001)
├── docs/          # Documentation site
└── studio/        # Sanity Studio CMS
```

- **`blog`** - The primary Next.js application featuring:
  - Dynamic routing with `[slug]` pages
  - Sanity content integration
  - Server-side rendering and ISR
  - Rich text rendering
  - Custom page builder

- **`docs`** - Documentation and guides

- **`studio`** - Sanity Studio for content management:
  - Custom schema types (posts, authors, categories, tags)
  - Visual content editing
  - Type generation for TypeScript
  - Live preview integration

### Packages

```
packages/
├── ui/                  # Shared React components
├── modules/             # Content modules
├── content-types/       # Sanity type definitions
├── tailwind-config/     # Shared Tailwind configuration
├── typescript-config/   # Shared TypeScript configs
└── eslint-config/       # Shared ESLint configurations
```

- **`@repo/ui`** - Reusable UI components with Tailwind CSS:
  - Button, Input, Card, etc.
  - Built with `class-variance-authority` and `radix-ui`
  - Fully typed with TypeScript

- **`@repo/modules`** - Content modules for page building:
  - Accordion, BlogList, ImageTeaser
  - RichText, TeaserList components
  - Modular content architecture

- **`@repo/content-types`** - Generated Sanity types

- **`@repo/tailwind-config`** - Centralized Tailwind configuration

- **`@repo/typescript-config`** - Shared TypeScript configurations

- **`@repo/eslint-config`** - ESLint configurations for Next.js and React

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or later
- **pnpm** 10.15.1 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bashirkarimi/blog-app.git
cd blog-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
# Copy example env files
cp apps/blog/.env.example apps/blog/.env.local
cp apps/studio/.env.example apps/studio/.env.local
```

4. Configure Sanity:
   - Create a Sanity project at [sanity.io](https://www.sanity.io/)
   - Add your project ID and dataset to the environment files

### Development

Run all apps in development mode:

```bash
pnpm dev
```

This will start:
- **Blog app**: http://localhost:3001
- **Docs app**: http://localhost:3000
- **Studio**: http://localhost:3333

Or run individual apps:

```bash
# Run only the blog
pnpm --filter blog dev

# Run only the studio
pnpm --filter @repo/studio dev
```

### Building

Build all apps and packages:

```bash
pnpm build
```

Build specific app:

```bash
pnpm --filter blog build
```

## 🏗️ Project Structure

```
blog-app/
├── apps/
│   ├── blog/
│   │   ├── src/
│   │   │   ├── app/              # Next.js App Router
│   │   │   ├── components/       # React components
│   │   │   └── sanity/           # Sanity client & queries
│   │   └── package.json
│   ├── docs/
│   └── studio/
│       ├── schemaTypes/          # Sanity schema definitions
│       │   ├── documents/        # Document types
│       │   ├── objects/          # Object types
│       │   └── modules/          # Module types
│       └── structure/            # Studio structure
├── packages/
│   ├── ui/
│   │   └── src/
│   │       ├── components/       # Shared components
│   │       └── lib/              # Utilities
│   ├── modules/
│   │   └── src/
│   │       └── modules/          # Content modules
│   └── tailwind-config/
│       └── design-tokens.css     # Global design tokens
├── docs/                         # Documentation
├── package.json                  # Root package.json
├── pnpm-workspace.yaml           # Workspace configuration
└── turbo.json                    # Turborepo configuration
```

## 🎨 Design System

This project uses Tailwind CSS v4 with a custom design system:

- **Design Tokens**: Centralized in `packages/tailwind-config/design-tokens.css`
- **Component Library**: Built with Radix UI primitives
- **Variants**: Managed with `class-variance-authority`
- **Dark Mode**: Full dark mode support

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm check-types` | Type-check all packages |
| `pnpm format` | Format code with Prettier |

## 🔧 Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling

### Content Management
- [Sanity](https://www.sanity.io/) - Headless CMS
- [next-sanity](https://www.npmjs.com/package/next-sanity) - Sanity integration
- [@sanity/image-url](https://www.npmjs.com/package/@sanity/image-url) - Image optimization

### Tooling
- [Turborepo](https://turbo.build/) - Monorepo build system
- [pnpm](https://pnpm.io/) - Package manager
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### UI Components
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [class-variance-authority](https://cva.style/) - Variant management
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Utility merging

## 📚 Documentation

Check out the `docs/` directory for additional documentation:

- [Tailwind v4 Monorepo Setup](docs/tailwind-v4-monorepo.md)
- [Module Mapping Architecture](docs/module-mapping-architecture.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and unlicensed.

## 🙏 Acknowledgments

- Built with [Turborepo](https://turbo.build/) starter
- Inspired by modern web development best practices
- Powered by the amazing open-source community

---

**Built with ❤️ using Next.js, Sanity, and Turborepo**
