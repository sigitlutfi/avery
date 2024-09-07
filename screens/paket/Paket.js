// App.js
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

import { Box, Stack, Text } from "native-base";
import { useContext, useEffect } from "react";
import AnimatedAccordionList from "../../components/Accordion";
import Board from "../../components/Board";
import Header from "../../components/Header";
import { SegmentedCon } from "../../components/SegmentedCon";
import { ColorContext } from "../../contexts/ColorContext";

const Paket = () => {
  const { colors } = useContext(ColorContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState([{}, {}, {}]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  // Handler to toggle the expanded state
  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const pagerRef = React.useRef(null);

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <Board>
      <Header />

      <Box alignItems={"center"} justifyContent={"center"}>
        <SegmentedCon
          options={["Paket Aktif", "Riwayat"]}
          selectedIndex={selectedIndex}
          onOptionPress={(option) => console.log("Selected option:", option)}
          setSelectedIndex={(index) => {
            console.log("Selected index:", index);
            setSelectedIndex(index);
          }}
        />
      </Box>
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        setPage={selectedIndex}
        initialPage={0}
        onPageSelected={(e) => setSelectedIndex(e.nativeEvent.position)}
      >
        <Stack key={"1"} flex={1} p={4}>
          <AnimatedAccordionList
            data={[
              { title: "Item 1", content: "This is the content for item 1." },
              { title: "Item 2", content: "This is the content for item 2." },
            ]}
          >
            <Text>sad</Text>
          </AnimatedAccordionList>
        </Stack>
        <Stack key={"2"} flex={1} p={4}>
          <AnimatedAccordionList
            data={[
              { title: "Item 1", content: "This is the content for item 1." },
              { title: "Item 2", content: "This is the content for item 2." },
              { title: "Item 2", content: "This is the content for item 2." },
            ]}
          >
            <Text>sad</Text>
          </AnimatedAccordionList>
        </Stack>
      </PagerView>
    </Board>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginLeft: 40,
  },
  segmentedControl: {
    width: "100%",
    height: 40,

    marginBottom: 20,
  },
});

export default Paket;
