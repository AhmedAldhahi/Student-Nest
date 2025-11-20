import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Chip, Button } from "react-native-paper";

type Lease = {
  leaseID: number;
  leaseStartDate: string;
  leaseEndDate: string;
  monthlyRent: number;
  includeUtilitys?: string;
  houseRules: string;
  leaseTerm: number;
  isLandlordSigned: boolean;
  isStudentSigned: boolean;
  status: boolean;
  createAt: string;
  studentId: number;
  landlordId: number;
  apartmentId: number;
};

type LeaseCardProps = {
  lease: Lease;
  role: "admin" | "landlord" | "student";
  onAudit?: (id: number) => void;
  onLandlordSign?: (id: number) => void;
  onStudentSign?: (id: number) => void;
  onView?: (id: number) => void;
};

export default function LeaseCard({
  lease,
  role,
  onAudit,
  onLandlordSign,
  onStudentSign,
  onView,
}: LeaseCardProps) {
  const statusLabel = lease.status
    ? "ACTIVE"
    : lease.isLandlordSigned && lease.isStudentSigned
    ? "READY"
    : "PENDING";

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Lease #{lease.leaseID}</Text>
          <Chip
            style={[
              styles.statusChip,
              lease.status
                ? styles.active
                : lease.isLandlordSigned && lease.isStudentSigned
                ? styles.ready
                : styles.pending,
            ]}
          >
            {statusLabel}
          </Chip>
        </View>
        <Text style={styles.detail}>Apartment ID: {lease.apartmentId}</Text>
        <Text style={styles.detail}>Student ID: {lease.studentId}</Text>
        <Text style={styles.detail}>Landlord ID: {lease.landlordId}</Text>
        <Text style={styles.detail}>Start: {lease.leaseStartDate}</Text>
        <Text style={styles.detail}>End: {lease.leaseEndDate}</Text>
        <Text style={styles.detail}>Rent: ${lease.monthlyRent}</Text>
        <Text style={styles.detail}>Utilities: {lease.includeUtilitys || "None"}</Text>
        <Text style={styles.detail}>Rules: {lease.houseRules}</Text>
        <Text style={styles.detail}>Created At: {lease.createAt}</Text>
      </Card.Content>

      {/* Role-specific actions */}
      <Card.Actions>
        {role === "admin" && (
          <Button mode="outlined" onPress={() => onAudit?.(lease.leaseID)}>
            Audit
          </Button>
        )}

        {role === "landlord" && !lease.isLandlordSigned && (
          <Button mode="contained" onPress={() => onLandlordSign?.(lease.leaseID)}>
            Sign Lease
          </Button>
        )}
        {role === "landlord" && lease.status && (
          <Button mode="outlined" onPress={() => onView?.(lease.leaseID)}>
            View Lease
          </Button>
        )}

        {role === "student" && !lease.isStudentSigned && (
          <Button mode="contained" onPress={() => onStudentSign?.(lease.leaseID)}>
            Sign Lease
          </Button>
        )}
        {role === "student" && lease.status && (
          <Button mode="outlined" onPress={() => onView?.(lease.leaseID)}>
            View Lease
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    padding: 8,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  title: { fontSize: 18, fontWeight: "600", color: "#333" },
  detail: { fontSize: 14, color: "#555", marginBottom: 4 },
  statusChip: { alignSelf: "flex-start" },
  pending: { backgroundColor: "#f39c12" },
  ready: { backgroundColor: "#3498db" },
  active: { backgroundColor: "#2ecc71" },
});


{/* <LeaseCard
  lease={item}
  role="admin"
  onAudit={(id) => alert(`Audit lease #${id}`)}
/>


<LeaseCard
  lease={item}
  role="landlord"
  onLandlordSign={(id) => alert(`Landlord signed lease #${id}`)}
  onView={(id) => alert(`View lease #${id}`)}
/>


<LeaseCard
  lease={item}
  role="student"
  onStudentSign={(id) => alert(`Student signed lease #${id}`)}
  onView={(id) => alert(`View lease #${id}`)}
/> */}


