import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/id'; // Import Indonesian locale for moment.js
import { Box, HStack, Icon, Pressable } from 'native-base';
import React, { useContext, useState } from 'react';

import Cext from './Cext';
import { ColorContext } from '../contexts/ColorContext';

const DatePickerComponent = ({
  label,
  value,
  onChange,
  mode = 'date',
  display = 'default',
}) => {
  const { colors } = useContext(ColorContext);
  const [showPicker, setShowPicker] = useState(false);

  // Ensure moment uses the Indonesian locale
  moment.locale('id');

  // Handle date change from the picker
  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      // User pressed "Cancel", do not update the date
      setShowPicker(false);
      return;
    }

    const currentDate = selectedDate || value;
    setShowPicker(false);
    onChange(currentDate); // Pass the selected date to the parent
  };

  return (
    <Box>
      <Cext medium color={colors.textLight}>
        {label}
      </Cext>
      <Pressable
        onPress={() => setShowPicker(true)}
        bg={colors.box}
        p={2}
        borderRadius={'lg'}
      >
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Cext>
            {value ? moment(value).format('DD MMMM YYYY') : 'Pilih Tanggal'}
          </Cext>
          <Icon as={Ionicons} name="chevron-forward" />
        </HStack>
      </Pressable>
      {showPicker && (
        <DateTimePicker
          value={value || new Date()} // Default to current date
          maximumDate={new Date()}
          mode={mode}
          display={display}
          locale="id" // Ensure DateTimePicker uses Indonesian locale
          positiveButton={{ label: 'Ok', textColor: colors.primary }}
          negativeButton={{ label: 'Batal', textColor: colors.accent }}
          onChange={handleDateChange}
        />
      )}
    </Box>
  );
};

export default DatePickerComponent;
