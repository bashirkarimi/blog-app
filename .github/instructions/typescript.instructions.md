---
applyTo: "**/*.ts,**/*.tsx"
description: "TypeScript development standards and best practices"
---

# TypeScript Guidelines

TypeScript development standards for the blog-app monorepo targeting TypeScript 5.9 and ES2022.

## Type Safety and Configuration

### Strict Mode

- Enable strict mode in all `tsconfig.json` files
- Use `noImplicitAny` and `strictNullChecks`
- Leverage TypeScript's type inference where possible
- Avoid `any` type - use `unknown` when type is truly unknown

### Type Definitions

- Define interfaces for all data structures
- Use type aliases for union types and complex types
- Export types from centralized locations (`@repo/content-types`)
- Use generic types for reusable components and utilities

## Modern TypeScript Features

### ES2022 Features

- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Leverage private class fields and methods
- Use template literal types for string manipulation
- Take advantage of top-level await in appropriate contexts

### Advanced Types

- Use conditional types for complex type relationships
- Implement mapped types for object transformations
- Use template literal types for type-safe string operations
- Leverage utility types (`Pick`, `Omit`, `Partial`, etc.)

## Code Organization

### Import/Export Patterns

- Use ES modules with explicit imports/exports
- Prefer named exports over default exports for utilities
- Use barrel exports (`index.ts`) for package interfaces
- Organize imports: external packages, internal packages, relative imports

### Type Organization

- Place shared types in `@repo/content-types` package
- Use namespaces sparingly - prefer modules
- Group related types in the same file
- Export types alongside implementation when appropriate

## Function and Class Design

### Function Types

- Use function declarations for hoisted functions
- Use arrow functions for callbacks and inline functions
- Provide explicit return types for public functions
- Use overloads for functions with multiple call signatures

### Class Design

- Prefer interfaces over classes for type definitions
- Use readonly properties where appropriate
- Implement proper access modifiers (private, protected, public)
- Use abstract classes for shared implementation

## API and Data Modeling

### API Types

- Define strict types for API requests and responses
- Use type guards for runtime type checking
- Implement proper error types for API failures
- Validate external data at boundaries

### Sanity Types

- Use generated types from `@repo/content-types`
- Extend Sanity types with additional properties when needed
- Use proper typing for GROQ queries
- Implement type-safe image URL generation

## Generic Programming

### Generic Constraints

- Use generic constraints to limit type parameters
- Implement conditional types for flexible APIs
- Use mapped types for object transformations
- Leverage generic inference where possible

### Utility Types

- Create custom utility types for common patterns
- Use built-in utility types (`Record`, `Exclude`, etc.)
- Implement type guards for runtime type checking
- Create branded types for domain-specific values

## Error Handling and Validation

### Type-Safe Error Handling

- Define error types with discriminated unions
- Use Result/Either patterns for error handling
- Implement proper async error handling
- Use type guards for error discrimination

### Runtime Validation

- Validate external data with libraries like Zod
- Use type predicates for runtime type checking
- Implement proper input sanitization
- Create type-safe environment variable handling

## Performance Considerations

### Compilation Performance

- Use incremental compilation with `tsc --incremental`
- Optimize type checking with proper `include`/`exclude`
- Use project references for monorepo optimization
- Avoid deeply nested conditional types

### Runtime Performance

- Prefer interfaces over types for object shapes
- Use const assertions for literal types
- Avoid excessive type manipulation at runtime
- Leverage TypeScript's tree-shaking capabilities

## Testing with TypeScript

### Type Testing

- Test type definitions with type-only imports
- Use TypeScript's type checking in tests
- Implement proper mocking with correct types
- Test generic functions with various type parameters

### Test Organization

- Type test files with appropriate extensions
- Use proper types for test utilities and helpers
- Mock external dependencies with correct types
- Maintain type safety in test data and fixtures
