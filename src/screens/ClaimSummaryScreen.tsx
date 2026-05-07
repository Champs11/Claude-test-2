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

type Props = NativeStackScreenProps<RootStackParamList, 'ClaimSummary'>;

interface FaultConfig {
  label: string;
  color: string;
  bgColor: string;
}

const FAULT_CONFIGS: Record<FaultType, FaultConfig> = {
  at_fault: { label: 'At Fault', color: '#C62828', bgColor: '#FFEBEE' },
  not_at_fault: { label: 'Not At Fault', color: '#2E7D32', bgColor: '#E8F5E9' },
  both_at_fault: { label: 'Shared Fault', color: '#E65100', bgColor: '#FFF3E0' },
};

interface CollapsibleSectionProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <View style={sectionStyles.container}>
      <TouchableOpacity
        style={sectionStyles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={sectionStyles.headerLeft}>
          <View style={sectionStyles.iconCircle}>
            <Ionicons name={icon} size={16} color="#1B4F9B" />
          </View>
          <Text style={sectionStyles.title}>{title}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>
      {expanded && <View style={sectionStyles.body}>{children}</View>}
    </View>
  );
};

const sectionStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
});

interface DataRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

const DataRow: React.FC<DataRowProps> = ({ label, value, mono }) => (
  <View style={dataRowStyles.row}>
    <Text style={dataRowStyles.label}>{label}</Text>
    <Text style={[dataRowStyles.value, mono && dataRowStyles.mono]}>{value || '—'}</Text>
  </View>
);

const dataRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
    marginRight: 12,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A2E',
    flex: 1.5,
    textAlign: 'right',
  },
  mono: {
    fontFamily: 'monospace',
  },
});

