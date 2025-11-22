// API configuration and utility functions for connecting to backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic API request function
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    // Backend returns { success: true, data: ... } format
    // Extract data if present, otherwise return the full response
    return result.success !== undefined ? (result.data || result) : result;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    
    // Provide more helpful error messages
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      const helpfulError = new Error(
        `Cannot connect to backend server at ${API_BASE_URL}. ` +
        `Please ensure: 1) Backend is running (npm run dev in backend folder), ` +
        `2) Backend is on port 5000, 3) No firewall blocking connection.`
      );
      helpfulError.name = 'ConnectionError';
      throw helpfulError;
    }
    
    throw error;
  }
}

// Dashboard API
export const dashboardAPI = {
  getOverview: () => apiRequest('/dashboard/overview'),
  getHiring: () => apiRequest('/dashboard/hiring'),
};

// Employees API
export const employeesAPI = {
  getAll: () => apiRequest('/employees'),
  getById: (id) => apiRequest(`/employees/${id}`),
  create: (data) => apiRequest('/employees', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/employees/${id}`, { method: 'DELETE' }),
};

// Payroll API
export const payrollAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/payroll${queryString ? `?${queryString}` : ''}`);
  },
  getSummary: () => apiRequest('/payroll/summary'),
  getTotalSalaries: () => apiRequest('/payroll/total-salaries'),
  create: (data) => apiRequest('/payroll', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/payroll/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/payroll/${id}`, { method: 'DELETE' }),
};

// Expenses API
export const expensesAPI = {
  getAll: () => apiRequest('/expenses'),
  getSummary: () => apiRequest('/expenses/summary'),
  create: (data) => apiRequest('/expenses', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/expenses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/expenses/${id}`, { method: 'DELETE' }),
};

// Financial Analytics API
export const financialAPI = {
  getAnalytics: (year = 2024) => apiRequest(`/financial/analytics?year=${year}`),
  create: (data) => apiRequest('/financial', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/financial/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Health check
export const healthCheck = () => apiRequest('/health');

export default {
  dashboardAPI,
  employeesAPI,
  payrollAPI,
  expensesAPI,
  financialAPI,
  healthCheck,
};

