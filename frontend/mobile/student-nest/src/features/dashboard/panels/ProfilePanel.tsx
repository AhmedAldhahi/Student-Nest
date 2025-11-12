import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

type Profile = {
  name: string;
  email: string;
  bod: string;
  phone: string;
  major?: string;
  graduationYear?: string;
  universityName?: string;
  studentCardId?: string;
  studentGovId?: string;
  cliqAccount?: string;
  landlordGovId?: string;
};

type Props = {
  role: "student" | "landlord" | "admin";
  userId: string;
};

export default function ProfilePanel({ role, userId }: Props) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function loadProfile() {
      // Replace with real API call
      const res = await fetch(`/api/profile/${userId}`);
      const data: Profile = await res.json();
      setProfile(data);
      setPhone(data.phone);
    }
    loadProfile();
  }, [userId]);

  const handleSave = () => {
    const payload: any = {};
    if (phone !== profile?.phone) payload.phone = phone;
    if (password && password === confirmPassword) payload.password = password;

    if (Object.keys(payload).length > 0) {
      console.log("PATCH API payload:", payload);
      // await fetch(`/api/profile/${userId}`, { method: "PATCH", body: JSON.stringify(payload) });
    }
  };

  if (!profile) return <Text>Loading profile...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://via.placeholder.com/120" }} style={styles.avatar} />

      <TextInput label="Name" value={profile.name} disabled style={styles.input} />
      <TextInput label="Email" value={profile.email} disabled style={styles.input} />
      <TextInput label="Birth Date" value={profile.bod} disabled style={styles.input} />

      <TextInput label="Phone Number" value={phone} onChangeText={setPhone} style={styles.input} />

      {role === "student" && (
        <>
          <TextInput label="Major" value={profile.major || ""} disabled style={styles.input} />
          <TextInput label="Graduation Year" value={profile.graduationYear || ""} disabled style={styles.input} />
          <TextInput label="University" value={profile.universityName || ""} disabled style={styles.input} />
          <TextInput label="Student Card ID" value={profile.studentCardId || ""} disabled style={styles.input} />
          <TextInput label="Student Gov ID" value={profile.studentGovId || ""} disabled style={styles.input} />
        </>
      )}

      {role === "landlord" && (
        <>
          <TextInput label="Cliq Account" value={profile.cliqAccount || ""} disabled style={styles.input} />
          <TextInput label="Landlord Gov ID" value={profile.landlordGovId || ""} disabled style={styles.input} />
        </>
      )}

      {/* Admin → only basic fields */}

      <TextInput
        label="New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSave} style={styles.btn}>
        Save Changes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  avatar: { width: 120, height: 120, borderRadius: 60, alignSelf: "center", marginBottom: 20 },
  input: { marginVertical: 6 },
  btn: { marginTop: 16 },
});
