import React from "react";
import { SafeAreaView, ScrollView, Text, Image, View, Pressable, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles"; // <<--- Importando estilos

const avatarUrl = "https://i.pravatar.cc/300?img=12";

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>João Maria</Text>
          <Text style={styles.role}>Mobile Engineer • React Native</Text>

          <Pressable style={styles.cta}>
            <Ionicons name="paper-plane-outline" size={18} style={{ marginRight: 6 }} />
            <Text style={styles.ctaText}>Fale comigo</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}