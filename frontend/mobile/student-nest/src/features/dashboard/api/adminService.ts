import { Platform } from "react-native";

const API_URL = "https://studentnest.cloud/serverapi/api/v1";

export const getAllLandlords = async (token: string) => {
    try {
        console.log("Fetching Landlords from:", `${API_URL}/admin/users/landloard`);
        const response = await fetch(`${API_URL}/admin/users/landloard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        // console.log("getAllLandlords Raw Response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 50)}...`);
        }

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch landlords");
        }
        return result;
    } catch (error) {
        console.error("getAllLandlords Error:", error);
        throw error;
    }
};

export const verifyLandlord = async (token: string, landlordId: string, isVerified: boolean) => {
    try {
        console.log(`Verifying landlord ${landlordId} with status ${isVerified}`);
        // Using the user's IP-based URL for this specific endpoint as requested, 
        // or sticking to the main one if we think it's consistent. 
        // The user provided: http://72.60.35.224:4000/api/v1/admin/landlords/verification/{id}
        // Our API_URL is https://studentnest.cloud/serverapi/api/v1
        // Let's try to stick to relative path first if standard, but user specifically gave an IP. 
        // Let's use the main API_URL first as it's cleaner, if it fails we might need to change strategy.
        // Actually, looking at the user request: "here is the api endpoint ... after the / is the id"
        // It's likely the same backend, just accessed via IP in their example.

        const response = await fetch(`${API_URL}/admin/landlords/verification/${landlordId}`, {
            method: "PATCH", // or POST, usually verification updates are PUT/PATCH. User didn't specify method but body suggests update. API usually REST.
            // Wait, usually it's POST if it's an "action", but modifying resource state is PUT/PATCH.
            // Let's assume PUT as it updates "Verified" status. 
            // If it fails, I'll try POST.
            body: JSON.stringify({
                Verified: isVerified ? "true" : "false" // Body format from user request
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        console.log("verifyLandlord Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Failed to verify landlord");
        }
        return result;
    } catch (error) {
        console.error("verifyLandlord Error:", error);
        throw error;
    }
};

export const getAllStudents = async (token: string) => {
    try {
        console.log("Fetching Students from:", `${API_URL}/admin/users/student`);
        const response = await fetch(`${API_URL}/admin/users/student`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        // console.log("getAllStudents Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch students");
        }
        return result;
    } catch (error) {
        console.error("getAllStudents Error:", error);
        throw error;
    }
};

export const searchStudentByEmail = async (token: string, email: string) => {
    try {
        console.log("Searching Student by email:", `${API_URL}/admin/users/search/student/${email}`);
        const response = await fetch(`${API_URL}/admin/users/search/student/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        // console.log("searchStudentByEmail Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Failed to search student");
        }
        return result;
    } catch (error) {
        throw error;
    }
};

export const getAllLeases = async (token: string) => {
    try {
        console.log("Fetching Leases from:", `${API_URL}/leases`);
        const response = await fetch(`${API_URL}/leases`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        console.log("getAllLeases Raw Response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 100)}...`);
        }

        if (!response.ok) {
            console.error("getAllLeases Error Response:", result);
            throw new Error(result.message || `Failed to fetch leases (${response.status})`);
        }
        return result;
    } catch (error) {
        console.error("getAllLeases Error:", error);
        throw error;
    }
};

export const searchLeases = async (token: string, query: string) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        console.log("Searching Leases from:", `${API_URL}/leases/search?q=${encodedQuery}`);
        const response = await fetch(`${API_URL}/leases/search?q=${encodedQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        console.log("searchLeases Raw Response:", text.slice(0, 200));

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 100)}...`);
        }

        if (!response.ok) {
            throw new Error(result.message || "Failed to search leases");
        }
        return result;
    } catch (error) {
        console.error("searchLeases Error:", error);
        throw error;
    }
};

export const getAllLeaseRequests = async (token: string) => {
    try {
        console.log("Fetching Lease Requests from:", `${API_URL}/leases-request`);
        const response = await fetch(`${API_URL}/leases-request`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        // console.log("getAllLeaseRequests Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch lease requests");
        }
        return result;
    } catch (error) {
        console.error("getAllLeaseRequests Error:", error);
        throw error;
    }
};

