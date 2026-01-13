import { Platform } from "react-native";
import { apiClient } from "../../../api/apiClient";

export const addApartment = async (token: string, data: any, photos: string[]) => {
    console.log("Adding Apartment");

    const formData = new FormData();

    // Append text fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("address", data.address);
    formData.append("numberOfRoom", String(data.rooms));
    formData.append("numberOfBed", String(data.beds));
    formData.append("isVisible", String(data.isVisible));
    formData.append("isJoin", String(data.isJoin));
    formData.append("googleMapLocationLat", String(data.googleMapLocationLat));
    formData.append("googleMapLocationLong", String(data.googleMapLocationLong));

    // Append photos
    if (photos && photos.length > 0) {
        photos.forEach((photoUri, index) => {
            const filename = photoUri.split('/').pop() || `photo_${index}.jpg`;
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image/jpeg`;

            formData.append("apartmentPhoto", {
                uri: Platform.OS === 'android' ? photoUri : photoUri.replace('file://', ''),
                name: filename,
                type: type,
            } as any);
        });
    }

    return apiClient.post("/landlord/apartments", formData, token, true);
};

export const getLandlordApartments = async (token: string, filter?: "all" | "booked") => {
    const endpoint = filter === "booked" ? "/landlord/apartments/booked" : "/apartments/";
    console.log(`Fetching Apartments (${filter || "all"})`);
    return apiClient.get(endpoint, token);
};

export const uploadApartmentDocument = async (token: string, apartmentId: string, file: any) => {
    console.log("Uploading Document for apartment:", apartmentId);
    const formData = new FormData();
    formData.append("apartmentDocument", {
        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
        name: file.name,
        type: file.mimeType || "application/pdf",
    } as any);

    return apiClient.post(`/landlord/apartments/${apartmentId}/document`, formData, token, true);
};

export const updateApartment = async (token: string, apartmentId: string, data: any) => {
    console.log("Updating Apartment:", apartmentId);
    return apiClient.patch(`/landlord/apartments/${apartmentId}`, data, token);
};

export const updateApartmentDocument = async (token: string, apartmentId: string, documentId: string, file: any) => {
    console.log("Updating Document for apartment:", apartmentId);
    const formData = new FormData();
    formData.append("apartmentType", "ApartmentVerifiedFile");
    formData.append("apartmentDocument", {
        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
        name: file.name,
        type: file.mimeType || "application/pdf",
    } as any);

    return apiClient.patch(`/landlord/apartments/${apartmentId}/documents`, formData, token, true);
};

export const getApartmentLeases = async (token: string, apartmentId: string) => {
    console.log("Fetching Apartment Leases for ID:", apartmentId);
    return apiClient.get(`/landlord/leases/${apartmentId}`, token);
};

export const searchApartmentLeases = async (token: string, apartmentId: string, query: string) => {
    console.log("Searching Apartment Leases:", query);
    return apiClient.get(`/landlord/leases/${apartmentId}/search?q=${encodeURIComponent(query)}`, token);
};

export const getApartmentLeaseRequests = async (token: string, apartmentId: string) => {
    console.log("Fetching Lease Requests for apartment:", apartmentId);
    return apiClient.get(`/landlord/leases-request/${apartmentId}`, token);
};

export const searchApartmentLeaseRequests = async (token: string, apartmentId: string, query: string) => {
    console.log("Searching Lease Requests:", query);
    return apiClient.get(`/landlord/leases-request/${apartmentId}/search?q=${encodeURIComponent(query)}`, token);
};

export const updateLeaseRequestStatus = async (token: string, requestLeaseId: string, status: "Accept" | "Reject") => {
    console.log("Updating Lease Request Status:", requestLeaseId, status);
    return apiClient.patch(`/landlord/leases-request/${requestLeaseId}/status`, { status }, token);
};

export const getLeasePayments = async (token: string, leaseId: string) => {
    console.log("Fetching Lease Payments for:", leaseId);
    return apiClient.get(`/landlord/payment/${leaseId}`, token);
};

export const getPaymentReceipt = async (token: string, leaseId: string, paymentId: string) => {
    console.log("Fetching Payment Receipt");
    return apiClient.get(`/landlord/payment/${leaseId}/${paymentId}/receipt`, token);
};



