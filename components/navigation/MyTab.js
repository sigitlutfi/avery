import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ColorContext } from "../../contexts/ColorContext"; // Adjust the path as needed

function MyCustomTabBar({ state, descriptors, navigation }) {
  const { colors } = useContext(ColorContext); // Get colors from context
  const { primary } = colors; // Extract primary color from context

  return (
    <View
      style={[
        styles.tabBar,
        { borderTopColor: primary, backgroundColor: colors.box },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconName = route.params?.icon || "alert-circle-outline";

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? colors.primary : colors.lightgray} // Use primary color for focused state
            />
            <Text
              style={{
                color: isFocused ? colors.primary : colors.lightgray, // Use primary color for focused state
                fontSize: 12,
                fontWeight: isFocused ? "bold" : "400",
              }}
            >
              {options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 60,
    marginTop: -4,
    borderTopWidth: 3,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default MyCustomTabBar;
