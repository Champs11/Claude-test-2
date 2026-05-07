import React from 'react';
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
import { RootStackParamList } from '../types';
import PrivacyBadge from '../components/PrivacyBadge';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface MockClaim {
  id: string;
  claimNumber: string;
  status: 'Processing' | 'Approved' | 'Pending';
  date: string;
  insurer: string;
  faultType: string;
}

const mockClaims: MockClaim[] = [
  {
    id: '1',
    claimNumber: 'REF-20481937',
    status: 'Processing',
    date: '12 Apr 2025',
    insurer: 'AAMI',
    faultType: 'Not at fault',
  },
  {
    id: '2',
    claimNumber: 'REF-88312045',
    status: 'Approved',
    date: '03 Jan 2025',
    insurer: 'AAMI',
    faultType: 'At fault',
  },
];

const STATUS_COLORS: Record<string, string> = {
  Processing: '#E65100',
  Approved: '#2E7D32',
  Pending: '#1B4F9B',
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Greeting Header */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingRow}>
            <View>
              <Text style={styles.greetingText}>Good morning, Driver</Text>
              <Text style={styles.greetingSubtext}>Stay protected on the road</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={24} color="#1B4F9B" />
            </View>
          </View>
        </View>

        {/* Privacy Notice Card */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyCardLeft}>
            <View style={styles.lockCircle}>
              <Ionicons name="lock-closed" size={20} color="#2E7D32" />
            </View>
            <View style={styles.privacyTextBlock}>
              <Text style={styles.privacyTitle}>Your home address is never shared</Text>
              <Text style={styles.privacySubtext}>
                ClaimSafe only reads your name, licence number, DOB and state from your QR.
              </Text>
            </View>
          </View>
          <PrivacyBadge />
        </View>

        {/* New Claim CTA */}
        <TouchableOpacity
          style={styles.newClaimCard}
          onPress={() => navigation.navigate('QRScan')}
          activeOpacity={0.88}
        >
          <View style={styles.newClaimIconWrap}>
            <Ionicons name="car-sport" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.newClaimText}>
            <Text style={styles.newClaimTitle}>New Claim</Text>
            <Text style={styles.newClaimSubtitle}>Scan your licence QR to begin</Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={30} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        {/* My Claims */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Claims</Text>
          <Text style={styles.sectionCount}>{mockClaims.length} total</Text>
        </View>

        {mockClaims.map((claim) => (
          <View key={claim.id} style={styles.claimCard}>
            <View style={styles.claimTopRow}>
              <Text style={styles.claimNumber}>{claim.claimNumber}</Text>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[claim.status] + '1A' }]}>
                <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[claim.status] }]} />
                <Text style={[styles.statusText, { color: STATUS_COLORS[claim.status] }]}>
                  {claim.status}
                </Text>
              </View>
            </View>
            <View style={styles.claimDetailRow}>
              <View style={styles.claimDetailItem}>
                <Ionicons name="calendar-outline" size={13} color="#6B7280" style={styles.claimDetailIcon} />
                <Text style={styles.claimDetailText}>{claim.date}</Text>
              </View>
              <View style={styles.claimDetailItem}>
                <Ionicons name="business-outline" size={13} color="#6B7280" style={styles.claimDetailIcon} />
                <Text style={styles.claimDetailText}>{claim.insurer}</Text>
              </View>
              <View style={styles.claimDetailItem}>
                <Ionicons name="alert-circle-outline" size={13} color="#6B7280" style={styles.claimDetailIcon} />
                <Text style={styles.claimDetailText}>{claim.faultType}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>
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
    paddingTop: 20,
  },
  greetingSection: {
    marginBottom: 18,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  greetingSubtext: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E8EEF8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  privacyCardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  lockCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  privacyTextBlock: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 3,
  },
  privacySubtext: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
  },
  newClaimCard: {
    backgroundColor: '#1B4F9B',
    borderRadius: 18,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#1B4F9B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  newClaimIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  newClaimText: {
    flex: 1,
  },
  newClaimTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  newClaimSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  sectionCount: {
    fontSize: 13,
    color: '#6B7280',
  },
  claimCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  claimTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  claimNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    fontFamily: 'monospace',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  claimDetailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  claimDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  claimDetailIcon: {
    marginRight: 4,
  },
  claimDetailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  bottomPadding: {
    height: 30,
  },
});

export default HomeScreen;
