# Godinotec Academy - Waitlist Application

## Overview

This is a full-stack web application for Godinotec Academy, a technology education platform. The application serves as a waitlist registration system where potential students can sign up to be notified when the academy launches. The application features a modern, responsive design with a landing page that includes company information, features, and a waitlist signup form.

## System Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Vite for build tooling
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Replit with autoscale deployment target

### Project Structure
```
├── client/           # React frontend application
├── server/           # Express backend API
├── shared/           # Shared types and schemas
├── migrations/       # Database migration files
└── attached_assets/  # Static assets (images, etc.)
```

## Key Components

### Frontend Architecture
- **React Router**: Uses Wouter for client-side routing
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Validation**: Zod schemas for type-safe form validation
- **API Communication**: Custom fetch wrapper with error handling

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL
- **Storage Abstraction**: Interface-based storage layer supporting both memory and database implementations
- **API Endpoints**: 
  - `POST /api/waitlist` - Register for waitlist
  - `GET /api/waitlist/stats` - Get waitlist statistics

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Waitlist Entries Table**: Stores waitlist registrations (id, firstName, lastName, email, wantsUpdates, createdAt)

## Data Flow

1. **User Registration**: Users fill out the waitlist form on the homepage
2. **Form Validation**: Client-side validation using Zod schemas
3. **API Request**: Form data sent to `/api/waitlist` endpoint
4. **Server Processing**: Express server validates data and checks for duplicates
5. **Database Storage**: Valid entries stored in PostgreSQL via Drizzle ORM
6. **Response**: Success/error response sent back to client
7. **UI Update**: Success toast shown and form reset on successful registration

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React icons and React Icons
- **Fonts**: Google Fonts (Inter)

### Development Tools
- **Build Tool**: Vite with React plugin
- **TypeScript**: Full TypeScript support across client and server
- **ESBuild**: Used for server-side bundling in production
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both client and server
- **Hot Reloading**: Vite handles frontend hot reloading
- **Database**: Uses environment variable `DATABASE_URL` for connection

### Production Deployment
- **Build Process**: Vite builds frontend, ESBuild bundles server
- **Autoscale**: Replit autoscale deployment target
- **Port Configuration**: Server runs on port 5000, external port 80
- **Static Assets**: Frontend built to `dist/public` directory

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Node Environment**: Supports development/production modes
- **Replit Integration**: Special handling for Replit environment detection

## Changelog

Changelog:
- June 18, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.