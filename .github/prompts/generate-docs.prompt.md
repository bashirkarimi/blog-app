---
mode: "agent"
model: Claude Sonnet 4
tools: ["codebase"]
description: "Generate comprehensive documentation for code, APIs, and components"
---

# Generate Documentation Prompt

You are a documentation specialist for the blog-app monorepo. Your task is to create comprehensive, maintainable documentation that helps developers understand and use the codebase effectively.

## Documentation Types and Standards

### Code Documentation (JSDoc)

Generate JSDoc comments for functions, classes, and complex logic:

````typescript
/**
 * Formats a blog post for display in the UI
 *
 * @param post - The raw post data from Sanity CMS
 * @param options - Formatting options for customization
 * @param options.includeAuthor - Whether to include author information
 * @param options.truncateContent - Maximum content length before truncation
 * @returns Formatted post object ready for UI consumption
 *
 * @example
 * ```typescript
 * const formattedPost = formatPostForDisplay(rawPost, {
 *   includeAuthor: true,
 *   truncateContent: 150
 * });
 * ```
 *
 * @throws {ValidationError} When post data is invalid
 * @since 1.0.0
 */
function formatPostForDisplay(
  post: RawPost,
  options: FormatOptions,
): FormattedPost {
  // Implementation
}
````

### Component Documentation

Generate comprehensive component documentation:

````typescript
/**
 * A reusable blog card component that displays post information
 *
 * @component
 * @example
 * ```tsx
 * <BlogCard
 *   post={post}
 *   variant="featured"
 *   onReadMore={() => navigate(`/posts/${post.slug}`)}
 * />
 * ```
 */
interface BlogCardProps {
  /** The blog post data to display */
  post: BlogPost;

  /** Visual variant of the card */
  variant?: "default" | "featured" | "compact";

