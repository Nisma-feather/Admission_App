import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  ActivityIndicator,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  Feather,
  Ionicons,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy course data matching your schema
const dummyCourse = {
  _id: "65def12345",
  college: "65abc12345",
  name: "B.Tech IT",
  degree: "Bachelor of Technology",
  level: "UG",
  category: "Engineering",
  specialization: "Information Technology",
  duration: 4,
  fees: {
    min: 120000,
    max: 180000,
    currency: "INR",
  },
  intake: 120,
  eligibility:
    "10+2 with Physics, Chemistry, Mathematics and minimum 50% marks",
  entranceExams: ["TNEA", "JEE Main", "COMEDK"],
  isActive: true,

  // Additional data for UI (you might need to fetch these separately)
  collegeInfo: {
    name: "Sri Krishna Engineering College",
    logo: "https://via.placeholder.com/80",
    location: "Coimbatore, Tamil Nadu",
  },

  courseDetails: {
    description:
      "B.Tech in Information Technology is a 4-year undergraduate program focusing on software development, networking, database management, and emerging technologies.",
    highlights: [
      "Industry-aligned curriculum",
      "Hands-on lab sessions",
      "Industry projects and internships",
      "Placement assistance",
      "Coding competitions and hackathons",
    ],
    syllabus: [
      "Semester 1-2: Foundation courses in Mathematics, Physics, and Programming",
      "Semester 3-4: Core IT subjects - Data Structures, Algorithms, Database Systems",
      "Semester 5-6: Advanced topics - Web Technologies, Network Security, Cloud Computing",
      "Semester 7-8: Specialization electives and Major Project",
    ],
    careerOpportunities: [
      "Software Developer",
      "System Analyst",
      "Network Administrator",
      "Database Administrator",
      "IT Consultant",
      "Web Developer",
    ],
  },
};

