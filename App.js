import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/UserScreens/HomeScreen';
import CollegeDetailsScreen from './Screens/UserScreens/CollegeDetailsScreen';
import CourseDetailsScreen from './Screens/UserScreens/CoursesDetailsScreen';

export default function App() {
  return (
    <View style={styles.container}>
    {/* <HomeScreen/> */}
    {/* <CollegeDetailsScreen/> */}
    <CourseDetailsScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
