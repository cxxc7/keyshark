// Define a User type
export type User = {
  username: string;
  password: string;
  preferences?: Record<string, unknown>;
};

// In-memory user store (mock DB for demo purposes)
export const users: User[] = [
  { username: "test", password: "test123", preferences: {} },
  { username: "admin", password: "admin123", preferences: { theme: "dark" } }
];
