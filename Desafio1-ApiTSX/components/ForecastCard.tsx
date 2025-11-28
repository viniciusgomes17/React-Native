// components/ForecastCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { weatherIcon } from "../utils/weatherIcons";

type ForecastItem = {
  date: string;
  min: number;
  max: number;
  code: number;
};

type Theme = {
  card: string;
  text: string;
  subtext: string;
};

type Props = {
  data: ForecastItem;
  theme?: Theme | any; // aceita qualquer estrutura caso você não esteja usando o theme estrito
};

export default function ForecastCard({ data, theme }: Props) {
  // fallback simples caso theme não venha
  const t: Theme = theme ?? {
    card: "#fff",
    text: "#111",
    subtext: "#666",
  };

  return (
    <View style={[styles.card, { backgroundColor: t.card }]}>
      <Text style={[styles.date, { color: t.text }]}>{data.date}</Text>

      <Text style={styles.icon}>{weatherIcon(data.code)}</Text>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={[styles.temp, { color: t.text }]}>Máx: {data.max}°C</Text>
        <Text style={[styles.temp, { color: t.subtext }]}>Min: {data.min}°C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: { fontSize: 16, fontWeight: "600" },
  icon: { fontSize: 32 },
  temp: { fontSize: 16 },
});
