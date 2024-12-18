import { Text, View, StyleSheet } from "react-native";
import PasswordStrengthMeter from "./components/passwordStrengthMeter";
import CarouselView from "./components/carousel";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View>
      <View style={styles.content}>
          <PasswordStrengthMeter/>
      </View>
      <View style = {styles.content}>
      <CarouselView items={items} visibleCount={3} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Footer</Text>
      </View>
    </View>
  );
}

const items = Array(4)
.fill(null)
.map((_, index) => ({
  color: `hsl(${(index * 40) % 360}, 70%, 50%)`, // Generate random colors
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 16,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  footerText: {
    fontSize: 16,
  },
});