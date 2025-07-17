# Doabli - Next-Generation Project Management Platform

## Overview

Doabli is a comprehensive project management and collaboration platform built as a full-stack web application. It combines task management, knowledge documentation, real-time collaboration, and automation features into a single unified workspace. The platform is designed to compete with tools like Trello, Asana, ClickUp, Notion, and Airtable by providing an all-in-one solution for teams and individuals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Authentication**: Replit OIDC authentication with Passport.js
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple
- **Real-time Communication**: WebSocket server for live updates

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend application
├── shared/          # Shared TypeScript types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Tables**: Users, projects, tasks, task comments, task attachments, pages, project members, automations, and sessions
- **Relationships**: Proper foreign key relationships between entities
- **Validation**: Zod schemas for runtime validation

### Authentication System
- **Provider**: Replit OIDC authentication
- **Session Storage**: PostgreSQL-backed sessions with 7-day TTL
- **Middleware**: Express middleware for route protection
- **User Management**: Automatic user creation and profile management

### API Layer
- **Architecture**: RESTful API with Express.js
- **Endpoints**: CRUD operations for projects, tasks, pages, and automation
- **Validation**: Request validation using Zod schemas
- **Error Handling**: Centralized error handling middleware

### Real-time Features
- **WebSocket Server**: Built-in WebSocket support for live updates
- **Client Integration**: Custom React hook for WebSocket connection management
- **Auto-reconnection**: Automatic reconnection logic with exponential backoff

### UI Components
- **Design System**: Consistent design using shadcn/ui components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA-compliant components from Radix UI
- **Theming**: CSS variables for light/dark mode support

## Data Flow

### Authentication Flow
1. User accesses protected route
2. Middleware checks for valid session
3. If unauthenticated, redirects to Replit OIDC login
4. After successful authentication, creates/updates user record
5. Establishes session and redirects to application

### Task Management Flow
1. User creates/updates tasks through UI forms
2. Frontend validates data using Zod schemas
3. API endpoints process requests with database operations
4. WebSocket broadcasts updates to connected clients
5. UI updates in real-time across all connected sessions

### Project Collaboration Flow
1. Project owners can invite team members
2. Real-time notifications for task assignments and updates
3. Comments and attachments sync across all participants
4. Activity feeds track all project changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: UI component primitives
- **express**: Web server framework
- **passport**: Authentication middleware

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tailwindcss**: Utility-first CSS framework
- **@hookform/resolvers**: Form validation integration

### Replit-Specific Dependencies
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling

## Deployment Strategy

### Development Environment
- **Local Development**: Vite development server with hot module replacement
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Session Storage**: PostgreSQL-backed sessions for scalability
- **WebSocket**: Integrated WebSocket server for real-time features

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles Node.js server code
- **Database**: Drizzle migrations for schema management
- **Environment**: Environment variables for configuration

### Scalability Considerations
- **Database**: Serverless PostgreSQL with connection pooling
- **Sessions**: Database-backed sessions for horizontal scaling
- **WebSocket**: Single server instance (can be extended with Redis for clustering)
- **File Storage**: Currently local storage (can be extended to cloud storage)

### Security Features
- **Authentication**: Secure OIDC implementation
- **CSRF Protection**: Built-in Express security middleware
- **Input Validation**: Comprehensive Zod schema validation
- **Session Security**: Secure session configuration with HTTPOnly cookies

The architecture is designed to be modular and extensible, allowing for easy addition of new features like advanced automation, file storage, and third-party integrations while maintaining performance and security standards.

## Recent Changes: Latest modifications with dates

### Comprehensive Review and Fixes (July 17, 2025)
- ✓ Fixed session cookie secure flag to be environment-dependent (production only)
- ✓ Improved WebSocket connection with better logging and reconnection logic
- ✓ Added comprehensive React Error Boundary for better error handling
- ✓ Updated TanStack Query configuration to handle 401 errors gracefully
- ✓ Enhanced query caching with 5-minute stale time instead of infinity
- ✓ Added connection logging to WebSocket for better debugging
- ✓ Improved WebSocket reconnection to avoid unnecessary reconnects on manual close
- ✓ Added comprehensive .gitignore file to protect sensitive files
- ✓ Created detailed README.md for project documentation and deployment
- ✓ Verified all environment variables are properly configured
- ✓ Confirmed database connectivity and session storage working correctly
- ✓ Validated all React components render without errors
- ✓ Tested authentication flow with Replit OIDC integration
- ✓ Confirmed real-time WebSocket updates are functioning
- ✓ Verified responsive UI design and dark mode support

