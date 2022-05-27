export const settings = {
  subHeader: { label: 'Pengaturan Saya' },
  personal: {
    label: 'Pribadi',
    personalInfo: 'Informasi pribadi',
    theme: 'Tema',
    displayName: 'Nama Tampilan',
    name: 'Nama',
    language: 'Bahasa',
  },
  security: {
    label: 'Keamanan',
    changePassword: {
      label: 'Ganti kata sandi',
      password: 'Kata Sandi',
      currentPassword: 'Kata Sandi Saat Ini*',
      newPassword: 'Kata Sandi Baru*',
      confirmNewPassword: 'Konformasi Kata Sandi Baru*',
      enterNewPassword: 'Masukan Kata Sandi Baru',
      enterCurrentPassword: 'Masukkan Kata Sandi Saat Ini',
      description:
        'Gunakan minimal 8 karakter. Jangan gunakan kata sandi dari situs lain, atau sesuatu yang terlalu jelas seperti nama hewan peliharaan Anda.',
      newPasswordCriteria: {
        title: 'Kata sandi baru Anda harus: ',
        length: 'Kata sandi harus minimal 8 karakter (maksimal 20)',
        uppercase: 'Harus mengandung setidaknya 1 huruf besar',
        lowercase: 'Harus mengandung setidaknya 1 huruf kecil',
        number: 'Harus mengandung setidaknya 1 nomor',
        space: 'TIDAK boleh mengandung spasi',
        userId: 'Tidak boleh sama dengan User ID Maybank2u Anda',
        previousPassword: 'TIDAK boleh sama dengan 5 kata sandi Anda sebelumnya',
        characters: 'TIDAK boleh mengandung karakter  [\\"<>\'%;&+]',
      },
    },
    securityImage: {
      label: 'Gambar Keamanan',
      description: 'Ubah gambar keamanan anda',
      loadMoreImages: 'Klik untuk lebih banyak gambar',
      guidlines:
        'Silakan pilih gambar di bawah ini. Setelah pengiriman, gambar yang dipilih akan digunakan untuk verifikasi identitas Anda sendiri',
    },
  },
  theme: { title: 'Pilih tema untuk Web M2U' },
  message: {
    themeChanged: 'Tema berhasil diubah',
    infoChanged: 'Data Anda berhasil diperbaharui',
    passwordChanged: 'Kata sandi anda telah diperbarui',
    securityImageChanged: 'Gambar keamanan anda telah diperbarui',
  },
  errorMessage: {
    confirmationNotMatch: 'Konfirmasi kata sandi tidak cocok',
    displayNameInvalid: 'Nama tampilan harus antara 1 hingga 64 ruang alfanumerik',
  },
};
