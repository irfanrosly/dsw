import { gbi } from './gbi';

export const digitalWealth = {
  gbi,
  menu: {
    portfolio: 'Portofolio Saya',
    assets: 'Aset Saya {totalAsset}',
    loans: 'Pinjaman Saya {totalBorrowing}',
    financialGoal: 'Rencana Keuangan Saya',
    assetCaption: 'Deposito | Tabungan | Obligasi | Reksa Dana | Bancassurance',
    loanCaption: 'Kartu Kredit | KTA & KPR',
    noAsset: 'Tidak Memiliki Rekening Aset',
    noLoan: 'Tidak Memiliki Rekening Pinjaman',
  },
  portfolio: {
    equivalent: 'Setara {equivalentAmount}',
    noLoan: 'Anda tidak memiliki Pinjaman dengan kami.',
    noAsset: 'Anda tidak memiliki Aset dengan kami.',
    noHolding: 'Anda tidak memiliki Aset atau Pinjaman dengan kami.',
    loanLink:
      'Terapkan Produk Pinjaman kami di M2U Mobile App, atau kunjungi <a href="https://www.maybank.co.id/" target="_blank" rel="noreferrer">www.maybank.co.id</a> untuk mempelajari lebih lanjut tentang produk dan layanan kami.',
    assetLink:
      'Terapkan Produk Aset kami di M2U Mobile App, atau kunjungi <a href="https://www.maybank.co.id/" target="_blank" rel="noreferrer">www.maybank.co.id</a> untuk mempelajari lebih lanjut tentang produk dan layanan kami.',
    portfolioLink:
      'Terapkan Produk Aset atau Produk Pinjaman kami di M2U Mobile App, atau kunjungi <a href="https://www.maybank.co.id/" target="_blank" rel="noreferrer">www.maybank.co.id</a> untuk mempelajari lebih lanjut tentang produk dan layanan kami.',
    forexDisclaimer:
      'Nilai tukar yang digunakan untuk menghitung aset anda yang dalam mata uang selain rupiah hanya bersifat indikasi dan dapat berubah tanpa pemberitahuan terlebih daulu',
    appStore: 'Unduh di App Store',
    playStore: 'Dapatkan di Google Play',
  },
  goalCard: {
    title: 'Apakah rencana masa depan anda sudah tercukupi?',
    description: 'Mau melihat apakah rencana pensiun atau biaya pendidikan anak anda sudah tercukupi? Temukan jawabannya di sini.',
  },
  goalTab: {
    title: 'Simulasikan Rencana Keuangan Anda',
    description: 'Simulasikan rencana keuangan anda dan wujudkan mimpi anda',
    totalInvestment: 'Total investasi yang harus dicapai',
    currentInvestment: 'Total investasi sekarang',
    goalEnd: 'Rencana berakhir pada',
    products: '{totalProduct} Produk investasi',
    close: 'Tutup',
    viewAll: 'Lihat Semua Produk Investasi',
  },
  goalDetail: {
    initialAmount: 'Penempatan Dana Awal',
    totalMonthly: 'Total Investasi Bulanan IDR',
    sourceFund: 'Sumber dana pendebitan ',
    monthlyDebit: 'Pendebitan Bulanan <br/>Tanggal {date}',
    goalEnd: 'Rencana berakhir pada {date}',
    autoDebit: 'Pendebitan Otomatis tanggal {date}',
  },
};
