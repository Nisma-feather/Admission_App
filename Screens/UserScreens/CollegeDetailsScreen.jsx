const dummyCollege = {
  _id: "65abc12345",
  name: "Sri Krishna Engineering College",
  code: "TNENG1023",
  type: "Private",
  establishedYear: 1998,
  affiliatedUniversity: "Anna University",
  accreditation: {
    naac: "A+",
    nba: true,
  },
  location: {
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    area: "Kuniamuthur",
    pincode: "641008",
    coordinates: {
      lat: 11.0168,
      lng: 76.9558,
    },
  },
  contact: {
    email: "info@skec.ac.in",
    phone: "+91 98765 43210",
    website: "https://www.skec.ac.in",
    address: "Kuniamuthur, Coimbatore - 641008",
  },
  admission: {
    admissionProcess: "Both",
    entranceExams: ["TNEA", "GATE"],
    applicationStartDate: "2025-04-01",
    applicationEndDate: "2025-06-30",
  },
  facilities: {
    hostel: true,
    transport: true,
    library: true,
    sports: true,
    wifi: true,
    placementCell: true,
  },
  placement: {
    placementPercentage: 92,
    averagePackage: 450000,
    highestPackage: 1800000,
    topRecruiters: ["TCS", "Infosys", "Wipro", "Amazon"],
  },
  media: {
    logo: "https://via.placeholder.com/120",
    images: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
    brochure: "https://example.com/brochure.pdf",
  },
};
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import api from "../../apiConfig/api";
const { width } = Dimensions.get("window");

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

