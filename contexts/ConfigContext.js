import axios from "axios";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useCallback, useEffect, useState } from "react";
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
  const [fontFamily, setFontFamily] = useState([
    { fam: "ProductSans", active: true },
    { fam: "Montserrat", active: false },
    { fam: "Poppins", active: false },
    { fam: "Lato", active: false },
    { fam: "Avenir", active: false },
  ]); // Default font family
  const [error, setError] = useState(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [fonts, setFonts] = useState({
    black: "ProductSans-Black",
    "bold-italic": "ProductSans-BoldItalic",
    bold: "ProductSans-Bold",
    italic: "ProductSans-Italic",
    medium: "ProductSans-Medium",
    regular: "ProductSans-Regular",
  });

  useEffect(() => {
    loadConfig(); // Call the loadConfig function
  }, [loadConfig]);

  const loadFonts = () => {
    // Load all the font styles for each family
    return Font.loadAsync({
      "ProductSans-Black": require("../assets/fonts/ProductSans/ProductSans-Black.ttf"),
      "ProductSans-BoldItalic": require("../assets/fonts/ProductSans/ProductSans-BoldItalic.ttf"),
      "ProductSans-Bold": require("../assets/fonts/ProductSans/ProductSans-Bold.ttf"),
      "ProductSans-Italic": require("../assets/fonts/ProductSans/ProductSans-Italic.ttf"),
      "ProductSans-Medium": require("../assets/fonts/ProductSans/ProductSans-Medium.ttf"),
      "ProductSans-Regular": require("../assets/fonts/ProductSans/ProductSans-Regular.ttf"),

      "Montserrat-Black": require("../assets/fonts/Montserrat/Montserrat-Black.ttf"),
      "Montserrat-BoldItalic": require("../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf"),
      "Montserrat-Bold": require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
      "Montserrat-Italic": require("../assets/fonts/Montserrat/Montserrat-Italic.ttf"),
      "Montserrat-Medium": require("../assets/fonts/Montserrat/Montserrat-Medium.ttf"),
      "Montserrat-Regular": require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),

      "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
      "Poppins-BoldItalic": require("../assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
      "Poppins-Italic": require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),

      "Lato-Black": require("../assets/fonts/Lato/Lato-Black.ttf"),
      "Lato-BoldItalic": require("../assets/fonts/Lato/Lato-BoldItalic.ttf"),
      "Lato-Bold": require("../assets/fonts/Lato/Lato-Bold.ttf"),
      "Lato-Italic": require("../assets/fonts/Lato/Lato-Italic.ttf"),
      "Lato-Medium": require("../assets/fonts/Lato/Lato-Medium.ttf"),
      "Lato-Regular": require("../assets/fonts/Lato/Lato-Regular.ttf"),

      "Avenir-Black": require("../assets/fonts/Avenir/Avenir-Black.ttf"),
      "Avenir-BoldItalic": require("../assets/fonts/Avenir/Avenir-BoldItalic.ttf"),
      "Avenir-Bold": require("../assets/fonts/Avenir/Avenir-Bold.ttf"),
      "Avenir-Italic": require("../assets/fonts/Avenir/Avenir-Italic.ttf"),
      "Avenir-Medium": require("../assets/fonts/Avenir/Avenir-Medium.ttf"),
      "Avenir-Regular": require("../assets/fonts/Avenir/Avenir-Regular.ttf"),
    });
  };

  const loadConfig = useCallback(async () => {
    let storedConfig = null;
    try {
      // Attempt to fetch the configuration from the API
      const response = await axios.get("https://simppd-mappi.simda.net");
      const fetchedConfig = response.data.success
        ? response.data.data
        : defaultConfig;

      // Update the config state with fetched data and mark source
      setConfig((prevConfig) => ({
        ...prevConfig,
        ...fetchedConfig,
        from: "url",
      }));

      // Store the fetched config in SecureStore
      await SecureStore.setItemAsync(
        "appConfig",
        JSON.stringify(fetchedConfig)
      );

      // Load fonts (ensure this is defined elsewhere)
      await loadFonts();

      const savedFontFamily = await SecureStore.getItemAsync("fontFamily");
      if (savedFontFamily) {
        setFontFamily(JSON.parse(savedFontFamily));
      }
    } catch (err) {
      console.error("Failed to fetch config from API", err);

      try {
        // If API fetch fails, try to load configuration from SecureStore
        storedConfig = await SecureStore.getItemAsync("appConfig");

        if (storedConfig) {
          const parsedConfig = JSON.parse(storedConfig);
          setConfig((prevConfig) => ({
            ...prevConfig,
            ...parsedConfig,
            from: "store",
          }));
        } else {
          // If SecureStore is also empty, fall back to default configuration
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
      setIsConfigLoading(false); // Mark loading as complete
    }
  }, []); // Include dependencies if any

  useEffect(() => {
    const getActiveFontFamily = () => {
      const activeFont = fontFamily.find((font) => font.active);
      return activeFont ? activeFont.fam : null;
    };

    const activeFontFamily = getActiveFontFamily();
    if (activeFontFamily) {
      setFonts((prevFonts) => {
        const updatedFonts = {};
        Object.keys(prevFonts).forEach((key) => {
          // Extract the current font family prefix from the font name
          const currentFontFamily = prevFonts[key].split("-")[0]; // Gets "ProductSans" or "Montserrat"

          // Replace the current font family with the target family (e.g., "Poppins")
          updatedFonts[key] = prevFonts[key].replace(
            currentFontFamily,
            activeFontFamily
          );
        });
        return updatedFonts; // Ensure the updated fonts are returned and set in the state
      });
    }
  }, [fontFamily]);

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

  const changeFontFamily = async (selectedFamily) => {
    const updatedFontFamilies = fontFamily.map((font) => ({
      ...font,
      active: font.fam === selectedFamily, // Set the selected family to active, others to false
    }));
    alert(JSON.stringify(updatedFontFamilies));
    setFontFamily(updatedFontFamilies); // Update state with new fontFamily

    // Save updated fontFamily to SecureStore
    try {
      await SecureStore.setItemAsync(
        "fontFamily",
        JSON.stringify(updatedFontFamilies)
      );
    } catch (err) {
      console.error("Failed to save fontFamily to SecureStore", err);
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
      value={{
        config,
        clearConfig,
        setConfigValue,
        isConfigLoading,
        fonts,
        fontFamily,
        changeFontFamily,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
