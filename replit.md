# FEU Tech Campus Navigation System

## Overview

This is an immersive web-based campus navigation system for FEU Tech built as a full-stack application. The system provides interactive 2D maps, smart search functionality, and user feedback capabilities to help students and visitors navigate the campus effectively.

## System Architecture

The application follows a modern monorepo structure with a clear separation between client and server code:

- **Frontend**: React with TypeScript, using Vite for development and building
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with session management
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for client-side routing
- **Component Library**: shadcn/ui components providing consistent design system
- **Styling**: Tailwind CSS with custom FEU Tech brand colors
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for API state, React Context for local state

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Database Layer**: Drizzle ORM providing type-safe database operations
- **Authentication**: Replit Auth integration with OIDC
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple

### Database Schema
- **Users Table**: Stores user profiles from Replit Auth
- **Feedback Table**: Collects user feedback with ratings and categories
- **Sessions Table**: Manages user sessions for authentication
- **User Activity Table**: Tracks user interactions for analytics

### Authentication Flow
- Replit Auth handles user authentication via OIDC
- Sessions stored in PostgreSQL for persistence
- User data synchronized from Replit profile information
- Role-based access control (default: student role)

## Data Flow

1. **User Authentication**: Users log in through Replit Auth, creating a session
2. **Navigation**: Users access different pages through the sidebar navigation
3. **Map Interaction**: Users search for locations and view interactive campus maps
4. **Feedback Collection**: Users submit feedback which is stored and tracked
5. **Activity Logging**: User interactions are logged for analytics purposes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL client
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight client-side router

### Authentication
- **openid-client**: OIDC client for Replit Auth
- **passport**: Authentication middleware
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety
- **tsx**: TypeScript execution for development

## Deployment Strategy

The application is configured for deployment on Replit with:

- **Development**: `npm run dev` starts both client and server in development mode
- **Production Build**: `npm run build` creates optimized client bundle and server build
- **Production Start**: `npm run start` runs the production server
- **Database**: Uses environment variable `DATABASE_URL` for PostgreSQL connection
- **Sessions**: Configured with secure settings for production environment

The server serves static files in production and uses Vite's development server in development mode for hot module replacement.

## Changelog

- June 13, 2025. Initial setup
- June 13, 2025. Updated to official FEU Tech seal logo and implemented actual floor plan layout based on user-provided images
- June 14, 2025. Fixed database connection issue and created PostgreSQL database
- June 14, 2025. Updated FEU Tech logo throughout application with new official seal image
- June 14, 2025. Removed "MADAVUCKER" text from guide map evacuation floor display

## User Preferences

Preferred communication style: Simple, everyday language.

## Design Assets

- Logo: Official FEU Tech Institute of Technology seal (green and gold oval design with "FEU INSTITUTE OF TECHNOLOGY" text and "1992" founding year) - Updated June 14, 2025
- Floor Plan: Based on actual FEU Tech "EVACUATION FLOOR 6" layout with rooms F601-F612, stairs, and fire exits (removed "MADAVUCKER" reference)
- Color Scheme: FEU Tech green (#006b3c) and gold (#ffd700) throughout the entire application