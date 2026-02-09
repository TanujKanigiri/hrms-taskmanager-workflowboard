# HRMS Task Manager – Workflow Board

## Overview
This repository contains the Task Manager Workflow Board sub-module of the HRMS application.
The module follows a Kanban-style approach to manage tasks across different workflow stages.

## Scope of This Repository
This repository focuses on the **Workflow Board functionality** inside the Task Manager module.
Only task-related frontend and backend components are included for demonstration and review.

## Key Features
- Workflow Board with task statuses:
  - Todo
  - In Progress
  - In Review
  - Completed
- Task creation and status-based visualization
- Backend REST APIs for task management
- Modular frontend implementation using Next.js App Router

## Tech Stack
### Backend
- Spring Boot
- JPA / Hibernate
- MySQL
- REST APIs

### Frontend
- Next.js (App Router)
- TypeScript
- Component-based architecture

## Folder Structure
backend/ -> Spring Boot application (Task module), 
frontend/ -> Next.js application (Task Manager UI)


## Frontend Implementation Details
The following frontend routes were implemented as part of this module:
src/app/dashboard/tasks/board, 
src/app/dashboard/tasks/create

## Workflow Explanation
- Tasks are fetched from backend APIs based on their status
- Workflow board displays tasks in corresponding columns
- Status changes are designed to be handled through backend APIs

## Note
This module was developed as part of the HRMS Task Management system.
