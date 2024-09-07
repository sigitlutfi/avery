import axios from "axios";
import { Toast } from "native-base";
import React, { useContext, useState } from "react";
import { Snackbar } from "react-native-paper"; // Import Snackbar from react-native-paper
import { colors } from "../constants/Colors";
import { AuthContext } from "../contexts/AuthContext"; // Adjust the import path based on your project structure

const useHttpHelper = () => {
  // Get the token from AuthContext
  const { authState } = useContext(AuthContext);
  const token = authState.userToken;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Default configurations
  const defaultConfig = {
    baseURL: "https://kip.kapuaskab.go.id/api", // Default base URL
  };

  const showErrorSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const showSuccessSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  // Helper function for POST requests
  const POST = async (url, json = {}, data = [], headers = {}) => {
    try {
      const finalUrl = defaultConfig.baseURL + url;
      const finalHeaders = {
        Authorization: `Bearer ${token}`, // Include token from AuthContext
        "Content-Type": "application/json",
        ...headers, // Merge any custom headers passed in
      };

      let requestData;

      if (Object.keys(json).length > 0) {
        requestData = json;
        finalHeaders["Content-Type"] = "application/json";
      } else {
        requestData = new FormData();
        data.forEach((item) => {
          requestData.append(item.key, item.value);
        });
        finalHeaders["Content-Type"] = "multipart/form-data";
      }

      const response = await axios.post(finalUrl, requestData, {
        headers: finalHeaders,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error in POST request:", error);
      showErrorSnackbar(error.message); // Show error message in Snackbar
      throw error;
    }
  };

  // Helper function for GET requests
  const GET = async (url, params = {}, headers = {}) => {
    try {
      const finalUrl = defaultConfig.baseURL + url;
      const finalHeaders = {
        Authorization: `Bearer ${token}`, // Include token from AuthContext
        "Content-Type": "application/json",
        ...headers, // Merge any custom headers passed in
      };

      const response = await axios.get(finalUrl, {
        headers: finalHeaders,
        params,
      });
      console.log(response);
      Toast.show({ title: "Berhasil", backgroundColor: colors.green }); // Show error message in Snackbar

      return response.data;
    } catch (error) {
      console.error("Error in GET request:", error);
      showErrorSnackbar(error.message); // Show error message in Snackbar
      throw error;
    }
  };

  const snackbarComponent = (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      duration={3000} // Customize the duration as needed
    >
      {snackbarMessage}
    </Snackbar>
  );

  return { POST, GET, snackbarComponent };
};

export default useHttpHelper;
