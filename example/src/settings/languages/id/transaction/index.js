import { transfer } from './transfer';
import { payment } from './payment';
import { purchase } from './purchase';
import { favourite } from './favourite';

export const transaction = {
  transfer,
  purchase,
  payment,
  favourite,
  logoutAlert: {
    title: 'Log out Sesi',
    description:
      'Pengguna ID M2U Anda telah dikunci. Ketika Anda mengklik OK, Anda akan logout. Anda dapat membuka kunci melalui "Tidak bisa masuk ke akun anda??"',
  },
  leaveAlert: {
    title: 'Keluar dari Halaman Transaksi',
    description:
      'Apakah Anda yakin untuk meninggalkan halaman ini? Klik "Batal" untuk tetap di sini atau klik "OK" untuk meninggalkan halaman ini.',
  },
  cutoffAlert: {
    title: 'Batas Waktu Transaksi',
    sknRtgsDescription:
      '{transferName} "Transfer Sekarang" hanya tersedia selama jam operasional harian bank dari pukul {startTime} sampai {endTime} (GMT+7).<br/> Transaksi yang di input setelah batas waktu akan diproses pada hari kerja berikutnya.',
    countdownDescription: 'Anda akan mencapai batas waktu transaksi dalam {timer} menit.',
    swift: 'Layanan tersedia pada pukul {swiftStartTime} - {swiftEndTime} GMT +7 di hari kerja.',
  },
};
