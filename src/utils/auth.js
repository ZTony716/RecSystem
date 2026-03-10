const USERS_KEY = "demo_users_v1";
const CURRENT_USER_KEY = "demo_current_user_v1";

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || null;
  } catch {
    return null;
  }
}

export function checkUsernameAvailable(username) {
  const value = username.trim().toLowerCase();
  if (!value) return false;

  const users = getUsers();

  const exists = users.some(
    (u) => u.username.trim().toLowerCase() === value
  );

  return !exists;
}

export function checkEmailAvailable(email) {
  const value = email.trim().toLowerCase();
  if (!value) return false;

  const users = getUsers();

  const exists = users.some(
    (u) => u.email.trim().toLowerCase() === value
  );

  return !exists;
}

export function registerUser({ username, email, password }) {
  const users = getUsers();

  if (!username.trim()) {
    throw new Error("Username cannot be empty.");
  }

  if (!email.trim()) {
    throw new Error("Email cannot be empty.");
  }

  if (!email.includes("@")) {
    throw new Error("Please enter a valid email.");
  }

  if (password.trim().length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const usernameExists = users.find(
    (u) => u.username.trim().toLowerCase() === username.trim().toLowerCase()
  );

  if (usernameExists) {
    throw new Error("Username already exists.");
  }

  const emailExists = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );

  if (emailExists) {
    throw new Error("This email is already linked to another account.");
  }

  const newUser = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
  };

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

  return newUser;
}

export function loginUser({ username, password }) {
  const users = getUsers();
  const value = username.trim().toLowerCase();

  const found = users.find(
    (u) =>
      (
        u.username.trim().toLowerCase() === value ||
        u.email.trim().toLowerCase() === value
      ) &&
      u.password === password.trim()
  );

  if (!found) {
    throw new Error("Invalid username/email or password.");
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
  return found;
}

export function resetPassword({ identifier, newPassword }) {
  const users = getUsers();

  const value = identifier.trim().toLowerCase();

  const index = users.findIndex(
    (u) =>
      u.username.trim().toLowerCase() === value ||
      u.email.trim().toLowerCase() === value
  );

  if (index === -1) {
    throw new Error("No account found with that username or email.");
  }

  if (newPassword.trim().length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  users[index].password = newPassword.trim();

  saveUsers(users);

  return true;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}