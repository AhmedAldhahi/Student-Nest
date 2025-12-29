import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ActionSheetIOS,
} from "react-native";
import {
  Avatar,
  Text,
  Card,
  Button,
  Divider,
  useTheme,
  TextInput,
  ActivityIndicator,
  Chip,
  IconButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../../../../context/AuthContext";
import { updateProfile } from "../../../auth/api/authService";

type PhotoFile = {
  uri: string;
  name: string;
  type: string;
};

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, studentData, token, isStudent, refreshUserProfile, isLoading: authLoading } = useAuth();

  // Editable form state
  const [name, setName] = useState(user?.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photo || null);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync state when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setDateOfBirth(user.dateOfBirth || "");
      setPhoneNumber(user.phoneNumber || "");
      setAddress(user.address || "");
      setPhotoPreview(user.photo || null);
    }
  }, [user]);

  // Check for changes
  useEffect(() => {
    const changed =
      name !== (user?.name || "") ||
      dateOfBirth !== (user?.dateOfBirth || "") ||
      phoneNumber !== (user?.phoneNumber || "") ||
      address !== (user?.address || "") ||
      photo !== null;
    setHasChanges(changed);
  }, [name, dateOfBirth, phoneNumber, address, photo, user]);

  const showPhotoOptions = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Take Photo", "Choose from Gallery"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) takePhoto();
          else if (buttonIndex === 2) pickFromGallery();
        }
      );
    } else {
      Alert.alert(
        "Change Profile Photo",
        "Choose an option",
        [
          { text: "Take Photo", onPress: takePhoto },
          { text: "Choose from Gallery", onPress: pickFromGallery },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Camera permission is needed to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const newPhoto = {
        uri: asset.uri,
        name: asset.fileName || "profile_photo.jpg",
        type: asset.mimeType || "image/jpeg",
      };
      setPhoto(newPhoto);
      setPhotoPreview(asset.uri);
    }
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Gallery permission is needed to select photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const newPhoto = {
        uri: asset.uri,
        name: asset.fileName || "profile_photo.jpg",
        type: asset.mimeType || "image/jpeg",
      };
      setPhoto(newPhoto);
      setPhotoPreview(asset.uri);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear().toString();
      setDateOfBirth(year);
    }
  };

  const handleSave = async () => {
    if (!token) {
      Alert.alert("Error", "You must be logged in to update your profile.");
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(
        token,
        {
          name: name.trim(),
          dateOfBirth: dateOfBirth.trim(),
          phoneNumber: phoneNumber.trim(),
          address: address.trim(),
        },
        photo
      );

      await refreshUserProfile();
      setPhoto(null);
      Alert.alert("Success", "Your profile has been updated successfully!");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    return dateString;
  };

  const formatMemberSince = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateString;
    }
  };

  if (!user || !isStudent) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>This profile is only available for students.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#f4f6f8" }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header Card */}
        <Card style={styles.headerCard}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={showPhotoOptions} style={styles.avatarContainer}>
              {photoPreview ? (
                <Avatar.Image size={100} source={{ uri: photoPreview }} />
              ) : (
                <Avatar.Icon size={100} icon="account" style={styles.avatarIcon} />
              )}
              <View style={styles.cameraIconContainer}>
                <IconButton
                  icon="camera"
                  iconColor="#fff"
                  size={16}
                  style={styles.cameraIcon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Chip
                style={[styles.roleChip, { backgroundColor: "#1E3A8A" }]}
                textStyle={{ color: "#fff", fontSize: 12 }}
              >
                {user.role.toUpperCase()}
              </Chip>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
        </Card>

        {/* Editable Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Card style={styles.sectionCard}>
          <Card.Content>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                label="Date of Birth (Year)"
                value={dateOfBirth}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="calendar" />}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>

            <TextInput
              label="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
              left={<TextInput.Icon icon="phone" />}
            />

            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.input}
              left={<TextInput.Icon icon="map-marker" />}
            />
          </Card.Content>
        </Card>

        {/* Student Information (Read-Only) */}
        <Text style={styles.sectionTitle}>Student Information</Text>
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <IconButton icon="school" size={20} iconColor="#1E3A8A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>University</Text>
                <Text style={styles.infoValue}>{studentData?.universityName || "N/A"}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <IconButton icon="book-open-variant" size={20} iconColor="#1E3A8A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Major</Text>
                <Text style={styles.infoValue}>{studentData?.major || "N/A"}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <IconButton icon="calendar-clock" size={20} iconColor="#1E3A8A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Graduation Year</Text>
                <Text style={styles.infoValue}>{studentData?.gradateYear || "N/A"}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <IconButton icon="card-account-details" size={20} iconColor="#1E3A8A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Student Card ID</Text>
                <Text style={styles.infoValue}>{studentData?.studentCardId || "N/A"}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <IconButton icon="identifier" size={20} iconColor="#1E3A8A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Government ID</Text>
                <Text style={styles.infoValue}>{studentData?.studentGovId || "N/A"}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Account Information */}
        <Text style={styles.sectionTitle}>Account Information</Text>
        <Card style={styles.sectionCard}>
          <Card.Content>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <IconButton icon="email" size={20} iconColor="#1E3A8A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user.email}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <IconButton icon="clock-outline" size={20} iconColor="#1E3A8A" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Member Since</Text>
                <Text style={styles.infoValue}>{formatMemberSince(user.createdAt)}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Verification Document */}
        {studentData?.verificationFile && (
          <>
            <Text style={styles.sectionTitle}>Verification Document</Text>
            <Card style={styles.sectionCard}>
              <Card.Content>
                <Text style={styles.verificationLabel}>Student ID Verification</Text>
                <Image
                  source={{ uri: studentData.verificationFile }}
                  style={styles.verificationImage}
                  resizeMode="cover"
                />
              </Card.Content>
            </Card>
          </>
        )}

        {/* Save Button */}
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={!hasChanges || isSaving}
          loading={isSaving}
          style={[
            styles.saveButton,
            { backgroundColor: hasChanges ? "#1E3A8A" : "#ccc" },
          ]}
          labelStyle={styles.saveButtonLabel}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth ? new Date(parseInt(dateOfBirth), 0, 1) : new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1950, 0, 1)}
        />
      )}

      {/* Loading Overlay */}
      {authLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1E3A8A" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  headerCard: {
    borderRadius: 16,
    elevation: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    position: "relative",
  },
  avatarIcon: {
    backgroundColor: "#e0e0e0",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1E3A8A",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    margin: 0,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: 6,
  },
  roleChip: {
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#1E3A8A",
    marginBottom: 10,
    marginTop: 8,
  },
  sectionCard: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  infoIcon: {
    marginRight: 4,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#1a1a2e",
    fontWeight: "500",
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#eee",
  },
  verificationLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  verificationImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  saveButton: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  saveButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacer: {
    height: 30,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});
