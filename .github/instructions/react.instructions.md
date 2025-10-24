---
applyTo: "**/*.jsx,**/*.tsx,**/*.ts"
description: "React development best practices for the blog-app monorepo"
---

# React Development Guidelines

Apply these React-specific guidelines in addition to the [general coding standards](../copilot-instructions.md).

## Component Architecture

### Functional Components

- Use functional components with hooks for all new React components
- Prefer Server Components in Next.js 15 for non-interactive UI
- Use Client Components only when necessary (state, events, browser APIs)
- Add `'use client'` directive at the top of Client Components

### Component Design Principles

- Follow single responsibility principle - one concern per component
- Keep components small and focused (under 100 lines when possible)
- Use composition over inheritance
- Prefer explicit props over spreading when possible

### Naming Conventions

- Use PascalCase for component files and exports (e.g., `UserCard.tsx`)
- Use camelCase for hooks (e.g., `useUser.ts`)
- Name context providers as `XyzProvider` (e.g., `ThemeProvider`)
- Use descriptive names that indicate component purpose

## Hooks and State Management

### React Hooks

- Follow the Rules of Hooks (no conditional hooks)
- Use built-in hooks before creating custom ones
- Keep hooks focused and reusable
- Use TypeScript for all hook return types

### State Management

- Use local state for component-specific data
- Use React Context for app-wide state
- Consider state colocation - keep state close to where it's used
- Avoid unnecessary re-renders with proper dependency arrays

## Props and TypeScript

### Prop Design

- Use TypeScript interfaces for all props
- Prefer explicit prop types over `any`
- Use default values to prevent undefined errors
- Keep prop interfaces focused and minimal

### Children and Composition

- Use `React.ReactNode` for children props
- Consider render props pattern for complex composition
- Use compound components for related UI elements
- Prefer composition over complex prop drilling

## Performance Best Practices

### Optimization

- Use React.memo() for expensive pure components
- Implement proper key props for lists
- Avoid creating objects/functions in render
- Use useMemo() and useCallback() judiciously

### Bundle Optimization

- Import components dynamically when appropriate
- Tree-shake unused exports
- Use proper ESLint rules to catch performance issues
- Leverage Next.js built-in optimizations

## Testing Guidelines

### Component Testing

- Write tests for user interactions, not implementation details
- Use React Testing Library for component tests
- Test accessibility features and keyboard navigation
- Mock external dependencies and API calls

### Test Organization

- Co-locate tests with components
- Use descriptive test names that explain behavior
- Group related tests with describe blocks
- Maintain test coverage for critical user paths

## Accessibility

### Semantic HTML

- Use semantic HTML elements when possible
- Add proper ARIA attributes for complex interactions
- Ensure proper heading hierarchy
- Test with screen readers and keyboard navigation

### Focus Management

- Implement proper focus management for modals and routing
- Use visible focus indicators
- Support keyboard navigation patterns
- Test tab order and focus trapping

## Error Boundaries and Error Handling

### Error Boundaries

- Implement error boundaries for critical UI sections
- Provide meaningful error messages to users
- Log errors for debugging and monitoring
- Have fallback UI for graceful degradation

### Error Handling

- Handle async operations with proper loading states
- Show user-friendly error messages
- Implement retry mechanisms where appropriate
- Use React Suspense for loading states when possible
