---
applyTo: "**/*.md,**/*.mdx"
description: "Documentation requirements and standards for the blog-app monorepo"
---

# Documentation Guidelines

Documentation standards and requirements for maintaining comprehensive, accessible, and up-to-date documentation across the blog-app monorepo.

## Documentation Philosophy

### Documentation-First Approach

- Document decisions and architecture before implementation
- Keep documentation close to the code it describes
- Update documentation as part of every code change
- Write documentation for your future self and team members

### Audience-Centered Documentation

- Consider the audience and their technical level
- Provide context and background information
- Use clear, concise language
- Include practical examples and use cases

## Documentation Types

### README Files

- Every package must have a README.md file
- Include purpose, installation, usage, and API documentation
- Provide quick start examples and common use cases
- Link to related documentation and resources
- Keep README files concise but comprehensive

### API Documentation

- Document all public APIs with TypeScript interfaces
- Include parameter descriptions and return types
- Provide usage examples for complex APIs
- Document error conditions and handling
- Use JSDoc comments for inline documentation

### Architecture Documentation

- Document high-level system architecture
- Explain design decisions and trade-offs
- Include diagrams for complex systems
- Document data flow and component relationships
- Keep architecture docs in the `/docs` directory

## Code Documentation

### Inline Comments

- Write comments that explain "why", not "what"
- Document complex business logic and algorithms
- Explain non-obvious code patterns and workarounds
- Use TODO comments for known technical debt
- Keep comments up-to-date with code changes

### JSDoc Standards

- Use JSDoc for all public functions and classes
- Include parameter and return type documentation
- Document exceptions and error conditions
- Provide usage examples for complex functions
- Use proper JSDoc tags (@param, @returns, @throws, etc.)

### Component Documentation

- Document component props and their purposes
- Include usage examples and common patterns
- Document accessibility features and requirements
- Explain component composition and customization
- Use Storybook for visual component documentation

## Markdown Standards

### Formatting Guidelines

- Use consistent heading hierarchy (h1 for page title, h2 for sections)
- Use code blocks with proper language syntax highlighting
- Include table of contents for long documents
- Use meaningful link text and proper link formatting
- Format lists consistently with proper indentation

### Content Structure

- Start with a clear introduction and purpose
- Organize content with logical sections and subsections
- Use bullet points and numbered lists effectively
- Include relevant examples and code snippets
- End with next steps or related resources

### MDX for Interactive Documentation

- Use MDX for documentation requiring interactive examples
- Embed live components and code examples
- Maintain separation between content and presentation
- Use consistent component imports and exports
- Test MDX components as part of the build process

## API Documentation Standards

### RESTful API Documentation

- Document all endpoints with HTTP methods and paths
- Include request and response examples with realistic data
- Document authentication and authorization requirements
- Specify error responses and status codes
- Use OpenAPI/Swagger specifications when appropriate

### GraphQL Documentation

- Document all queries, mutations, and subscriptions
- Include schema definitions and type information
- Provide example queries with expected responses
- Document pagination, filtering, and sorting options
- Use GraphQL introspection for automated documentation

### Sanity CMS Documentation

- Document all schema types and their purposes
- Include field descriptions and validation rules
- Document custom components and their usage
- Provide content editing guidelines for editors
- Document GROQ queries and their expected results

## Process Documentation

### Contributing Guidelines

- Document the contribution process and requirements
- Include code style guidelines and linting rules
- Explain the pull request and review process
- Document testing requirements and standards
- Provide templates for issues and pull requests

### Deployment Documentation

- Document the deployment process and requirements
- Include environment setup and configuration
- Document CI/CD pipeline and automation
- Explain rollback procedures and troubleshooting
- Document monitoring and alerting setup

### Troubleshooting Guides

- Document common issues and their solutions
- Include debugging techniques and tools
- Provide step-by-step troubleshooting procedures
- Document known limitations and workarounds
- Keep troubleshooting guides up-to-date

## Documentation Maintenance

### Review and Updates

- Review documentation during code reviews
- Update documentation as part of feature development
- Schedule regular documentation audits
- Remove or update outdated information
- Use automated tools to detect broken links

### Version Control

- Keep documentation in version control with code
- Use meaningful commit messages for documentation changes
- Tag documentation versions with code releases
- Maintain changelogs for major documentation updates
- Archive deprecated documentation appropriately

### Accessibility in Documentation

- Use proper heading hierarchy for screen readers
- Include alt text for images and diagrams
- Ensure sufficient color contrast in visuals
- Use semantic markup and proper link descriptions
- Test documentation with accessibility tools

## Tools and Automation

### Documentation Generation

- Use automated tools for API documentation generation
- Generate component documentation from TypeScript interfaces
- Use linting tools for markdown formatting consistency
- Automate link checking and validation
- Generate table of contents automatically

### Documentation Hosting

- Use the docs app for centralized documentation
- Ensure documentation is searchable and navigable
- Implement responsive design for mobile access
- Use proper SEO optimization for discoverability
- Monitor documentation usage and analytics

## Quality Standards

### Content Quality

- Write clear, concise, and accurate content
- Use consistent terminology throughout documentation
- Provide practical examples and real-world use cases
- Ensure all code examples are tested and working
- Maintain professional tone and style

### Technical Accuracy

- Verify all technical information and code examples
- Test all procedures and installation instructions
- Keep dependencies and version information current
- Review documentation with subject matter experts
- Use technical review process for complex documentation
