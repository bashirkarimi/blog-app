# GitHub Copilot Instructions for Blog-App Monorepo

Welcome to the blog-app monorepo! This document provides repository-wide instructions for GitHub Copilot to help maintain consistent code quality, architecture, and development practices across all packages and applications.

## 🏗️ Repository Overview

This is a modern blog platform built as a Turborepo monorepo with the following structure:

- **Apps**: `blog` (Next.js 15), `docs` (Next.js), `studio` (Sanity CMS)
- **Packages**: `ui`, `modules`, `content-types`, `tailwind-config`, `typescript-config`, `eslint-config`
- **Tech Stack**: Next.js 15, React 19, TypeScript 5.9, Tailwind CSS v4, Sanity CMS, Turborepo

## 🎯 Core Principles

### Code Quality

- All code must be TypeScript with strict mode enabled
- Follow functional programming principles where possible
- Use ESLint and Prettier configurations from `@repo/eslint-config`
- Maintain comprehensive test coverage for critical functionality

### Architecture

- Follow monorepo conventions with shared packages
- Use Turborepo for build orchestration and caching
- Maintain clear separation between apps and packages
- Follow dependency direction: apps → packages (never packages → apps)

### Performance

- Leverage Next.js 15 App Router and Server Components by default
- Use Client Components only when necessary for interactivity
- Optimize bundle sizes and avoid unnecessary client-side JavaScript
- Implement proper caching strategies

### Accessibility

- Follow WCAG 2.1 AA guidelines
- Use semantic HTML and ARIA attributes appropriately
- Ensure keyboard navigation and screen reader compatibility
- Test with accessibility tools and assistive technologies

## 📁 Package-Specific Guidelines

### Apps

- **blog**: Main Next.js application with Sanity integration
- **docs**: Documentation site following the same patterns
- **studio**: Sanity Studio for content management

### Packages

- **@repo/ui**: Shared React components with Tailwind CSS
- **@repo/modules**: Content modules for page building
- **@repo/content-types**: Generated Sanity type definitions
- **@repo/tailwind-config**: Centralized Tailwind configuration
- **@repo/typescript-config**: Shared TypeScript configurations
- **@repo/eslint-config**: Shared ESLint rules

## 🔗 Related Instructions

For specific technology guidance, refer to these instruction files:

- [Next.js Guidelines](instructions/nextjs.instructions.md)
- [React Guidelines](instructions/react.instructions.md)
- [TypeScript Guidelines](instructions/typescript.instructions.md)
- [Testing Standards](instructions/testing.instructions.md)
- [Documentation Requirements](instructions/documentation.instructions.md)
- [Security Best Practices](instructions/security.instructions.md)
- [Performance Guidelines](instructions/performance.instructions.md)
- [Code Review Standards](instructions/code-review.instructions.md)

## 🚀 Development Workflow

1. **Setup**: Use `pnpm install` for dependency management
2. **Development**: Run `pnpm dev` to start all apps in development mode
3. **Building**: Use `pnpm build` for production builds
4. **Testing**: Run `pnpm test` to execute all test suites
5. **Linting**: Use `pnpm lint` to check code quality

## 📦 Monorepo Conventions

### Package Dependencies

- Use workspace dependencies with `workspace:*` for internal packages
- Keep external dependencies in the catalog in `pnpm-workspace.yaml`
- Avoid duplicate dependencies across packages

### File Organization

- Use consistent naming conventions across all packages
- Place shared types in `@repo/content-types`
- Keep UI components in `@repo/ui`
- Maintain clear package boundaries

### Build System

- Leverage Turborepo's caching and parallelization
- Use proper task dependencies in `turbo.json`
- Optimize build outputs and avoid unnecessary rebuilds

Remember: This repository prioritizes maintainability, performance, and developer experience. When in doubt, favor explicit over implicit, simple over complex, and maintainable over clever.
