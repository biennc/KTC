import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", age: 25 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 30 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", age: 28 },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com" },
  ]);

  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      age: userData.age || undefined,
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  const updateUser = (userId, updatedData) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, ...updatedData }
          : user
      )
    );
  };

  const removeUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const displayUser = (userId) => {
    const user = getUserById(userId);
    if (user) {
      alert(`User Details:\nID: ${user.id}\nName: ${user.name}\nEmail: ${user.email}\nAge: ${user.age || 'N/A'}`);
    }
  };

  const value = {
    users,
    addUser,
    removeUser,
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
