import { createContext, useContext, useState, type ReactNode } from 'react';

// Define types for User and UserContext
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export interface UserData {
  name: string;
  email: string;
  age?: number;
}

export interface UserContextType {
  users: User[];
  addUser: (userData: UserData) => User;
  updateUser: (userId: number, updatedData: Partial<UserData>) => void;
  getUserById: (userId: number) => User | undefined;
  displayUser: (userId: number) => void;
  totalUsers: number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  // display user from registratiom
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 30 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com' },
  ]);

  const addUser = (userData: UserData): User => {
    const newUser: User = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      age: userData.age || undefined,
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  const updateUser = (userId: number, updatedData: Partial<UserData>): void => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, ...updatedData }
          : user
      )
    );
  };

  const getUserById = (userId: number): User | undefined => {
    return users.find(user => user.id === userId);
  };

  const displayUser = (userId: number): void => {
    const user = getUserById(userId);
    if (user) {
      alert(`User Details:\nID: ${user.id}\nName: ${user.name}\nEmail: ${user.email}\nAge: ${user.age || 'N/A'}`);
    }
  };

  const value: UserContextType = {
    users,
    addUser,
    updateUser,
    getUserById,
    displayUser,
    totalUsers: users.length,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
