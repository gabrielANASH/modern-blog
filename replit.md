# Overview

This is a modern full-stack blog application built with a React frontend and Express.js backend. The application provides a clean, responsive interface for reading and discovering blog posts with features like search functionality, category filtering, and post interactions. The frontend uses shadcn/ui components for a polished design system, while the backend provides a RESTful API for content management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth interactions and page transitions
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API endpoints for posts, search, and user interactions
- **Data Storage**: In-memory storage with seeded sample data (MemStorage class)
- **Development Server**: Vite integration for hot module replacement in development
- **Build System**: ESBuild for production bundling

## Database Schema
The application uses Drizzle ORM with PostgreSQL schema definitions:
- **Users Table**: Basic user authentication with username/password
- **Posts Table**: Blog posts with metadata including title, content, category, author info, read time, likes, and featured status
- **Schema Validation**: Zod schemas for type-safe data validation

## Key Features
- **Blog Post Management**: Create, read, and display blog posts with rich metadata
- **Search Functionality**: Full-text search across blog posts
- **Category Filtering**: Filter posts by categories like Design, Technology, Travel, etc.
- **Interactive Elements**: Post liking, featured posts, newsletter subscription
- **Responsive Design**: Mobile-first design with adaptive layouts
- **Performance Optimization**: Query caching, lazy loading, and optimized animations

## Development Workflow
- **Hot Reloading**: Vite dev server with HMR for rapid development
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Organization**: Shared types and schemas between client and server
- **Build Process**: Separate builds for client (Vite) and server (ESBuild)

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and schema management tools

## Frontend UI Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives for components
- **@tanstack/react-query**: Server state management and data fetching
- **framer-motion**: Animation library for smooth UI interactions
- **tailwindcss**: Utility-first CSS framework for styling

## Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution environment for Node.js
- **wouter**: Lightweight routing library for React
- **class-variance-authority**: Utility for managing component variants
- **clsx** and **tailwind-merge**: CSS class manipulation utilities

## Backend Utilities
- **express**: Web framework for Node.js
- **zod**: TypeScript-first schema validation
- **date-fns**: Date manipulation library
- **nanoid**: URL-safe unique string ID generator

## Styling and Design
- **lucide-react**: Icon library with React components
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider component

The application is configured for deployment on Replit with specialized plugins for development and error handling.