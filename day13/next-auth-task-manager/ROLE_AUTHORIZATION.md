# Role-Based Authorization Implementation

This document explains the role-based authorization system implemented in the Next.js Task Manager application.

## Overview

The system restricts access to Add, Edit, and Delete operations based on user roles. Only users with the "Administrator" role can perform these actions.

## Key Components

### 1. Permission Utilities (`app/utils/Permission.ts`)

```typescript
// Check if user has specific permissions
export const hasPermissions = (userRoles: UserRole[], permissions: string[]): boolean

// Check if user is administrator
export const isAdministrator = (userRoles: UserRole[]): boolean

// Extract user roles from session
export const getUserRoles = (session: unknown): UserRole[]
```

### 2. ButtonWithPermissions Component (`components/ui/ButtonWithPermission.tsx`)

A wrapper component that only renders buttons for users with Administrator role:

```typescript
<ButtonWithPermissions
    className="bg-blue-600 text-white px-4 py-2 rounded"
    onClick={handleAction}
>
    Admin Only Button
</ButtonWithPermissions>
```

### 3. Axios Client (`lib/axios.ts`)

Pre-configured axios instance that automatically includes authentication tokens:

```typescript
import axiosClient from '@/lib/axios';

// Automatically includes Bearer token from session
const response = await axiosClient.get('/workspaces/tasks');
```

## Implementation Examples

### Server Component (TaskServer.tsx)

```typescript
const session = await getServerSession(authOptions);
const userRoles = getUserRoles(session);
const hasAdminRole = isAdministrator(userRoles);

// Conditional rendering based on role
{hasAdminRole && (
    <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
    </button>
)}
```

### Client Component (TaskClient.tsx)

```typescript
const { data: session } = useSession();
const userRoles = getUserRoles(session || {});
const hasAdminRole = isAdministrator(userRoles);

// Using ButtonWithPermissions component
<ButtonWithPermissions
    onClick={handleAddTask}
    className="bg-blue-600 text-white px-4 py-2 rounded"
>
    <FaPlus className="w-4 h-4" />
    Add Task
</ButtonWithPermissions>
```

## Available Pages

1. **Task Management (Server)**: `/dashboard/tasks-server`
   - Server-side rendered task list with role-based buttons

2. **Task Management (Client)**: `/dashboard/tasks-client`
   - Client-side rendered task list with role-based buttons

3. **Full Task Management**: `/dashboard/tasks-management`
   - Complete task management with CRUD operations

4. **Role Demo**: `/dashboard/role-demo`
   - Demonstration of role-based authorization features

## User Role Structure

The system expects user roles in the following format:

```typescript
interface UserRole {
  id: string | number;
  name: string;
}

// Example session structure
{
  user: {
    id: "1",
    email: "admin@example.com",
    roles: [
      { id: 1, name: "Administrators" },
      { id: 2, name: "Managers" }
    ]
  }
}
```

## Authorization Logic

- **View Operations**: Available to all authenticated users
- **Add/Edit/Delete Operations**: Only available to users with "Administrator" role
- **Button Visibility**: Admin-only buttons are completely hidden from non-admin users
- **API Protection**: Server-side validation should also check user roles

## Security Features

1. **Client-Side Protection**: Buttons are hidden from unauthorized users
2. **Server-Side Validation**: API endpoints should validate user permissions
3. **Automatic Token Management**: Axios client handles authentication headers
4. **Session-Based Authorization**: Uses NextAuth session for role checking

## Usage Guidelines

1. **Always use ButtonWithPermissions** for admin-only actions
2. **Implement server-side validation** for all protected endpoints
3. **Check roles on both client and server** for complete security
4. **Use the provided utility functions** for consistent role checking

## Testing

To test the authorization system:

1. Login with different user roles
2. Visit `/dashboard/role-demo` to see role information
3. Check button visibility based on user roles
4. Verify API calls include proper authentication headers

## Dependencies

- `next-auth`: Session management
- `axios`: HTTP client with interceptors
- `react-icons`: UI icons
- `zustand`: State management (useAuthStore)
- `tailwindcss`: Styling
