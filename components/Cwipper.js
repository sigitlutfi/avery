import { Ionicons } from "@expo/vector-icons";
import { Icon } from "native-base";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ColorContext } from "../contexts/ColorContext";

const { width } = Dimensions.get("window");

const Cwipper = ({
  children,
  autoplay = false,
  interval = 3000,
  loop = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useContext(ColorContext);
  const scrollViewRef = useRef();
  const intervalRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = Math.ceil(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(scrollPosition);
  };

  const scrollToIndex = useCallback(
    (index) => {
      scrollViewRef.current.scrollTo({ x: index * width, animated: true });
      setActiveIndex(index);
    },
    [scrollViewRef, setActiveIndex]
  );

  const nextSlide = useCallback(() => {
    if (activeIndex < React.Children.count(children) - 1) {
      scrollToIndex(activeIndex + 1);
    } else if (loop) {
      scrollToIndex(0); // Loop back to the first slide
    }
  }, [activeIndex, children, loop, scrollToIndex]);

  const previousSlide = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    } else if (loop) {
      scrollToIndex(React.Children.count(children) - 1); // Loop to the last slide
    }
  };

  // Autoplay logic
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);

      return () => clearInterval(intervalRef.current); // Cleanup on unmount or when autoplay changes
    }
  }, [autoplay, activeIndex, interval, nextSlide]);

  return (
    <View style={styles.carouselContainer}>
      {/* Carousel Items */}
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {React.Children.map(children, (child) => (
          <View style={{ width }}>{child}</View>
        ))}
      </ScrollView>

      {/* Left Arrow */}
      {activeIndex > 0 || loop ? (
        <TouchableOpacity style={styles.leftArrow} onPress={previousSlide}>
          <Icon as={Ionicons} name="chevron-back" size={12} />
        </TouchableOpacity>
      ) : null}

      {/* Right Arrow */}
      {activeIndex < React.Children.count(children) - 1 || loop ? (
        <TouchableOpacity style={styles.rightArrow} onPress={nextSlide}>
          <Icon as={Ionicons} name="chevron-forward" size={12} />
        </TouchableOpacity>
      ) : null}

      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {React.Children.map(children, (_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor:
                  index === activeIndex ? colors.textLight : colors.textGray,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: "relative",
    width: "100%",
    height: 280,
    paddingBottom: 16,
  },
  leftArrow: {
    position: "absolute",
    top: "50%",
    left: 10,
    transform: [{ translateY: -15 }],
    zIndex: 1,
  },
  rightArrow: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -15 }],
    zIndex: 1,
  },
  arrowText: {
    fontSize: 30,
    color: "#000",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Cwipper;
