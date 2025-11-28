// components/WeatherCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { weatherIcon } from "../utils/weatherIcons";

type Weather = {
  temperature: number;
  windspeed: number;
  winddirection?: number;
  weathercode: number;
  is_day?: number;
  time?: string;
};

type Theme = {
  card: string;
  text: string;
  subtext: string;
};

type Props = {
  weather: Weather | null | undefined;
  theme?: Theme | any;
};

export default function WeatherCard({ weather, theme }: Props) {
  // fallback caso weather não exista ainda
  if (!weather) {
    const t = theme ?? { card: "#fff", text: "#111", subtext: "#666" };
    return (
      <View style={[styles.card, { backgroundColor: t.card }]}>
        <Text style={[styles.temp, { color: t.text }]}>Sem dados</Text>
      </View>
    );
  }

  const t: Theme = theme ?? {
    card: "#fff",
    text: "#111",
    subtext: "#666",
  };

  return (
    <View style={[styles.card, { backgroundColor: t.card }]}>
      <Text style={styles.icon}>{weatherIcon(weather.weathercode)}</Text>

      <View style={styles.center}>
        <Text style={[styles.temp, { color: t.text }]}>
          {weather.temperature}°C
        </Text>

        <Text style={[styles.label, { color: t.subtext }]}>
          Vento: {weather.windspeed} km/h
        </Text>

        <Text style={[styles.label, { color: t.subtext }]}>
          Período: {weather.is_day ? "Dia ☀️" : "Noite 🌙"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { fontSize: 60, textAlign: "center", marginRight: 12 },
  center: { flex: 1, alignItems: "center" },
  temp: { textAlign: "center", fontSize: 40, fontWeight: "700" },
  label: { textAlign: "center", fontSize: 16, marginTop: 5 },
});
