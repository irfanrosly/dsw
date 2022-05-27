export const registration = {
  slogan: 'Bergabunglah bersama kami dan jadilah pengguna Maybank2u sekarang juga.',
  container: {
    title: 'Siap membuat akun?',
    footerLinkText: 'Daftar disini',
    footerText: 'Apakah Anda sudah menjadi Nasabah Maybank Indonesia?',
    initialDescription: 'Sebelum kami membuat akun Anda, izinkan kami memverifikasi salah satu kredensial Anda di bawah ini.',
  },
  form: {
    agreement: 'Saya setuju dengan ',
    policy: 'Syarat & Ketentuan',
    accountType: {
      accountNumber: 'Nomor Rekening',
      creditCard: 'Kartu Kredit',
    },
    accountNumber: {
      label: 'Nomor Rekening',
      placeholder: 'Contoh: 159624555621',
      tooltip: 'Nomor Rekening adalah nomor rekening Maybank anda',
    },
    creditCardNumber: {
      label: 'Nomor Kartu Kredit',
      expiryLabel: 'Tanggal Kadaluwarsa Kartu Kredit',
      placeholder: 'Contoh: 1111222233334444',
      tooltip: 'Nomor Kartu Kredit adalah nomor Kartu Kredit Maybank anda',
    },
    pin: {
      label: 'PIN',
      placeholder: 'Masukkan 6-digit nomor PIN',
      tooltip: {
        account: 'PIN adalah PIN Kartu Debet anda',
        creditCard: 'PIN adalah PIN Kartu Kredit anda',
      },
    },
    username: {
      label: 'Nama Pengguna',
      placeholder: 'Masukkan nama pengguna Anda',
      tooltip: 'Alfanumerik dengan 6 hingga 30 karakter',
    },
    password: {
      label: 'Kata Sandi',
      placeholder: 'Masukkan kata sandi Anda',
      tooltip: 'Alfanumerik dengan 8 hingga 30 karakter',
    },
    confirmPassword: {
      label: 'Konfirmasi Password',
      placeholder: 'Masukkan kembali kata sandi Anda',
      tooltip: 'Harus sama dengan password',
    },
    email: { label: 'Surel', placeholder: 'Email mu' },
    mobile: { label: 'Nomor Telepon', placeholder: 'Nomor telepon Anda' },
  },
  errorMessage: {
    agreement: 'Anda harus Menyetujui Syarat & Ketentuan kami',
    accountNumber: 'Nomor Akun Input harus 10 digit',
    pin: 'Input PIN harus 6 digit',
    creditCard: 'Input Nomor Kartu Kredit harus 16 digit',
    expiryMonth: 'Input Kartu Kredit Bulan kedaluwarsa harus 2 digit',
    expiryYear: 'Input Kartu Kredit Tahun kedaluwarsa harus 2 digit',
    usernameLength: 'Input Nama Pengguna harus antara 6-20 karakter',
    username: 'Harus mengandung Alfanumerik.',
    passwordLength: 'Panjang kata sandi input harus antara 8-20 karakter',
    password: 'Harus mengandung Surat Alfanumerik dan Huruf Kecil',
    confirmPassword: 'Kata sandi tidak identik',
    usernameAsPassword: 'Username dan Kata Sandi harus berbeda',
    selectedImage: 'Silakan pilih 1 gambar',
  },
  finalStep: {
    title: 'Satu langkah lagi untuk membuat akun Anda',
    initialDescription: 'Silakan masukkan Nama Pengguna dan Kata Sandi akun Anda',
    captchaLabel: 'Silakan pilih salah satu gambar di bawah ini untuk memverifikasi akun anda',
  },
  modal: {
    completed: 'Tahniah! Anda telah menyelesaikan pendaftaran Anda',
    accountActivated: {
      title: 'Register Error',
      contentTitle: "You've already activated your account.",
      description: 'We noticed you are existing Maybank2u user. Please choose an action below to continue.',
    },
  },
};
