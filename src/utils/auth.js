const USER_KEY = "auth-user";
const AUTH_KEY = "is_authenticated";

export const registerUser = (data) => {
  const name = data.name?.trim();
  const email = data.email?.trim().toLowerCase();
  const password = data.password?.trim();

  if (!name || !email || !password) {
    return { success: false, message: "All field are required" };
  }

  if (localStorage.getItem(USER_KEY)) {
    return { success: false, message: "User already exist. Please login" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Enter a valid email" };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
    };
  }

  const user = { name, email, password };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_KEY, "false");

  return { success: true };
};

export const loginUser = (emailInput, passwordInput) => {
  const email = emailInput?.trim().toLowerCase();
  const password = passwordInput?.trim();

  if (!email || !password) {
    return { success: false, message: "All fields are required" };
  }

  const storeUser = localStorage.getItem(USER_KEY);
  if (!storeUser) {
    return {
      success: false,
      message: "Oops! Wrong email or password",
    };
  }

  let user;
  try {
    user = JSON.parse(storeUser);
  } catch {
    return { success: false, message: "Corrupted user data" };
  }

  if (user.email !== email) {
    return { success: false, message: "Email not found" };
  }

  if (user.password !== password) {
    return { success: false, message: "Incorrect password" };
  }

  localStorage.setItem(AUTH_KEY, "true");
  return { success: true };
};

export const isAuthenticated = () => {
  return localStorage.getItem(AUTH_KEY) === "true";
};

export const getUser = () => {
  const storeUser = localStorage.getItem(USER_KEY);
  if (!storeUser) return null;

  try {
    return JSON.parse(storeUser);
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
};