const TabButton = ({ label, icon, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tabButton, active && styles.activeTabButton]}
    onPress={onPress}
  >
    <MaterialIcons
      name={icon}
      size={18}
      color={active ? "#4f46e5" : "#94a3b8"}
    />
    <Text style={[styles.tabLabel, active && styles.activeTabLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Function to fetch course data (replace with actual API call)
const fetchCourseById = async (courseId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In production, replace with:
  // const response = await fetch(`https://api.example.com/courses/${courseId}`);
  // return await response.json();

  // For now, return dummy data if ID matches, otherwise return null
  return courseId === dummyCourse._id ? dummyCourse : null;
};

const CourseDetailsScreen = ({ route, navigation }) => {
  const { courseId = "65def12345" } = route?.params || {};
  const [activeTab, setActiveTab] = useState("overview");
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "details", label: "Details", icon: "info" },
    { id: "eligibility", label: "Eligibility", icon: "school" },
    { id: "syllabus", label: "Syllabus", icon: "menu-book" },
    { id: "career", label: "Career", icon: "work" },
  ];

  useEffect(() => {
    loadCourseData();
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      const courseData = await fetchCourseById(courseId);

      if (courseData) {
        setCourse(courseData);
      } else {
        setError("Course not found");
      }
    } catch (err) {
      setError("Failed to load course details");
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBackToCollege = () => {
    if (course?.college) {
      navigation.navigate("CollegeDetails", { collegeId: course.college });
    }
  };

  const handleApplyNow = () => {
    // Navigate to application page or open application form
    Linking.openURL(`https://example.com/apply/${courseId}`);
  };

  const renderTabContent = () => {
    if (!course) return null;

    switch (activeTab) {
      case "overview":
        return (
          <>
            {/* COURSE HIGHLIGHTS */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="star" size={20} color="#4f46e5" />
                <Text style={styles.sectionTitle}>Course Highlights</Text>
              </View>
              <View style={styles.highlightsCard}>
                {course.courseDetails?.highlights?.map((highlight, index) => (
                  <View key={index} style={styles.highlightItem}>
                    <View style={styles.highlightBullet}>
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#10b981"
                      />
                    </View>
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* QUICK FACTS */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="file-text" size={20} color="#4f46e5" />
                <Text style={styles.sectionTitle}>Quick Facts</Text>
              </View>
              <View style={styles.factsGrid}>
                <View style={styles.factItem}>
                  <View style={styles.factIcon}>
                    <MaterialIcons name="schedule" size={24} color="#4f46e5" />
                  </View>
                  <Text style={styles.factValue}>{course.duration} Years</Text>
                  <Text style={styles.factLabel}>Duration</Text>
                </View>
                <View style={styles.factItem}>
                  <View style={styles.factIcon}>
                    <MaterialIcons name="people" size={24} color="#4f46e5" />
                  </View>
                  <Text style={styles.factValue}>{course.intake} Seats</Text>
                  <Text style={styles.factLabel}>Intake</Text>
                </View>
                <View style={styles.factItem}>
                  <View style={styles.factIcon}>
                    <MaterialIcons
                      name="attach-money"
                      size={24}
                      color="#4f46e5"
                    />
                  </View>
                  <Text style={styles.factValue}>
                    {formatCurrency(course.fees?.min)}
                  </Text>
                  <Text style={styles.factLabel}>Fees (Annual)</Text>
                </View>
                <View style={styles.factItem}>
                  <View style={styles.factIcon}>
                    <MaterialIcons name="category" size={24} color="#4f46e5" />
                  </View>
                  <Text style={styles.factValue}>{course.level}</Text>
                  <Text style={styles.factLabel}>Level</Text>
                </View>
              </View>
            </View>
          </>
        );

      case "details":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="details" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Course Details</Text>
            </View>
            <View style={styles.detailsCard}>
              <Text style={styles.description}>
                {course.courseDetails?.description}
              </Text>

              <View style={styles.detailsList}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Degree Name:</Text>
                  <Text style={styles.detailValue}>{course.degree}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Course Name:</Text>
                  <Text style={styles.detailValue}>{course.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Specialization:</Text>
                  <Text style={styles.detailValue}>
                    {course.specialization}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Category:</Text>
                  <Text style={styles.detailValue}>{course.category}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration:</Text>
                  <Text style={styles.detailValue}>
                    {course.duration} Years
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Annual Fees:</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(course.fees?.min)} -{" "}
                    {formatCurrency(course.fees?.max)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total Intake:</Text>
                  <Text style={styles.detailValue}>
                    {course.intake} Students
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      case "eligibility":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="verified" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
            </View>
            <View style={styles.eligibilityCard}>
              <View style={styles.eligibilitySection}>
                <Text style={styles.eligibilityTitle}>
                  Academic Requirements
                </Text>
                <Text style={styles.eligibilityText}>{course.eligibility}</Text>
              </View>

              <View style={styles.eligibilitySection}>
                <Text style={styles.eligibilityTitle}>
                  Entrance Exams Accepted
                </Text>
                <View style={styles.examsContainer}>
                  {course.entranceExams?.map((exam, index) => (
                    <View key={index} style={styles.examBadge}>
                      <MaterialIcons
                        name="assignment"
                        size={16}
                        color="#4f46e5"
                      />
                      <Text style={styles.examText}>{exam}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.eligibilitySection}>
                <Text style={styles.eligibilityTitle}>
                  Additional Requirements
                </Text>
                <View style={styles.requirementsList}>
                  <View style={styles.requirementItem}>
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#10b981"
                    />
                    <Text style={styles.requirementText}>
                      Minimum age: 17 years
                    </Text>
                  </View>
                  <View style={styles.requirementItem}>
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#10b981"
                    />
                    <Text style={styles.requirementText}>
                      Valid score card of accepted entrance exam
                    </Text>
                  </View>
                  <View style={styles.requirementItem}>
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#10b981"
                    />
                    <Text style={styles.requirementText}>
                      Medical fitness certificate
                    </Text>
                  </View>
                  <View style={styles.requirementItem}>
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#10b981"
                    />
                    <Text style={styles.requirementText}>
                      Character certificate from previous institution
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );

      case "syllabus":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="menu-book" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Course Syllabus</Text>
            </View>
            <View style={styles.syllabusCard}>
              <Text style={styles.syllabusDescription}>
                The curriculum is designed to provide comprehensive knowledge in
                Information Technology with a balance of theory and practical
                applications.
              </Text>

              <View style={styles.semestersContainer}>
                {course.courseDetails?.syllabus?.map((semester, index) => (
                  <View key={index} style={styles.semesterCard}>
                    <View style={styles.semesterHeader}>
                      <Text style={styles.semesterTitle}>
                        {semester.split(":")[0]}
                      </Text>
                      <MaterialIcons
                        name="expand-more"
                        size={20}
                        color="#64748b"
                      />
                    </View>
                    <Text style={styles.semesterContent}>
                      {semester.split(":")[1] || semester}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.syllabusNote}>
                <MaterialIcons name="info" size={16} color="#4f46e5" />
                <Text style={styles.syllabusNoteText}>
                  Note: Syllabus is subject to change as per university
                  guidelines
                </Text>
              </View>
            </View>
          </View>
        );

      case "career":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="trending-up" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Career Opportunities</Text>
            </View>
            <View style={styles.careerCard}>
              <Text style={styles.careerDescription}>
                Graduates of this program have excellent career prospects in
                various IT domains with competitive salary packages.
              </Text>

              <View style={styles.careerStats}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>95%</Text>
                  <Text style={styles.statLabel}>Placement Rate</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>₹6.5 LPA</Text>
                  <Text style={styles.statLabel}>Average Salary</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>50+</Text>
                  <Text style={styles.statLabel}>Recruiters</Text>
                </View>
              </View>

              <View style={styles.careerOpportunities}>
                <Text style={styles.opportunitiesTitle}>Job Roles</Text>
                <View style={styles.rolesGrid}>
                  {course.courseDetails?.careerOpportunities?.map(
                    (role, index) => (
                      <View key={index} style={styles.roleBadge}>
                        <MaterialIcons
                          name="work-outline"
                          size={16}
                          color="#4f46e5"
                        />
                        <Text style={styles.roleText}>{role}</Text>
                      </View>
                    )
                  )}
                </View>
              </View>

              <View style={styles.topCompanies}>
                <Text style={styles.companiesTitle}>Top Hiring Companies</Text>
                <View style={styles.companiesList}>
                  {[
                    "TCS",
                    "Infosys",
                    "Wipro",
                    "Accenture",
                    "Cognizant",
                    "Amazon",
                    "Microsoft",
                    "Google",
                  ].map((company, index) => (
                    <View key={index} style={styles.companyBadge}>
                      <Text style={styles.companyText}>{company}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading course details...</Text>
      </View>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={60} color="#ef4444" />
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorText}>{error || "Course not found"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadCourseData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />

        {/* Back to College Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToCollege}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.courseHeaderContent}>
          <View style={styles.courseTitleContainer}>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseDegree}>{course.degree}</Text>
          </View>
          <View style={styles.courseBadges}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{course.level}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{course.category}</Text>
            </View>
          </View>
        </View>

        {/* College Info */}
        <TouchableOpacity
          style={styles.collegeInfoCard}
          onPress={handleBackToCollege}
        >
          <Image
            source={{
              uri: course.collegeInfo?.logo || "https://via.placeholder.com/80",
            }}
            style={styles.collegeLogo}
          />
          <View style={styles.collegeInfo}>
            <Text style={styles.collegeNameText}>
              {course.collegeInfo?.name}
            </Text>
            <Text style={styles.collegeLocation}>
              <MaterialIcons name="location-on" size={14} color="#94a3b8" />
              {course.collegeInfo?.location}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      {/* TABS SECTION */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScrollView}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              active={activeTab === tab.id}
              onPress={() => setActiveTab(tab.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* MAIN CONTENT - Dynamic based on active tab */}
      <View style={styles.content}>{renderTabContent()}</View>

      {/* FLOATING ACTION BUTTONS */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabPrimary} onPress={handleApplyNow}>
          <MaterialIcons name="send" size={24} color="#fff" />
          <Text style={styles.fabText}>Apply Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fabSecondary}>
          <MaterialIcons name="download" size={24} color="#4f46e5" />
          <Text style={styles.fabSecondaryText}>Brochure</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CourseDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748b",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#4f46e5",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  courseHeaderContent: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  courseTitleContainer: {
    marginBottom: 12,
  },
  courseName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseDegree: {
    color: "#e0e7ff",
    fontSize: 16,
  },
  courseBadges: {
    flexDirection: "row",
    gap: 8,
  },
  levelBadge: {
    backgroundColor: "rgba(34, 197, 94, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  categoryBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  collegeInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  collegeLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#fff",
  },
  collegeInfo: {
    flex: 1,
  },
  collegeNameText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  collegeLocation: {
    color: "#cbd5e1",
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  // TABS STYLES
  tabsContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    overflow: "hidden",
  },
  tabsScrollView: {
    flexGrow: 0,
  },
  tabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: "#f8fafc",
    minWidth: 100,
    justifyContent: "center",
  },
  activeTabButton: {
    backgroundColor: "#e0e7ff",
  },
  tabLabel: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#94a3b8",
  },
  activeTabLabel: {
    color: "#4f46e5",
    fontWeight: "600",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
  },

  // Overview Tab Styles
  highlightsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  highlightBullet: {
    marginTop: 2,
    marginRight: 12,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  factsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginHorizontal: -4,
  },
  factItem: {
    width: "50%",
    padding: 12,
    alignItems: "center",
  },
  factIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  factValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  factLabel: {
    fontSize: 12,
    color: "#64748b",
  },

  // Details Tab Styles
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  description: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 20,
  },
  detailsList: {
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8fafc",
  },
  detailLabel: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },

  // Eligibility Tab Styles
  eligibilityCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  eligibilitySection: {
    marginBottom: 24,
  },
  eligibilityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  eligibilityText: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 16,
  },
  examsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  examBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bae6fd",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  examText: {
    color: "#0369a1",
    fontSize: 12,
    fontWeight: "500",
  },
  requirementsList: {
    marginTop: 8,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  requirementText: {
    fontSize: 14,
    color: "#475569",
    flex: 1,
  },

  // Syllabus Tab Styles
  syllabusCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  syllabusDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 20,
  },
  semestersContainer: {
    marginBottom: 20,
  },
  semesterCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  semesterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  semesterTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
  },
  semesterContent: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  syllabusNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  syllabusNoteText: {
    fontSize: 12,
    color: "#4f46e5",
    flex: 1,
    fontWeight: "500",
  },

  // Career Tab Styles
  careerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  careerDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 20,
  },
  careerStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statCard: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  careerOpportunities: {
    marginBottom: 24,
  },
  opportunitiesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  rolesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bae6fd",
    gap: 6,
  },
  roleText: {
    fontSize: 12,
    color: "#0369a1",
    fontWeight: "500",
  },
  topCompanies: {
    marginTop: 8,
  },
  companiesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  companiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  companyBadge: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  companyText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
  },

  // Floating Action Buttons
  fabContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    gap: 12,
  },
  fabPrimary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    gap: 8,
  },
  fabSecondary: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4f46e5",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    gap: 8,
  },
  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  fabSecondaryText: {
    color: "#4f46e5",
    fontSize: 16,
    fontWeight: "600",
  },
});
