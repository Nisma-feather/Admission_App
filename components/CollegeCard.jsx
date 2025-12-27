// CollegeCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CollegeCard = ({ college, onPress }) => {
  // console.log("college",college)
  const formatPackage = (amount) => {
    if (amount >= 1000000) {
      return `₹${(amount / 1000000).toFixed(1)} LPA`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} LPA`;
    }
    return `₹${amount}`;
  };

  // Get first letter of college name for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get color based on college type for avatar background
  const getAvatarColor = (type) => {
    switch (type) {
      case "Government":
        return "#2563eb";
      case "Private":
        return "#7c3aed";
      case "Deemed":
        return "#059669";
      default:
        return "#64748b";
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Top Section with Logo and Basic Info */}
      <View style={styles.topSection}>
        {/* Logo/Avatar */}
        <View style={styles.logoContainer}>
          {college.media?.logo ? (
            <Image
              source={{ uri: college.media.logo }}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : (
            <View
              style={[
                styles.avatar,
                { backgroundColor: getAvatarColor(college.type) },
              ]}
            >
              <Text style={styles.avatarText}>{getInitials(college.name)}</Text>
            </View>
          )}
        </View>

        {/* College Info */}
        <View style={styles.collegeInfoContainer}>
          <View style={styles.collegeInfoHeader}>
            <View style={styles.collegeNameContainer}>
              <Text style={styles.collegeName} numberOfLines={2}>
                {college.name}
              </Text>
              {/* {college.accreditation.naac && (
                <View style={styles.accreditationBadge}>
                  <Text style={styles.accreditationText}>
                    {college.accreditation.naac}
                  </Text>
                </View>
              )} */}
            </View>

            {/* College Type Badge */}
            <View
              style={[
                styles.typeBadge,
                { backgroundColor: getAvatarColor(college.type) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.typeText,
                  { color: getAvatarColor(college.type) },
                ]}
              >
                {college.type || "default"}
              </Text>
            </View>
          </View>

          {/* Location and Established */}
          <View style={styles.basicDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={14} color="#64748b" />
              <Text style={styles.locationText}>
                {college.location.city}, {college.location.district}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={14} color="#64748b" />
              <Text style={styles.detailText}>
                Est. {college.establishedYear || "default"}
              </Text>
            </View>
            {college.accreditation.nba && (
              <View style={styles.nbaBadge}>
                <Text style={styles.nbaText}>NBA</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Placement Info */}
      <View style={styles.placementContainer}>
        <View style={styles.placementItem}>
          <Text style={styles.placementLabel}>NAAC</Text>
          <Text style={styles.placementValue}>
            {college.accreditation.naac || "NA"}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.placementItem}>
          <Text style={styles.placementLabel}>Placement %</Text>
          <Text style={styles.placementValue}>
            {college.placement.placementPercentage || "default"}%
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.placementItem}>
          <Text style={styles.placementLabel}>Highest</Text>
          <Text style={styles.placementValue}>
            {formatPackage(college.placement.highestPackage) || "default"}
          </Text>
        </View>
      </View>

      {/* Facilities */}
      <View style={styles.facilitiesContainer}>
        {college.facilities.hostel && (
          <View style={styles.facilityItem}>
            <Ionicons name="bed-outline" size={14} color="#2563eb" />
            <Text style={styles.facilityText}>Hostel</Text>
          </View>
        )}
        {college.facilities.placementCell && (
          <View style={styles.facilityItem}>
            <Ionicons name="briefcase-outline" size={14} color="#2563eb" />
            <Text style={styles.facilityText}>Placement</Text>
          </View>
        )}
        {college.facilities.wifi && (
          <View style={styles.facilityItem}>
            <Ionicons name="wifi-outline" size={14} color="#2563eb" />
            <Text style={styles.facilityText}>WiFi</Text>
          </View>
        )}
        {college.facilities.sports && (
          <View style={styles.facilityItem}>
            <Ionicons name="football-outline" size={14} color="#2563eb" />
            <Text style={styles.facilityText}>Sports</Text>
          </View>
        )}
        {college.facilities.transport && (
          <View style={styles.facilityItem}>
            <Ionicons name="bus-outline" size={14} color="#2563eb" />
            <Text style={styles.facilityText}>Transport</Text>
          </View>
        )}
      </View>

      {/* Entrance Exams */}
      { college?.admission?.entranceExams &&
        <View style={styles.examsContainer}>
          <Text style={styles.examsTitle}>Entrance Exams:</Text>
          <View style={styles.examsList}>
            {college.admission.entranceExams.slice(0, 3).map((exam, index) => (
              <View key={index} style={styles.examChip}>
                <Text style={styles.examText}>{exam}</Text>
              </View>
            ))}
            {college.admission.entranceExams.length > 3 && (
              <View style={styles.moreChip}>
                <Text style={styles.moreText}>
                  +{college.admission.entranceExams.length - 3}
                </Text>
              </View>
            )}
          </View>
        </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  topSection: {
    flexDirection: "row",
    marginBottom: 16,
  },
  logoContainer: {
    marginRight: 12,
    justifyContent: "flex-start",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f8fafc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  collegeInfoContainer: {
    flex: 1,
  },
  collegeInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  collegeNameContainer: {
    flex: 1,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  collegeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginRight: 8,
    lineHeight: 22,
  },
  accreditationBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  accreditationText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#166534",
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "600",
  },
  basicDetails: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  locationText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 4,
  },
  detailText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 4,
  },
  nbaBadge: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  nbaText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1e40af",
  },
  placementContainer: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  placementItem: {
    flex: 1,
    alignItems: "center",
  },
  placementLabel: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
  },
  placementValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
  separator: {
    width: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 8,
  },
  facilitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  facilityText: {
    fontSize: 12,
    color: "#2563eb",
    marginLeft: 4,
  },
  examsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  examsTitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#475569",
    marginRight: 8,
  },
  examsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  examChip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  examText: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "500",
  },
  moreChip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  moreText: {
    fontSize: 11,
    color: "#94a3b8",
  },
});

export default CollegeCard;
