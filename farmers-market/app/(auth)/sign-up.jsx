import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

import axios from "axios";
import * as SecureStore from "expo-secure-store";

const SERVER_URL = "http://10.101.29.54:8000"; // Replace with your actual server URL

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });

  const submit = async () => {
    const { username, email, password, password2, role } = form;

    if (!username || !email || !password || !password2 || !role) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== password2) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users/register/`,
        {
          username,
          email,
          password,
          password2,
          role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      if (response.status === 201) {
        const result = response.data;
        // Assuming the response includes access token, refresh token, and user data
        await SecureStore.setItemAsync("accessToken", result.access);
        await SecureStore.setItemAsync("refreshToken", result.refresh);

        // Store user information
        setUser(result.user);
        setIsLogged(true);

        router.replace("/home");
      } else {
        Alert.alert("Error", "Failed to create user");
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.detail ||
        "An error occurred during registration. Please try again.";
      Alert.alert("Error", errorMessage);
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
            Sign Up to FarmersMarket
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry={true}
          />

          <FormField
            title="Confirm Password"
            value={form.password2}
            handleChangeText={(e) => setForm({ ...form, password2: e })}
            otherStyles="mt-7"
            secureTextEntry={true}
          />

          <View className="mt-7">
            <Text className="text-white text-lg mb-2">Role</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={form.role}
                style={{ height: 50, color: "white" }}
                onValueChange={(itemValue) =>
                  setForm({ ...form, role: itemValue })
                }
                dropdownIconColor="white"
              >
                <Picker.Item label="Select a role" value="" color="#888" />
                <Picker.Item label="Farmer" value="farmer" />
                <Picker.Item label="Buyer" value="buyer" />
              </Picker>
            </View>
          </View>

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
