import { Box, Pressable } from "native-base";
import React, { useContext } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Cext from "../components/Cext";
import { ColorContext } from "../contexts/ColorContext";

// Create AnimatedPressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Cutton = ({
  onPress,
  bg,
  center = false,
  full = false,
  title,
  fontSize = 16,
  var: variant = "default",
  children,
  w = "auto",
  h = "auto",
  disabled = false, // Add disabled prop with a default value of false
  ...props
}) => {
  // Get colors from the ColorContext
  const { colors } = useContext(ColorContext);

  // Set the default background color to colors.primary if bg is not provided
  const backgroundColor = bg || colors.primary;

  // Reanimated shared values for scale
  const scale = useSharedValue(1);

  // Reanimated animated style for scaling effect
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Handle press in and out to scale button
  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.9); // Slightly scale down on press
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1); // Scale back to normal
    }
  };

  // Determine button styles based on the variant prop
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return {
          bg: "transparent",
          borderWidth: 2,
          borderColor: backgroundColor,
        };
      case "ghost":
        return {
          bg: "transparent",
        };
      default:
        return {
          bg: backgroundColor,
        };
    }
  };

  // Determine opacity and pointer events for disabled state
  const disabledStyles = disabled
    ? {
        opacity: 0.5, // Visually indicate the button is disabled
        pointerEvents: "none", // Prevent interactions when disabled
      }
    : {
        opacity: 1,
        pointerEvents: "auto",
      };

  return (
    <AnimatedPressable
      onPress={!disabled ? onPress : null} // Disable onPress when the button is disabled
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
      style={[
        animatedStyle,
        {
          alignSelf: full ? "stretch" : "auto",
          width: "auto",
          overflow: "hidden",
          justifyContent: center ? "center" : "flex-start",
          ...disabledStyles, // Apply disabled styles
        },
      ]}
    >
      <Box
        px={4}
        py={2}
        alignItems="center"
        justifyContent="center"
        flexDir={"row"}
        borderRadius="8"
        {...getVariantStyles()}
        width={w}
        height={h}
      >
        {children ? (
          children
        ) : (
          <Cext
            color={
              variant === "outline"
                ? backgroundColor
                : variant === "ghost"
                ? colors.primary
                : "white"
            }
            fontWeight="bold"
            fontSize={fontSize}
          >
            {title}
          </Cext>
        )}
      </Box>
    </AnimatedPressable>
  );
};

export default Cutton;
