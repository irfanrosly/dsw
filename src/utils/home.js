import { FormattedMessage } from 'react-intl';
import Icon from 'components/common/Icon';

const getCorporateURL = locale => ({
  covid: `https://www.maybank.co.id/${locale}/NewsAndAnnouncement/NewsAndAnnouncements/2020/04/01/10/02/restrukturisasi-kredit-terhadap-pandemi-covid-19`,
  branches: `https://www.maybank.co.id/${locale}/others/locate-us/perubahan-layanan-kantor-cabang-terkait-covid-19`,
  account: `https://www.maybank.co.id/${locale}/others/applyonline?categoryId={85B2AE9F04D94A5187BD44EDEBAC3D01}&categoryTitle=Savings`,
  insureme: `https://www.maybank.co.id/${locale}/premierwealth/aset-proteksi`,
  cards: `https://www.maybank.co.id/${locale}/others/applyonline?categoryId=%7b40D78E331087446C98AD1A3FAF66D13F%7d&categoryTitle=Credit+Card`,
  loan: `https://www.maybank.co.id/${locale}/others/applyonline?categoryId={942B1CBA767A4B6ABECFCA8366618EAC}&categoryTitle=Loans`,
});

export const getFooterLinks = locale => [
  {
    label: <FormattedMessage id="login.footerLinks.covid19" />,
    icon: <Icon isAssetIcon type="covid19" />,
    url: getCorporateURL(locale).covid,
  },
  {
    label: <FormattedMessage id="login.footerLinks.branches" />,
    icon: <Icon isAssetIcon type="branches" />,
    url: getCorporateURL(locale).branches,
  },
  {
    label: <FormattedMessage id="login.footerLinks.openAccount" />,
    icon: <Icon isAssetIcon type="openAccount" />,
    url: getCorporateURL(locale).account,
  },
  {
    label: <FormattedMessage id="login.footerLinks.insureMe" />,
    icon: <Icon isAssetIcon type="insureMe" />,
    url: getCorporateURL(locale).insureme,
  },
  {
    label: <FormattedMessage id="login.footerLinks.cards" />,
    icon: <Icon isAssetIcon type="maybankCards" />,
    url: getCorporateURL(locale).cards,
  },
  { label: <FormattedMessage id="login.footerLinks.loan" />, icon: <Icon isAssetIcon type="getLoan" />, url: getCorporateURL(locale).loan },
];
