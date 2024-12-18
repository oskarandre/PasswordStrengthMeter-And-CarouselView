import { Text, View, StyleSheet, ScrollView } from "react-native";
import PasswordStrengthMeter from "./components/passwordStrengthMeter";
import CarouselView from "./components/carousel";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>
      <View style={styles.passwordContainer}>
        <PasswordStrengthMeter />
      </View>
      <View style={styles.content}>
        <CarouselView items={items} visibleCount={3} visualStyle="flat"/>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </ScrollView>
  );
}

const items = Array(5)
  .fill(null)
  .map((_, index) => ({
    color: `hsl(${(index * 40) % 360}, 70%, 50%)`, // Generate random colors
  }));

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  passwordContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    zIndex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  footerText: {
    fontSize: 16,
  },
});