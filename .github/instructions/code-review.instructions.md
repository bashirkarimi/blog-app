---
applyTo: "**"
description: "Code review standards and GitHub review guidelines"
---

# Code Review Guidelines

Code review standards and best practices for maintaining code quality, knowledge sharing, and collaboration in the blog-app monorepo.

## Code Review Philosophy

### Purpose and Goals

- Ensure code quality, correctness, and maintainability
- Share knowledge and promote learning within the team
- Catch bugs and security vulnerabilities early
- Maintain consistency with coding standards and best practices
- Foster collaboration and constructive feedback

### Review Culture

- Provide constructive, specific, and actionable feedback
- Focus on the code, not the person writing it
- Assume positive intent and maintain professional communication
- Balance thorough review with development velocity
- Celebrate good code and acknowledge improvements

## Review Process

### Before Submitting a PR

- Ensure all tests pass and code builds successfully
- Run linting and formatting tools locally
- Write clear PR description with context and changes
- Self-review your code before requesting review
- Ensure PR scope is focused and manageable

### PR Description Standards

- Use clear, descriptive title that summarizes changes
- Include context and motivation for the changes
- Link to relevant issues, tickets, or documentation
- Describe testing performed and any breaking changes
- Use PR templates and checklists when available

### Review Assignment

- Request reviews from appropriate team members
- Include domain experts for complex or critical changes
- Ensure at least one reviewer is familiar with the codebase
- Use GitHub's code owners feature for automatic assignment
- Consider workload distribution when assigning reviews

## What to Review

### Code Quality

- Check for adherence to coding standards and style guides
- Look for proper naming conventions and documentation
- Verify error handling and edge case coverage
- Ensure proper separation of concerns and modularity
- Review for code duplication and reusability opportunities

### Functionality and Logic

- Verify that code implements requirements correctly
- Check for logical errors and potential bugs
- Review algorithm efficiency and performance implications
- Ensure proper handling of async operations and state
- Validate input sanitization and security considerations

### Architecture and Design

- Review architectural decisions and design patterns
- Check for proper abstraction levels and interfaces
- Ensure consistency with existing codebase patterns
- Verify proper dependency management and coupling
- Review API design and public interface changes

### Testing and Quality Assurance

- Ensure adequate test coverage for new functionality
- Review test quality and effectiveness
- Check for proper mocking and test isolation
- Verify testing strategy matches code complexity
- Ensure tests are maintainable and readable

## Review Comments and Feedback

### Providing Effective Feedback

- Be specific about what needs to be changed and why
- Provide examples or suggestions for improvement
- Use clear action words (fix, consider, suggestion, nitpick)
- Explain the reasoning behind feedback when not obvious
- Balance criticism with recognition of good practices

### Comment Categories

- **Fix**: Critical issues that must be addressed
- **Consider**: Suggestions for improvement
- **Question**: Requests for clarification or discussion
- **Nitpick**: Minor style or preference issues
- **Praise**: Recognition of good code or practices

### Code Comment Examples

```markdown
Fix: This function doesn't handle the case where `user` is null.
Consider adding a null check or using optional chaining.

Consider: Could this be simplified using the existing `formatDate` utility?

Question: Why did you choose to use a class here instead of functional approach?

Nitpick: Minor formatting - consider adding a space after the comma.

Praise: Great use of TypeScript generics here - very clean and reusable!
```

## Technology-Specific Review Guidelines

### React Component Reviews

- Check for proper use of Server vs Client Components
- Review prop interfaces and component API design
- Verify proper hook usage and dependencies
- Check for accessibility features and semantic HTML
- Review component composition and reusability

### TypeScript Reviews

- Verify proper type definitions and interfaces
- Check for appropriate use of generics and utility types
- Review type safety and avoid `any` usage
- Ensure proper error handling with typed errors
- Check for consistent import/export patterns

### Next.js Reviews

- Review proper use of App Router features
- Check for appropriate caching and performance strategies
- Verify proper API route implementation
- Review metadata and SEO implementation
- Check for proper error boundary usage

### Sanity CMS Reviews

- Review schema definitions and validation rules
- Check GROQ query optimization and security
- Verify proper content type organization
- Review custom Studio components and plugins
- Check for proper content migration strategies

## Performance Review

### Performance Considerations

- Review bundle size impact and code splitting
- Check for performance anti-patterns and optimizations
- Verify proper image and asset optimization
- Review caching strategies and implementation
- Check for unnecessary re-renders and computations

### Build and CI Impact

- Review impact on build times and processes
- Check for proper dependency management
- Verify CI/CD pipeline compatibility
- Review test execution time and efficiency
- Check for proper caching utilization

## Security Review

### Security Checklist

- Review input validation and sanitization
- Check for proper authentication and authorization
- Verify secure handling of sensitive data
- Review error messages for information disclosure
- Check for proper CORS and security header configuration

### Common Security Issues

- XSS vulnerabilities in user content rendering
- SQL injection in database queries
- Insecure direct object references
- Missing authorization checks
- Exposed sensitive information in logs or errors

## Monorepo-Specific Reviews

### Package Dependencies

- Review workspace dependency usage and versioning
- Check for circular dependencies between packages
- Verify proper package.json exports and imports
- Review build order and dependency graph
- Check for appropriate package boundaries

### Shared Code Reviews

- Review changes to shared packages for backward compatibility
- Check for proper API versioning and migration strategies
- Verify impact on consuming packages
- Review shared utility and component design
- Check for proper documentation of shared APIs

## Review Automation

### Automated Checks

- Use GitHub Actions for automated testing and linting
- Implement code coverage requirements and reporting
- Use security scanning and dependency vulnerability checks
- Automate performance testing and bundle size monitoring
- Use automated accessibility testing tools

### Review Tools

- Use GitHub's review features effectively (suggestions, approvals)
- Leverage draft PRs for early feedback and collaboration
- Use review apps and preview deployments for testing
- Implement automated code quality checks and reporting
- Use bot automation for routine checks and reminders

## Review Resolution

### Addressing Feedback

- Respond to all review comments appropriately
- Ask clarifying questions when feedback is unclear
- Implement requested changes or provide reasoning for alternatives
- Use GitHub's suggestion feature for quick fixes
- Re-request review after addressing feedback

### Review Approval

- Ensure all blocking comments are resolved
- Verify all automated checks pass
- Get required approvals before merging
- Use merge strategies that maintain clean history
- Document any follow-up work or technical debt

### Post-Review Actions

- Merge PRs promptly after approval
- Monitor for any issues after deployment
- Update documentation if necessary
- Share learnings and patterns with the team
- Reflect on review process and identify improvements
