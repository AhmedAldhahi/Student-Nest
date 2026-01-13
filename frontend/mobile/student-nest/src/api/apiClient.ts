import { Platform } from "react-native";

const API_URL = "https://studentnest.cloud/serverapi/api/v1";

interface ApiOptions extends RequestInit {
    token?: string;
    isMultipart?: boolean;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
        const { token, isMultipart, headers, ...customConfig } = options;

        const config: RequestInit = {
            ...customConfig,
            headers: {
                "Accept": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
                ...(!isMultipart && { "Content-Type": "application/json" }),
                ...headers,
            },
        };

        const response = await fetch(`${this.baseUrl}${endpoint}`, config);
        const text = await response.text();

        // Try to parse JSON, fallback to raw text if it's html or plain text (rare cases)
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            // For endpoints that might return HTML error pages or non-JSON success
            // We'll wrap it in an object so we can still return it
            return { raw: text } as unknown as T;
        }

        if (!response.ok) {
            throw new Error(result.message || `Request failed with status ${response.status}`);
        }

        return result;
    }

    public get<T>(endpoint: string, token?: string) {
        return this.request<T>(endpoint, { method: "GET", token });
    }

    public post<T>(endpoint: string, body: any, token?: string, isMultipart = false) {
        return this.request<T>(endpoint, {
            method: "POST",
            body: isMultipart ? body : JSON.stringify(body),
            token,
            isMultipart,
        });
    }

    public patch<T>(endpoint: string, body: any, token?: string, isMultipart = false) {
        return this.request<T>(endpoint, {
            method: "PATCH",
            body: isMultipart ? body : JSON.stringify(body),
            token,
            isMultipart,
        });
    }

    public delete<T>(endpoint: string, token?: string) {
        return this.request<T>(endpoint, { method: "DELETE", token });
    }
}

export const apiClient = new ApiClient(API_URL);
