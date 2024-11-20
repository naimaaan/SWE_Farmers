import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  
  // Define the SFSymbols5_0 type
  type SFSymbols5_0 =
    | "cart.fill"
    | "heart.fill"
    | "gift.fill"
    | "star.fill"
    | "bag.fill"
    | "creditcard.fill";
  import { ThemedText } from "@/components/ThemedText";
  import { ThemedView } from "@/components/ThemedView";
  import { IconSymbol } from "@/components/ui/IconSymbol";
  
  export default function ProfileTab() {
    return (
      <ThemedView style={styles.container}>
        {/* Header Section */}
        <ImageBackground
          source={require("../../assets/images/profileback.png")}
          resizeMode="cover"
          style={styles.header}
          imageStyle={styles.headerImage} // Optional styling for the image
        >
          <IconSymbol
            size={100}
            color="#fff"
            name="person.circle" // Ensure this is a valid name from SFSymbols5_0
            style={styles.profileIcon}
          />
  
          <ThemedText style={styles.userName}>Profile 1</ThemedText>
          <ThemedText style={styles.userRole}></ThemedText>
          <TouchableOpacity style={styles.editProfileButton}>
            <ThemedText style={styles.editProfileText}>Edit Profile</ThemedText>
          </TouchableOpacity>
        </ImageBackground>
  
        {/* Grid Section */}
        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <IconSymbol
                size={30}
                color="#4CAF50"
                name={item.icon as SFSymbols5_0} // Cast to SFSymbols5_0 if you're confident these are valid names.
              />
  
              <ThemedText style={styles.gridItemText}>{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>
    );
  }
  
  const menuItems = [
    { label: "Wallet / Card", icon: "creditcard.fill" },
    { label: "Wishlist", icon: "heart.fill" },
    { label: "Open Shop", icon: "bag.fill" },
    { label: "My Orders", icon: "cart.fill" },
    { label: "Settings", icon: "gearshape.fill" },
    { label: "Logout", icon: "person.fill" },
  ];
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#E5F5E9",
    },
    header: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 30,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      overflow: "hidden", // Ensures the rounded corners are applied to the background image
    },
    headerImage: {
      opacity: 0.9,
    },
    profileIcon: {
      marginBottom: 16,
    },
    userName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
    userRole: {
      fontSize: 14,
      color: "#fff",
      marginBottom: 16,
    },
    editProfileButton: {
      backgroundColor: "#000",
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    editProfileText: {
      color: "#fff",
      fontSize: 14,
    },
    gridContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 16,
      justifyContent: "space-between",
    },
    gridItem: {
      backgroundColor: "#fff",
      width: "47%",
      aspectRatio: 1,
      marginBottom: 16,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    gridItemText: {
      marginTop: 8,
      fontSize: 14,
      color: "#4CAF50",
    },
  });
  