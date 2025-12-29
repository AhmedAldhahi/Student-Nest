import { Platform } from "react-native";

const API_URL = "https://studentnest.cloud/serverapi/api/v1";

export const login = async (data: Record<string, any>) => {
    try {
        console.log("Sending JSON to:", `${API_URL}/auth/login`);
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const result = await response.json();
        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }
        return result;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

export const registerStudent = async (data: Record<string, any>, file: any) => {
    const formData = new FormData();

    // Append all data fields
    // Explicit mapping to requested backend fields
    formData.append("dateOfBirth", data.birthDate || data.dateOfBirth);
    formData.append("email", data.email);
    formData.append("gradateYear", data.graduationYear || data.gradateYear); // Preserving 'gradateYear' backend key
    formData.append("major", data.major);
    formData.append("name", data.fullName || data.name);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("role", data.role || "student");
    formData.append("studentCardId", data.studentCardId);
    formData.append("studentGovId", data.studentGovId);
    formData.append("universityName", data.universityName);
    formData.append("address", data.address || ""); // Ensure address is sent

    // Append file
    if (file) {
        const fileToUpload = {
            uri: Platform.OS === "android" ? file.uri : file.uri.replace("file://", ""),
            name: file.name,
            type: file.mimeType || "image/jpeg", // User requested photos
        };
        formData.append("verificationFile", fileToUpload as any);
    }

    try {
        console.log("Sending FormData to:", `${API_URL}/auth/register/student`);
        const response = await fetch(`${API_URL}/auth/register/student`, {
            method: "POST",
            body: formData,
            headers: {
                // "Content-Type": "multipart/form-data", // Let fetch set the boundary
                "Accept": "application/json",
            },
        });

        const responseText = await response.text();
        console.log("Raw Response:", responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Server returned non-JSON response: ${responseText.slice(0, 100)}...`);
        }

        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }
        return result;
    } catch (error) {
        console.error("Registration Error:", error);
        throw error;
    }
};

export const registerLandlord = async (data: Record<string, any>) => {
    // Map the data to the specific payload structure required by the backend
    const payload = {
        email: data.email,
        name: data.fullName, // Mapped from GenericData's fullName
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.birthDate, // Mapped from GenericData's birthDate
        role: "landloard", // TYPO: "landloard" as per user request
        password: data.password,
        cliQAccount: data.cliqAccount, // Note capital 'Q'
        LandloardGovId: data.landlordGovId, // TYPO: "LandloardGovId" as per user request
    };

    try {
        console.log("Sending JSON to:", `${API_URL}/auth/register/landlord`);
        const response = await fetch(`${API_URL}/auth/register/landlord`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const result = await response.json();
        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }
        return result;
    } catch (error) {
        console.error("Landlord Registration Error:", error);
        throw error;
    }
};

export const verifyOtp = async (data: { email: string; otpCode: string }) => {
    try {
        console.log("Sending JSON to:", `${API_URL}/verified-otp`);
        const response = await fetch(`${API_URL}/verified-otp`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const result = await response.json();
        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "OTP Verification failed");
        }
        return result;
    } catch (error) {
        console.error("OTP Verification Error:", error);
        throw error;
    }
};

export const resendOtp = async (email: string) => {
    try {
        console.log("Sending JSON to:", `${API_URL}/resend-otp`);
        const response = await fetch(`${API_URL}/resend-otp`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const result = await response.json();
        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Resend OTP failed");
        }
        return result;
    } catch (error) {
        console.error("Resend OTP Error:", error);
        throw error;
    }
};

export const resendPasswordRecoveryOtp = async (email: string) => {
    try {
        // Endpoint spelling as per user request: /password-recovery/resent-otp
        console.log("Sending JSON to:", `${API_URL}/password-recovery/resent-otp`);
        const response = await fetch(`${API_URL}/password-recovery/resent-otp`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const result = await response.json();
        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Resend Password Recovery OTP failed");
        }
        return result;
    } catch (error) {
        console.error("Resend Password Recovery OTP Error:", error);
        throw error;
    }
};

export const verifyPasswordRecoveryOtp = async (data: { email: string; otpCode: string }) => {
    try {
        console.log("Sending JSON to:", `${API_URL}/password-recovery/verified-otp`);
        const response = await fetch(`${API_URL}/password-recovery/verified-otp`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const result = await response.json();
        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Password Recovery OTP Verification failed");
        }
        return result;
    } catch (error) {
        console.error("Password Recovery OTP Verification Error:", error);
        throw error;
    }
};

export const resetPassword = async (data: { email: string; password: string }) => {
    try {
        console.log(`the data is ${data.password} `);
        console.log("Sending JSON to:", `${API_URL}/password-recovery/forget-password`);
        const response = await fetch(`${API_URL}/password-recovery/forget-password`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        const responseText = await response.text();
        console.log("Raw Response:", responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Server returned non-JSON response: ${responseText.slice(0, 100)}...`);
        }
        console.log("Response:", result);

        if (!response.ok) {
            throw new Error(result.message || "Password Reset failed");
        }
        return result;
    } catch (error) {
        console.error("Password Reset Error:", error);
        throw error;
    }
};

export const getMe = async (token: string) => {
    try {
        console.log("Fetching User Profile from:", `${API_URL}/me/profile`);
        const response = await fetch(`${API_URL}/me/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const result = await response.json();
        // console.log("GetMe Response:", result); // Debugging

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch user profile");
        }
        return result;
    } catch (error) {
        console.error("GetMe Error:", error);
        throw error;
    }
};

export type ProfileUpdateData = {
    name?: string;
    dateOfBirth?: string;
    phoneNumber?: string;
    address?: string;
};

export const updateProfile = async (
    token: string,
    data: ProfileUpdateData,
    photo?: { uri: string; name: string; type: string } | null
) => {
    try {
        console.log("Updating Profile at:", `${API_URL}/me/profile`);

        let body: FormData | string;
        let headers: Record<string, string> = {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        };

        if (photo) {
            // Use FormData when uploading photo
            const formData = new FormData();

            if (data.name) formData.append("name", data.name);
            if (data.dateOfBirth) formData.append("dateOfBirth", data.dateOfBirth);
            if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
            if (data.address) formData.append("address", data.address);

            // Append photo file
            const photoFile = {
                uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", ""),
                name: photo.name || "profile_photo.jpg",
                type: photo.type || "image/jpeg",
            };
            formData.append("photo", photoFile as any);

            body = formData;
            // Don't set Content-Type for FormData, let fetch set the boundary
        } else {
            // Use JSON when no photo
            body = JSON.stringify(data);
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(`${API_URL}/me/profile`, {
            method: "PATCH",
            body: body,
            headers: headers,
        });

        const responseText = await response.text();
        console.log("Update Profile Raw Response:", responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Server returned non-JSON response: ${responseText.slice(0, 100)}...`);
        }

        if (!response.ok) {
            throw new Error(result.message || "Failed to update profile");
        }
        return result;
    } catch (error) {
        console.error("Update Profile Error:", error);
        throw error;
    }
};

