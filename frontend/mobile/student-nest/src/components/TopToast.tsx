import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, Animated, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TopToastProps {
    message: string;
    visible: boolean;
    onHide?: () => void;
}

export const TopToast: React.FC<TopToastProps> = ({ message, visible, onHide }) => {
    const insets = useSafeAreaInsets();
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-50)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Auto hide after 3 seconds
                setTimeout(() => {
                    hide();
                }, 3000);
            });
        } else {
            hide();
        }
    }, [visible]);

    const hide = () => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -50,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onHide?.();
        });
    };

    if (!visible) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    opacity,
                    transform: [{ translateY }],
                    top: insets.top + (Platform.OS === 'android' ? 10 : 0),
                },
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 20,
        right: 20,
        backgroundColor: "#323232",
        padding: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 10000,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});
