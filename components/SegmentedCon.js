import React, { useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ColorContext } from "../contexts/ColorContext";
import Cext from "./Cext";

const SegmentedCon = React.memo(
  ({ options, selectedIndex, onOptionPress, setSelectedIndex }) => {
    const { width: windowWidth } = useWindowDimensions();
    const { colors } = useContext(ColorContext);

    const internalPadding = 20;
    const segmentedControlWidth = windowWidth - 40;
    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(itemWidth * selectedIndex + internalPadding / 2),
      };
    }, [selectedIndex, itemWidth]);

    const handlePress = (option, index) => {
      onOptionPress?.(option);
      setSelectedIndex?.(index);
    };

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 20,
            paddingLeft: internalPadding / 2,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
              borderColor: colors.primary,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              onPress={() => handlePress(option, index)}
              key={index}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}
            >
              <Cext style={styles.label}>{option}</Cext>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
  },
  activeBox: {
    position: "absolute",

    borderBottomWidth: 3,

    height: "100%",
  },
  labelContainer: { justifyContent: "center", alignItems: "center" },
  label: {
    fontSize: 16,
  },
});

export { SegmentedCon };
