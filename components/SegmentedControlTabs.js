// SegmentedControl.js
import React from "react";
import { StyleSheet } from "react-native";

import SegmentedControl from "@react-native-segmented-control/segmented-control";

const SegmentedControlTabs = ({ onChange, selectedIndex }) => {
  return (
    <SegmentedControl
      values={["Tab 1", "Tab 2", "Tab 3"]}
      selectedIndex={selectedIndex}
      onChange={(event) => onChange(event.nativeEvent.selectedSegmentIndex)}
      style={styles.segmentedControl}
    />
  );
};

const styles = StyleSheet.create({
  segmentedControl: {
    margin: 10,
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: 5,
  },
});

export default SegmentedControlTabs;
