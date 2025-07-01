// Define a User type
export type User = {
  username: string;
  password: string;
  preferences?: Record<string, unknown>; // Use more specific type if known
};

// Shared in-memory user store for demo API routes
export const users: User[] = [
  { username: "test", password: "test123", preferences: {} }
];
