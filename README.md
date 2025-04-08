# Project Management
A minimal project management application built with NestJS, Socket.io, and Angular with Bootstrap.

## Features

**User Registration & Login**

**Admin & Viewer Roles**:
   - **Admin** : Can create, read, update, and delete projects.
   - **Viewer**: Can only view projects.
     
**JWT Authentication** using Passport Strategy for secure routing.

**Real-time Notifications** for project creation, updates, and deletions using Socket.io.

**Read/Unread Notifications** to track updates.

**Project Management Tools**:
   - Search projects
   - Sort by status
   - Filter projects

## To run the project

### Backend

**Install NestJS:**     npm install -g @nestjs/cli

**Change directory:**   cd backend

**Install packages:**   npm install

**Start nest server:**  nest start

Note: Add .env file in backend directory

**.env:**

MONGODB_URI=your_mongo_uri

JWT_SECRET=your_secret

### Frontend

**Install Angular:**  npm install -g @angular/cli

**Change directory:** cd frontend

**Install packages:** npm install

**Start Angular:**    ng serve

### Deployment
https://project-management-two-pied.vercel.app

FrontEnd - Vercel

Backend  - Railway

