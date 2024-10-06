import { Box } from 'native-base';
import React, { useContext } from 'react';
import { WebView } from 'react-native-webview';

import Board from '../../components/Board';
import Headering from '../../components/Headering';
import { ColorContext } from '../../contexts/ColorContext';
import { ConfigContext } from '../../contexts/ConfigContext';

const Help = () => {
  const { colors } = useContext(ColorContext);
  const { config } = useContext(ConfigContext);
  const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panduan Penggunaan Aplikasi ${config.name_app}</title>
    <style>
        body {
            font-family: "Lato";
            line-height: 1.6;
            margin: 20px;
            background-color: ${colors.bg}; /* Warna latar belakang lembut */
            color: ${colors.textLight};
        }

        h1 {
            color:${colors.secondary};/* Warna biru cerah */
            font-size: 20px;
            text-align: center;
            margin-bottom: 20px;
        }

        h2 {
            color:${colors.accent}; /* Warna oranye */
            font-size: 22px;
            margin-top: 20px;
        }

        ul {
            padding-left: 20px;
        }

        ol {
            padding-left: 20px;
        }

        .section {
            background-color: ${colors.box}; /* Warna latar belakang putih untuk kontras */
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 32px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        li {
            margin-bottom: 10px;
        }

        a {
            color: #1A73E8; /* Warna biru */
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

    <h1>Panduan Penggunaan Aplikasi ${config.name_app}</h1>

    <div class="section">
        <h2>Pengenalan Aplikasi ${config.name_app}</h2>
        <p>Aplikasi <strong>${config.name_app}</strong> adalah alat belajar yang dirancang untuk membantu Anda mempersiapkan diri dalam menghadapi berbagai ujian, termasuk ujian pemerintah. Dengan ${config.name_app}, Anda dapat mengakses materi belajar, latihan soal, simulasi tryout, dan memantau kemajuan belajar Anda dengan mudah.</p>
    </div>

    <div class="section">
        <h2>Fitur Utama ${config.name_app}</h2>
        <ul>
            <li><strong>Belajar Materi:</strong> Akses berbagai materi pembelajaran yang komprehensif untuk membantu Anda memahami konsep-konsep penting secara mendalam.</li>
            <li><strong>Latihan:</strong> Uji kemampuan Anda dengan latihan soal yang dirancang untuk mencakup berbagai topik dan tingkat kesulitan.</li>
            <li><strong>Simulasi Tryout:</strong> Ikuti simulasi tryout untuk mengukur kesiapan Anda menghadapi ujian sebenarnya.</li>
            <li><strong>Monitor Kemajuan:</strong> Lacak kemajuan belajar Anda dengan fitur yang memungkinkan Anda melihat perkembangan dan area yang perlu ditingkatkan.</li>
        </ul>
    </div>

    <div class="section">
        <h2>Cara Menggunakan Aplikasi ${config.name_app}</h2>
        <ol>
            <li><strong>Unduh dan Instal Aplikasi:</strong> Aplikasi ${config.name_app} tersedia di Google Play Store untuk pengguna Android dan di App Store untuk pengguna iOS. Cari aplikasi dengan nama <em>${config.name_app}</em> dan unduh ke perangkat Anda.</li>
            <li><strong>Buat Akun:</strong> Setelah aplikasi terinstal, buka aplikasi dan buat akun baru dengan mengisi informasi yang diperlukan seperti nama, email, dan kata sandi. Anda juga bisa mendaftar menggunakan akun media sosial Anda.</li>
            <li><strong>Pilih Materi Pembelajaran:</strong> Pilih materi belajar dari berbagai kategori yang tersedia, atau gunakan fitur pencarian untuk menemukan topik tertentu.</li>
            <li><strong>Mulai Latihan:</strong> Ikuti latihan soal untuk menguji pemahaman Anda terhadap materi yang telah dipelajari.</li>
            <li><strong>Simulasi Tryout:</strong> Setelah Anda merasa siap, lakukan simulasi tryout untuk mengukur kesiapan Anda menghadapi ujian sebenarnya.</li>
            <li><strong>Monitor Kemajuan:</strong> Gunakan fitur Monitor Kemajuan untuk melihat skor, waktu belajar, dan area yang perlu ditingkatkan agar Anda bisa fokus memperbaiki kekurangan.</li>
        </ol>
    </div>

    <div class="section">
        <h2>Tips untuk Belajar Efektif</h2>
        <ul>
            <li>Luangkan waktu belajar setiap hari untuk meningkatkan pemahaman dan retensi materi.</li>
            <li>Gunakan fitur latihan soal dan simulasi tryout secara rutin untuk mengasah kemampuan Anda.</li>
            <li>Manfaatkan kursus interaktif untuk mendalami topik yang lebih sulit.</li>
            <li>Jangan ragu untuk mengulang materi atau ujian simulasi jika Anda merasa belum siap.</li>
        </ul>
    </div>

    <div class="section">
        <h2>Bantuan dan Dukungan</h2>
        <p>Jika Anda mengalami kesulitan atau membutuhkan bantuan, silakan hubungi tim dukungan kami melalui email di <a href="mailto:support@${config.name_app}.com">support@${config.name_app}.com</a>.</p>
    </div>

</body>
</html>
`;
  return (
    <Board>
      <Headering tit="Bantuan" />
      <Box mx={4} flex={1} bg={colors.textLight}>
        <WebView originWhitelist={['*']} source={{ html: htmlContent }} />
      </Box>
    </Board>
  );
};

export default Help;
