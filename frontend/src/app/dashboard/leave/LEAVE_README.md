# Time & Leave Module Architecture

This document outlines the structure, features, and logic of the **ZentraHR Time & Leave Module**.

---

## 1. Module Overview

The Time & Leave module is designed to handle the entire lifecycle of employee attendance and leave management, from "clocking in" to applying for leave and tracking balances.

**Core Routes:**
- `My Leaves`: `/dashboard/leave/my-leaves` (Landing Page)
- `Apply Leave`: `/dashboard/leave/apply`
- `Attendance`: `/dashboard/leave/attendance`
- `Holidays`: `/dashboard/leave/holidays`
- `History`: `/dashboard/leave/history` (Sub-view)

---

## 2. Sub-Modules & Features

### **A. My Leaves (Landing)**
*   **Path**: `src/app/dashboard/leave/my-leaves/page.tsx`
*   **Key Features**:
    *   **Balance Cards**: Visual progress circles showing Available vs Total leave for Privilege, Casual, Sick, and Maternity categories.
    *   **Upcoming Widget**: A specific section highlighting the immediate next approved leave or holiday.
    *   **Recent Requests**: A simplified table view of the last 3 actions for quick status checks.
    *   **Quick Actions**: Direct access to "Apply Leave" and "Holiday Calendar".

### **B. Apply Leave (Wizard)**
*   **Path**: `src/app/dashboard/leave/apply/page.tsx`
*   **Key Features**:
    *   **Wizard Interface**: A step-by-step approach (Select Type -> Select Dates -> Reason).
    *   **Interactive Ticket**: A real-time "Ticket Preview" on the right side that updates as the user fills the form, showing the *projected* balance after the request.
    *   **Validation**: Warnings for Sick Leave > 3 days (Medical Cert required).

### **C. Attendance (Tracker)**
*   **Path**: `src/app/dashboard/leave/attendance/page.tsx`
*   **Key Features**:
    *   **Smart Widget**: A gamified "Hold to Ignite" button for clocking in/out to prevent accidental clicks. It tracks "Session Time", "Break Time", and "Focus Efficiency".
    *   **Mandatory Inputs**: Captures real-time `CheckIn` and `CheckOut` timestamps.
    *   **Timesheet Log**: A detailed table showing daily logs, total hours, and status (Late, On-Time, Overtime).

### **D. Holidays (Calendar)**
*   **Path**: `src/app/dashboard/leave/holidays/page.tsx`
*   **Key Features**:
    *   **Seasonal Themes**: Cards dynamically change accent colors based on the season (Winter, Summer, Monsoon).
    *   **Categorization**: Filters for National, Public, and Optional holidays.
    *   **Countdown**: A dedicated "Upcoming" hero banner showing days remaining for the next big festival.

---

## 3. Data & State Management

*   Currently, the module uses **mock data** arrays within each `page.tsx`.
*   **State**: React `useState` is used for view toggles (Day/Week), form steps, and widget timers.
*   **Dates**: All dates are currently handled as strings or native `Date` objects for the clock.

## 4. Design System

*   **Theme**: The module strictly follows the "Zentra Ultra-Stylish" guidelines using standard Tailwind CSS.
*   **Components**: Uses heavy usage of `lucide-react` icons, glassmorphism (`backdrop-blur`, `bg-white/10`), and smooth gradients (`from-violet-600 to-indigo-600`).
*   **Animations**: Pages use `animate-in fade-in slide-in-from-bottom` for a smooth entry.
