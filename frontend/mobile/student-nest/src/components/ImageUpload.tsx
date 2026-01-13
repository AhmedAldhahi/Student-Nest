import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

interface ImageUploadProps {
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
    title?: string;
    description?: string;
}

export default function ImageUpload({
    images,
    onImagesChange,
    maxImages = 6,
    title = "Upload Photos",
    description
}: ImageUploadProps) {

    const pickImages = async () => {
        if (images.length >= maxImages) {
            Alert.alert("Limit Reached", `You can only upload up to ${maxImages} photo${maxImages > 1 ? 's' : ''}.`);
            return;
        }

        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission Required", "Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: maxImages > 1,
            selectionLimit: maxImages - images.length,
            quality: 0.7,
        });

        if (!result.canceled) {
            const resizedImages = await Promise.all(
                result.assets.map(async (asset) => {
                    try {
                        const manipResult = await manipulateAsync(
                            asset.uri,
                            [{ resize: { width: 1024 } }],
                            { compress: 0.7, format: SaveFormat.JPEG }
                        );
                        return manipResult.uri;
                    } catch (error) {
                        console.error("Image resizing failed:", error);
                        return asset.uri;
                    }
                })
            );

            // If maxImages is 1, replace the existing image
            if (maxImages === 1) {
                onImagesChange(resizedImages.slice(0, 1));
            } else {
                const newImages = [...images, ...resizedImages].slice(0, maxImages);
                onImagesChange(newImages);
            }
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onImagesChange(newImages);
    };

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}

            <TouchableOpacity onPress={pickImages} style={styles.uploadButton}>
                <Ionicons name="cloud-upload-outline" size={40} color="#1E3A8A" />
                <Text style={styles.uploadText}>
                    {images.length > 0
                        ? (maxImages === 1 ? "Change Photo" : `Selected ${images.length} / ${maxImages} pictures`)
                        : (description || `Tap to upload photos (Max ${maxImages})`)}
                </Text>
            </TouchableOpacity>

            {images.length > 0 && (
                <ScrollView horizontal style={styles.previewContainer} showsHorizontalScrollIndicator={false}>
                    {images.map((uri, index) => (
                        <View key={index} style={styles.previewWrapper}>
                            <Image source={{ uri }} style={styles.previewImage} />
                            <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(index)}>
                                <Ionicons name="close" size={12} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: "#1E3A8A",
        borderStyle: "dashed",
        borderRadius: 16,
        padding: 30,
        alignItems: "center",
        backgroundColor: "#eef2ff",
    },
    uploadText: { color: "#1E3A8A", fontWeight: "600", marginTop: 8 },
    previewContainer: { marginTop: 12, paddingLeft: 4 },
    previewWrapper: { position: 'relative', marginRight: 10 },
    previewImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    removeBtn: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#fff'
    },
});