const CollegeDetailsScreen = ({route}) => {
  const [activeTab, setActiveTab] = useState("overview");
 const { collegeId = "69467fd1209597e97d81ae69" } = route?.params || {};

  const [college,setCollege] = useState({
  _id: "65abc12345",
  name: "Sri Krishna Engineering College",
  code: "TNENG1023",
  type: "Private",
  establishedYear: 1998,
  affiliatedUniversity: "Anna University",
  accreditation: {
    naac: "A+",
    nba: true,
  },
  location: {
    state: "Tamil Nadu",
    district: "Coimbatore",
    city: "Coimbatore",
    area: "Kuniamuthur",
    pincode: "641008",
    coordinates: {
      lat: 11.0168,
      lng: 76.9558,
    },
  },
  contact: {
    email: "info@skec.ac.in",
    phone: "+91 98765 43210",
    website: "https://www.skec.ac.in",
    address: "Kuniamuthur, Coimbatore - 641008",
  },
  admission: {
    admissionProcess: "Both",
    entranceExams: ["TNEA", "GATE"],
    applicationStartDate: "2025-04-01",
    applicationEndDate: "2025-06-30",
  },
  facilities: {
    hostel: true,
    transport: true,
    library: true,
    sports: true,
    wifi: true,
    placementCell: true,
  },
  placement: {
    placementPercentage: 92,
    averagePackage: 450000,
    highestPackage: 1800000,
    topRecruiters: ["TCS", "Infosys", "Wipro", "Amazon"],
  },
  media: {
    logo: "https://via.placeholder.com/120",
    images: [
      "https://via.placeholder.com/300x200",
      "https://via.placeholder.com/300x200",
    ],
    brochure: "https://example.com/brochure.pdf",
  },
});
  const [loading,setLoading] = useState(false);
  const fetchCollege= async()=>{
    try{
         if(!collegeId){
            return
         }
        const response = await api.get(`/college/getById/${collegeId}`);
        console.log(response.data);
        setCollege(response.data.college)
        

    }
    catch(e){
        console.log(e);
        
    }
  }

  useEffect(()=>{
fetchCollege();
  },[collegeId])

  const tabs = [
    { id: "overview", label: "Overview", icon: "dashboard" },
    { id: "admissions", label: "Admissions", icon: "school" },
    { id: "facilities", label: "Facilities", icon: "apartment" },
    { id: "placements", label: "Placements", icon: "work" },
    { id: "gallery", label: "Gallery", icon: "photo-library" },
  ];

  const handleBrochureDownload = () => {
    Linking.openURL(college.media.brochure);
  };

  const handleWebsiteVisit = () => {
    Linking.openURL(college.contact.website);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${college.contact.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${college.contact.email}`);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            {/* ABOUT */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="info" size={20} color="#4f46e5" />
                <Text style={styles.sectionTitle}>University Affiliation</Text>
              </View>
              <View style={styles.infoCard}>
                <Text style={styles.universityName}>
                  {college.affiliatedUniversity}
                </Text>
                <View style={styles.locationRow}>
                  <MaterialIcons name="location-on" size={16} color="#666" />
                  <Text style={styles.locationText}>
                    {college.location.area}, {college.location.city},{" "}
                    {college.location.state} - {college.location.pincode}
                  </Text>
                </View>
              </View>
            </View>

            {/* CONTACT */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Feather name="phone" size={20} color="#4f46e5" />
                <Text style={styles.sectionTitle}>Contact Information</Text>
              </View>
              <View style={styles.contactCard}>
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={handleCall}
                >
                  <MaterialIcons name="phone" size={20} color="#4f46e5" />
                  <Text style={styles.contactText}>
                    {college.contact.phone}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={handleEmail}
                >
                  <MaterialIcons name="email" size={20} color="#4f46e5" />
                  <Text style={styles.contactText}>
                    {college.contact.email}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={handleWebsiteVisit}
                >
                  <MaterialIcons name="language" size={20} color="#4f46e5" />
                  <Text style={[styles.contactText, styles.link]}>
                    {college.contact.website}
                  </Text>
                </TouchableOpacity>

                <View style={styles.contactItem}>
                  <MaterialIcons name="location-on" size={20} color="#4f46e5" />
                  <Text style={styles.contactText}>
                    {college.contact.address}
                  </Text>
                </View>
              </View>
            </View>
          </>
        );

      case "admissions":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="school" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Admissions</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.admissionItem}>
                <Text style={styles.admissionLabel}>Process</Text>
                <View style={styles.admissionBadge}>
                  <Text style={styles.admissionValue}>
                    {college.admission.admissionProcess}
                  </Text>
                </View>
              </View>

              <View style={styles.admissionItem}>
                <Text style={styles.admissionLabel}>Entrance Exams</Text>
                <View style={styles.examContainer}>
                  {college.admission.entranceExams.map((exam, index) => (
                    <View key={index} style={styles.examBadge}>
                      <Text style={styles.examText}>{exam}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.admissionItem}>
                <Text style={styles.admissionLabel}>Application Period</Text>
                <Text style={styles.dateText}>
                  {new Date(
                    college.admission.applicationStartDate
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    college.admission.applicationEndDate
                  ).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        );

      case "facilities":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="apartment" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Facilities</Text>
            </View>
            <View style={styles.facilitiesGrid}>
              {Object.entries(college.facilities).map(([key, value]) => (
                <View key={key} style={styles.facilityItem}>
                  <View
                    style={[
                      styles.facilityIcon,
                      value ? styles.facilityActive : styles.facilityInactive,
                    ]}
                  >
                    <FontAwesome5
                      name={
                        key === "hostel"
                          ? "bed"
                          : key === "transport"
                          ? "bus"
                          : key === "library"
                          ? "book"
                          : key === "sports"
                          ? "running"
                          : key === "wifi"
                          ? "wifi"
                          : "briefcase"
                      }
                      size={16}
                      color={value ? "#fff" : "#999"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.facilityText,
                      !value && styles.facilityTextInactive,
                    ]}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );

      case "placements":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="work" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Placement Statistics</Text>
            </View>
            <View style={styles.placementCard}>
              <View style={styles.placementStats}>
                <View style={styles.placementStat}>
                  <Text style={styles.placementNumber}>
                    {college.placement.placementPercentage}%
                  </Text>
                  <Text style={styles.placementLabel}>Placement Rate</Text>
                </View>
                <View style={styles.placementDivider} />
                <View style={styles.placementStat}>
                  <Text style={styles.placementNumber}>
                    {formatCurrency(college.placement.averagePackage)}
                  </Text>
                  <Text style={styles.placementLabel}>Average Package</Text>
                </View>
                <View style={styles.placementDivider} />
                <View style={styles.placementStat}>
                  <Text style={styles.placementNumber}>
                    {formatCurrency(college.placement.highestPackage)}
                  </Text>
                  <Text style={styles.placementLabel}>Highest Package</Text>
                </View>
              </View>

              <View style={styles.recruitersSection}>
                <Text style={styles.recruitersTitle}>Top Recruiters</Text>
                <View style={styles.recruitersGrid}>
                  {college.placement.topRecruiters.map((recruiter, index) => (
                    <View key={index} style={styles.recruiterBadge}>
                      <Text style={styles.recruiterText}>{recruiter}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        );

      case "gallery":
        return (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="image" size={20} color="#4f46e5" />
              <Text style={styles.sectionTitle}>Campus Gallery</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.galleryContainer}
            >
              {college.media.images.map((img, index) => (
                <View key={index} style={styles.galleryItem}>
                  <Image source={{ uri: img }} style={styles.galleryImg} />
                  <View style={styles.imageOverlay} />
                </View>
              ))}
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER WITH GRADIENT */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <Image source={{ uri: college.media.logo }} style={styles.logo} />
        <Text style={styles.collegeName}>{college.name}</Text>
        <Text style={styles.collegeCode}>{college.code}</Text>
        <Text style={styles.subText}>
          {college.type} • Estd {college.establishedYear}
        </Text>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <MaterialIcons name="school" size={14} color="#fff" />
            <Text style={styles.badgeText}>
              NAAC {college.accreditation.naac}
            </Text>
          </View>
          {college.accreditation.nba && (
            <View style={[styles.badge, styles.nbaBadge]}>
              <Ionicons name="shield-checkmark" size={14} color="#fff" />
              <Text style={styles.badgeText}>NBA Accredited</Text>
            </View>
          )}
        </View>
      </View>

      {/* TABS SECTION - Replaces Quick Stats */}
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
        <TouchableOpacity
          style={styles.fabPrimary}
          onPress={handleBrochureDownload}
        >
          <MaterialIcons name="download" size={24} color="#fff" />
          <Text style={styles.fabText}>Brochure</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fabSecondary}>
          <MaterialIcons name="library-books" size={24} color="#4f46e5" />
          <Text style={styles.fabSecondaryText}>View Courses</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CollegeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: "#4f46e5",
    alignItems: "center",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  collegeName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  collegeCode: {
    color: "#e0e7ff",
    fontSize: 14,
    marginBottom: 8,
  },
  subText: {
    color: "#c7d2fe",
    fontSize: 14,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(34, 197, 94, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  nbaBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.9)",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
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
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  universityName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#64748b",
    flex: 1,
  },
  contactCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  contactText: {
    fontSize: 14,
    color: "#475569",
    flex: 1,
  },
  link: {
    color: "#4f46e5",
    textDecorationLine: "underline",
  },
  admissionItem: {
    marginBottom: 16,
  },
  admissionLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 6,
  },
  admissionBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  admissionValue: {
    color: "#4f46e5",
    fontWeight: "600",
  },
  examContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  examBadge: {
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bae6fd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  examText: {
    color: "#0369a1",
    fontSize: 12,
    fontWeight: "500",
  },
  dateText: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "500",
  },
  facilitiesGrid: {
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
  },
  facilityItem: {
    width: "33.33%",
    alignItems: "center",
    paddingVertical: 12,
  },
  facilityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  facilityActive: {
    backgroundColor: "#4f46e5",
  },
  facilityInactive: {
    backgroundColor: "#f1f5f9",
  },
  facilityText: {
    fontSize: 12,
    color: "#475569",
    textAlign: "center",
  },
  facilityTextInactive: {
    color: "#94a3b8",
  },
  placementCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  placementStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  placementStat: {
    alignItems: "center",
  },
  placementNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  placementLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  placementDivider: {
    width: 1,
    backgroundColor: "#e2e8f0",
  },
  recruitersSection: {
    marginTop: 8,
  },
  recruitersTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  recruitersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  recruiterBadge: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  recruiterText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "500",
  },
  galleryContainer: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  galleryItem: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  galleryImg: {
    width: width * 0.7,
    height: 200,
    borderRadius: 12,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 12,
  },
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
    backgroundColor: "#4f46e5",
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