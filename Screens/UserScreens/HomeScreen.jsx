import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import api from "../../apiConfig/api";
import { Ionicons } from "@expo/vector-icons";
import CollegeCard from "../../components/CollegeCard";
import CourseCard from "../../components/CourseCard";
import FilterCapsule from "../../components/FilterCapsule";
import { dummyCourses, collegesDummyData } from "../../DummyData";
import MultiSlider from "@ptomasroos/react-native-multi-slider";



const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [dummyCourses,setDummyCourses] = useState([]);
  const [collegesDummyData,setCollegesDummyData] = useState([])
  const [location, setLocation] = useState("");
  const [selectedLocation,setSelectedLocation]=useState('');
  const [locationRes, setLocationRes] = useState([]);
  const [showLocationScreen, setShowLocationScreen] = useState(false);
  const [activeType, setActiveType] = useState("ALL");
  const [courseFilters, setCourseFilters] = useState({
    level: [],
    category: [],
    duration: [],
    feeRange: { min: null, max: null },
  });
  const [collegeFilters, setCollegeFilters] = useState({
    type: [],
    naac: [],
    nba: false,
    facilities: [],
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAllColleges, setShowAllColleges] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const COURSE_FILTERS = {
    level: ["UG", "PG", "Diploma", "PhD"],
    category: [

      "Medical & Paramedical",
      "Arts & Science",
      "Engineering & Technology",
      "Law",
      "Education & Teaching",
      "Diploma",
      "Architecture",
      "Agriculture",
      "Hotel Management",
      "Media & Communication",
      "Aviation",
      "Sports Science",
    ],
    duration: ["1", "2", "3", "4", "5"],
  };

  const COLLEGE_FILTERS = {
    type: ["Government", "Private", "Deemed"],
    naac: ["A++", "A+", "A", "B++", "B"],
    facilities: [
      "hostel",
      "transport",
      "library",
      "sports",
      "wifi",
      "placementCell",
    ],
  };

  const fetchLocationResult = async () => {
    try {
      const res = await api.get(`/location/search?search=${location}`);
      setLocationRes(res.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchColleges = async (collegeFilters = {}) => {
    try {
      const params = {};

      if (selectedLocation) params.loc = selectedLocation;
      if (search) params.name = search;

      if (collegeFilters.type?.length > 0) {
        params.collegeType = collegeFilters.type.join(",");
      }

      if (collegeFilters.facilities?.length > 0) {
        params.facilities = collegeFilters.facilities.join(",");
      }

      if (collegeFilters.naac?.length > 0) {
        params.accreditation = collegeFilters.naac.join(",");
      }

      if (collegeFilters.nba === true) {
        params.nba = collegeFilters.nba;
      }
      console.log("params",params)

      const res = await api.get("/college", { params });
      setCollegesDummyData(res.data.colleges);
    } catch (e) {
      console.log(e);
    }
  };


  const fetchCourses=async()=>{
    try{
      
      //  const [courseFilters, setCourseFilters] = useState({
      //    level: [],
      //    category: [],
      //    duration: null,
      //    feeRange: { min: null, max: null },
      //  });
    const params = {};
    console.log("feerange",courseFilters.feeRange);
    

    if (selectedLocation) {
      params.loc = selectedLocation;
    }

    if (search) {
      params.name = search;
    }

    if (courseFilters.level?.length > 0) {
      params.level = courseFilters.level.join(",");
    }

    if (courseFilters.category?.length > 0) {
      params.category = courseFilters.category.join(",");
    }

    if (courseFilters.duration?.length > 0) {
      params.duration = courseFilters.duration.join(",");
    }

      if (courseFilters.feeRange?.min !== null) {
        params.feeMin = courseFilters.feeRange.min;
      }

      if (courseFilters.feeRange?.max !== null) {
        params.feeMax = courseFilters.feeRange.max;
      }

    console.log("fetching the courses");

    const res = await api.get("/course", { params });
    setDummyCourses(res.data.courses);

 

    }
    catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
     fetchColleges(collegeFilters);
    
  },[selectedLocation, search]);

  useEffect(()=>{
 fetchCourses(courseFilters);
  },[setSelectedLocation, search])
  

  useEffect(() => {
    if (location.trim()) {
      const timeoutId = setTimeout(() => {
        fetchLocationResult();
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setLocationRes([]);
    }
  }, [location]);

  // Get limited results for "ALL" view
  const limitedColleges = collegesDummyData.slice(0, 2);
  const limitedCourses = dummyCourses.slice(0, 2);

  // Reset show all states when activeType changes
  useEffect(() => {
    if (activeType !== "ALL") {
      setShowAllColleges(false);
      setShowAllCourses(false);
    }
  }, [activeType]);



  const renderModalContent = () => {
    return (
      <ScrollView style={styles.modalContent}>
        {activeType === "COURSE" && (
          <View>
            <Text style={styles.modalSectionTitle}>Level</Text>
            <View style={styles.filterRow}>
              {COURSE_FILTERS.level.map((item) => (
                <FilterCapsule
                  key={item}
                  label={item}
                  active={courseFilters.level.includes(item)}
                  onPress={() => {
                    setCourseFilters((prev) => ({
                      ...prev,
                      level: prev.level.includes(item)
                        ? prev.level.filter((l) => l !== item)
                        : [...prev.level, item],
                    }));
                  }}
                />
              ))}
            </View>
            <Text style={styles.modalSectionTitle}>Fees Range (₹)</Text>

            <View style={{ paddingHorizontal: 10 }}>
              <MultiSlider
                values={[
                  courseFilters.feeRange.min ?? 50000,
               
                  courseFilters.feeRange.max ?? 500000,
                ]}
                min={50000}
                max={500000}
                step={10000}
                sliderLength={280}
                onValuesChangeFinish={(values) => {
                  setCourseFilters((prev) => ({
                    ...prev,
                    feeRange: {
                      min: values[0],
                      max: values[1],
                    },
                  }));
                }}
                selectedStyle={{
                  backgroundColor: "#4f46e5",
                }}
                unselectedStyle={{
                  backgroundColor: "#d1d5db",
                }}
                markerStyle={{
                  backgroundColor: "#4f46e5",
                  height: 20,
                  width: 20,
                }}
              />

              {/* Display selected values */}
              <View style={styles.feeLabelRow}>
                <Text>₹{courseFilters.feeRange.min ?? 50000}</Text>
                <Text>₹{courseFilters.feeRange.max ?? 500000}</Text>
              </View>
            </View>

            <Text style={styles.modalSectionTitle}>Category</Text>
            <View style={styles.filterRow}>
              {COURSE_FILTERS.category.map((item) => (
                <FilterCapsule
                  key={item}
                  label={item}
                  active={courseFilters.category.includes(item)}
                  onPress={() =>
                    setCourseFilters((prev) => ({
                      ...prev,
                      category: prev.category.includes(item)
                        ? prev.category.filter((c) => c !== item)
                        : [...prev.category, item],
                    }))
                  }
                />
              ))}
            </View>
            <Text style={styles.modalSectionTitle}>Duration (Years)</Text>
            <View style={styles.filterRow}>
              {COURSE_FILTERS.duration.map((item) => (
                <FilterCapsule
                  key={item}
                  label={`${item} Year`}
                  active={courseFilters.duration.includes(item)}
                  onPress={() =>
                    setCourseFilters((prev) => ({
                      ...prev,
                      duration: prev.duration.includes(item)
                        ? prev.duration.filter((d) => d !== item)
                        : [...prev.duration, item],
                    }))
                  }
                />
              ))}
            </View>
          </View>
        )}

        {activeType === "COLLEGE" && (
          <View>
            <Text style={styles.modalSectionTitle}>College Type</Text>
            <View style={styles.filterRow}>
              {COLLEGE_FILTERS.type.map((item) => (
                <FilterCapsule
                  key={item}
                  label={item}
                  active={collegeFilters.type.includes(item)}
                  onPress={() =>
                    setCollegeFilters((prev) => ({
                      ...prev,
                      type: prev.type.includes(item)
                        ? prev.type.filter((t) => t !== item)
                        : [...prev.type, item],
                    }))
                  }
                />
              ))}
            </View>

            <Text style={styles.modalSectionTitle}>NAAC Rating</Text>
            <View style={styles.filterRow}>
              {COLLEGE_FILTERS.naac.map((item) => (
                <FilterCapsule
                  key={item}
                  label={item}
                  active={collegeFilters.naac.includes(item)}
                  onPress={() =>
                    setCollegeFilters((prev) => ({
                      ...prev,
                      naac: prev.naac.includes(item)
                        ? prev.naac.filter((n) => n !== item)
                        : [...prev.naac, item],
                    }))
                  }
                />
              ))}
            </View>

            <Text style={styles.modalSectionTitle}>Facilities</Text>
            <View style={styles.filterRow}>
              {COLLEGE_FILTERS.facilities.map((item) => (
                <FilterCapsule
                  key={item}
                  label={item.charAt(0).toUpperCase() + item.slice(1)}
                  active={collegeFilters.facilities.includes(item)}
                  onPress={() =>
                    setCollegeFilters((prev) => ({
                      ...prev,
                      facilities: prev.facilities.includes(item)
                        ? prev.facilities.filter((f) => f !== item)
                        : [...prev.facilities, item],
                    }))
                  }
                />
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            setShowFilterModal(false);
            if (activeType === "COLLEGE") {
              console.log("COllege filters", collegeFilters);
              fetchColleges(collegeFilters);
            }
            if (activeType === "COURSE") {
              fetchCourses(courseFilters);
            }
          }}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.applyButton, styles.clearButton]}
          onPress={() => {
            if (activeType === "COURSE") {
              setCourseFilters({
                level: [],
                category: [],
                duration: [],
                feeRange: { min: null, max: null },
              });
            } else if (activeType === "COLLEGE") {
              setCollegeFilters({
                type: [],
                naac: [],
                nba: false,
                facilities: [],
              });
            }
          }}
        >
          <Text style={[styles.applyButtonText, styles.clearButtonText]}>
            Clear Filters
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

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
            autoFocus
          />
        </View>

        <FlatList
          data={locationRes}
          keyExtractor={(item, i) => `${item.label}-${i}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                setLocation(item.label);
                setSelectedLocation(item.label);
                setShowLocationScreen(false);
              }}
            >
              <Ionicons name="location-outline" size={16} color="#64748b" />
              <Text style={styles.resultText}>{item.label}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {location.trim()
                  ? "No locations found"
                  : "Search for a location"}
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  const renderAllResults = () => {
    const collegesToShow = showAllColleges
      ? collegesDummyData
      : limitedColleges;
    const coursesToShow = showAllCourses ? dummyCourses : limitedCourses;

    return (
      <ScrollView
        style={styles.allResultsContainer}
        contentContainerStyle={styles.allResultsContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Colleges Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Colleges</Text>
          {collegesToShow.length > 0 ? (
            <>
              {collegesToShow.map((college) => (
                <CollegeCard key={college._id} college={college} />
              ))}
              {!showAllColleges && collegesDummyData.length > 2 && (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={() => setShowAllColleges(true)}
                >
                  <Text style={styles.loadMoreText}>
                    Load more colleges ({collegesDummyData.length - 2} more)
                  </Text>
                  <Ionicons name="chevron-down" size={18} color="#2563eb" />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={styles.noResultsText}>No colleges found</Text>
          )}
        </View>

        {/* Courses Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Courses</Text>
          {coursesToShow.length > 0 ? (
            <>
              {coursesToShow.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
              {!showAllCourses && dummyCourses.length > 2 && (
                <TouchableOpacity
                  style={styles.loadMoreButton}
                  onPress={() => setShowAllCourses(true)}
                >
                  <Text style={styles.loadMoreText}>
                    Load more courses ({dummyCourses.length - 2} more)
                  </Text>
                  <Ionicons name="chevron-down" size={18} color="#2563eb" />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={styles.noResultsText}>No courses found</Text>
          )}
        </View>
      </ScrollView>
    );
  };

  const renderSingleTypeResults = () => {
    const data = activeType === "COURSE" ? dummyCourses : collegesDummyData;
    const title = activeType === "COURSE" ? "Courses" : "Colleges";
 console.log(title );
 
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          activeType==="COURSE" ? (
            <CourseCard course={item} />
          ) : (
            <CollegeCard college={item} />
          )
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyText}>No {title.toLowerCase()} found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    );
  };

  /* ================= HOME SCREEN ================= */
  return (
    <View style={styles.container}>
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

      {/* Results count */}
      <Text style={styles.resultsCount}>
        {activeType === "ALL"
          ? `${collegesDummyData.length + dummyCourses.length} found`
          : activeType === "COURSE"
          ? `${dummyCourses.length} courses found`
          : `${collegesDummyData.length} colleges found`}
      </Text>

      {/* Render appropriate content based on activeType */}
      <View style={styles.contentContainer}>
        {activeType === "ALL" ? renderAllResults() : renderSingleTypeResults()}
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {activeType === "COURSE"
                  ? "Course Filters"
                  : activeType === "COLLEGE"
                  ? "College Filters"
                  : "Filters"}
              </Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            {renderModalContent()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
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
    color: "#0f172a",
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
    marginHorizontal: 16,
  },
  placeholderText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#64748b",
  },
  typeFilterRow: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    marginRight: 12,
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
  resultsCount: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  allResultsContainer: {
    flex: 1,
  },
  allResultsContent: {
    paddingBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
  loadMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
  },
  loadMoreText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  noResultsText: {
    textAlign: "center",
    color: "#64748b",
    fontStyle: "italic",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#0f172a",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  resultText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#334155",
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
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  modalContent: {
    padding: 16,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginTop: 16,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#f1f5f9",
  },
  clearButtonText: {
    color: "#64748b",
  },
});
