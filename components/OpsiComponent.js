import { FontAwesome6 } from '@expo/vector-icons';
import { Box, Stack, HStack, Icon } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Checkbox, PaperProvider } from 'react-native-paper';

import Cext from './Cext';
import { ColorContext } from '../contexts/ColorContext';

const OpsiComponent = ({
  label,
  sublabel,
  options,
  selectedValue,
  onChange,
  radio = false,
  isRequired = false, // Untuk validasi required
  validation = {}, // Validasi tambahan (misal: min selection)

  bg,
  bgProps = {}, // Props untuk Box background

  ...props // Props tambahan
}) => {
  const [selected, setSelected] = useState(selectedValue || []);
  const { colors } = useContext(ColorContext);

  const [showError, setShowError] = useState(false); // Untuk menampilkan error
  const [hasTouched, setHasTouched] = useState(false); // Untuk validasi setelah user menyentuh
  // Extract validation properties
  // Validasi minimal pilihan
  const { minSelection, errorText = null, validText = null } = validation;

  // Fungsi untuk validasi jumlah pilihan
  const isValid = selected.length >= (minSelection || 0);

  // Auto-show error based on validity
  useEffect(() => {
    if ((!isValid && hasTouched) || errorText) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [selected, isValid, hasTouched, errorText]);

  // Handle perubahan checkbox
  const handleCheckboxChange = (value) => {
    setHasTouched(true); // Menandakan user telah menyentuh
    let updatedSelected;
    if (selected.includes(value)) {
      updatedSelected = selected.filter((item) => item !== value);
    } else {
      updatedSelected = [...selected, value];
    }
    setSelected(updatedSelected);
    onChange(updatedSelected); // Pass to parent
  };

  // Handle perubahan radio button
  const handleRadioChange = (value) => {
    setHasTouched(true); // Menandakan user telah menyentuh
    setSelected(value);
    onChange(value);
  };

  // Dynamic error message
  let dynamicErrorMessage = errorText;
  if (!isValid && minSelection) {
    dynamicErrorMessage = `Pilih minimal ${minSelection} opsi.`;
  }

  const backgroundColor = bg || colors.box;

  return (
    <PaperProvider>
      <Box {...props} bg={'transparent'}>
        {/* Label dan sublabel */}
        <Stack mb={1}>
          {label && (
            <HStack ml={isRequired ? -2 : 0} justifyContent={'space-between'}>
              <HStack>
                {isRequired && (
                  <Icon
                    name="asterisk"
                    color={colors.red}
                    as={FontAwesome6}
                    size={2}
                  />
                )}
                <Stack>
                  <Cext medium color={colors.textLight}>
                    {label}
                  </Cext>
                  {sublabel && (
                    <Cext italic fontSize={12} mb={1} color={colors.textGray}>
                      {sublabel}
                    </Cext>
                  )}
                </Stack>
              </HStack>
              {isRequired && (
                <Cext
                  italic
                  color={colors.textGray}
                  alignSelf={'flex-end'}
                  fontSize={13}
                >
                  Wajib diisi
                </Cext>
              )}
            </HStack>
          )}
        </Stack>

        {/* Radio Button Mode */}
        {radio ? (
          <Box bg={backgroundColor} p={2} borderRadius={'lg'} {...bgProps}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.key}
                onPress={() => handleRadioChange(option.value)}
              >
                <Box flexDirection="row" alignItems="center" mb={2}>
                  <View
                    style={{
                      height: 18,
                      width: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: colors.accent,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}
                  >
                    {selected === option.value && (
                      <View
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: 4,
                          backgroundColor: colors.accent,
                        }}
                      />
                    )}
                  </View>
                  <Cext color={colors.textLight}>{option.label}</Cext>
                </Box>
              </TouchableOpacity>
            ))}
          </Box>
        ) : (
          // Checkbox Mode
          <Box bg={backgroundColor} p={2} borderRadius={'lg'} {...bgProps}>
            {options.map((option) => (
              <Box key={option.key} flexDirection="row" alignItems="center">
                <Checkbox
                  status={
                    selected.includes(option.value) ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleCheckboxChange(option.value)}
                  color={colors.accent}
                />
                <Cext
                  onPress={() => handleCheckboxChange(option.value)}
                  ml={2}
                  color={colors.textLight}
                >
                  {option.label}
                </Cext>
              </Box>
            ))}
          </Box>
        )}

        {/* Display Error or Valid Text */}
        {showError && dynamicErrorMessage ? (
          <Cext color={colors.red} mt={1} fontSize="xs">
            {dynamicErrorMessage}
          </Cext>
        ) : validText || (isValid && selected.length > 0) ? (
          <Cext color={colors.mint} mt={1} fontSize="xs">
            {validText}
          </Cext>
        ) : null}
      </Box>
    </PaperProvider>
  );
};

export default OpsiComponent;
