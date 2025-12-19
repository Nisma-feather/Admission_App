import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal
} from "react-native";
import api from "../../apiConfig/api";
import { Ionicons } from "@expo/vector-icons";
import CollegeCard from "../../components/CollegeCard";
import CourseCard from "../../components/CourseCard";

// collegesDummyData.js
const collegesDummyData = [
  {
    _id: "1",
    name: "Anna University, Chennai",
    code: "AU001",
    type: "Government",
    establishedYear: 1978,
    affiliatedUniversity: "Anna University",
    accreditation: {
      naac: "A+",
      nba: true
    },
    location: {
      state: "Tamil Nadu",
      district: "Chennai",
      city: "Chennai",
      area: "Guindy",
      pincode: "600025",
      coordinates: {
        lat: 13.0107,
        lng: 80.2359
      }
    },
    contact: {
      email: "info@annauniv.edu",
      phone: "044-2235 7070",
      website: "www.annauniv.edu",
      address: "Sardar Patel Road, Guindy, Chennai"
    },
    admission: {
      admissionProcess: "Entrance Based",
      entranceExams: ["TNEA", "GATE", "TANCET"],
      applicationStartDate: new Date("2024-03-01"),
      applicationEndDate: new Date("2024-05-31")
    },
    facilities: {
      hostel: true,
      transport: true,
      library: true,
      sports: true,
      wifi: true,
      placementCell: true
    },
    placement: {
      placementPercentage: 92,
      averagePackage: 650000,
      highestPackage: 3500000,
      topRecruiters: ["TCS", "Infosys", "CTS", "Amazon", "Microsoft"]
    },
    media: {
      logo: "https://example.com/annauniv-logo.jpg",
      images: [
        "https://example.com/college1.jpg",
        "https://example.com/campus1.jpg"
      ]
    },
    isActive: true,
    isVerified: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-20")
  },
  {
    _id: "2",
    name: "PSG College of Technology",
    code: "PSG001",
    type: "Private",
    establishedYear: 1951,
    affiliatedUniversity: "Anna University",
    accreditation: {
      naac: "A++",
      nba: true
    },
    location: {
      state: "Tamil Nadu",
      district: "Coimbatore",
      city: "Coimbatore",
      area: "Peelamedu",
      pincode: "641004",
      coordinates: {
        lat: 11.0168,
        lng: 76.9558
      }
    },
    contact: {
      email: "principal@psgtech.edu",
      phone: "0422-257 2177",
      website: "www.psgtech.edu",
      address: "Peelamedu, Coimbatore"
    },
    admission: {
      admissionProcess: "Entrance Based",
      entranceExams: ["TNEA"],
      applicationStartDate: new Date("2024-04-01"),
      applicationEndDate: new Date("2024-06-15")
    },
    facilities: {
      hostel: true,
      transport: false,
      library: true,
      sports: true,
      wifi: true,
      placementCell: true
    },
    placement: {
      placementPercentage: 95,
      averagePackage: 850000,
      highestPackage: 4200000,
      topRecruiters: ["Google", "Amazon", "IBM", "Bosch", "Zoho"]
    },
    media: {
      logo: "https://example.com/psg-logo.jpg",
      images: [
        "https://example.com/psg-campus.jpg",
        "https://example.com/psg-building.jpg"
      ]
    },
    isActive: true,
    isVerified: true,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2024-01-18")
  },
  {
    _id: "3",
    name: "SRM Institute of Science and Technology",
    code: "SRM001",
    type: "Deemed",
    establishedYear: 1985,
    affiliatedUniversity: "SRM University",
    accreditation: {
      naac: "A++",
      nba: true
    },
    location: {
      state: "Tamil Nadu",
      district: "Kancheepuram",
      city: "Chennai",
      area: "Kattankulathur",
      pincode: "603203",
      coordinates: {
        lat: 12.8236,
        lng: 80.0444
      }
    },
    contact: {
      email: "admission@srmist.edu.in",
      phone: "044-2741 7000",
      website: "www.srmist.edu.in",
      address: "SRM Nagar, Kattankulathur, Chennai"
    },
    admission: {
      admissionProcess: "Entrance Based",
      entranceExams: ["SRMJEEE", "JEE Main"],
      applicationStartDate: new Date("2024-01-15"),
      applicationEndDate: new Date("2024-05-30")
    },
    facilities: {
      hostel: true,
      transport: true,
      library: true,
      sports: true,
      wifi: true,
      placementCell: true
    },
    placement: {
      placementPercentage: 90,
      averagePackage: 720000,
      highestPackage: 3800000,
      topRecruiters: ["Amazon", "Microsoft", "Accenture", "Deloitte", "CTS"]
    },
    media: {
      logo: "https://example.com/srm-logo.jpg",
      images: [
        "https://example.com/srm-campus.jpg",
        "https://example.com/srm-hostel.jpg"
      ]
    },
    isActive: true,
    isVerified: true,
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2024-01-22")
  },
  {
    _id: "4",
    name: "Vellore Institute of Technology",
    code: "VIT001",
    type: "Deemed",
    establishedYear: 1984,
    affiliatedUniversity: "VIT University",
    accreditation: {
      naac: "A++",
      nba: true
    },
    location: {
      state: "Tamil Nadu",
      district: "Vellore",
      city: "Vellore",
      area: "Katpadi",
      pincode: "632014",
      coordinates: {
        lat: 12.8409,
        lng: 79.1536
      }
    },
    contact: {
      email: "admissions@vit.ac.in",
      phone: "0416-224 3091",
      website: "www.vit.ac.in",
      address: "VIT University, Katpadi, Vellore"
    },
    admission: {
      admissionProcess: "Entrance Based",
      entranceExams: ["VITEEE", "JEE Main"],
      applicationStartDate: new Date("2024-01-01"),
      applicationEndDate: new Date("2024-03-31")
    },
    facilities: {
      hostel: true,
      transport: true,
      library: true,
      sports: true,
      wifi: true,
      placementCell: true
    },
    placement: {
      placementPercentage: 94,
      averagePackage: 880000,
      highestPackage: 4500000,
      topRecruiters: ["Microsoft", "Google", "Amazon", "Goldman Sachs", "JP Morgan"]
    },
    media: {
      logo: "https://example.com/vit-logo.jpg",
      images: [
        "https://example.com/vit-main.jpg",
        "https://example.com/vit-library.jpg"
      ]
    },
    isActive: true,
    isVerified: true,
    createdAt: new Date("2023-01-25"),
    updatedAt: new Date("2024-01-19")
  },
  {
    _id: "5",
    name: "Madras Institute of Technology",
    code: "MIT001",
    type: "Government",
    establishedYear: 1949,
    affiliatedUniversity: "Anna University",
    accreditation: {
      naac: "A+",
      nba: true
    },
    location: {
      state: "Tamil Nadu",
      district: "Chennai",
      city: "Chennai",
      area: "Chromepet",
      pincode: "600044",
      coordinates: {
        lat: 12.9516,
        lng: 80.1462
      }
    },
    contact: {
      email: "dean@mitindia.edu",
      phone: "044-2251 6001",
      website: "www.mitindia.edu",
      address: "Chromepet, Chennai"
    },
    admission: {
      admissionProcess: "Entrance Based",
      entranceExams: ["TNEA"],
      applicationStartDate: new Date("2024-04-10"),
      applicationEndDate: new Date("2024-06-20")
    },
    facilities: {
      hostel: true,
      transport: true,
      library: true,
      sports: false,
      wifi: true,
      placementCell: true
    },
    placement: {
      placementPercentage: 88,
      averagePackage: 680000,
      highestPackage: 3200000,
      topRecruiters: ["ISRO", "DRDO", "BHEL", "L&T", "TATA Motors"]
    },
    media: {
      logo: "https://example.com/mit-logo.jpg",
      images: [
        "https://example.com/mit-campus.jpg",
        "https://example.com/mit-lab.jpg"
      ]
    },
    isActive: true,
    isVerified: true,
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2024-01-21")
  }
];
export const dummyCourses = [
  {
    _id: "course1",
    name: "B.Tech IT", // 👈 short name (CARD TITLE)
    degree: "Bachelor of Technology",
    level: "UG",
    category: "Engineering & Technology",
    specialization: "Information Technology",
    duration: 4,
    fees: { min: 150000, max: 300000 },
    intake: 120,
    entranceExams: ["JEE Main", "TNEA"],
    college: {
      _id: "college1",
      name: "Sri Ram Engineering College", // 👈 shown under course name
      type: "Private",
      establishedYear: 2008,
      location: {
        city: "Chennai",
        district: "Chennai",
        state: "Tamil Nadu",
      },
      accreditation: {
        naac: "A+",
        nba: true,
      },
      placement: {
        placementPercentage: 92,
        highestPackage: 1200000,
      },
      facilities: {
        hostel: true,
        placementCell: true,
        wifi: true,
        sports: true,
        transport: true,
      },
      admission: {
        entranceExams: ["JEE Main", "TNEA", "SRMEEE"],
      },
      media: {
        logo: "https://via.placeholder.com/100",
      },
    },
  },

  {
    _id: "course2",
    name: "B.Sc Physics",
    degree: "Bachelor of Science",
    level: "UG",
    category: "Arts & Science",
    specialization: "Physics",
    duration: 3,
    fees: { min: 45000, max: 90000 },
    intake: 60,
    entranceExams: ["University Entrance Test"],
    college: {
      _id: "college2",
      name: "St. Joseph’s College of Arts & Science",
      type: "Government",
      establishedYear: 1965,
      location: {
        city: "Coimbatore",
        district: "Coimbatore",
        state: "Tamil Nadu",
      },
      accreditation: {
        naac: "A",
        nba: false,
      },
      placement: {
        placementPercentage: 78,
        highestPackage: 600000,
      },
      facilities: {
        hostel: true,
        placementCell: true,
        wifi: true,
        sports: false,
        transport: true,
      },
      admission: {
        entranceExams: ["University Entrance Test"],
      },
      media: {
        logo: "",
      },
    },
  },
];

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationRes, setLocationRes] = useState([]);
  const [showLocationScreen, setShowLocationScreen] = useState(false);
  const [activeType, setActiveType] = useState("ALL");
  // ALL | COURSE | COLLEGE

  const [showFilterModal, setShowFilterModal] = useState(false);


  const fetchLocationResult = async () => {
    try {
      const res = await api.get(`/location/search?search=${location}`);
      setLocationRes(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (location.trim()) fetchLocationResult();
    else setLocationRes([]);
  }, [location]);

  const combinedData = [...collegesDummyData, ...dummyCourses];

  const filteredData = combinedData.filter((item) => {
    if (activeType === "COURSE") return !!item.degree;
    if (activeType === "COLLEGE") return !item.degree;
    return true; // ALL
  });

  /* ================= LOCATION SCREEN ================= */
  if (showLocationScreen) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowLocationScreen(false)}>
            <Ionicons name="arrow-back" size={22} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Location</Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#2563eb" />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Search area"
            style={styles.searchInput}
          />
        </View>

        <FlatList
          data={locationRes}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                setLocation(item.label);
                setShowLocationScreen(false);
              }}
            >
              <Ionicons name="location-outline" size={16} color="#64748b" />
              <Text style={styles.resultText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  /* ================= HOME SCREEN ================= */
  return (
    <>
      <FlatList
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Find Colleges & Courses</Text>
            </View>

            {/* Search Row */}
            <View style={styles.searchFilterRow}>
              <View style={styles.searchInputBox}>
                <Ionicons name="search-outline" size={20} color="#2563eb" />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Course or college name"
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowFilterModal(true)}
              >
                <Ionicons name="options-outline" size={22} color="#2563eb" />
              </TouchableOpacity>
            </View>

            {/* Location */}
            <TouchableOpacity onPress={() => setShowLocationScreen(true)}>
              <View style={styles.inputRow}>
                <Ionicons name="location-outline" size={20} color="#2563eb" />
                <Text style={styles.placeholderText}>
                  {location || "Select Location"}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Main Type Filter */}
            <View style={styles.typeFilterRow}>
              {["ALL", "COURSE", "COLLEGE"].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setActiveType(type)}
                  style={[
                    styles.typeChip,
                    activeType === type && styles.activeTypeChip,
                  ]}
                >
                  <Text
                    style={[
                      styles.typeChipText,
                      activeType === type && styles.activeTypeChipText,
                    ]}
                  >
                    {type === "ALL"
                      ? "All"
                      : type === "COURSE"
                      ? "Courses"
                      : "Colleges"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Colleges Section */}
            <Text style={styles.sectionTitle}>Top Colleges</Text>
          </>
        }
        data={[...collegesDummyData, ...dummyCourses]}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          item.degree ? (
            <CourseCard course={item} />
          ) : (
            <CollegeCard college={item} />
          )
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={showFilterModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={22} />
              </TouchableOpacity>
            </View>

            {/* COURSE FILTERS */}
            <Text style={styles.filterSectionTitle}>Course Filters</Text>

            <TouchableOpacity style={styles.filterOption}>
              <Text>Fees Range</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterOption}>
              <Text>Level (UG / PG)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterOption}>
              <Text>Category</Text>
            </TouchableOpacity>

            {/* COLLEGE FILTERS */}
            <Text style={styles.filterSectionTitle}>College Filters</Text>

            <TouchableOpacity style={styles.filterOption}>
              <Text>College Type</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterOption}>
              <Text>NAAC Rating</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterOption}>
              <Text>Hostel Available</Text>
            </TouchableOpacity>

            {/* Apply Button */}
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },

  header: {
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },

  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  searchInputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  filterButton: {
    width: 48,
    height: 48,
    marginLeft: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  placeholderText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#64748b",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  /* Location screen */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  resultText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#334155",
  },
  typeFilterRow: {
    flexDirection: "row",
    marginBottom: 12,
  },

  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    marginRight: 8,
  },

  activeTypeChip: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  typeChipText: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
  },

  activeTypeChipText: {
    color: "#fff",
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  filterSectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },

  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },

  applyButton: {
    marginTop: 16,
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

