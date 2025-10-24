---
applyTo: "**"
description: "Performance optimization guidelines for the blog-app monorepo"
---

# Performance Guidelines

Performance optimization standards and best practices for the blog-app monorepo covering frontend performance, backend optimization, and build performance.

## Performance Philosophy

### Performance-First Development

- Consider performance implications during design and development
- Measure performance continuously throughout development
- Optimize for Core Web Vitals and user experience metrics
- Balance performance with maintainability and developer experience
- Use data-driven decisions for performance optimizations

### Performance Budgets

- Establish performance budgets for key metrics
- Monitor bundle sizes and loading performance
- Set limits for JavaScript bundle sizes and image sizes
- Use automated tools to enforce performance budgets
- Regular review and adjust performance targets

## Frontend Performance

### Next.js App Router Optimization

- Use Server Components by default for better performance
- Minimize Client Component usage and bundle size
- Leverage Next.js built-in optimizations (Image, Font, etc.)
- Use proper caching strategies with ISR and SSG
- Implement streaming and Suspense for better user experience

### Bundle Optimization

- Use code splitting and dynamic imports effectively
- Implement tree shaking to eliminate unused code
- Optimize vendor bundle sizes and splitting strategies
- Use proper import strategies to minimize bundle bloat
- Monitor and optimize critical path loading

### Image and Asset Optimization

- Use Next.js Image component for automatic optimization
- Implement proper responsive image strategies
- Use modern image formats (WebP, AVIF) with fallbacks
- Optimize SVGs and implement proper icon strategies
- Use CDN for static asset delivery and caching

### CSS and Styling Performance

- Use Tailwind CSS purging for optimal CSS bundle sizes
- Implement critical CSS extraction and loading
- Avoid CSS-in-JS runtime overhead where possible
- Use CSS containment for layout optimization
- Implement proper font loading strategies

## React Performance

### Component Optimization

- Use React.memo() for expensive pure components
- Implement proper key props for efficient list rendering
- Avoid creating objects and functions in render methods
- Use proper state management to minimize re-renders
- Profile components with React DevTools Profiler

### Hook Optimization

- Use useMemo() and useCallback() judiciously for expensive computations
- Implement proper dependency arrays to avoid unnecessary effects
- Use useRef() for mutable values that don't trigger re-renders
- Optimize custom hooks for reusability and performance
- Avoid premature optimization in hook implementations

### State Management Performance

- Keep state as local as possible to minimize re-renders
- Use React Context efficiently with proper provider boundaries
- Implement state normalization for complex data structures
- Use proper memoization strategies for derived state
- Consider external state management for complex scenarios

## Loading and Caching

### Loading Strategies

- Implement proper loading states and skeleton UIs
- Use progressive loading for large data sets
- Implement infinite scrolling and pagination effectively
- Use preloading strategies for critical resources
- Optimize above-the-fold content loading

### Caching Strategies

- Use Next.js caching features (ISR, SSG, SSR)
- Implement proper HTTP caching headers
- Use service workers for offline caching when appropriate
- Cache API responses and implement proper invalidation
- Use browser caching effectively for static assets

### Lazy Loading

- Implement lazy loading for images and components
- Use intersection observer for efficient lazy loading
- Lazy load route components with dynamic imports
- Implement progressive enhancement patterns
- Use proper fallbacks for lazy-loaded content

## API and Data Performance

### API Optimization

- Minimize API request counts and payloads
- Implement proper API caching and invalidation strategies
- Use GraphQL or efficient REST patterns to avoid over-fetching
- Implement request batching and debouncing
- Use compression for API responses

### Sanity CMS Performance

- Optimize GROQ queries for performance
- Use proper field selection to minimize data transfer
- Implement image optimization with Sanity's image pipeline
- Use CDN for Sanity assets and content delivery
- Cache Sanity responses appropriately

### Database and Content Performance

- Optimize content queries and avoid N+1 problems
- Use proper indexing strategies for content types
- Implement content pagination and filtering
- Use incremental static regeneration for dynamic content
- Monitor and optimize query performance

## Build and Development Performance

### Build Optimization

- Use Turborepo for efficient monorepo builds
- Implement proper caching strategies for build artifacts
- Optimize TypeScript compilation performance
- Use incremental builds and proper cache invalidation
- Parallelize build processes where possible

### Development Performance

- Use proper hot module replacement configuration
- Optimize development server startup time
- Use efficient file watching and change detection
- Implement proper source map generation for debugging
- Optimize test execution and feedback loops

### Tooling Performance

- Use efficient linting and formatting tools
- Optimize ESLint rules for development performance
- Use proper TypeScript project references
- Implement efficient code generation and type checking
- Use build caching and incremental compilation

## Monitoring and Measurement

### Performance Metrics

- Monitor Core Web Vitals (LCP, FID, CLS)
- Track custom performance metrics relevant to user experience
- Use Real User Monitoring (RUM) for production insights
- Implement performance budgets and alerts
- Regular performance audits and lighthouse testing

### Performance Testing

- Use automated performance testing in CI/CD
- Implement load testing for API endpoints
- Test performance across different devices and networks
- Use synthetic monitoring for continuous performance tracking
- Profile applications under realistic load conditions

### Performance Analysis

- Use browser DevTools for performance profiling
- Analyze bundle sizes and loading waterfalls
- Use React DevTools Profiler for component performance
- Implement custom performance logging and analytics
- Use performance APM tools for production monitoring

## Mobile and Accessibility Performance

### Mobile Optimization

- Optimize for mobile devices and slower networks
- Use proper responsive design and progressive enhancement
- Implement touch-friendly interactions and gestures
- Optimize for battery usage and CPU performance
- Test on real devices with realistic network conditions

### Accessibility Performance

- Ensure fast keyboard navigation and focus management
- Optimize screen reader performance and compatibility
- Use proper semantic markup for better performance
- Implement efficient ARIA updates and announcements
- Test with assistive technologies under load

## Third-Party Performance

### External Dependencies

- Audit and optimize third-party script loading
- Use proper loading strategies for analytics and tracking
- Implement resource hints for external dependencies
- Monitor third-party performance impact
- Use self-hosting for critical third-party resources

### Content Delivery

- Use CDN for static asset delivery
- Implement proper geographic distribution strategies
- Use edge computing for dynamic content where appropriate
- Optimize DNS resolution and connection establishment
- Monitor and optimize content delivery performance
