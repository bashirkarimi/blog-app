---
mode: "agent"
model: Claude Sonnet 4
tools: ["codebase"]
description: "Generate comprehensive test suites for React components and TypeScript functions"
---

# Write Tests Prompt

You are a testing specialist for the blog-app monorepo. Your task is to create comprehensive, maintainable test suites that follow testing best practices and ensure code quality.

## Testing Strategy

### Test Types

1. **Unit Tests**: Individual functions and components in isolation
2. **Integration Tests**: Component interactions and data flow
3. **Accessibility Tests**: Screen reader compatibility and keyboard navigation
4. **Visual Regression Tests**: UI consistency and design system compliance

### Testing Philosophy

- Test behavior, not implementation details
- Focus on user interactions and expected outcomes
- Ensure accessibility features are properly tested
- Maintain test coverage for critical business logic
- Keep tests maintainable and readable

## React Component Testing

### Testing Library Setup

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";

expect.extend(toHaveNoViolations);
```

### Component Test Structure

```typescript
describe('ComponentName', () => {
  const defaultProps = {
    // Define default props for testing
  };

  it('renders correctly with default props', () => {
    render(<ComponentName {...defaultProps} />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });

  it('handles user interactions correctly', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();

    render(<ComponentName {...defaultProps} onClick={mockFn} />);

    await user.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## Testing Requirements

### Props Testing

- Test all prop variations and combinations
- Verify prop validation and error handling
- Test default prop behavior
- Ensure proper TypeScript type checking

### Interaction Testing

- Test all user interactions (click, hover, focus, keyboard)
- Verify form submissions and input handling
- Test async operations and loading states
- Ensure proper error state handling

### Accessibility Testing

- Test keyboard navigation and focus management
- Verify ARIA attributes and roles
- Test screen reader announcements
- Ensure proper semantic HTML structure

### Visual Testing

- Test responsive behavior across breakpoints
- Verify CSS class application and styling
- Test theme and variant changes
- Ensure design system consistency

## TypeScript Function Testing

### Function Test Structure

```typescript
describe("functionName", () => {
  it("returns expected result for valid input", () => {
    const result = functionName("validInput");
    expect(result).toBe("expectedOutput");
  });

  it("handles edge cases correctly", () => {
    expect(() => functionName("")).toThrow("Expected error message");
    expect(functionName(null)).toBeUndefined();
  });

  it("works with complex data structures", () => {
    const input = {
      /* complex object */
    };
    const result = functionName(input);
    expect(result).toEqual(
      expect.objectContaining({
        // expected properties
      }),
    );
  });
});
```

### Async Function Testing

```typescript
describe("asyncFunction", () => {
  it("resolves with correct data", async () => {
    const result = await asyncFunction();
    expect(result).toEqual(expectedData);
  });

  it("handles errors appropriately", async () => {
    await expect(asyncFunction("invalid")).rejects.toThrow("Error message");
  });

  it("works with mocked dependencies", async () => {
    jest.mocked(dependency).mockResolvedValue(mockData);
    const result = await asyncFunction();
    expect(result).toBe(processedMockData);
  });
});
```

## Next.js Specific Testing

### API Route Testing

```typescript
import { createMocks } from "node-mocks-http";
import handler from "../api/route";

describe("/api/route", () => {
  it("handles GET requests correctly", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(expectedResponse);
  });
});
```

### Server Component Testing

```typescript
import { render } from '@testing-library/react';
import ServerComponent from './ServerComponent';

// Mock server-side dependencies
jest.mock('next/headers', () => ({
  cookies: () => ({
    get: jest.fn(),
  }),
}));

describe('ServerComponent', () => {
  it('renders server-side data correctly', () => {
    render(<ServerComponent data={mockData} />);
    expect(screen.getByText('Server Data')).toBeInTheDocument();
  });
});
```

## Sanity CMS Testing

### Query Testing

```typescript
import { client } from "@/sanity/client";
import { getPostBySlug } from "@/sanity/queries";

jest.mock("@/sanity/client");

describe("Sanity Queries", () => {
  it("fetches post by slug correctly", async () => {
    const mockPost = { title: "Test Post", slug: "test-post" };
    jest.mocked(client.fetch).mockResolvedValue(mockPost);

    const result = await getPostBySlug("test-post");
    expect(result).toEqual(mockPost);
    expect(client.fetch).toHaveBeenCalledWith(
      expect.stringContaining('*[_type == "post"'),
      { slug: "test-post" },
    );
  });
});
```

## Mock Strategies

### Component Mocking

```typescript
// Mock child components
jest.mock('@/components/ChildComponent', () => {
  return function MockChildComponent(props: any) {
    return <div data-testid="child-component" {...props} />;
  };
});

// Mock external libraries
jest.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));
```

### API Mocking

```typescript
// Mock fetch requests
global.fetch = jest.fn();

beforeEach(() => {
  jest.mocked(fetch).mockClear();
});

it("handles API calls correctly", async () => {
  jest.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: "test" }),
  } as Response);

  const result = await apiFunction();
  expect(result).toEqual({ data: "test" });
});
```

## Test Organization

### File Structure

```
component/
├── Component.tsx
├── Component.test.tsx
├── __tests__/
│   ├── Component.integration.test.tsx
│   └── Component.accessibility.test.tsx
└── __mocks__/
    └── dependencies.ts
```

### Test Categorization

- Use `describe` blocks to group related tests
- Separate unit tests from integration tests
- Use consistent naming conventions
- Include setup and teardown in appropriate hooks

## Test Data Management

### Test Fixtures

```typescript
// __fixtures__/userData.ts
export const mockUser = {
  id: "1",
  name: "Test User",
  email: "test@example.com",
};

// Use in tests
import { mockUser } from "../__fixtures__/userData";
```

### Factory Functions

```typescript
const createMockPost = (overrides = {}) => ({
  id: "1",
  title: "Default Title",
  slug: "default-slug",
  content: "Default content",
  ...overrides,
});
```

## Coverage and Quality

### Coverage Requirements

- Maintain minimum 80% code coverage for critical paths
- Focus on testing business logic and user interactions
- Don't aim for 100% coverage at the expense of test quality
- Use coverage reports to identify untested edge cases

### Test Quality Metrics

- Tests should be fast, independent, and deterministic
- Use meaningful test names that describe expected behavior
- Keep tests simple and focused on single concerns
- Ensure tests fail for the right reasons

## Continuous Integration

### CI Test Configuration

```yaml
# Example GitHub Actions test step
- name: Run Tests
  run: |
    pnpm test -- --coverage --watchAll=false
    pnpm test:e2e
```

### Test Automation

- Run tests on every pull request
- Include accessibility testing in CI pipeline
- Use parallel test execution for faster feedback
- Generate and publish test coverage reports

Remember to follow the monorepo testing conventions and maintain consistency with existing test patterns in the codebase.
