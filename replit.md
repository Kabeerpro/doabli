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