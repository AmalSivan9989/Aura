const BASE_URL = "http://127.0.0.1:8000/api/v1";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = localStorage.getItem("token");
  
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let url = `${BASE_URL}${endpoint}`;
  if (options.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (response.status === 401) {
      // Auto logout on unauthorized token expiration
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      throw new Error("Unauthorized - please login again");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: "Unknown error occurred" }));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    // Handlers for empty responses
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error: any) {
    console.error(`API Request Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) => 
    request<T>(endpoint, { method: "GET", params }),
    
  post: <T>(endpoint: string, body: any) => 
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
    
  put: <T>(endpoint: string, body: any) => 
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),
    
  delete: <T>(endpoint: string) => 
    request<T>(endpoint, { method: "DELETE" }),
};
