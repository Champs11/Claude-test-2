import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, FaultType, ClaimData } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ClaimForm'>;

interface FaultBannerConfig {
  color: string;
  bgColor: string;
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
}

const FAULT_BANNERS: Record<FaultType, FaultBannerConfig> = {
  at_fault: {
    color: '#C62828',
    bgColor: '#FFEBEE',
    icon: 'warning',
    message: "You've indicated you were at fault. Your insurer will handle the claim.",
  },
  not_at_fault: {
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    icon: 'shield-checkmark',
    message: "You're not at fault. Keep all evidence — we'll recover your costs.",
  },
  both_at_fault: {
    color: '#E65100',
    bgColor: '#FFF3E0',
    icon: 'swap-horizontal',
    message: 'Shared fault. Both insurers will negotiate the split.',
  },
};

const ClaimFormScreen: React.FC<Props> = ({ navigation, route }) => {
  const { driverData, faultType } = route.params;
  const banner = FAULT_BANNERS[faultType];

  // Incident details
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentTime, setIncidentTime] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [description, setDescription] = useState('');
  const [myVehicleRego, setMyVehicleRego] = useState('');

  // Other party
  const [otherFirstName, setOtherFirstName] = useState('');
  const [otherLastName, setOtherLastName] = useState('');
  const [otherLicenceNo, setOtherLicenceNo] = useState('');
  const [otherVehicleRego, setOtherVehicleRego] = useState('');
  const [otherInsurer, setOtherInsurer] = useState('');
  const [otherPhone, setOtherPhone] = useState('');

  // Additional info
  const [witnesses, setWitnesses] = useState('');
  const [policeReport, setPoliceReport] = useState('');

  const handleNext = () => {
    const claimData: ClaimData = {
      incidentDate,
      incidentTime,
      incidentLocation,
      description,
      myVehicleRego,
      witnesses,
      policeReportNumber: policeReport,
      otherParty:
        otherFirstName || otherLastName || otherVehicleRego
          ? {
              firstName: otherFirstName,
              lastName: otherLastName,
              licenceNumber: otherLicenceNo,
              vehicleRego: otherVehicleRego,
              insurerName: otherInsurer,
              phone: otherPhone,
            }
          : undefined,
    };

    navigation.navigate('InsurerSelection', {
      driverData,
      faultType,
      claimData,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Fault Banner */}
          <View style={[styles.faultBanner, { backgroundColor: banner.bgColor, borderColor: banner.color + '60' }]}>
            <Ionicons name={banner.icon} size={18} color={banner.color} style={styles.bannerIcon} />
            <Text style={[styles.bannerText, { color: banner.color }]}>{banner.message}</Text>
          </View>

          {/* Section: Your Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Your Details</Text>
              <View style={styles.lockBadge}>
                <Ionicons name="lock-closed" size={11} color="#6B7280" style={styles.lockIcon} />
                <Text style={styles.lockBadgeText}>Pre-filled from QR</Text>
              </View>
            </View>

            <View style={styles.readOnlyField}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <View style={styles.readOnlyValue}>
                <Text style={styles.readOnlyText}>
                  {driverData.firstName} {driverData.lastName}
                </Text>
                <Ionicons name="lock-closed" size={13} color="#9CA3AF" />
              </View>
            </View>

            <View style={styles.readOnlyField}>
              <Text style={styles.fieldLabel}>Licence Number</Text>
              <View style={styles.readOnlyValue}>
                <Text style={[styles.readOnlyText, styles.monoText]}>{driverData.licenceNumber}</Text>
                <Ionicons name="lock-closed" size={13} color="#9CA3AF" />
              </View>
            </View>

            <View style={styles.readOnlyField}>
              <Text style={styles.fieldLabel}>Date of Birth</Text>
              <View style={styles.readOnlyValue}>
                <Text style={styles.readOnlyText}>{driverData.dateOfBirth}</Text>
                <Ionicons name="lock-closed" size={13} color="#9CA3AF" />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>My Vehicle Rego</Text>
              <TextInput
                style={styles.textInput}
                value={myVehicleRego}
                onChangeText={setMyVehicleRego}
                placeholder="e.g. ABC123"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>
          </View>

          {/* Section: Incident Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Incident Details</Text>

            <View style={styles.rowFields}>
              <View style={[styles.inputGroup, styles.halfField]}>
                <Text style={styles.fieldLabel}>Date</Text>
                <TextInput
                  style={styles.textInput}
                  value={incidentDate}
                  onChangeText={setIncidentDate}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numbers-and-punctuation"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfField]}>
                <Text style={styles.fieldLabel}>Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={incidentTime}
                  onChangeText={setIncidentTime}
                  placeholder="HH:MM"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="numbers-and-punctuation"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                value={incidentLocation}
                onChangeText={setIncidentLocation}
                placeholder="Street, Suburb, State"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe what happened in your own words..."
                placeholderTextColor="#9CA3AF"
                autoCapitalize="sentences"
                autoCorrect={true}
                keyboardType="default"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Section: Other Party Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Other Party Details</Text>
            <Text style={styles.sectionSubtitle}>
              Fill in as much as possible — leave blank if unknown
            </Text>

            <View style={styles.rowFields}>
              <View style={[styles.inputGroup, styles.halfField]}>
                <Text style={styles.fieldLabel}>First Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={otherFirstName}
                  onChangeText={setOtherFirstName}
                  placeholder="First name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  autoCorrect={false}
                  keyboardType="default"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfField]}>
                <Text style={styles.fieldLabel}>Last Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={otherLastName}
                  onChangeText={setOtherLastName}
                  placeholder="Last name"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="words"
                  autoCorrect={false}
                  keyboardType="default"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Their Licence Number</Text>
              <TextInput
                style={styles.textInput}
                value={otherLicenceNo}
                onChangeText={setOtherLicenceNo}
                placeholder="Licence number"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Their Vehicle Rego</Text>
              <TextInput
                style={styles.textInput}
                value={otherVehicleRego}
                onChangeText={setOtherVehicleRego}
                placeholder="e.g. XYZ789"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Their Insurance Company</Text>
              <TextInput
                style={styles.textInput}
                value={otherInsurer}
                onChangeText={setOtherInsurer}
                placeholder="e.g. NRMA, AAMI, Allianz..."
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Their Phone Number</Text>
              <TextInput
                style={styles.textInput}
                value={otherPhone}
                onChangeText={setOtherPhone}
                placeholder="04xx xxx xxx"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Section: Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Witnesses</Text>
              <TextInput
                style={styles.textInput}
                value={witnesses}
                onChangeText={setWitnesses}
                placeholder="Names / contact details of witnesses"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="sentences"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.fieldLabel}>Police Report Number</Text>
              <TextInput
                style={styles.textInput}
                value={policeReport}
                onChangeText={setPoliceReport}
                placeholder="If applicable"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Next button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.nextButtonText}>Next: Choose Insurer</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.nextArrow} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  faultBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
  },
  bannerIcon: {
    marginRight: 10,
    marginTop: 1,
    flexShrink: 0,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 14,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: -10,
    marginBottom: 14,
  },
  lockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lockIcon: {
    marginRight: 3,
  },
  lockBadgeText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  readOnlyField: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  readOnlyValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  readOnlyText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  monoText: {
    fontFamily: 'monospace',
  },
  inputGroup: {
    marginBottom: 14,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  multilineInput: {
    height: 100,
    paddingTop: 12,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 10,
  },
  halfField: {
    flex: 1,
  },
  bottomPadding: {
    height: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#F0F4F8',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4F9B',
    borderRadius: 14,
    paddingVertical: 16,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  nextArrow: {
    marginLeft: 8,
  },
});

export default ClaimFormScreen;
