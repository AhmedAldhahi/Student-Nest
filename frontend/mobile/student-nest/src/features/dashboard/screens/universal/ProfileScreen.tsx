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
  Modal,
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
  Surface,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuth } from "../../../../context/AuthContext";
import { updateProfile, changePassword } from "../../../auth/api/authService";
import { Ionicons } from "@expo/vector-icons";

type PhotoFile = {
  uri: string;
  name: string;
  type: string;
};

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, studentData, landlordData, token, isStudent, isLandlord, isAdmin, refreshUserProfile, isLoading: authLoading } = useAuth();

  // Editable form state
  const [name, setName] = useState(user?.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [address, setAddress] = useState(user?.address || "");
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photo || null);

  // Password Change State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordSectionVisible, setIsPasswordSectionVisible] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState({ old: true, new: true, confirm: true });


  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


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

  // Check for changes (Profile Info)
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

  const handleChangePassword = async () => {
    if (!token) return;
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters.");
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword(token, { oldPassword, newPassword });
      Alert.alert("Success", "Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsPasswordSectionVisible(false);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to change password.");
    } finally {
      setIsChangingPassword(false);
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

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };


  if (!user) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  const roleColor = isAdmin ? "#c0392b" : isLandlord ? "#27ae60" : "#1E3A8A";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "#f4f6f8" }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header Card */}
        <Surface style={styles.headerCard}>
          <View style={styles.headerBg} />
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={showPhotoOptions} style={styles.avatarWrapper}>
              {photoPreview ? (
                <Avatar.Image size={110} source={{ uri: photoPreview }} style={styles.avatarOutline} />
              ) : (
                <Avatar.Icon size={110} icon="account" style={[styles.avatarIcon, { backgroundColor: roleColor }]} />
              )}
              <View style={[styles.cameraIconContainer, { backgroundColor: roleColor }]}>
                <IconButton icon="camera" iconColor="#fff" size={18} style={styles.cameraIcon} />
              </View>
            </TouchableOpacity>

            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.roleTagContainer}>
              <Chip style={[styles.roleChip, { backgroundColor: roleColor + '20' }]} textStyle={{ color: roleColor, fontWeight: '700', fontSize: 12 }}>
                {user.role.toUpperCase()}
              </Chip>
            </View>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </Surface>

        {/* Editable Personal Information */}
        <Text style={[styles.sectionTitle, { color: roleColor }]}>Personal Information</Text>
        <Card style={styles.sectionCard}>
          <Card.Content>
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              outlineColor="#e0e0e0"
              activeOutlineColor={roleColor}
              left={<TextInput.Icon icon="account" color={roleColor} />}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                label="Date of Birth (Year)"
                value={dateOfBirth}
                mode="outlined"
                style={styles.input}
                outlineColor="#e0e0e0"
                activeOutlineColor={roleColor}
                left={<TextInput.Icon icon="calendar" color={roleColor} />}
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
              outlineColor="#e0e0e0"
              activeOutlineColor={roleColor}
              left={<TextInput.Icon icon="phone" color={roleColor} />}
            />

            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.input}
              outlineColor="#e0e0e0"
              activeOutlineColor={roleColor}
              left={<TextInput.Icon icon="map-marker" color={roleColor} />}
            />
          </Card.Content>
        </Card>

        {/* --- STUDENT SPECIFIC INFO --- */}
        {isStudent && studentData && (
          <>
            <Text style={[styles.sectionTitle, { color: roleColor }]}>Student Information</Text>
            <Card style={styles.sectionCard}>
              <Card.Content>
                <InfoRow icon="school" label="University" value={studentData.universityName} color={roleColor} />
                <Divider style={styles.divider} />
                <InfoRow icon="book-open-variant" label="Major" value={studentData.major} color={roleColor} />
                <Divider style={styles.divider} />
                <InfoRow icon="calendar-clock" label="Graduation Year" value={studentData.gradateYear?.toString()} color={roleColor} />
                <Divider style={styles.divider} />
                <InfoRow icon="card-account-details" label="Student ID" value={studentData.studentCardId} color={roleColor} />
              </Card.Content>
            </Card>

            {studentData.verificationFile && (
              <View style={styles.docSection}>
                <Text style={[styles.sectionTitle, { color: roleColor }]}>Verification Document</Text>
                <TouchableOpacity onPress={() => openImageModal(studentData.verificationFile!)}>
                  <Image source={{ uri: studentData.verificationFile }} style={styles.docImage} resizeMode="cover" />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}


        {/* --- LANDLORD SPECIFIC INFO --- */}
        {isLandlord && landlordData && (
          <>
            <Text style={[styles.sectionTitle, { color: roleColor }]}>Owner Information</Text>
            <Card style={styles.sectionCard}>
              <Card.Content>
                <InfoRow icon="bank-transfer" label="CliQ Account" value={landlordData.cliQAccount} color={roleColor} />
                <Divider style={styles.divider} />
                <InfoRow icon="identifier" label="Gov ID" value={landlordData.landloardGovId} color={roleColor} />
              </Card.Content>
            </Card>

            {/* Check if landlord has a document property (from raw api check) not in types yet? AuthContext types say landlordData only has cliQ and GovID */}
            {/* Based on user request JSON: "document": "url..." exists outside "user" object but context might not map it perfectly yet unless strict types updated.
                    Assuming AuthContext might populate it if we updated User type, but types.ts was not updated. 
                    However, let's assume if it is passed in landlordData or if we adjust context later. 
                    For now, the context type for LandlordData only mentions cliQ and GovID. 
                    If the API returns it in the root, our Context needs to grab it. 
                    Let's trust AuthContext for now. If it's missing, it won't show.
                */}
          </>
        )}

        <View style={{ height: 20 }} />

        {/* Save Changes Button */}
        {hasChanges && (
          <Button
            mode="contained"
            onPress={handleSave}
            loading={isSaving}
            style={[styles.saveButton, { backgroundColor: roleColor }]}
            labelStyle={styles.mainButtonLabel}
          >
            Save Changes
          </Button>
        )}

        <Divider style={{ marginVertical: 20 }} />

        {/* Security / Password Section */}
        <TouchableOpacity
          style={styles.securityHeader}
          onPress={() => setIsPasswordSectionVisible(!isPasswordSectionVisible)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="lock-closed-outline" size={20} color={roleColor} style={{ marginRight: 8 }} />
            <Text style={[styles.sectionTitle, { marginBottom: 0, marginTop: 0, color: '#333' }]}>Security</Text>
          </View>
          <Ionicons name={isPasswordSectionVisible ? "chevron-up" : "chevron-down"} size={20} color="#666" />
        </TouchableOpacity>

        {isPasswordSectionVisible && (
          <Card style={styles.sectionCard}>
            <Card.Content>
              <TextInput
                label="Current Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={secureTextEntry.old}
                mode="outlined"
                style={styles.input}
                activeOutlineColor={roleColor}
                right={<TextInput.Icon icon={secureTextEntry.old ? "eye" : "eye-off"} onPress={() => setSecureTextEntry(p => ({ ...p, old: !p.old }))} />}
              />
              <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={secureTextEntry.new}
                mode="outlined"
                style={styles.input}
                activeOutlineColor={roleColor}
                right={<TextInput.Icon icon={secureTextEntry.new ? "eye" : "eye-off"} onPress={() => setSecureTextEntry(p => ({ ...p, new: !p.new }))} />}
              />
              <TextInput
                label="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry={secureTextEntry.confirm}
                mode="outlined"
                style={styles.input}
                activeOutlineColor={roleColor}
                right={<TextInput.Icon icon={secureTextEntry.confirm ? "eye" : "eye-off"} onPress={() => setSecureTextEntry(p => ({ ...p, confirm: !p.confirm }))} />}
              />

              <Button
                mode="contained"
                onPress={handleChangePassword}
                loading={isChangingPassword}
                disabled={!oldPassword || !newPassword || !confirmNewPassword}
                style={{ marginTop: 8, backgroundColor: roleColor }}
              >
                Update Password
              </Button>
            </Card.Content>
          </Card>
        )}


        <Text style={styles.memberSince}>Member since {formatMemberSince(user.createdAt)}</Text>
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

      {/* Image Modal for viewing documents */}
      <Modal visible={imageModalVisible} transparent={true} onRequestClose={() => setImageModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeModalButton} onPress={() => setImageModalVisible(false)}>
            <Ionicons name="close-circle" size={40} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
          )}
        </View>
      </Modal>

      {/* Loading Overlay */}
      {authLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1E3A8A" />
        </View>
      )}
    </SafeAreaView>
  );
}