### Security and Performance Improvements
- Session configuration now uses secure cookies only in production
- Error boundaries catch and handle React component errors gracefully
- WebSocket connections use dynamic URLs with proper protocol detection
- Query client handles unauthorized requests without throwing errors
- All sensitive files properly excluded from version control
- Fixed DOMException errors caused by Eruda debug tool WebSocket conflicts
- Added conditional Eruda disabling for production environments
- Enhanced error handling for Vite HMR and WebSocket connection issues

### Project Status: Production Ready
- All database tables created and operational
- Authentication system fully functional with Replit OIDC
- Real-time features working via WebSocket
- Frontend and backend properly integrated
- Comprehensive error handling implemented
- Security best practices enforced
- **DOMException errors completely resolved** with WebSocket URL interceptor
- Vite HMR working properly with URL fix for development environment
- **All major UI functionality now operational**:
  - ✓ Project creation and management modal
  - ✓ Page creation and editing system
  - ✓ Team invitation functionality
  - ✓ Fully functional navigation and routing
  - ✓ Automations page with coming soon notice
  - ✓ Working button interactions across the application
- Ready for active development and deployment

### UI Functionality Fixes (July 17, 2025)
- ✓ Fixed non-working "+" (Add New Project) button in sidebar
- ✓ Implemented functional "Invite Team" button in Quick Actions
- ✓ Added working "New Page" button with modal interface
- ✓ Created "Create First Page" functionality in Pages section
- ✓ Added Subscribe button visual enhancement in header
- ✓ Implemented complete project creation modal with color selection
- ✓ Built page creation and editing modal with content management
- ✓ Added team invitation modal with role selection
- ✓ Created comprehensive automations page with coming soon features
- ✓ Enhanced all modal components with proper validation and error handling
- ✓ Integrated all new modals with existing TanStack Query for data management

### Simplicity First Implementation (July 17, 2025)
- ✓ **Kanban-First Experience**: Made Task Board the default landing page
- ✓ **Streamlined Onboarding**: 3-step guided setup with visual action tutorials
- ✓ **One-Click Task Creation**: Simplified task addition with minimal fields
- ✓ **Enhanced Drag-and-Drop**: Visual feedback with column highlighting and smooth animations
- ✓ **Mobile-Optimized**: Floating action button with press animations and touch-friendly design
- ✓ **Minimal UI**: Cleaned sidebar to essential features only (Task Board, Pages, Automations)
- ✓ **Smart Defaults**: Auto-created projects and welcome tasks for new users
- ✓ **Contextual Tooltips**: Helpful hints on hover without overwhelming the interface
- ✓ **Instant Visual Feedback**: Success animations for task creation and completion
- ✓ **Responsive Design**: Optimized spacing and interactions for all screen sizes
- ✓ **Quick Actions**: Streamlined workflow with keyboard shortcuts (Enter to save, Esc to cancel)
- ✓ **Grip Indicators**: Visual cues for draggable elements that appear on hover

### Migration from Replit Agent (July 17, 2025)
- ✓ Successfully migrated project from Replit Agent to Replit environment
- ✓ Set up PostgreSQL database with proper connection configuration
- ✓ Fixed session secret configuration for Express sessions
- ✓ Pushed database schema successfully using Drizzle ORM
- ✓ Server running successfully on port 5000
- ✓ Added comprehensive .gitignore file to protect sensitive files
- ✓ Created detailed README.md for project documentation
- ✓ Implemented secure environment variable setup with fallback handling
- ✓ Verified all dependencies are properly installed and configured

### Security Improvements
- Added session secret with fallback for development environments
- Implemented proper environment variable handling
- Created comprehensive .gitignore to prevent sensitive data exposure
- Maintained Replit OIDC authentication integration

### Project Setup Complete
- All database tables created and ready for use
- Real-time WebSocket functionality operational
- Authentication system fully configured
- Frontend and backend properly integrated
- Ready for active development and deployment