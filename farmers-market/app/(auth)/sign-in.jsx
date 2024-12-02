import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

// Import axios and SecureStore
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const SERVER_IP = '192.168.160.18:8000'; // Replace with your actual IP address

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      // Make an API call to your Django server's login endpoint
      const response = await axios.post(
        `http://${SERVER_IP}/api/login/`, // Adjusted to your token endpoint
        {
          username: form.username,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 100000, // Set a timeout as needed
        }
      );

      if (response.status === 200) {
        const { access, refresh, user } = response.data;

        // Store tokens securely in SecureStore
        await SecureStore.setItemAsync('accessToken', access);
        await SecureStore.setItemAsync('refreshToken', refresh);

        // Store user information (e.g., username, email, etc.)
        setUser(user);
        setIsLogged(true);

        // Show success message
        Alert.alert("Success", "User signed in successfully");

        // Redirect to the home page or desired screen
        router.replace("/home");
      } else {
        Alert.alert("Error", "Failed to sign in");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      if (error.response) {
        Alert.alert("Error", error.response.data.detail || "Server Error");
      } else if (error.request) {
        Alert.alert("Error", "No response received from server");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.farm}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to FarmersMarket
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry={true} // Secure password input
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