const ClaimSummaryScreen: React.FC<Props> = ({ navigation, route }) => {
  const { driverData, faultType, claimData, insurer } = route.params;
  const faultConfig = FAULT_CONFIGS[faultType];

  const handleSubmit = () => {
    const claimId = `REF-${Math.floor(10000000 + Math.random() * 90000000)}`;
    navigation.navigate('Confirmation', { claimId, faultType });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Review Your Claim</Text>
        <Text style={styles.pageSubtitle}>Check all details before submitting</Text>

        {/* Your Details */}
        <CollapsibleSection title="Your Details" icon="person">
          <DataRow label="Full Name" value={`${driverData.firstName} ${driverData.lastName}`} />
          <DataRow label="Licence No." value={driverData.licenceNumber} mono />
          <DataRow label="Date of Birth" value={driverData.dateOfBirth} />
          <DataRow label="State" value={driverData.state} />
          <DataRow label="Licence Class" value={driverData.licenceClass} />
          <DataRow label="My Vehicle Rego" value={claimData.myVehicleRego} />
        </CollapsibleSection>

        {/* Fault Type */}
        <CollapsibleSection title="Fault Type" icon="alert-circle">
          <View style={[styles.faultBadge, { backgroundColor: faultConfig.bgColor }]}>
            <Text style={[styles.faultBadgeText, { color: faultConfig.color }]}>
              {faultConfig.label}
            </Text>
          </View>
        </CollapsibleSection>

        {/* Incident Details */}
        <CollapsibleSection title="Incident Details" icon="document-text">
          <DataRow label="Date" value={claimData.incidentDate} />
          <DataRow label="Time" value={claimData.incidentTime} />
          <DataRow label="Location" value={claimData.incidentLocation} />
          {claimData.description ? (
            <View style={styles.descriptionBlock}>
              <Text style={styles.descriptionLabel}>Description</Text>
              <Text style={styles.descriptionText}>{claimData.description}</Text>
            </View>
          ) : null}
          {claimData.witnesses ? <DataRow label="Witnesses" value={claimData.witnesses} /> : null}
          {claimData.policeReportNumber ? (
            <DataRow label="Police Report" value={claimData.policeReportNumber} />
          ) : null}
        </CollapsibleSection>

        {/* Other Party */}
        {claimData.otherParty && (
          <CollapsibleSection title="Other Party" icon="people">
            <DataRow
              label="Name"
              value={`${claimData.otherParty.firstName} ${claimData.otherParty.lastName}`.trim()}
            />
            <DataRow label="Licence No." value={claimData.otherParty.licenceNumber} mono />
            <DataRow label="Vehicle Rego" value={claimData.otherParty.vehicleRego} />
            <DataRow label="Their Insurer" value={claimData.otherParty.insurerName} />
            <DataRow label="Phone" value={claimData.otherParty.phone} />
          </CollapsibleSection>
        )}

        {/* Your Insurer */}
        <CollapsibleSection title="Your Insurer" icon="business">
          <View style={styles.insurerRow}>
            <View style={styles.insurerIconCircle}>
              <Ionicons
                name={insurer.logo as keyof typeof Ionicons.glyphMap}
                size={22}
                color="#1B4F9B"
              />
            </View>
            <View>
              <Text style={styles.insurerName}>{insurer.name}</Text>
              <Text style={styles.insurerPhone}>Claims: {insurer.phone}</Text>
            </View>
          </View>
        </CollapsibleSection>

        {/* Privacy Summary */}
        <View style={styles.privacyBox}>
          <View style={styles.privacyBoxHeader}>
            <Ionicons name="lock-closed" size={16} color="#1B4F9B" style={styles.privacyBoxIcon} />
            <Text style={styles.privacyBoxTitle}>Privacy Summary</Text>
          </View>

          <View style={styles.privacyColumns}>
            <View style={styles.privacyColumn}>
              <Text style={styles.privacyColumnHeading}>Shared with insurer</Text>
              <View style={styles.privacyItem}>
                <Ionicons name="checkmark" size={13} color="#2E7D32" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextShared}>Name</Text>
              </View>
              <View style={styles.privacyItem}>
                <Ionicons name="checkmark" size={13} color="#2E7D32" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextShared}>Licence No.</Text>
              </View>
              <View style={styles.privacyItem}>
                <Ionicons name="checkmark" size={13} color="#2E7D32" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextShared}>State</Text>
              </View>
              <View style={styles.privacyItem}>
                <Ionicons name="checkmark" size={13} color="#2E7D32" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextShared}>Incident details</Text>
              </View>
            </View>

            <View style={styles.privacyDivider} />

            <View style={styles.privacyColumn}>
              <Text style={styles.privacyColumnHeading}>Never shared</Text>
              <View style={styles.privacyItem}>
                <Ionicons name="close" size={13} color="#C62828" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextNotShared}>Home address</Text>
              </View>
              <View style={styles.privacyItem}>
                <Ionicons name="close" size={13} color="#C62828" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextNotShared}>Financial info</Text>
              </View>
              <View style={styles.privacyItem}>
                <Ionicons name="close" size={13} color="#C62828" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextNotShared}>Email</Text>
              </View>
              <View style={styles.privacyItem}>
                <Ionicons name="close" size={13} color="#C62828" style={styles.privacyItemIcon} />
                <Text style={styles.privacyItemTextNotShared}>Medical history</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Footer buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="pencil" size={16} color="#1B4F9B" style={styles.editIcon} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>Submit Claim</Text>
          <Ionicons name="send" size={16} color="#FFFFFF" style={styles.submitIcon} />
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
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },
  faultBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  faultBadgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  descriptionBlock: {
    marginBottom: 10,
  },
  descriptionLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A2E',
    lineHeight: 19,
  },
  insurerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insurerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insurerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  insurerPhone: {
    fontSize: 12,
    color: '#6B7280',
  },
  privacyBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  privacyBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  privacyBoxIcon: {
    marginRight: 8,
  },
  privacyBoxTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B4F9B',
  },
  privacyColumns: {
    flexDirection: 'row',
  },
  privacyColumn: {
    flex: 1,
  },
  privacyDivider: {
    width: 1,
    backgroundColor: '#C7D2FE',
    marginHorizontal: 12,
  },
  privacyColumnHeading: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  privacyItemIcon: {
    marginRight: 5,
    width: 14,
  },
  privacyItemTextShared: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
  },
  privacyItemTextNotShared: {
    fontSize: 12,
    color: '#C62828',
    fontWeight: '500',
  },
  bottomPadding: {
    height: 20,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#F0F4F8',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#1B4F9B',
  },
  editIcon: {
    marginRight: 6,
  },
  editText: {
    color: '#1B4F9B',
    fontSize: 15,
    fontWeight: '700',
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4F9B',
    borderRadius: 14,
    paddingVertical: 15,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  submitIcon: {
    marginLeft: 8,
  },
});

export default ClaimSummaryScreen;
