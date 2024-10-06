import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Box, Button, FlatList, Icon, IconButton, Modal } from 'native-base';
import React, { useContext, useState } from 'react';
import { Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import ImageViewing from 'react-native-image-viewing';

import Cext from './Cext';
import Cutton from './Cutton'; // Assuming Cutton is a custom button component
import { ColorContext } from '../contexts/ColorContext';

export default function ImagePickerComponent({
  label,
  onImagesSelected,
  single = false, // Opsi untuk single image
}) {
  const { colors } = useContext(ColorContext);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For zoom feature
  const [isPickerModalVisible, setPickerModalVisible] = useState(false);
  const { width } = useWindowDimensions();

  // Menghitung lebar item berdasarkan rumus
  const itemWidth = (width - 16 * 4) / 3;

  // Function to pick images from gallery or camera
  const pickImage = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;

      // Cek apakah gambar sudah ada dalam state
      if (!images.includes(newImageUri)) {
        let newImages;
        if (single) {
          newImages = [newImageUri]; // Hanya satu gambar yang diizinkan jika single image mode aktif
        } else {
          newImages = [...images, newImageUri];
        }

        setImages(newImages);

        if (onImagesSelected) {
          onImagesSelected(newImages); // Kirim gambar yang dipilih ke parent component
        }
      }
    }
    setPickerModalVisible(false);
  };

  // Function to remove image
  const removeImage = (uri) => {
    const updatedImages = images.filter((image) => image !== uri);
    setImages(updatedImages);

    if (onImagesSelected) {
      onImagesSelected(updatedImages); // Update the parent component with new list of images
    }
  };

  return (
    <Box>
      <Cext medium color={colors.textLight} mb={1}>
        {label}
      </Cext>
      <Cutton
        onPress={() => setPickerModalVisible(true)}
        disabled={single && images.length > 0} // Disable button jika single image sudah dipilih
        bg={colors.box}
      >
        <Icon as={Ionicons} name="add" color={colors.accent} mr={2} size={4} />
        <Cext>Pilih gambar</Cext>
      </Cutton>

      {/* Modal untuk memilih dari kamera atau galeri */}
      <Modal
        isOpen={isPickerModalVisible}
        onClose={() => setPickerModalVisible(false)}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Pilih Gambar</Modal.Header>
          <Modal.Body>
            <Button onPress={() => pickImage('gallery')}>
              Pilih dari Galeri
            </Button>
            <Button onPress={() => pickImage('camera')} mt={4}>
              Ambil dari Kamera
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* FlatList for displaying images */}
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        mt={2}
        renderItem={({ item }) => (
          <Box position="relative" w={itemWidth} h={itemWidth} mb={4} mr={4}>
            <TouchableOpacity onPress={() => setSelectedImage(item)}>
              <Image
                source={{ uri: item }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
              />
            </TouchableOpacity>

            {/* Tombol hapus */}
            <IconButton
              icon={
                <Icon as={MaterialIcons} name="close" size="xs" color="white" />
              }
              position="absolute"
              top={1}
              right={1}
              onPress={() => removeImage(item)}
              _pressed={{
                bg: 'red.600',
              }}
              bg="rgba(0, 0, 0, 0.6)"
              borderRadius="full"
              zIndex={1}
            />
          </Box>
        )}
      />

      {/* ImageViewing component for zooming */}
      {selectedImage && (
        <ImageViewing
          images={images.map((uri) => ({ uri }))}
          imageIndex={images.indexOf(selectedImage)}
          visible={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
        />
      )}
    </Box>
  );
}
