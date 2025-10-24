---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx"
description: "Testing standards and best practices for the blog-app monorepo"
---

# Testing Guidelines

Comprehensive testing standards for the blog-app monorepo covering unit tests, integration tests, and end-to-end testing.

## Testing Philosophy

### Test-Driven Development

- Write tests before implementation when possible
- Use tests to drive API design and component interfaces
- Maintain high test coverage for critical business logic
- Focus on testing behavior, not implementation details

### Testing Pyramid

- Unit tests: Fast, isolated, test individual functions/components
- Integration tests: Test component interactions and data flow
- E2E tests: Test complete user workflows and critical paths
- Visual tests: Test UI components and design system consistency

## Unit Testing

### React Component Testing

- Use React Testing Library for component tests
- Test user interactions, not implementation details
- Use semantic queries (getByRole, getByLabelText)
- Test accessibility features and keyboard navigation
- Mock external dependencies and API calls

### JavaScript/TypeScript Testing

- Use Jest for unit testing JavaScript/TypeScript code
- Test pure functions with various inputs and edge cases
- Use describe blocks to group related tests
- Write descriptive test names that explain expected behavior
- Test error conditions and edge cases

### Testing Utilities and Hooks

- Test custom hooks with @testing-library/react-hooks
- Test utility functions in isolation
- Mock external dependencies appropriately
- Use type-safe mocks with TypeScript

## Integration Testing

### API Testing

- Test API routes with proper request/response validation
- Use test databases or mocked data for integration tests
- Test authentication and authorization flows
- Verify error handling and status codes

### Component Integration

- Test component composition and data flow
- Test context providers and consumer interactions
- Verify state management across component boundaries
- Test form submission and validation workflows

## End-to-End Testing

### User Workflow Testing

- Use Playwright for end-to-end testing
- Test critical user journeys and conversion paths
- Test across different browsers and devices
- Verify accessibility with automated testing tools

### Test Environment

- Use production-like test environments
- Test with realistic data and content
- Verify performance and loading behavior
- Test error scenarios and edge cases

## Test Organization

### File Structure

- Co-locate tests with source files when possible
- Use consistent naming conventions (.test.ts, .spec.ts)
- Group related tests in test suites
- Use setup files for common test configuration

### Test Data and Fixtures

- Create reusable test data factories
- Use realistic but anonymized test data
- Mock external services and APIs consistently
- Maintain test data separately from production data

## Mocking and Test Doubles

### Mocking Strategy

- Mock external dependencies at package boundaries
- Use Jest mocks for Node.js modules
- Mock browser APIs and external services
- Create type-safe mocks with TypeScript

### Mock Management

- Keep mocks simple and focused
- Reset mocks between tests
- Use mock implementations that match real behavior
- Document complex mocking scenarios

## Testing Best Practices

### Test Quality

- Write clear, descriptive test names
- Keep tests focused and independent
- Avoid testing implementation details
- Use arrange-act-assert pattern

### Performance Testing

- Monitor test execution time
- Use parallel test execution when appropriate
- Optimize slow tests and test setup
- Profile test performance regularly

### Accessibility Testing

- Test keyboard navigation and focus management
- Verify screen reader compatibility
- Test color contrast and visual accessibility
- Use automated accessibility testing tools

## Continuous Integration

### CI Testing Strategy

- Run all tests on every pull request
- Use parallel test execution for faster feedback
- Fail fast on test failures
- Provide clear error messages and debugging information

### Test Coverage

- Maintain minimum test coverage thresholds
- Focus coverage on critical business logic
- Use coverage reports to identify untested code
- Don't aim for 100% coverage at the expense of test quality

## Sanity CMS Testing

### Content Testing

- Test Sanity schema validation
- Verify content transformations and queries
- Test image optimization and URL generation
- Mock Sanity client for unit tests

### Studio Testing

- Test custom Sanity Studio components
- Verify schema migrations and data integrity
- Test custom input components and validations
- Use Sanity's test utilities and helpers

## Monorepo Testing Considerations

### Package Testing

- Test packages in isolation
- Verify package exports and public APIs
- Test cross-package dependencies
- Use workspace dependencies in tests

### Test Infrastructure

- Share test utilities across packages
- Use consistent Jest configuration
- Leverage Turborepo for test orchestration
- Optimize test caching and parallelization
