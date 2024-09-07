import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

// Define your default configuration here
const defaultConfig = {
  tahun: 2024,
  icon: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg",
  name_app: "Default App Name",
  subname_app: "Default Subname",
  daerah: "Default Region",
  url: "https://simppd-mappi.simda.net",
  from: "default", // Default value
  offline: false, // Default status
};

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);
  const [error, setError] = useState(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);

  useEffect(() => {
    loadConfig(); // Call the loadConfig function
  }, []);

  const loadConfig = async () => {
    let storedConfig = null;
    try {
      // First, try to fetch the config from the API
      const response = await axios.get("https://example.com/api/config");
      const fetchedConfig = response.data;

      // If successful, set the config to the fetched data and store it
      setConfig((prevConfig) => ({
        ...prevConfig,
        ...fetchedConfig,
        from: "url", // Mark that it's from the API
      }));

      await SecureStore.setItemAsync(
        "appConfig",
        JSON.stringify(fetchedConfig)
      );
    } catch (err) {
      console.error("Failed to fetch config from API", err);

      try {
        // If API fetch fails, try to load from SecureStore
        storedConfig = await SecureStore.getItemAsync("appConfig");

        if (storedConfig) {
          const parsedConfig = JSON.parse(storedConfig);
          setConfig((prevConfig) => ({
            ...prevConfig,
            ...parsedConfig,
            from: "store", // Mark that it's from SecureStore
          }));
        } else {
          // If SecureStore is also empty, use default config
          setConfig((prevConfig) => ({
            ...prevConfig,
            from: "default",
          }));
        }
      } catch (storeErr) {
        console.error("Failed to load config from SecureStore", storeErr);
        setError("Failed to load config from API and storage. Using default.");
      }
    } finally {
      setIsConfigLoading(false); // Set to false once loading is complete
    }
  };

  const retryLoadConfig = async () => {
    setError(null);
    setIsConfigLoading(true); // Set loading state to true

    await loadConfig(); // Retry loading the config
  };

  const clearConfig = async () => {
    try {
      await SecureStore.deleteItemAsync("appConfig");
      setConfig(defaultConfig); // Reset to default configuration
      console.log("Configuration cleared from SecureStore");
    } catch (err) {
      console.error("Failed to clear configuration from SecureStore", err);
    }
  };

  const setConfigValue = async (key, value) => {
    try {
      const updatedConfig = { ...config, [key]: value };
      setConfig(updatedConfig); // Update the state

      // Store the updated config locally
      await SecureStore.setItemAsync(
        "appConfig",
        JSON.stringify(updatedConfig)
      );
    } catch (err) {
      console.error("Failed to update config", err);
    }
  };

  if (isConfigLoading) {
    return null; // Render nothing while splash screen is shown
  }

  if (error) {
    // If there's an error, keep the splash screen and show an error message
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 20, color: "red" }}>{error}</Text>
        <Button title="Retry" onPress={retryLoadConfig} />
      </View>
    );
  }

  return (
    <ConfigContext.Provider
      value={{ config, clearConfig, setConfigValue, isConfigLoading }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
