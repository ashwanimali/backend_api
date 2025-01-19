// ├── src
// │   ├── app.module.ts       // Root module of the application
// │   ├── main.ts             // Entry point of the application
// │
// ├── auth                   // Authentication module
// │   ├── auth.module.ts      // Module definition
// │   ├── auth.controller.ts  // Handles HTTP requests related to authentication
// │   ├── auth.service.ts     // Business logic for authentication
// │   ├── jwt.strategy.ts     // JWT strategy for authentication
// │   ├── auth.guard.ts       // Guards to enforce role-based access
// │
// ├── users                  // User management module
// │   ├── users.module.ts     // Module definition
// │   ├── users.controller.ts // Handles admin-only HTTP requests for user management
// │   ├── users.service.ts    // Business logic for user management
// │   ├── user.entity.ts      // User entity definition for the database
// │   ├── dto
// │   │   ├── create - user.dto.ts  // DTO for creating a user
// │   │   ├── update - user.dto.ts  // DTO for updating user roles
// │
// ├── documents              // Document management module
// │   ├── documents.module.ts // Module definition
// │   ├── documents.controller.ts // Handles HTTP requests for document operations
// │   ├── documents.service.ts    // Business logic for document operations
// │   ├── document.entity.ts      // Document entity definition
// │   ├── dto
// │   │   ├── create - document.dto.ts  // DTO for creating a document
// │   │   ├── update - document.dto.ts  // DTO for updating a document
// │   ├── upload.middleware.ts       // Middleware for file uploads
// │       ├── multer - config.util.ts  // Multer configuration for uploads
// │       ├── file - validation.util.ts // Utility for validating file types and size
// │
// ├── ingestion              // Ingestion management module
// │   ├── ingestion.module.ts    // Module definition
// │   ├── ingestion.controller.ts // Handles HTTP requests for triggering and managing ingestion
// │   ├── ingestion.service.ts    // Business logic for ingestion
// │   ├── ingestion - status.entity.ts // Entity definition for tracking ingestion processes
// │   ├── webhook.service.ts      // Handles webhook calls to Python backend
// │
// ├── common                 // Shared utilities and guards
// │   ├── decorators
// │   │   ├── roles.decorator.ts    // Custom decorator for role-based access control
// │   ├── interceptors
// │   │   ├── logging.interceptor.ts // Logging interceptor
// │   ├── filters
// │   │   ├── http - exception.filter.ts // Global HTTP exception filter
// │   ├── guards
// │   │   ├── roles.guard.ts         // Role guard for access control
// │   ├── utils
// │       ├── hash.util.ts          // Utility for hashing passwords
// │       ├── response.util.ts      // Standard response formatting utility
// │
// ├── database               // Database connection and configurations
// │   ├── database.module.ts  // Database module definition
// │   ├── database.providers.ts // Providers for database connections
// │   ├── migrations          // Migration scripts
// │
// ├── config                 // Configuration module
// │   ├── config.module.ts    // Module to handle configuration
// │   ├── config.service.ts   // Configuration service
// │   ├── environments
// │       ├── development.env  // Development environment variables
// │       ├── production.env   // Production environment variables

// // Each file and module encapsulates specific functionality as per the structure, ensuring maintainability and scalability.
