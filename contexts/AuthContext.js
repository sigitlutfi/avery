import * as SecureStore from "expo-secure-store";
import React, { createContext, useEffect, useMemo, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
  userData: null,
  isOnboardingCompleted: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        userToken: action.token,
        userData: action.userData,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
        userData: action.userData,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignOut: true,
        userToken: null,
        userData: null,
      };
    case "REONBOARDING":
      return {
        ...state,
        isOnboardingCompleted: action.onboardingstatus,
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userData;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        userData = await SecureStore.getItemAsync("userData");
        console.log("Retrieved token:", userToken);
        console.log("Retrieved data:", userData);
      } catch (e) {
        console.error("Failed to load token:", e);
      }

      const onboardingval = await SecureStore.getItemAsync(
        "onboardingCompleted"
      );

      dispatch({
        type: "REONBOARDING",
        onboardingstatus: onboardingval === "true",
      });

      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
        userData: JSON.parse(userData),
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        console.log("Signing in with data:", data);
        const userToken = data.token; // Replace with actual token logic
        const userdatajson = data.data;
        const userData = JSON.stringify(userdatajson);
        try {
          await SecureStore.setItemAsync("userToken", userToken);
          await SecureStore.setItemAsync("userData", userData);
          console.log("Token stored successfully:", userToken);
        } catch (e) {
          console.error("Failed to save token:", e);
        }
        dispatch({ type: "SIGN_IN", token: userToken, userData: userdatajson });
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync("userToken");
          await SecureStore.deleteItemAsync("userData");
          console.log("Token deleted successfully");
        } catch (e) {
          console.error("Failed to delete token:", e);
        }
        dispatch({ type: "SIGN_OUT" });
      },
      reOnBoarding: async (data) => {
        console.log(data);
        if (data.type === "on") {
          await SecureStore.deleteItemAsync("onboardingCompleted");
          dispatch({
            type: "REONBOARDING",
            onboardingstatus: "false",
          });
        } else if (data.type === "off") {
          await SecureStore.setItemAsync("onboardingCompleted", "true");
          dispatch({
            type: "REONBOARDING",
            onboardingstatus: "true",
          });
        }
      },
    }),
    []
  );
  console.log(authState);
  return (
    <AuthContext.Provider value={{ ...authContext, authState }}>
      {children}
    </AuthContext.Provider>
  );
};