export const searchLeaseRequests = async (token: string, query: string) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        console.log("Searching Lease Requests from:", `${API_URL}/leases-request/search?q=${encodedQuery}`);
        const response = await fetch(`${API_URL}/leases-request/search?q=${encodedQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        console.log("searchLeaseRequests Raw Response:", text.slice(0, 200));

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 100)}...`);
        }

        if (!response.ok) {
            throw new Error(result.message || "Failed to search lease requests");
        }
        return result;
    } catch (error) {
        console.error("searchLeaseRequests Error:", error);
        throw error;
    }
};

export const getAllApartments = async (token: string) => {
    try {
        console.log("Fetching Apartments from:", `${API_URL}/apartments`);
        const response = await fetch(`${API_URL}/apartments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        console.log("getAllApartments Raw Response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 100)}...`);
        }

        if (!response.ok) {
            console.error("getAllApartments Error Response:", result);
            throw new Error(result.message || `Failed to fetch apartments (${response.status})`);
        }
        return result;
    } catch (error) {
        console.error("getAllApartments Error:", error);
        throw error;
    }
};

export const verifyApartment = async (token: string, apartmentId: number, isVerified: boolean) => {
    try {
        console.log(`Verifying apartment ${apartmentId} with status ${isVerified}`);
        const response = await fetch(`${API_URL}/admin/apartment/${apartmentId}/verify`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                Verified: isVerified
            }),
        });

        const result = await response.json();
        console.log("verifyApartment Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Failed to verify apartment");
        }
        return result;
    } catch (error) {
        console.error("verifyApartment Error:", error);
        throw error;
    }
};

export const getAuditLogs = async (token: string) => {
    try {
        console.log("Fetching Audit Logs from:", `${API_URL}/admin/audit-log`);
        const response = await fetch(`${API_URL}/admin/audit-log`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        console.log("getAuditLogs Raw Response:", text.slice(0, 200));

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 100)}...`);
        }

        if (!response.ok) {
            console.error("getAuditLogs Error Response:", result);
            throw new Error(result.message || `Failed to fetch audit logs (${response.status})`);
        }
        return result;
    } catch (error) {
        console.error("getAuditLogs Error:", error);
        throw error;
    }
};

export const searchAuditLogs = async (token: string, query: string) => {
    try {
        const encodedQuery = encodeURIComponent(query);
        console.log("Searching Audit Logs from:", `${API_URL}/admin/audit-log/search?q=${encodedQuery}`);
        const response = await fetch(`${API_URL}/admin/audit-log/search?q=${encodedQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        console.log("searchAuditLogs Raw Response:", text.slice(0, 200));

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 100)}...`);
        }

        if (!response.ok) {
            console.error("searchAuditLogs Error Response:", result);
            throw new Error(result.message || `Failed to search audit logs (${response.status})`);
        }
        return result;
    } catch (error) {
        console.error("searchAuditLogs Error:", error);
        throw error;
    }
};

export const getAllNotifications = async (token: string) => {
    try {
        console.log("Fetching Notifications from:", `${API_URL}/notifications/`);
        const response = await fetch(`${API_URL}/notifications/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const text = await response.text();
        console.log("getAllNotifications Raw Response:", text.slice(0, 200));

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON:", text);
            throw new Error(`Server returned non-JSON response: ${text.slice(0, 100)}...`);
        }

        if (!response.ok) {
            console.error("getAllNotifications Error Response:", result);
            throw new Error(result.message || `Failed to fetch notifications (${response.status})`);
        }
        return result;
    } catch (error) {
        console.error("getAllNotifications Error:", error);
        throw error;
    }
};

export const updateNotificationStatus = async (token: string, notifyId: number, isRead: boolean) => {
    try {
        console.log(`Updating notification ${notifyId} status to isRead: ${isRead}`);
        const response = await fetch(`${API_URL}/notifications/${notifyId}/notifications-status/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ isRead }),
        });

        const text = await response.text();
        console.log("updateNotificationStatus Raw Response:", text.slice(0, 200));

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON, raw response:", text.slice(0, 100));
            throw new Error(`Server returned non-JSON response (status ${response.status})`);
        }

        if (!response.ok) {
            throw new Error(result.message || "Failed to update notification status");
        }
        return result;
    } catch (error) {
        console.error("updateNotificationStatus Error:", error);
        throw error;
    }
};


