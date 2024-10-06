import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Icon, Image, Input, Pressable, Stack } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';

import Cext from './Cext';
import { ColorContext } from '../contexts/ColorContext';
import { ConfigContext } from '../contexts/ConfigContext';

const Cinput = ({
  label,
  sublabel,
  value = '', // Beri nilai default agar tidak undefined
  onChangeText = () => {}, // Fallback function jika onChangeText tidak diberikan
  placeholder = 'Enter text',
  isRequired = false, // Fitur wajib diisi
  validation = {}, // Mengelompokkan semua properti validasi
  secureTextEntry = false, // Untuk input password
  leftIcon, // Ikon di sebelah kiri
  rightIcon, // Ikon di sebelah kanan
  togglePassword = false, // Apakah input bisa toggle visibility untuk password
  inputProps = {}, // Props untuk Input
  bgProps = {},
  bg,

  focusBorderColor, // Warna border saat fokus
  focusShadow = 3, // Shadow level saat fokus

  ...props // Props untuk Box (layout, styling, dll.)
}) => {
  const { colors } = useContext(ColorContext);
  const { fonts } = useContext(ConfigContext);

  const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry); // State untuk visibility password
  const [isFocused, setIsFocused] = useState(false); // State untuk focus
  const [showError, setShowError] = useState(false); // State untuk error otomatis

  const [formattedPhoneValue, setFormattedPhoneValue] = useState(value); // Store formatted value for phone numbers

  // Mengambil properti dari validation object
  const {
    minLength,
    maxLength,
    phone = false,
    email = false, // Apakah ini email, validasi email otomatis
    errorText = null, // Pesan error
    validText = '', // Pesan validasi berhasil
  } = validation;

  // Function to format phone number specifically for Indonesia
  const formatIndonesianPhoneNumber = (number) => {
    // Remove any non-digit characters
    const cleaned = ('' + number).replace(/\D/g, '');

    // Group the digits into segments for formatting
    const match = cleaned.match(/(\d{3})(\d{3,4})(\d{0,4})?/);

    if (match) {
      const mainPart = match[1]; // First group of 3 digits
      const nextPart = match[2]; // Second group of 3 or 4 digits
      const lastPart = match[3] ? match[3] : ''; // Last group (optional)

      // Return formatted number without any country code
      return `${mainPart} ${nextPart}${lastPart ? ' ' + lastPart : ''}`;
    }

    return cleaned; // Return cleaned number if formatting is not applicable
  };

  // Call this function whenever phone input changes
  const handlePhoneChange = (text) => {
    const rawNumber = text.replace(/\D/g, ''); // Get raw digits without formatting
    const formattedNumber = formatIndonesianPhoneNumber(rawNumber); // Format the number
    setFormattedPhoneValue(formattedNumber); // Set formatted value for UI
    onChangeText(rawNumber); // Pass raw number to parent for backend submission
  };
  // Function untuk toggle visibility password
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Jika value adalah null atau undefined, ubah menjadi string kosong
  const safeValue = value ?? '';

  // Fungsi validasi email
  const isValidEmail = email
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeValue) // Regex untuk validasi email
    : true;

  // Validasi panjang input: hanya jika ada value (tidak validasi jika kosong)
  const isValidLength =
    minLength && safeValue.length > 0 ? safeValue.length >= minLength : true;
  const isUnderMaxLength =
    maxLength && safeValue.length > 0 ? safeValue.length <= maxLength : true;

  // Tentukan apakah input valid atau ada error
  const isValid = isValidLength && isUnderMaxLength && isValidEmail;

  // Tampilkan error secara otomatis jika tidak valid, atau secara manual jika dipaksa
  useEffect(() => {
    if ((!isValid && safeValue.length > 0) || errorText) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [safeValue, isValid, errorText]);

  const backgroundColor = bg || colors.box;
  const activeBorderColor = isFocused
    ? focusBorderColor || colors.primary
    : showError
      ? colors.error
      : colors.border;
  const activeShadow = isFocused ? focusShadow : null;
  const activeBorder = isFocused || showError ? 2 : null;

  // Pesan error dinamis berdasarkan validasi minLength, maxLength, dan email
  let dynamicErrorMessage = errorText;
  if (!isValidLength && minLength) {
    dynamicErrorMessage = `Minimal ${minLength} karakter diperlukan.`;
  } else if (!isUnderMaxLength && maxLength) {
    dynamicErrorMessage = `Maksimal ${maxLength} karakter diperbolehkan.`;
  } else if (!isValidEmail && email) {
    dynamicErrorMessage = 'Format email tidak valid.';
  } else if (errorText) {
    dynamicErrorMessage = errorText;
  }

  return (
    <Box {...props} bg={'transparent'}>
      {/* Label di atas input */}
      <Stack mb={1}>
        {label && (
          <HStack ml={isRequired ? -2 : 0}>
            {isRequired && (
              <Icon
                name="asterisk"
                color={colors.red}
                as={FontAwesome6}
                size={2}
              />
            )}
            <Cext medium color={colors.textLight}>
              {label}
            </Cext>
          </HStack>
        )}
        {sublabel && (
          <Cext italic fontSize={12} mb={1} color={colors.textGray}>
            {sublabel}
          </Cext>
        )}
      </Stack>
      <HStack space={2}>
        {phone && (
          <HStack
            alignItems={'center'}
            bg={backgroundColor}
            px={3}
            borderRadius={'lg'}
          >
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Flag_of_Indonesia.png/320px-Flag_of_Indonesia.png',
              }}
              alt=""
              borderRadius={'sm'}
              h={5}
              w={5}
            />
            <Cext ml={1}>+62</Cext>
          </HStack>
        )}
        <HStack
          alignItems="center"
          bg={backgroundColor}
          flex={1}
          borderRadius={'xl'}
          borderColor={showError ? colors.red : activeBorderColor}
          borderWidth={activeBorder} // Border lebih tebal untuk visibilitas
          shadow={activeShadow} // Tambahkan shadow saat focus
          {...bgProps}
          px={2}
        >
          {/* Jika ada leftIcon */}
          {leftIcon && leftIcon}
          {/* Input Field */}

          <Input
            value={phone ? formattedPhoneValue : value} // Use formatted phone value
            onChangeText={phone ? handlePhoneChange : onChangeText} // Handle phone change for phone input
            placeholder={placeholder}
            placeholderTextColor={colors.textGray}
            variant={'unstyled'}
            keyboardType={phone ? 'phone-pad' : 'ascii-capable'}
            color={colors.textLight}
            _input={{ fontFamily: fonts.regular, fontSize: 14 }}
            secureTextEntry={secureTextEntry && !isPasswordVisible} // Kondisi untuk toggle password
            borderColor={showError ? colors.error : colors.border}
            onFocus={() => setIsFocused(true)} // Ubah state saat fokus
            onBlur={() => setIsFocused(false)} // Ubah state saat blur
            {...inputProps} // Props untuk input
            flex={1} // Agar input mengisi ruang yang tersedia
          />

          {/* Jika ada rightIcon */}
          {rightIcon && !togglePassword && (
            <Icon as={rightIcon} size={5} ml={2} color={colors.textGray} />
          )}
          {/* Toggle Visibility untuk Password */}
          {togglePassword && (
            <Pressable onPress={handleTogglePasswordVisibility}>
              <Icon
                as={
                  <MaterialIcons
                    name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                  />
                }
                size={5}
                ml={2}
                color={colors.textGray}
              />
            </Pressable>
          )}
          {validText && isValid && safeValue.length > 0 && (
            <Icon
              as={MaterialIcons}
              size={5}
              ml={2}
              color={colors.mint}
              name="check"
            />
          )}
        </HStack>
      </HStack>
      {/* Display Error or Valid Text */}
      {showError && dynamicErrorMessage ? (
        <Cext color={colors.red} mt={1} fontSize="xs">
          {dynamicErrorMessage}
        </Cext>
      ) : validText && isValid && safeValue.length > 0 ? (
        <Cext color={colors.mint} mt={1} fontSize="xs">
          {' ' + validText}
        </Cext>
      ) : null}
    </Box>
  );
};

export default Cinput;
