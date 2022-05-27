import { transfer } from './transfer';
import { purchase } from './purchase';
import { payment } from './payment';
import { favourite } from './favourite';

export const transaction = {
  transfer,
  purchase,
  payment,
  favourite,
  logoutAlert: {
    title: 'Logout Session',
    description:
      'Your M2U ID user has been locked. When you click OK, you will log out. You can unlock through "Having Problem Logging In?"',
  },
  leaveAlert: {
    title: 'Leave Transaction Page',
    description: 'Are you sure to leave this page? Click "Cancel" to stay here or click "OK" to leave this page.',
  },
  cutoffAlert: {
    title: 'Transaction Cut-off Time',
    sknRtgsDescription:
      '{transferName} operating hours for "Transfer Now" is only available during {startTime} - {endTime} GMT+7.<br/>Your transaction will be executed on next business day.',
    countdownDescription: 'You will reach transaction cut-off time in {timer} minutes.',
    swift: 'Service is available {swiftStartTime} - {swiftEndTime} GMT +7 on working days.',
  },
};
