import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "../../apiConfig/api";
import { Ionicons } from "@expo/vector-icons";
import CollegeCard from "../../components/CollegeCard";

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


const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [locationRes, setLocationRes] = useState([]);
  const [showLocationScreen, setShowLocationScreen] = useState(false);

  const fetchLocationResult = async () => {
    try {
      const res = await api.get(`/location/search?search=${location}`);
      setLocationRes(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("location changed");

    if (location.trim()) fetchLocationResult();
    else setLocationRes([]);
  }, [location]);

  if (showLocationScreen) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowLocationScreen(false)}>
            <Ionicons name="arrow-back" size={22} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Location</Text>
        </View>

        {/* Search Area */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#2563eb" />
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Search Area"
            style={styles.searchInput}
          />
        </View>

        {/* Use current location */}
        <View style={styles.currentLocationRow}>
          <Ionicons name="locate-outline" size={18} color="#2563eb" />
          <Text style={styles.currentLocationText}>Use current location</Text>
          <Text style={styles.selectText}>Select</Text>
        </View>

        {/* Results */}
        <Text style={styles.resultTitle}>Search Result</Text>

        
        

        <FlatList
          data={locationRes}
          keyExtractor={(_, idx) => idx.toString()}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                setLocation(item.label);
                setShowLocationScreen(false);
              }}
            >
              <Ionicons name="location" size={16} color="#64748b" />
              <Text style={styles.resultText}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} color="#2563eb" />
        <Text style={styles.headerTitle}></Text>
      </View>

      {/* Job title input */}
      {/* Search + Filter Row */}
      <View style={styles.searchFilterRow}>
        {/* Job title input */}
        <View style={styles.searchInputBox}>
          <Ionicons name="briefcase-outline" size={20} color="#2563eb" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Course name, or college"
            style={styles.input}
          />
        </View>

        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {/* Location input */}
      <TouchableOpacity onPress={() => setShowLocationScreen(true)}>
        <View style={styles.inputRow}>
          <Ionicons name="location-outline" size={20} color="#2563eb" />
          <Text style={styles.placeholderText}>
            {location || "Job Location"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Location dropdown (unchanged logic) */}

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <FlatList
          data={collegesDummyData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CollegeCard
              college={item}
              onPress={() => handleCollegePress(item)}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
    color: "#0f172a",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#0f172a",
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    elevation: 4,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  dropdownText: {
    fontSize: 15,
    color: "#334155",
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  placeholderText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#64748b",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },

  currentLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  currentLocationText: {
    marginLeft: 8,
    flex: 1,
    color: "#2563eb",
    fontSize: 15,
  },

  selectText: {
    color: "#2563eb",
    fontWeight: "500",
  },

  resultTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
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
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  shadowBox: {
  elevation: 2,
}
,

  searchInputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#fff",
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
});