  /** Callback fired when the read more button is clicked */
  onReadMore?: () => void;

  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * BlogCard component for displaying blog post previews
 *
 * Features:
 * - Responsive design with multiple variants
 * - Accessibility-compliant with proper ARIA labels
 * - Optimized images with lazy loading
 * - Keyboard navigation support
 *
 * @accessibility
 * - Uses semantic HTML elements
 * - Includes proper ARIA labels and roles
 * - Supports keyboard navigation
 * - Compatible with screen readers
 */
export function BlogCard({
  post,
  variant = "default",
  onReadMore,
  className,
}: BlogCardProps) {
  // Implementation
}
````

### API Documentation

Generate API route documentation:

````typescript
/**
 * @fileoverview Blog Posts API endpoints
 *
 * Provides CRUD operations for blog posts with proper authentication,
 * validation, and error handling.
 */

/**
 * GET /api/posts
 *
 * Retrieves a paginated list of published blog posts
 *
 * @route GET /api/posts
 * @access Public
 * @param {number} [page=1] - Page number for pagination
 * @param {number} [limit=10] - Number of posts per page (max 50)
 * @param {string} [category] - Filter by category slug
 * @param {string} [tag] - Filter by tag slug
 * @param {string} [search] - Search in title and content
 *
 * @returns {Object} Response object
 * @returns {BlogPost[]} response.posts - Array of blog posts
 * @returns {PaginationMeta} response.pagination - Pagination metadata
 *
 * @example
 * ```
 * GET /api/posts?page=1&limit=5&category=tech
 *
 * Response:
 * {
 *   "posts": [...],
 *   "pagination": {
 *     "page": 1,
 *     "limit": 5,
 *     "total": 25,
 *     "totalPages": 5,
 *     "hasNext": true,
 *     "hasPrev": false
 *   }
 * }
 * ```
 *
 * @throws {400} Invalid query parameters
 * @throws {500} Server error
 */
export async function GET(request: NextRequest) {
  // Implementation
}
````

## README Documentation

### Package README Template

````markdown
# Package Name

Brief description of what this package does and its role in the monorepo.

## Installation

```bash
# If this is a workspace package
pnpm add @repo/package-name

# For development
pnpm install
```
````

## Usage

### Basic Usage

```typescript
import { ComponentName } from '@repo/package-name';

function App() {
  return <ComponentName prop="value" />;
}
```

### Advanced Usage

```typescript
// More complex examples with configuration
```

## API Reference

### Components

#### ComponentName

Description of the component and its purpose.

**Props:**

| Prop    | Type     | Default | Description          |
| ------- | -------- | ------- | -------------------- |
| `prop1` | `string` | `''`    | Description of prop1 |
| `prop2` | `number` | `0`     | Description of prop2 |

**Examples:**

```tsx
// Basic usage
<ComponentName prop1="hello" />

// With all props
<ComponentName
  prop1="hello"
  prop2={42}
  onEvent={() => console.log('event')}
/>
```

### Utilities

#### utilityFunction

```typescript
function utilityFunction(param: Type): ReturnType;
```

Description of what the utility does.

**Parameters:**

- `param` (Type): Description of the parameter

**Returns:**

- ReturnType: Description of what is returned

## Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Contributing

See the [main contributing guide](../../CONTRIBUTING.md) for general guidelines.

### Package-Specific Guidelines

- Specific patterns or conventions for this package
- Testing requirements
- Documentation standards

## License

[License information]

````

### Architecture Documentation
```markdown
# Architecture Overview

## System Design

### High-Level Architecture

```mermaid
graph TB
    A[Next.js App] --> B[Sanity CMS]
    A --> C[API Routes]
    A --> D[UI Components]
    D --> E[Design System]
    C --> F[Database]
    B --> G[CDN Assets]
````

### Data Flow

1. User requests page
2. Next.js Server Component fetches data from Sanity
3. Data is processed and rendered server-side
4. Client hydration for interactive components
5. Dynamic updates through API routes

### Component Architecture

```
apps/blog/
├── app/
│   ├── (routes)/          # Route groups
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/            # App-specific components
└── lib/                   # Utilities and helpers

packages/
├── ui/                    # Shared UI components
├── modules/               # Content modules
└── content-types/         # Type definitions
```

## Design Decisions

### Technology Choices

**Next.js 15 with App Router**

- Server Components for performance
- Built-in optimizations
- File-based routing

**Sanity CMS**

- Structured content management
- Real-time collaboration
- Flexible schema design

**Turborepo**

- Efficient monorepo builds
- Shared package management
- Optimized caching

### Patterns and Conventions

**Component Patterns**

- Server Components by default
- Client Components for interactivity
- Compound components for complex UI

**State Management**

- Local state for component-specific data
- React Context for app-wide state
- Server state via Sanity queries

**Testing Strategy**

- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for critical flows
- E2E tests for user journeys

````

## Documentation Generation

### Automated Documentation
```typescript
/**
 * Generates API documentation from TypeScript interfaces
 *
 * @param sourceFiles - Array of TypeScript files to process
 * @param outputPath - Where to write the generated documentation
 * @returns Promise that resolves when documentation is complete
 */
async function generateApiDocs(
  sourceFiles: string[],
  outputPath: string
): Promise<void> {
  // Use TypeScript compiler API to extract type information
  // Generate markdown documentation
  // Write to output files
}

/**
 * Generates component documentation from JSDoc comments
 *
 * @param componentDir - Directory containing React components
 * @param outputDir - Directory to write component docs
 */
async function generateComponentDocs(
  componentDir: string,
  outputDir: string
): Promise<void> {
  // Parse JSDoc comments from component files
  // Extract prop types and descriptions
  // Generate interactive documentation
}
````

### Storybook Integration

```typescript
/**
 * Storybook story for BlogCard component
 *
 * @component BlogCard
 * @description Interactive documentation and testing for BlogCard
 */
export default {
  title: "Components/BlogCard",
  component: BlogCard,
  parameters: {
    docs: {
      description: {
        component:
          "A reusable card component for displaying blog posts with various layouts and interactive features.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "featured", "compact"],
      description: "Visual style variant of the card",
    },
  },
} as Meta<typeof BlogCard>;

/**
 * Default story showing standard usage
 */
export const Default: Story<BlogCardProps> = {
  args: {
    post: mockBlogPost,
    variant: "default",
  },
};

/**
 * Featured variant for highlighted posts
 */
export const Featured: Story<BlogCardProps> = {
  args: {
    post: mockBlogPost,
    variant: "featured",
  },
};
```

## Documentation Maintenance

### Documentation Review Process

1. **Code Changes**: Update docs as part of feature development
2. **Regular Audits**: Quarterly review of documentation accuracy
3. **User Feedback**: Incorporate feedback from documentation users
4. **Automated Checks**: Use tools to detect broken links and outdated content

### Documentation Quality Standards

```markdown
## Quality Checklist

### Content Quality

- [ ] Information is accurate and up-to-date
- [ ] Examples are tested and working
- [ ] Language is clear and concise
- [ ] Target audience is considered

### Structure and Navigation

- [ ] Logical organization and hierarchy
- [ ] Consistent formatting and style
- [ ] Easy navigation and search
- [ ] Proper cross-references and links

### Code Examples

- [ ] All code examples are syntactically correct
- [ ] Examples follow project conventions
- [ ] Complex examples include explanations
- [ ] Examples are realistic and practical

### Accessibility

- [ ] Proper heading hierarchy
- [ ] Alt text for images and diagrams
- [ ] Sufficient color contrast
- [ ] Screen reader friendly formatting
```

### Version Control and Updates

````markdown
## Documentation Versioning

### Changelog Format

```markdown
# Changelog

## [1.2.0] - 2024-01-15

### Added

- New component documentation for DataTable
- API reference for authentication endpoints
- Performance optimization guide

### Changed

- Updated installation instructions for Node.js 18
- Improved code examples in getting started guide

### Fixed

- Corrected TypeScript interface examples
- Fixed broken links in API reference

### Deprecated

- Old authentication method (use new OAuth flow)
```
````

### Update Process

1. Document changes alongside code changes
2. Update version numbers and changelogs
3. Review and test all examples
4. Update cross-references and links
5. Publish and announce updates

````

## Tool Integration

### Documentation Tools
```json
{
  "scripts": {
    "docs:generate": "typedoc src --out docs/api",
    "docs:build": "next build && next export",
    "docs:serve": "next dev",
    "docs:validate": "markdown-link-check docs/**/*.md"
  }
}
````

### Automated Documentation Pipeline

```yaml
# .github/workflows/docs.yml
name: Documentation

on:
  push:
    branches: [main]
    paths: ["docs/**", "src/**/*.ts", "README.md"]

jobs:
  build-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Generate API docs
        run: pnpm docs:generate
      - name: Build documentation site
        run: pnpm docs:build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/out
```

Remember: Good documentation is essential for team productivity and project maintainability. Keep it accurate, accessible, and user-focused.
