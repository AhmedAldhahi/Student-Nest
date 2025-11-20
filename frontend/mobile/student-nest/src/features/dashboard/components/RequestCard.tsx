import React from "react";
import { View, Text } from "react-native";
import { Card, Chip, Button } from "react-native-paper";
import { LeaseRequest } from "../types";


type RequestCardProps = {
  request: LeaseRequest;
  role: "student" | "landlord" | "admin";
  onCancel?: (id: number) => void;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onAudit?: (id: number) => void;
};

export default function RequestCard({
  request,
  role,
  onCancel,
  onAccept,
  onReject,
  onAudit,
}: RequestCardProps) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ fontWeight: "600" }}>Request #{request.request_id}</Text>
          <Chip>{request.status.toUpperCase()}</Chip>
        </View>
        <Text>Student ID: {request.student_id}</Text>
        <Text>Apartment ID: {request.apartment_id}</Text>
        {request.request_message && <Text>“{request.request_message}”</Text>}
        <Text>Rent Term: {request.rent_term}</Text>
        <Text>Start Date: {request.started_date}</Text>
        <Text>Created At: {request.created_at}</Text>
      </Card.Content>

      {/* Role-specific actions */}
      <Card.Actions>
        {role === "student" && request.status === "pending" && (
          <Button mode="outlined" onPress={() => onCancel?.(request.request_id)}>
            Cancel
          </Button>
        )}

        {role === "landlord" && request.status === "pending" && (
          <>
            <Button mode="contained" onPress={() => onAccept?.(request.request_id)}>
              Accept
            </Button>
            <Button mode="contained" onPress={() => onReject?.(request.request_id)}>
              Reject
            </Button>
          </>
        )}

        {role === "admin" && (
          <Button mode="outlined" onPress={() => onAudit?.(request.request_id)}>
            Audit
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
}
