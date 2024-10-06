// App.js
import { Box, Stack, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import PagerView from 'react-native-pager-view';

import AnimatedAccordionList from '../../components/Accordion';
import Board from '../../components/Board';
import Header from '../../components/Header';
import { SegmentedControl } from '../../components/SegmentedCon';

const Paket = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pagerRef = React.useRef(null);

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <Board>
      <Header />

      <Box alignItems={'center'} justifyContent={'center'}>
        <SegmentedControl
          options={['Paket Aktif', 'Riwayat']}
          selectedIndex={selectedIndex}
          onOptionPress={(option) => console.log('Selected option:', option)}
          setSelectedIndex={(index) => {
            console.log('Selected index:', index);
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
        <Stack key={'1'} flex={1} p={4}>
          <AnimatedAccordionList
            data={[
              { title: 'Item 1', content: 'This is the content for item 1.' },
              { title: 'Item 2', content: 'This is the content for item 2.' },
            ]}
          >
            <Text>sad</Text>
          </AnimatedAccordionList>
        </Stack>
        <Stack key={'2'} flex={1} p={4}>
          <AnimatedAccordionList
            data={[
              { title: 'Item 1', content: 'This is the content for item 1.' },
              { title: 'Item 2', content: 'This is the content for item 2.' },
              { title: 'Item 2', content: 'This is the content for item 2.' },
            ]}
          >
            <Text>sad</Text>
          </AnimatedAccordionList>
        </Stack>
      </PagerView>
    </Board>
  );
};

export default Paket;
