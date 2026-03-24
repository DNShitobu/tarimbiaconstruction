export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/&lt;/g, '')
    .replace(/&gt;/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .trim();
}

export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  const sanitized = email.trim().toLowerCase();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitized)) {
    return '';
  }
  
  return sanitized
    .replace(/[<>'"]/g, '')
    .replace(/javascript:/gi, '')
    .trim();
}

export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  return phone
    .replace(/[^+\d\s\-()]/g, '')
    .replace(/[<>'"]/g, '')
    .trim();
}

export function validateInputLength(input: string, min: number = 1, max: number = 1000): boolean {
  return input.length >= min && input.length <= max;
}

export function containsSuspiciousPatterns(input: string): boolean {
  const patterns = [
    /<script/i,
    /<\/script>/i,
    /<iframe/i,
    /<\/iframe>/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /onclick=/i,
    /onmouseover=/i,
    /document\./i,
    /window\./i,
    /eval\(/i,
    /expression\(/i,
    /url\(/i,
    /alert\(/i,
    /confirm\(/i,
    /prompt\(/i,
    /\$\{.*\}/,
    /\$\{.*\}/,
    /\{\{.*\}\}/,
    /\{\{.*\}\}/,
  ];
  
  return patterns.some(pattern => pattern.test(input));
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateContactForm(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: string[] = [];
  
  const sanitizedName = sanitizeInput(data.name);
  if (!sanitizedName || !validateInputLength(sanitizedName, 2, 100)) {
    errors.push('Name must be between 2 and 100 characters');
  }
  
  const sanitizedEmail = sanitizeEmail(data.email);
  if (!sanitizedEmail) {
    errors.push('Please enter a valid email address');
  }
  
  const sanitizedPhone = sanitizePhone(data.phone);
  if (sanitizedPhone && !validateInputLength(sanitizedPhone, 7, 20)) {
    errors.push('Phone number must be between 7 and 20 characters');
  }
  
  const sanitizedSubject = sanitizeInput(data.subject);
  if (!sanitizedSubject || !validateInputLength(sanitizedSubject, 3, 200)) {
    errors.push('Subject must be between 3 and 200 characters');
  }
  
  const sanitizedMessage = sanitizeInput(data.message);
  if (!sanitizedMessage || !validateInputLength(sanitizedMessage, 10, 5000)) {
    errors.push('Message must be between 10 and 5000 characters');
  }
  
  const allInput = `${data.name}${data.email}${data.phone}${data.subject}${data.message}`;
  if (containsSuspiciousPatterns(allInput)) {
    errors.push('Input contains potentially malicious content');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
