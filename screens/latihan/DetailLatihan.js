import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Pressable,
  Spinner,
  Stack,
} from 'native-base';
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import EnhancedImageViewing from 'react-native-image-viewing';
import RenderHTML from 'react-native-render-html';

import Board from '../../components/Board';
import Cext from '../../components/Cext';
import Cutton from '../../components/Cutton';
import adjustColor from '../../constants/adjustColor';
import { ColorContext } from '../../contexts/ColorContext';
import useHttpHelper from '../../helper/httpHelp';
import { useCountdownTimer } from '../../helper/timeHelper';

const DetailLatihan = ({ navigation, route }) => {
  const { tit, listSoal } = route.params;
  const { POST } = useHttpHelper();
  const { timeLeft } = useCountdownTimer();
  const { colors } = useContext(ColorContext);
  const { width } = useWindowDimensions(); // Mengambil lebar layar untuk digunakan di komponen HTML

  // const [webViewHeight, setWebViewHeight] = useState(0); // State untuk menyimpan tinggi WebView
  //const webviewRef = useRef(null); // Reference untuk WebView
  const slideAnim = useRef(new Animated.Value(0)).current; // Animasi untuk slider (0 -> tersembunyi, 1 -> ditampilkan)

  const [soalState, setSoalState] = useState([]);

  const [fontSize, setFontSize] = useState(16);
  const [showSlider, setShowSlider] = useState(false); // State untuk menampilkan/menyembunyikan slider
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(true);

  const [options, setOptions] = useState([]);
  const [html, setHtml] = useState(null);
  const [gambar, setGambar] = useState(null);
  const [tipe, setTipe] = useState(null);

  const [maxJawaban, setMaxJawaban] = useState(1);

  // useEffect(() => {
  //   if (timeLeft === '00:01') {
  //     navigation.goBack(); // Navigate back when time is 00:01
  //   }
  // }, [timeLeft, navigation]);
  // Menggunakan useEffect untuk menginisialisasi soalState setelah route.params tersedia
  useEffect(() => {
    if (listSoal.length > 0) {
      const updatedSoalState = listSoal.map((id, index) => ({
        id: id,
        active: index === 0 ? true : false, // Halaman pertama aktif secara default
        pass: false,
      }));
      setSoalState(updatedSoalState);
    }
  }, [listSoal]); // Dependency array berisi initialIds, akan dijalankan ketika initialIds berubah

  // Fungsi untuk mengganti halaman aktif
  const handlePageChange = (index) => {
    setSoalState((prevState) =>
      prevState.map((soal, soalIndex) => ({
        ...soal,
        active: soalIndex === index, // Set active hanya untuk soal yang dipilih
      }))
    );
  };

  useEffect(() => {
    const reqSoal = async () => {
      // Temukan soal yang memiliki active: true
      const activeSoal = soalState.find((soal) => soal.active === true);

      // Hanya lakukan permintaan API jika ada soal yang aktif
      if (activeSoal) {
        try {
          setLoading(true); // Mulai loading
          const result = await POST({
            url: '/api/soal',
            data: [{ key: 'soal', value: activeSoal.id }],
            c: true,
          });
          if (result.data.status === 'success') {
            if (result.data.data.soal.tipe_soal === 'gambar') {
              setTipe('gambar');
              setGambar(result.data.data.soal.soal);
            } else {
              setHtml(result.data.data.soal.soal);
              setTipe('html');
            }
            setOptions(result.data.data.jawaban);
            setMaxJawaban(result.data.data.soal.max_jawaban);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // Selesai loading
        }
      }
    };

    reqSoal();
  }, [soalState]); // Hapus loading dari dependency array

  // Store the selected options as an array
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionPress = (option) => {
    if (selectedOptions.includes(option.label)) {
      // If the option is already selected, remove it
      setSelectedOptions(selectedOptions.filter((o) => o !== option.label));
    } else if (selectedOptions.length < maxJawaban) {
      // If less than two options are selected, add the new option
      setSelectedOptions([...selectedOptions, option.label]);
    } else {
      // Optional: Display an alert or notification when the limit is reached
      alert('You can only select up to two options.');
    }
  };

  //const [counter, setCounter] = useState(0);

  // useEffect(() => {
  //   // Function to increment the counter
  //   const incrementCounter = () => {
  //     setCounter((prevCounter) => prevCounter + 1);
  //   };

  //   // Set up a timer to call incrementCounter every second
  //   const intervalId = setInterval(incrementCounter, 1000);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // Menangani perubahan animasi slide (naik atau turun)
  const toggleSlider = () => {
    if (showSlider) {
      // Animasi slide up (hilang)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true, // Gunakan native driver untuk animasi lebih halus
      }).start(() => setShowSlider(false));
    } else {
      setShowSlider(true);
      // Animasi slide down (muncul)
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  };
  // const handleWebViewMessage = (event) => {
  //   // <WebView
  //   //                 ref={webviewRef}
  //   //                 originWhitelist={['*']}
  //   //                 source={{ html }}
  //   //                 style={{ height: webViewHeight, width: '100%' }} // Tinggi WebView dinamis
  //   //                 onMessage={handleWebViewMessage} // Tangkap pesan dari WebView
  //   //                 javaScriptEnabled={true} // Aktifkan JavaScript di WebView
  //   //                 injectedJavaScript={`(function() {
  //   //                 function checkHeight() {
  //   //                     const height = document.documentElement.scrollHeight;
  //   //                     window.ReactNativeWebView.postMessage(height);
  //   //                 }
  //   //                 setInterval(checkHeight, 300);
  //   //             })();`}
  //   //               />
  //   const height = Number(event.nativeEvent.data); // Mendapatkan tinggi dari pesan WebView
  //   setWebViewHeight(height); // Set tinggi WebView berdasarkan konten HTML
  // };
  const handleSliderChange = (value) => {
    const newSize = value; // Ukuran teks baru
    setFontSize(newSize); // Set ukuran teks baru di state

    // Injeksi JavaScript untuk mengubah ukuran teks dan memulai polling
    // webviewRef.current.injectJavaScript(`
    //   (function() {
    //     // Ubah ukuran font
    //     document.body.style.fontSize = '${newSize}px';

    //     // Fungsi untuk mengirim tinggi terbaru ke React Native
    //     function sendHeight() {
    //       const height = document.documentElement.scrollHeight;
    //       window.ReactNativeWebView.postMessage(height);
    //     }

    //     // Fungsi untuk memulai polling
    //     function startPolling() {
    //       let lastHeight = 0;
    //       const intervalId = setInterval(() => {
    //         const height = document.documentElement.scrollHeight;
    //         if (height !== lastHeight) {
    //           lastHeight = height;
    //           sendHeight();
    //         }
    //       }, 300);

    //       // Hentikan polling setelah beberapa waktu jika sudah stabil
    //       setTimeout(() => {
    //         clearInterval(intervalId);
    //         sendHeight(); // Kirim tinggi terakhir
    //       }, 3000); // Hentikan polling setelah 3 detik
    //     }

    //     // Mulai polling
    //     startPolling();
    //   })();
    // `);
  };
  const isLastQuestion =
    soalState.findIndex((soal) => soal.active === true) ===
    soalState.length - 1;

  const isFirstQuestion =
    soalState.findIndex((soal) => soal.active === true) === 0;

  return (
    <Board>
      <Box zIndex={23}>
        <HStack
          p={4}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={colors.primary}
        >
          <HStack alignItems={'center'}>
            <Pressable pr={3} onPress={() => navigation.goBack()}>
              <Icon
                color={'white'}
                size={8}
                name="chevron-back"
                as={Ionicons}
              />
            </Pressable>

            <Cext ml={2} bold fontSize={16} color={'white'}>
              {tit}
            </Cext>
          </HStack>

          <HStack alignSelf={'flex-end'} space={2} m={2}>
            <Pressable onPress={toggleSlider}>
              <Box bg={'white'} shadow={3} p={2} borderRadius={'md'}>
                <Icon as={Ionicons} name="text" />
              </Box>
            </Pressable>
          </HStack>
        </HStack>
      </Box>
      {/* Tampilkan slider hanya jika showSlider true */}
      {showSlider && (
        <Animated.View
          style={{
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0], // Mulai dari -100 (tersembunyi) ke 0 (ditampilkan)
                }),
              },
            ],
          }}
        >
          <Box bg={'gray.200'}>
            <Cext alignSelf="center" my={2}>
              Ukuran teks
            </Cext>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={8}
              maximumValue={24}
              value={fontSize} // Nilai awal fontSize
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={handleSliderChange}
            />
          </Box>
        </Animated.View>
      )}
      {loading ? (
        <Center flex={1}>
          <Spinner />
        </Center>
      ) : (
        <Box flex={1}>
          <EnhancedImageViewing
            images={[{ uri: gambar }]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setVisible(false)}
          />
          <ScrollView style={{ flexGrow: 1 }}>
            <Box px={4}>
              <Stack space={2}>
                <Box
                  bg={colors.accent}
                  p={1}
                  borderRadius={'2xl'}
                  w={100}
                  alignSelf={'center'}
                  mt={4}
                >
                  <Cext
                    color={'white'}
                    bold
                    alignSelf={'center'}
                    fontSize={17}
                    borderRadius={'lg'}
                  >
                    {timeLeft}
                  </Cext>
                </Box>

                {tipe === 'html' && (
                  <Stack space={4}>
                    <Box p={2} bg={colors.box} borderRadius={'lg'}>
                      <RenderHTML
                        contentWidth={width}
                        source={{ html: html }}
                        baseStyle={{
                          color: colors.textLight,
                          fontSize: fontSize,
                        }}
                      />
                    </Box>
                    <Divider />
                    {options.map((v, i) => (
                      <Pressable
                        key={i}
                        p={2}
                        bg={
                          selectedOptions.includes(v.label)
                            ? colors.primary
                            : colors.box
                        }
                        shadow={3}
                        borderRadius={'lg'}
                        onPress={() => handleOptionPress(v)}
                        borderWidth={
                          selectedOptions.includes(v.label) ? 1.8 : 0
                        }
                        borderColor={colors.primary}
                      >
                        <HStack alignItems={'center'}>
                          <Cext
                            bold
                            fontSize={22}
                            mr={4}
                            ml={2}
                            color={
                              selectedOptions.includes(v.label)
                                ? 'white'
                                : colors.textLight
                            }
                          >
                            {v.label}
                          </Cext>

                          <RenderHTML
                            contentWidth={width}
                            source={{ html: v.jawaban }}
                            tagsStyles={{
                              p: {
                                color: selectedOptions.includes(v.label)
                                  ? colors.textDark
                                  : colors.textLight,
                              },
                            }}
                          />
                        </HStack>
                      </Pressable>
                    ))}
                  </Stack>
                )}

                {tipe === 'gambar' && (
                  <Stack space={5}>
                    <Pressable onPress={() => setVisible(true)}>
                      <Box
                        bg={colors.box}
                        borderRadius={'lg'}
                        overflow={'hidden'}
                      >
                        <Image
                          source={{
                            uri: gambar,
                          }}
                          w={'full'}
                          h={260}
                          alt=""
                        />
                      </Box>
                    </Pressable>
                    <Divider />
                    <HStack justifyContent={'space-between'}>
                      {options.map((v, i) => (
                        <Pressable
                          key={i}
                          p={2}
                          bg={
                            selectedOptions.includes(v.label)
                              ? colors.primary
                              : colors.box
                          }
                          shadow={3}
                          borderRadius={'lg'}
                          onPress={() => handleOptionPress(v)}
                          borderWidth={
                            selectedOptions.includes(v.label) ? 1.8 : 0
                          }
                          borderColor={colors.primary}
                        >
                          <Center alignItems={'center'} w={10} h={10}>
                            <Cext
                              bold
                              fontSize={22}
                              color={
                                selectedOptions.includes(v.label)
                                  ? 'white'
                                  : colors.textLight
                              }
                            >
                              {v.label}
                            </Cext>
                          </Center>
                        </Pressable>
                      ))}
                    </HStack>
                  </Stack>
                )}

                <HStack flex={1} space={2} my={4}>
                  <Cutton
                    bg={adjustColor(colors.accent, -15)}
                    disabled={isFirstQuestion}
                    onPress={() => {
                      setSoalState((prevState) => {
                        // Cari soal aktif saat ini
                        const currentIndex = prevState.findIndex(
                          (soal) => soal.active === true
                        );

                        // Buat salinan soalState
                        const updatedSoalState = [...prevState];

                        // Nonaktifkan soal yang aktif saat ini
                        if (currentIndex !== -1) {
                          updatedSoalState[currentIndex].active = false;
                        }

                        // Aktifkan soal sebelumnya, jika ada
                        const prevIndex = currentIndex - 1;
                        if (prevIndex >= 0) {
                          updatedSoalState[prevIndex].active = true;
                        }

                        return updatedSoalState; // Kembalikan soalState yang sudah diperbarui
                      });
                    }}
                    flex={1}
                  >
                    <HStack alignItems={'center'} justifyContent={'center'}>
                      <Icon
                        mr={2}
                        as={Ionicons}
                        name="arrow-back-circle"
                        color={'white'}
                      />
                      <Cext color={'white'}>Sebelumnya</Cext>
                    </HStack>
                  </Cutton>
                  <Cutton
                    disabled={isLastQuestion}
                    bg={colors.accent}
                    onPress={() => {
                      setSoalState((prevState) => {
                        // Cari soal aktif saat ini
                        const currentIndex = prevState.findIndex(
                          (soal) => soal.active === true
                        );

                        // Buat salinan soalState
                        const updatedSoalState = [...prevState];

                        // Nonaktifkan soal yang aktif saat ini
                        if (currentIndex !== -1) {
                          updatedSoalState[currentIndex].active = false;
                        }

                        // Aktifkan soal berikutnya, jika ada
                        const nextIndex = currentIndex + 1;
                        if (nextIndex < updatedSoalState.length) {
                          updatedSoalState[nextIndex].active = true;
                        }

                        return updatedSoalState; // Kembalikan soalState yang sudah diperbarui
                      });
                    }}
                    flex={1}
                  >
                    <HStack alignItems={'center'} justifyContent={'center'}>
                      <Cext color={'white'}>Berikutnya</Cext>
                      <Icon
                        ml={2}
                        as={Ionicons}
                        name="arrow-forward-circle"
                        color={'white'}
                      />
                    </HStack>
                  </Cutton>
                </HStack>
              </Stack>
            </Box>
          </ScrollView>
        </Box>
      )}
      <Box
        bg={colors.box}
        p={2}
        borderTopWidth={3}
        borderColor={colors.primary}
        borderTopRadius={6}
      >
        <ScrollView horizontal contentContainerStyle={{ alignItems: 'center' }}>
          {soalState.map((v, i) => (
            <Pressable key={i} mr={2} onPress={() => handlePageChange(i)}>
              <Center
                bg={v.pass || v.active ? colors.primary : colors.box}
                w={v.active ? 12 : 8}
                h={v.active ? 12 : 8}
                borderRadius={'lg'}
                borderWidth={1}
                borderColor={colors.primary}
              >
                <Cext
                  color={
                    v.active || v.pass ? colors.textDark : colors.textLight
                  }
                  fontSize={v.active ? 16 : 10}
                  bold={v.active ? true : false}
                >
                  {i + 1}
                </Cext>
              </Center>
            </Pressable>
          ))}
        </ScrollView>
      </Box>
    </Board>
  );
};
export default DetailLatihan;
