import { Box, HStack, Icon, Input, Pressable } from "native-base";
import React, { useContext, useEffect, useState } from "react";

import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { ColorContext } from "../contexts/ColorContext";
import Cext from "./Cext";

const Cinput = ({
  label,
  value = "", // Beri nilai default agar tidak undefined
  onChangeText = () => {}, // Fallback function jika onChangeText tidak diberikan
  placeholder = "Enter text",
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
  forceShowError = false, // Paksa untuk menampilkan error manual
  ...props // Props untuk Box (layout, styling, dll.)
}) => {
  const { colors } = useContext(ColorContext);

  const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry); // State untuk visibility password
  const [isFocused, setIsFocused] = useState(false); // State untuk focus
  const [showError, setShowError] = useState(false); // State untuk error otomatis

  // Mengambil properti dari validation object
  const {
    minLength,
    maxLength,
    email = false, // Apakah ini email, validasi email otomatis
    errorText = "", // Pesan error
    validText = "", // Pesan validasi berhasil
  } = validation;

  // Function untuk toggle visibility password
  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Jika value adalah null atau undefined, ubah menjadi string kosong
  const safeValue = value ?? "";

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
    if ((!isValid && safeValue.length > 0) || forceShowError) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [safeValue, isValid, forceShowError]);

  const backgroundColor = bg || colors.box;
  const activeBorderColor = isFocused
    ? focusBorderColor || colors.primary
    : showError
      ? colors.error
      : colors.border;
  const activeShadow = isFocused ? focusShadow : null;
  const activeBorder = isFocused ? 2 : null;

  // Pesan error dinamis berdasarkan validasi minLength, maxLength, dan email
  let dynamicErrorMessage = errorText;
  if (!isValidLength && minLength) {
    dynamicErrorMessage = `Minimal ${minLength} karakter diperlukan.`;
  } else if (!isUnderMaxLength && maxLength) {
    dynamicErrorMessage = `Maksimal ${maxLength} karakter diperbolehkan.`;
  } else if (!isValidEmail && email) {
    dynamicErrorMessage = "Format email tidak valid.";
  }

  return (
    <Box {...props} bg={colors.bg}>
      {/* Label di atas input */}
      {label && (
        <HStack ml={isRequired ? -1 : 0}>
          {isRequired && (
            <Icon
              name="asterisk"
              color={colors.red}
              as={FontAwesome6}
              size={2}
            />
          )}
          <Cext black mb={1} color={colors.textLight}>
            {label}
          </Cext>
        </HStack>
      )}

      <HStack
        alignItems="center"
        bg={backgroundColor}
        borderRadius={"xl"}
        borderColor={showError ? colors.red : activeBorderColor}
        borderWidth={activeBorder} // Border lebih tebal untuk visibilitas
        shadow={activeShadow} // Tambahkan shadow saat focus
        {...bgProps}
        px={2}
      >
        {/* Jika ada leftIcon */}
        {leftIcon && (
          <Icon as={leftIcon} size={5} mr={2} color={colors.textGray} />
        )}
        {/* Input Field */}
        <Input
          value={safeValue} // Gunakan safeValue yang tidak akan undefined
          onChangeText={onChangeText} // Gunakan fallback jika onChangeText tidak diberikan
          placeholder={placeholder}
          placeholderTextColor={colors.textGray}
          variant={"unstyled"}
          color={colors.textLight}
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
                  name={isPasswordVisible ? "visibility" : "visibility-off"}
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

      {/* Display Error or Valid Text */}
      {showError && dynamicErrorMessage ? (
        <Cext color={colors.red} mt={1} fontSize="xs">
          {dynamicErrorMessage}
        </Cext>
      ) : validText && isValid && safeValue.length > 0 ? (
        <Cext color={colors.mint} mt={1} fontSize="xs">
          {" " + validText}
        </Cext>
      ) : null}
    </Box>
  );
};

export default Cinput;
