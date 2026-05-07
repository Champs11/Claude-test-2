export type FaultType = 'at_fault' | 'not_at_fault' | 'both_at_fault';

export interface DriverData {
  firstName: string;
  lastName: string;
  licenceNumber: string;
  dateOfBirth: string;
  licenceClass: string;
  state: string;
  expiryDate: string;
  // address intentionally omitted
}

export interface OtherPartyData {
  firstName: string;
  lastName: string;
  licenceNumber: string;
  vehicleRego: string;
  insurerName: string;
  phone: string;
}

export interface ClaimData {
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  description: string;
  myVehicleRego: string;
  otherParty?: OtherPartyData;
  witnesses: string;
  policeReportNumber: string;
}

export interface Insurer {
  id: string;
  name: string;
  logo: string; // icon name from Ionicons
  phone: string;
  claimsUrl: string;
}

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  QRScan: undefined;
  FaultSelection: { driverData: DriverData };
  ClaimForm: { driverData: DriverData; faultType: FaultType };
  InsurerSelection: { driverData: DriverData; faultType: FaultType; claimData: ClaimData };
  ClaimSummary: {
    driverData: DriverData;
    faultType: FaultType;
    claimData: ClaimData;
    insurer: Insurer;
  };
  Confirmation: { claimId: string; faultType: FaultType };
};
