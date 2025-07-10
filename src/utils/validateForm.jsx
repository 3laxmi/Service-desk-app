export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Minimum 6 characters, at least one uppercase, one lowercase, one digit
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
};

export const validateTicketForm = ({ subject, description, priority, category }) => {
  if (!subject || !description || !priority || !category) {
    return false;
  }
  return true;
};
