import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import * as Location from "expo-location";

import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";

import { lightTheme, darkTheme } from "./theme";

export default function App() {
  const systemTheme = useColorScheme(); // tema do sistema
  const [isDark, setIsDark] = useState(systemTheme === "dark");

  const theme = isDark ? darkTheme : lightTheme;

  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cityInfo, setCityInfo] = useState<any>(null);

  useEffect(() => {
    loadLocationWeather();
  }, []);

  const loadLocationWeather = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permissão de localização negada.");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      fetchAllWeather(loc.coords.latitude, loc.coords.longitude);
    } catch {
      setError("Erro ao pegar localização.");
      setLoading(false);
    }
  };

  const fetchAllWeather = async (lat: number, lon: number) => {
    try {
      setError(null);

      const req = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const data = await req.json();

      setWeather(data.current_weather);
      setForecast(
        data.daily.time.map((date: string, index: number) => ({
          date,
          min: data.daily.temperature_2m_min[index],
          max: data.daily.temperature_2m_max[index],
          code: data.daily.weathercode[index],
        }))
      );

      setCityInfo({ name: "Sua localização" });
      setLoading(false);
    } catch {
      setError("Erro ao carregar clima.");
      setLoading(false);
    }
  };

  const fetchCityWeather = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=pt&format=json`
      );
      const geoData = await geo.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Cidade não encontrada.");
      }

      const loc = geoData.results[0];
      setCityInfo(loc);

      fetchAllWeather(loc.latitude, loc.longitude);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
  
      {/* Título + botão tema */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>🌦️ Weather Plus</Text>

        <TouchableOpacity
          style={[styles.themeBtn, { backgroundColor: theme.card }]}
          onPress={() => setIsDark(!isDark)}
        >
          <Text style={{ fontSize: 22 }}>
            {isDark ? "☀️" : "🌙"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* BUSCA */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: theme.input, color: theme.text, borderColor: theme.border },
          ]}
          placeholder="Buscar cidade..."
          placeholderTextColor={theme.subtext}
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.button }]}
          onPress={fetchCityWeather}
        >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.text} />
          <Text style={{ color: theme.text }}>Carregando clima...</Text>
        </View>
      )}

      {!loading && weather && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.location, { color: theme.text }]}>
            📍 {cityInfo.name} {cityInfo.country ? `- ${cityInfo.country}` : ""}
          </Text>

          <WeatherCard weather={weather} theme={theme} />

          <Text style={[styles.subtitle, { color: theme.text }]}>
            Previsão para 7 dias
          </Text>

          {forecast.map((item, i) => (
            <ForecastCard key={i} data={item} theme={theme} />
          ))}
        </ScrollView>
      )}

      {error && <Text style={[styles.error, { color: "red" }]}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 16,
  },
  title: { fontSize: 28, fontWeight: "700" },
  themeBtn: {
    position: "absolute",
    right: 0,
    padding: 10,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  btn: {
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 12,
  },
  btnText: { color: "white", fontWeight: "600" },
  center: { alignItems: "center", marginTop: 30 },
  location: { textAlign: "center", fontSize: 20, marginBottom: 10 },
  subtitle: {
    marginTop: 20,
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "600",
  },
  error: { marginTop: 20, textAlign: "center", fontSize: 16 },
});
