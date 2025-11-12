// dashboardFeatures.ts
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Feature = {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

export const roleFeatures: Record<string, Feature[]> = {
  admin: [
    { key: "profile", label: "Profile", icon: "account-circle" }, // 👈 added
    { key: "settings", label: "Settings", icon: "cog" },
    { key: "leases", label: "Leases", icon: "file-document" },
    { key: "requests", label: "Requests", icon: "email" },
    { key: "payments", label: "Payments", icon: "calendar-clock" },
    { key: "notifications", label: "Notifications", icon: "bell" },
    { key: "landlords", label: "Landlords", icon: "account-group" },
    { key: "students", label: "Students", icon: "account" },
    { key: "receipts", label: "All Receipts", icon: "receipt" },
    { key: "auditlog", label: "Audit Log", icon: "clipboard-list" },
    { key: "apartments", label: "Apartments", icon: "home-city" },
    
  ],
  landlord: [
    { key: "profile", label: "Profile", icon: "account-circle" }, // 👈 added
    { key: "leases", label: "Leases", icon: "file-document" },
    { key: "requests", label: "Requests", icon: "email" },
    { key: "payments", label: "Payments", icon: "calendar-clock" },
    { key: "receipts", label: "Receipts", icon: "receipt" }
  ],
  student: [
    { key: "profile", label: "Profile", icon: "account-circle" }, // 👈 added
    { key: "requests", label: "Requests", icon: "email" },
    { key: "payments", label: "Payments", icon: "calendar-clock" },
    { key: "notifications", label: "Notifications", icon: "bell" },
    { key: "receipts", label: "My Receipts", icon: "receipt" }
  ],
};