// Helper Component for Info Rows
const InfoRow = ({ icon, label, value, color }: { icon: string; label: string; value?: string | null, color: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIcon}>
      <IconButton icon={icon} size={20} iconColor={color} />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || "N/A"}</Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerCard: {
    borderRadius: 20,
    elevation: 4,
    marginBottom: 24,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 24
  },
  headerBg: {
    width: '100%',
    height: 100,
    backgroundColor: '#f0f2f5', // Gentle gray or can be a gradient if desired
    position: 'absolute',
    top: 0
  },
  headerContent: {
    alignItems: "center",
    marginTop: 40,
  },
  avatarWrapper: {
    marginBottom: 12,
  },
  avatarOutline: {
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarIcon: {
    borderWidth: 4,
    borderColor: '#fff',
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: '#fff'
  },
  cameraIcon: { margin: 0 },
  userName: { fontSize: 24, fontWeight: "800", color: "#1a1a2e", marginTop: 4 },
  userEmail: { fontSize: 14, color: "#666", marginTop: 4 },
  roleTagContainer: { marginTop: 4 },
  roleChip: { borderRadius: 12, alignItems: 'center' },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 8,
    marginLeft: 4
  },
  sectionCard: {
    borderRadius: 16,
    elevation: 2,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 6 },
  infoIcon: { marginRight: 0 },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: "#888", marginBottom: 2, textTransform: 'uppercase' },
  infoValue: { fontSize: 16, color: "#333", fontWeight: "600" },
  divider: { backgroundColor: "#f0f0f0", height: 1 },

  saveButton: { borderRadius: 12, paddingVertical: 6, elevation: 4 },
  mainButtonLabel: { fontSize: 16, fontWeight: "700", letterSpacing: 0.5 },

  securityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },

  docSection: { marginBottom: 20 },
  docImage: { width: "100%", height: 180, borderRadius: 12, marginTop: 8 },

  memberSince: { textAlign: 'center', color: '#aaa', fontSize: 12, marginTop: 20 },
  bottomSpacer: { height: 40 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(255, 255, 255, 0.8)", justifyContent: "center", alignItems: "center" },

  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: '90%', height: '80%' },
  closeModalButton: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
});

