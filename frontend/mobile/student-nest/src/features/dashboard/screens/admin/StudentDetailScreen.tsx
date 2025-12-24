import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, ScrollView, Alert, Image, Dimensions } from "react-native";
import { Text, Card, Button, Chip, Avatar, Divider, Portal, Modal, IconButton } from "react-native-paper";
import { RootStackParamList } from "../../../../navigation/types";
import { Student } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "StudentDetailScreen">;

export default function StudentDetailScreen({ route }: Props) {
    const { student } = route.params;
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const openDocument = () => {
        if (student.studentValidateDocument) {
            showModal();
        } else {
            Alert.alert("No Document", "No validation document available.");
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Card style={styles.profileCard}>
                    <Card.Content>
                        <View style={styles.avatarContainer}>
                            {student.user.photo ? (
                                <Avatar.Image size={100} source={{ uri: student.user.photo }} />
                            ) : (
                                <Avatar.Icon size={100} icon="account" />
                            )}
                        </View>
                        <Text style={styles.header}>{student.user.name}</Text>
                        <Text style={styles.subHeader}>Student ID: {student.studentCardID}</Text>

                        <Divider style={styles.divider} />

                        <Text style={styles.detailTitle}>Contact Info</Text>
                        <Text style={styles.detail}>Email: {student.user.email}</Text>
                        <Text style={styles.detail}>Phone: {student.user.phoneNumber}</Text>
                        <Text style={styles.detail}>Address: {student.user.address}</Text>

                        <Divider style={styles.divider} />

                        <Text style={styles.detailTitle}>Academic Info</Text>
                        <Text style={styles.detail}>University: {student.universityName}</Text>
                        <Text style={styles.detail}>Major: {student.Major}</Text>
                        <Text style={styles.detail}>Graduation Year: {student.GraduationYear}</Text>
                        <Text style={styles.detail}>Gov ID: {student.userGovId}</Text>
                        <Text style={styles.detail}>Joined: {new Date(student.user.createdAt).toLocaleDateString()}</Text>

                        <View style={styles.chipRow}>
                            <Chip icon={student.user.emailVerfied ? "check" : "alert"}
                                textStyle={{ color: student.user.emailVerfied ? "#155724" : "#856404" }}
                                style={[styles.chip, student.user.emailVerfied ? styles.verified : styles.unverified]}
                            >
                                {student.user.emailVerfied ? "Email Verified" : "Email Unverified"}
                            </Chip>
                        </View>
                    </Card.Content>
                </Card>

                <Button
                    mode="outlined"
                    icon="file-document"
                    style={styles.docBtn}
                    labelStyle={styles.btnLabel}
                    onPress={openDocument}
                >
                    View Validation Document
                </Button>
            </ScrollView>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {student.studentValidateDocument ? (
                            <Image
                                source={{ uri: student.studentValidateDocument }}
                                style={styles.docImage}
                                resizeMode="contain"
                            />
                        ) : (
                            <Text>No document found.</Text>
                        )}

                        <IconButton
                            icon="close"
                            size={24}
                            onPress={hideModal}
                            style={styles.closeBtn}
                        />
                    </View>
                </Modal>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { padding: 16, backgroundColor: "#f9f9f9" },
    profileCard: {
        marginBottom: 20,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: "#fff",
        paddingVertical: 16,
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 12,
    },
    header: { fontSize: 24, fontWeight: "700", marginTop: 12, color: "#1E3A8A", textAlign: "center" },
    subHeader: { fontSize: 14, color: "#777", marginBottom: 12, textAlign: "center" },
    detailTitle: { fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8, color: "#333" },
    detail: { fontSize: 14, color: "#555", marginBottom: 4 },
    divider: { marginVertical: 12 },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, gap: 8 },
    chip: {},
    verified: { backgroundColor: "#d4edda" },
    unverified: { backgroundColor: "#fff3cd" },
    docBtn: {
        borderRadius: 10,
        borderColor: "#1E3A8A",
        width: "100%",
        backgroundColor: '#fff'
    },
    btnLabel: { fontSize: 16, fontWeight: "600", color: "#1E3A8A" },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '100%',
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeBtn: {
        position: 'absolute',
        top: -10,
        right: -10,
        zIndex: 10,
        elevation: 5,
        backgroundColor: '#eee'
    },
    docImage: {
        width: '100%',
        height: '100%',
    }
});
