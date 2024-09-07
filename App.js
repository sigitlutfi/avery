import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
import MyCustomTabBar from "./components/navigation/MyTab";
import adjustColor from "./constants/adjustColor";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { ColorContext, ColorPaletteProvider } from "./contexts/ColorContext";
import { ConfigContext, ConfigProvider } from "./contexts/ConfigContext";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Belajar from "./screens/belajar/Belajar";
import DetailBelajar from "./screens/belajar/DetailBelajar";
import Subkategori from "./screens/belajar/Subkategori";
import Home from "./screens/home/Home";
import Notification from "./screens/home/Notification";
import DetailLatihan from "./screens/latihan/DetailLatihan";
import KunciJawabanAgian from "./screens/latihan/KunciJawabanAgian";
import Latihan from "./screens/latihan/Latihan";
import Summary from "./screens/latihan/Summary";
import OnboardingScreen from "./screens/OnBoarding";
import Cekot from "./screens/paket/Cekot";
import Keranjang from "./screens/paket/Keranjang";
import Paket from "./screens/paket/Paket";
import Voucher from "./screens/paket/Voucher";
import EditProfile from "./screens/profile/EditProfile";
import Profile from "./screens/profile/Profile";
import Setting from "./screens/profile/Setting";
import Splash from "./screens/Splash";
import Tryout from "./screens/tryout/Tryout";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackBelajar = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Belajar" component={Belajar} />
    <Stack.Screen name="SubKategoriBelajar" component={Subkategori} />
    <Stack.Screen name="DetailBelajar" component={DetailBelajar} />
  </Stack.Navigator>
);

const StackLatihan = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Latihan" component={Latihan} />
  </Stack.Navigator>
);

const StackHome = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Notification" component={Notification} />
  </Stack.Navigator>
);

const BottomTab = () => (
  <Tab.Navigator
    tabBar={(props) => <MyCustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen
      name="StackHome"
      component={StackHome}
      options={{ tabBarLabel: "Home" }}
      initialParams={{ icon: "home" }}
    />
    <Tab.Screen
      name="StackBelajar"
      component={StackBelajar}
      options={{ tabBarLabel: "Belajar" }}
      initialParams={{ icon: "book-sharp" }}
    />
    <Tab.Screen
      name="StackLatihan"
      component={StackLatihan}
      options={{ tabBarLabel: "Latihan" }}
      initialParams={{ icon: "document" }}
    />
    <Tab.Screen
      name="Try Out"
      component={Tryout}
      initialParams={{ icon: "documents" }}
    />
    <Tab.Screen
      name="Paket"
      component={Paket}
      initialParams={{ icon: "basket" }}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeStack" component={BottomTab} />
    <Stack.Screen name="DetailLatihan" component={DetailLatihan} />
    <Stack.Screen name="Summary" component={Summary} />
    <Stack.Screen name="KunciJawaban" component={KunciJawabanAgian} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="Setting" component={Setting} />
    <Stack.Screen name="Keranjang" component={Keranjang} />
    <Stack.Screen name="Voucher" component={Voucher} />
    <Stack.Screen name="Cekot" component={Cekot} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const OnBoardingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const fetchFonts = () => {
  return Font.loadAsync({
    "ProductSans-Black": require("./assets/fonts/ProductSans-Black.ttf"),
    "ProductSans-BlackItalic": require("./assets/fonts/ProductSans-BlackItalic.ttf"),
    "ProductSans-BoldItalic": require("./assets/fonts/ProductSans-BoldItalic.ttf"),
    "ProductSans-Bold": require("./assets/fonts/ProductSans-Bold.ttf"),
    "ProductSans-Italic": require("./assets/fonts/ProductSans-Italic.ttf"),
    "ProductSans-Light": require("./assets/fonts/ProductSans-Light.ttf"),
    "ProductSans-LightItalic": require("./assets/fonts/ProductSans-LightItalic.ttf"),
    "ProductSans-MediumItalic": require("./assets/fonts/ProductSans-MediumItalic.ttf"),
    "ProductSans-Medium": require("./assets/fonts/ProductSans-Medium.ttf"),
    "ProductSans-Regular": require("./assets/fonts/ProductSans-Regular.ttf"),
    "ProductSans-Thin": require("./assets/fonts/ProductSans-Thin.ttf"),
    "ProductSans-ThinItalic": require("./assets/fonts/ProductSans-ThinItalic.ttf"),
  });
};

const App = () => {
  const { authState } = useContext(AuthContext);
  const { colors } = useContext(ColorContext);
  const { isConfigLoading } = useContext(ConfigContext);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.",
    ]);
    const prepareApp = async () => {
      try {
        // Load custom fonts
        await fetchFonts();
        setFontLoaded(true); // Check onboarding state
      } catch (error) {
        console.warn(error);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    // Only hide splash screen when fonts are loaded and loading state is done
    if (authState.isLoading || !fontLoaded || isConfigLoading) {
      setShowSplash(true);
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 500); // Splash screen delay

      return () => clearTimeout(timer);
    }
  }, [isConfigLoading, authState.isLoading, fontLoaded]);

  if (showSplash) {
    return <Splash onTimeout={() => setShowSplash(false)} />;
  }

  return (
    <>
      <StatusBar
        backgroundColor={adjustColor(colors.primary, -12)} // Set the background color
        style="light" // Set the text color (dark or light)
        translucent={false} // Set to true if you want the status bar to overlay your app
      />
      <NavigationContainer>
        {authState.isOnboardingCompleted ? (
          authState.userToken === null ? (
            <AuthStack />
          ) : (
            <AppStack />
          )
        ) : (
          <OnBoardingStack />
        )}
      </NavigationContainer>
    </>
  );
};

const AppContainer = () => {
  return (
    <ConfigProvider>
      <AuthProvider>
        <ColorPaletteProvider>
          <NativeBaseProvider>
            <App />
          </NativeBaseProvider>
        </ColorPaletteProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default AppContainer;
