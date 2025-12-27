import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CourseCard = ({ course }) => {
  const { college } = course;


  return (
    <View style={styles.card}>
      {/* 🔹 Header: Logo + Course Title */}
      <View style={styles.header}>
        {college?.media?.logo ? (
          <Image source={{ uri: college.media.logo }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder} />
        )}

        <View style={{ flex: 1 }}>
          {/* 🔹 Course Short Name */}
          <Text style={styles.courseName}>{course.name}</Text>

          {/* 🔹 College Name */}
          <Text style={styles.collegeName}>{college?.name}</Text>

          {/* 🔹 Full Degree Name */}
          {course.location && (
            <Text style={styles.degree}>
              {college.location?.city || "NA"}
              {college.location?.district && `, ${college.location.district}`}
            </Text>
          )}
        </View>
      </View>

      {/* 🔹 Specialization */}
      <Text style={styles.specialization}>
        Specialization: {course.specialization}
      </Text>

      {/* 🔹 Badges */}
      <View style={styles.row}>
        <Text style={styles.badge}>{course?.level}</Text>
        <Text style={styles.badge}>{course?.category}</Text>
        <Text style={styles.badge}>{course?.duration} Years</Text>
      </View>

      {/* 🔹 Fees & Intake */}
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>
          💰 ₹{course.fees?.min?.toLocaleString()} – ₹
          {course.fees?.max?.toLocaleString()}
        </Text>
        <Text style={styles.infoText}>👨‍🎓 {course.intake} Seats</Text>
      </View>

      {/* 🔹 Accreditation */}
      {college?.accreditation?.naac && (
        <Text style={styles.naac}>
          NAAC Accreditation: {college.accreditation.naac}
        </Text>
      )}

      {/* 🔹 Entrance Exams */}
      {/* {course.entranceExams?.length > 0 && (
        <Text style={styles.exams}>
          Entrance Exams: {course.entranceExams.join(", ")}
        </Text>
      )} */}

      {/* 🔹 Location */}
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#f8fafc",
  },

  logoPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#e5e7eb",
    marginRight: 12,
  },

  courseName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },

  collegeName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginTop: 2,
  },

  degree: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },

  specialization: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },

  badge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: "500",
    color: "#334155",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  infoText: {
    fontSize: 12,
    color: "#475569",
  },

  naac: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563eb",
    marginTop: 6,
  },

  exams: {
    fontSize: 12,
    color: "#475569",
    marginTop: 4,
  },

  location: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 6,
  },
});
