export const getApiUrl = () => {
  // 1. Priority: Environment Variable
  // This allows overriding the URL in any environment (local, staging, prod)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // 2. Fallback: Deduce based on hostname (Safety Net)
  // Useful if env var is forgotten in Netlify
  const hostname = window.location.hostname;
  
  // Production (Netlify) -> Render
  if (hostname.includes('netlify.app')) {
    return 'https://nuklias-app.onrender.com';
  }

  // 3. Default: Localhost
  // Assumes backend runs on port 3000
  return 'http://localhost:3000';
};

export const API_BASE_URL = getApiUrl();
