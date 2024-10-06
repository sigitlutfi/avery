import { Ionicons } from '@expo/vector-icons';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Icon,
  Modal,
  Pressable,
} from 'native-base';
import React, { useContext, useState } from 'react';

import Cext from './Cext';
import { ColorContext } from '../contexts/ColorContext';
import { ConfigContext } from '../contexts/ConfigContext';

const YearPicker = ({
  minYear = new Date().getFullYear() - 3,
  maxYear = new Date().getFullYear(),
  onYearSelect = () => {}, // Default empty function
  ...props
}) => {
  const { config, setConfigValue } = useContext(ConfigContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    config.tahun ? config.tahun : maxYear
  );
  const { colors } = useContext(ColorContext);

  // Create a list of years from minYear to maxYear
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => maxYear - index
  );

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setShowModal(false);
    setConfigValue('tahun', year); // Update the 'tahun' in the config
    onYearSelect(year); // Pass the selected year back to the parent or handler
  };

  return (
    <>
      <Button {...props} size={'sm'} onPress={() => setShowModal(true)}>
        <HStack alignItems={'center'}>
          <Cext color={'white'}>Tahun {selectedYear}</Cext>
          <Icon as={Ionicons} name="chevron-down" color={'white'} ml={1} />
        </HStack>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header bg={colors.box}>
            <Cext>Pilih tahun</Cext>
          </Modal.Header>
          <Modal.Body bg={colors.bg}>
            <FlatList
              data={years}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleYearSelect(item)}>
                  <Box
                    padding="4"
                    borderBottomWidth="1"
                    borderBottomColor="gray.200"
                  >
                    <Cext>{item}</Cext>
                  </Box>
                </Pressable>
              )}
              keyExtractor={(item) => item.toString()}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* Display the selected year */}
    </>
  );
};

export default YearPicker;
