import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  hero: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#ff0000ff",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ff0000ff",
  },
  role: {
    fontSize: 14,
    color: "#2563eb",
    marginTop: 4,
    fontWeight: "600",
  },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
