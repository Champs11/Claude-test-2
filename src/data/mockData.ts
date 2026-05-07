import { DriverData, Insurer } from '../types';

export const mockDriverData: DriverData = {
  firstName: 'James',
  lastName: 'Mitchell',
  licenceNumber: '12345678',
  dateOfBirth: '15/03/1988',
  licenceClass: 'C',
  state: 'VIC',
  expiryDate: '15/03/2028',
  // address intentionally omitted — never shared
};

export const mockInsurers: Insurer[] = [
  {
    id: 'aami',
    name: 'AAMI',
    logo: 'shield-checkmark',
    phone: '13 22 44',
    claimsUrl: 'https://www.aami.com.au/claims',
  },
  {
    id: 'nrma',
    name: 'NRMA Insurance',
    logo: 'car',
    phone: '13 21 32',
    claimsUrl: 'https://www.nrma.com.au/claims',
  },
  {
    id: 'allianz',
    name: 'Allianz',
    logo: 'umbrella',
    phone: '13 10 00',
    claimsUrl: 'https://www.allianz.com.au/claims',
  },
  {
    id: 'gio',
    name: 'GIO',
    logo: 'shield-half',
    phone: '13 10 10',
    claimsUrl: 'https://www.gio.com.au/claims',
  },
  {
    id: 'budget-direct',
    name: 'Budget Direct',
    logo: 'wallet',
    phone: '1300 139 422',
    claimsUrl: 'https://www.budgetdirect.com.au/claims',
  },
  {
    id: 'qbe',
    name: 'QBE Insurance',
    logo: 'business',
    phone: '13 32 32',
    claimsUrl: 'https://www.qbe.com/au/claims',
  },
];
