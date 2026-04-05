export const validators = {
  required: (value) => {
    if (!value || (typeof value === "string" && !value.trim())) {
      return "Field ini wajib diisi";
    }
    return null;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Format email tidak valid";
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Minimal ${min} karakter`;
    }
    return null;
  },

  password: (value) => {
    if (!value || value.length < 6) {
      return "Password minimal 6 karakter";
    }
    return null;
  },

  match: (fieldName, compareValue) => (value) => {
    if (value !== compareValue) {
      return `${fieldName} tidak cocok`;
    }
    return null;
  },

  number: (value) => {
    if (isNaN(value) || value < 0) {
      return "Harus berupa angka positif";
    }
    return null;
  },

  date: (value) => {
    if (!value) return "Tanggal wajib diisi";
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return "Format tanggal tidak valid";
    }
    return null;
  },

  futureDate: (value) => {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return "Tanggal harus hari ini atau mendatang";
    }
    return null;
  },
};

export const validateForm = (values, rules) => {
  const errors = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      const error = rule(values[field], values);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
