# Doabli - Next-Generation Project Management Platform

![Doabli Logo](https://doabli.com/logo.png)

**Doabli** is a comprehensive project management and collaboration platform that combines task management, knowledge documentation, real-time collaboration, and automation features into a single unified workspace.

## 🚀 Overview

Doabli is designed to compete with tools like Trello, Asana, ClickUp, Notion, and Airtable by providing an all-in-one solution for teams and individuals. Built with modern web technologies, it offers a seamless experience for project management, task tracking, team collaboration, and knowledge documentation.

## ✨ Features

### Core Functionality
- **Project Management**: Create and organize projects with custom colors and descriptions
- **Task Management**: Full-featured kanban boards with drag-and-drop functionality
- **Real-time Collaboration**: Live updates across all connected clients via WebSocket
- **Knowledge Pages**: Rich text documentation and wiki-style pages
- **Team Collaboration**: Project member management with role-based access
- **Automation**: Custom workflows and automation rules
- **Dashboard Analytics**: Overview of tasks, progress, and team performance

### Technical Features
- **Real-time Updates**: WebSocket-powered live synchronization
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Full light/dark theme switching
- **Secure Authentication**: Replit OIDC integration
- **Database-backed Sessions**: PostgreSQL session storage for scalability
- **Type Safety**: Full TypeScript implementation

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Wouter** for lightweight routing
- **Radix UI** with shadcn/ui components
- **Tailwind CSS** for styling
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **Neon** serverless PostgreSQL
- **Passport.js** for authentication
- **WebSocket** for real-time features

### Infrastructure
- **Replit** hosting and deployment
- **Database**: PostgreSQL with connection pooling
- **Sessions**: Database-backed with 7-day TTL
- **Security**: OIDC authentication, input validation, secure sessions

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Replit account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/doabli.git
   cd doabli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file or use Replit Secrets:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret_key
   REPLIT_DOMAINS=your.replit.app
   REPL_ID=your_repl_id
   ```

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── client/              # React frontend application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Route components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/              # Express.js backend
│   ├── db.ts           # Database connection
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Data access layer
│   └── replitAuth.ts   # Authentication setup
├── shared/              # Shared TypeScript types
│   └── schema.ts       # Database schema and types
└── migrations/         # Database migrations
```

## 🔐 Security Features

- **Secure Authentication**: Replit OIDC implementation
- **Input Validation**: Comprehensive Zod schema validation
- **Session Security**: HTTPOnly cookies with secure configuration
- **CSRF Protection**: Built-in Express security middleware
- **Database Security**: Parameterized queries via Drizzle ORM

## 🚀 Deployment

### Replit Deployment
1. Connect your GitHub repository to Replit
2. Set up environment variables in Replit Secrets
3. The application will automatically deploy

### Manual Deployment
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Start the server: `npm start`

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema

### Database Management
The application uses Drizzle ORM with PostgreSQL. Schema changes should be made in `shared/schema.ts` and pushed using `npm run db:push`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Replit](https://replit.com) for hosting and authentication
- [Radix UI](https://radix-ui.com) for accessible components
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Drizzle ORM](https://orm.drizzle.team) for database management

## 📞 Support

For support, email support@doabli.com or join our community Discord.

---

**Made with ❤️ by the Doabli Team**