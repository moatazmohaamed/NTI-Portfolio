### Company's portfolio Frontend

A modern, responsive company portfolio website built with Angular and styled with Tailwind CSS. Features dynamic content integration with a backend API and a comprehensive admin dashboard for content management.

### Features

- Responsive Design: Optimized for all device sizes (desktop, tablet, mobile)
- Modern UI: Clean, professional design with Tailwind CSS styling
- Dynamic Content: All content loaded from backend API for easy management
- Interactive Admin Dashboard: Full CMS functionality for non-technical users
- Image Galleries & Sliders: Showcase projects and team members beautifully
- Contact Form: With validation and submission handling
- Smooth Animations: Enhanced user experience with subtle transitions
- SEO-Friendly: Proper meta tags and semantic HTML structure

## Technologies

- Angular (latest version): Component-based framework
- TypeScript: Type-safe development
- Tailwind CSS: Utility-first CSS framework
- RxJS: Reactive state management
- Angular Router: Client-side navigation
- Angular Forms: Form handling and validation
- Angular HTTP Client: API communication (withFetch())

### Integration with Backend

1-API Configuration

The frontend communicates with the backend through these services:

- Content Service - Fetches dynamic content for pages with caching
- Auth Service - Handles admin authentication and session management
- Project Service - Manages portfolio projects with CRUD operations
- Team Service - Handles team member data and organization
- Testimonial Service - Manages client testimonials and reviews
- Contact Service - Processes contact form submissions
- Upload Service - Handles image and file uploads to the server

### Authentication Flow

- Admin accesses /admin/login route
- Credentials are verified against backend API
- JWT token is received and stored securely (through cookies)
- Token is attached to all subsequent API requests via interceptor
- Auth guard protects admin routes from unauthorized access
- Clear logout functionality removes all authentication data

### Best Practice

1- Component Design

- Use presentational and container component pattern
- Keep components focused and reusable
- Implement OnPush change detection for performance
- Use lazy loading for admin modules

2- State Management

- Use services with BehaviorSubject for reactive state and signals
- Implement caching for API responses to reduce calls

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
- `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Use Rxjs when needed

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

### Dynamic Content Integration

The frontend dynamically loads all content from the backend API:

1-Content Service

- Fetches page content from API with caching
- Handles content updates in real-time
- Manages content versioning

2- API Service

- Centralized HTTP request handling
- Comprehensive error handling
- Authentication token management
- Authentication Service
- Manages admin login/logout sessions
- Secure JWT token storage

3- State Management

- Reactive data flow with RxJS Subjects
- Local storage for persistent data like darkMode ...etc
- Efficient change detection strategies

### UI Components and Layout

1- Main UI website sections will be provided with screens to develop using Tailwind css

### Admin Dashboard Components

Login Form

- Secure authentication with validation
- Remember me functionality
- Password reset flow

Dashboard Overview

- Content statistics and analytics
- Recent activity timeline
- Quick action buttons for common tasks

Content Editor

- WYSIWYG editor for page content
- Image upload and management
- Live preview functionality

Project Manager

- CRUD operations for projects
- Drag-and-drop project ordering
- Category and tag management

Team Manager

- Add/edit team members with rich profiles
- Department and role management
- Social media link configuration

Testimonial Manager

- Approve/review client testimonials
- Client information management
- Rating and featured testimonial controls

Image Manager

- Bulk image upload with drag-and-drop
- Image cropping and optimization
- Organized media library with tagging
