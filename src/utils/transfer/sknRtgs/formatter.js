import { get } from 'utils/lodash';
import { formatArrayKeys } from 'utils/formatter';
import { SUCCESS_RESPONSE_CODE, UNRESPONSIVE_HOST } from 'settings/constants/response-codes';

export const formatSknRtgsDetail = data => {
  const responseCode = get(data, 'responseCode', UNRESPONSIVE_HOST);
  const isSuccess = responseCode === SUCCESS_RESPONSE_CODE;
  const serviceInfoBean = get(data, 'serviceInfoBean', {});
  const sourceOfFunds = formatArrayKeys(get(data, 'sumberDanaList', []));
  const transactionPurposes = formatArrayKeys(get(data, 'tujuanTransaksiList', []));
  const beneficiaryTypes = formatArrayKeys(get(data, 'jenisPenerimaList', []));
  const beneficiaryCitizenTypes = formatArrayKeys(get(data, 'statusKependudukanPenerimaList', []));
  // no longer in response
  // const beneficiaryAreaCodes = formatArrayKeys(get(data, 'kodewilPelaksanaPenerimaList', []));
  const transferBanks = formatArrayKeys(get(data, 'telegraphicTransferBankList', []));
  const initHolidays = get(data, 'holidayDateList', []);
  // format YYYY-MM-DD to javascript Date object
  const holidays = initHolidays.map(date => new Date(date));

  // data to be returned does not contain 'list' object, just 'map' object
  const dataMappings = {
    sumberDanaMap: get(data, 'sumberDanaMap', {}),
    jenisPenerimaMap: get(data, 'jenisPenerimaMap', {}),
    tujuanTransaksiMap: get(data, 'tujuanTransaksiMap', {}),
    telegraphicTransferBankMap: get(data, 'telegraphicTransferBankMap', {}),
    statusKependudukanPenerimaMap: get(data, 'statusKependudukanPenerimaMap', {}),
  };

  return {
    holidays,
    isSuccess,
    responseCode,
    dataMappings,
    transferBanks,
    sourceOfFunds,
    serviceInfoBean,
    beneficiaryTypes,
    transactionPurposes,
    beneficiaryCitizenTypes,
  };
};
