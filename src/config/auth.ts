export const AUTH_CONFIG = {
  ADMIN_EMAIL: 'shrekonmusk@gmail.com',
  ADMIN_PASSWORD: 'admin123', // This should be changed in production
  STORAGE_KEY: 'admin_user',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  MOCK_AUTH_DELAY: 500, // milliseconds
} as const;

export const AUTH_ERRORS = {
  REQUIRED_FIELDS: 'Email and password are required',
  INVALID_CREDENTIALS: 'Invalid email or password',
  NETWORK_ERROR: 'Network error. Please check your connection',
  AUTH_FAILED: 'Authentication failed',
  SIGNOUT_FAILED: 'Failed to sign out',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again',
} as const;