import { StyleSheet, TouchableOpacity, Text } from "react-native";

const FilterCapsule = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterCaps, active ? styles.active : styles.inactive]}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.text, active ? styles.activeText : styles.inactiveText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterCaps: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  active: {
    backgroundColor: "#3b82f6",
    borderColor: "#2563eb",
  },
  inactive: {
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#ffffff",
  },
  inactiveText: {
    color: "#374151",
  },
});

export default FilterCapsule;
