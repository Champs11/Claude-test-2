import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, FaultType } from '../types';
import FaultCard from '../components/FaultCard';

type Props = NativeStackScreenProps<RootStackParamList, 'FaultSelection'>;

interface FaultOption {
  type: FaultType;
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
}

const FAULT_OPTIONS: FaultOption[] = [
  {
    type: 'at_fault',
    title: 'I caused the accident',
    description:
      'You were at fault. We\'ll notify your insurer and guide you through next steps.',
    iconName: 'warning',
    color: '#C62828',
  },
  {
    type: 'not_at_fault',
    title: 'The other driver caused it',
    description:
      'You\'re not at fault. We\'ll help you recover costs and arrange alternative transport.',
    iconName: 'shield-checkmark',
    color: '#2E7D32',
  },
  {
    type: 'both_at_fault',
    title: 'We share responsibility',
    description:
      'Shared fault. Both insurers will be notified to negotiate the split.',
    iconName: 'swap-horizontal',
    color: '#E65100',
  },
];

const FaultSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { driverData } = route.params;
  const [selectedFault, setSelectedFault] = useState<FaultType | null>(null);

  const handleContinue = () => {
    if (!selectedFault) {
      return;
    }
    navigation.navigate('ClaimForm', { driverData, faultType: selectedFault });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Title */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>What happened?</Text>
          <Text style={styles.subtitle}>
            Select the option that best describes the incident
          </Text>
        </View>

        {/* Scanned data mini-card */}
        <View style={styles.scannedCard}>
          <View style={styles.scannedLeft}>
            <View style={styles.scannedAvatarCircle}>
              <Ionicons name="person" size={18} color="#1B4F9B" />
            </View>
            <View>
              <Text style={styles.scannedLabel}>Scanning as</Text>
              <Text style={styles.scannedName}>
                {driverData.firstName} {driverData.lastName}
              </Text>
              <Text style={styles.scannedLicence}>Lic: {driverData.licenceNumber}</Text>
            </View>
          </View>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={13} color="#2E7D32" style={styles.verifiedIcon} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        {/* Fault cards */}
        <View style={styles.cardsSection}>
          {FAULT_OPTIONS.map((option) => (
            <FaultCard
              key={option.type}
              title={option.title}
              description={option.description}
              iconName={option.iconName}
              color={option.color}
              selected={selectedFault === option.type}
              onPress={() => setSelectedFault(option.type)}
            />
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Continue button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, !selectedFault && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedFault}
          activeOpacity={0.85}
        >
          <Text style={[styles.continueText, !selectedFault && styles.continueTextDisabled]}>
            Continue
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={selectedFault ? '#FFFFFF' : '#9CA3AF'}
            style={styles.continueArrow}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  headerSection: {
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  scannedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scannedLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scannedAvatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E8EEF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scannedLabel: {
    fontSize: 11,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 1,
  },
  scannedName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  scannedLicence: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'monospace',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
  },
  verifiedIcon: {
    marginRight: 3,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
  },
  cardsSection: {
    marginBottom: 12,
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
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4F9B',
    borderRadius: 14,
    paddingVertical: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  continueTextDisabled: {
    color: '#9CA3AF',
  },
  continueArrow: {
    marginLeft: 8,
  },
});

export default FaultSelectionScreen;
