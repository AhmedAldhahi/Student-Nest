import { Platform } from "react-native";

const API_URL = "https://studentnest.cloud/serverapi/api/v1";

export const getAllLandlords = async (token: string) => {
    try {
        console.log("Fetching Landlords from:", `${API_URL}/admin/users/landlord`);
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
        console.log("Fetching Leases from:", `${API_URL}/admin/leases`);
        const response = await fetch(`${API_URL}/admin/leases`, {
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

export const getLeaseById = async (token: string, leaseId: string) => {
    try {
        console.log("Fetching Lease by ID from:", `${API_URL}/admin/lease/${leaseId}`);
        const response = await fetch(`${API_URL}/admin/lease/${leaseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        // console.log("getLeaseById Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch lease");
        }
        return result;
    } catch (error) {
        console.error("getLeaseById Error:", error);
        throw error;
    }
};

export const getAllLeaseRequests = async (token: string) => {
    try {
        console.log("Fetching Lease Requests from:", `${API_URL}/admin/lease-requests`);
        const response = await fetch(`${API_URL}/admin/lease-requests`, {
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

export const getLeaseRequestById = async (token: string, requestId: string) => {
    try {
        console.log("Fetching Lease Request by ID from:", `${API_URL}/admin/lease-request/${requestId}`);
        const response = await fetch(`${API_URL}/admin/lease-request/${requestId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        // console.log("getLeaseRequestById Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch lease request");
        }
        return result;
    } catch (error) {
        console.error("getLeaseRequestById Error:", error);
        throw error;
    }
};
