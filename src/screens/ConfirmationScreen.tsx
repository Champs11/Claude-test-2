import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, FaultType } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

interface FaultContent {
  message: string;
  color: string;
  bgColor: string;
  steps: string[];
}

const FAULT_CONTENT: Record<FaultType, FaultContent> = {
  at_fault: {
    message:
      'Your insurer has been notified. You\'ll receive excess payment instructions within 24 hours.',
    color: '#C62828',
    bgColor: '#FFEBEE',
    steps: [
      'Your insurer will contact you within 24 hours with excess payment details.',
      'A claims assessor will be assigned to inspect your vehicle and the other vehicle.',
      'Once the assessment is complete, repairs will be arranged and your claim will be settled.',
    ],
  },
  not_at_fault: {
    message:
      'Your insurer is handling recovery. A hire car may be arranged within 4 business hours.',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    steps: [
      'Your insurer will contact the at-fault party\'s insurer to begin cost recovery.',
      'A hire vehicle may be arranged for you within 4 business hours — check your email.',
      'Your vehicle will be assessed and repairs arranged at no cost to you.',
    ],
  },
  both_at_fault: {
    message:
      'Both insurers have been notified. You\'ll hear back within 2 business days about the split.',
    color: '#E65100',
    bgColor: '#FFF3E0',
    steps: [
      'Your insurer will contact the other party\'s insurer to begin liability negotiation.',
      'An independent assessor may be appointed to determine the fault percentage.',
      'Once the split is agreed, both parties will be notified and claims will be settled accordingly.',
    ],
  },
};

const ConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { claimId, faultType } = route.params;
  const content = FAULT_CONTENT[faultType];

  const [displayedClaimId, setDisplayedClaimId] = useState('');
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Generate claim reference on mount
    const refNumber = `REF-${Math.floor(10000000 + Math.random() * 90000000)}`;
    setDisplayedClaimId(claimId || refNumber);

    // Animate checkmark
    Animated.sequence([
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 6,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        delay: 100,
      }),
    ]).start();
  }, [checkmarkScale, checkmarkOpacity, contentOpacity, claimId]);

  const handleReturnHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Checkmark */}
        <View style={styles.heroSection}>
          <Animated.View
            style={[
              styles.checkmarkContainer,
              {
                opacity: checkmarkOpacity,
                transform: [{ scale: checkmarkScale }],
              },
            ]}
          >
            <View style={styles.checkmarkCircleOuter}>
              <View style={styles.checkmarkCircleInner}>
                <Ionicons name="checkmark" size={60} color="#FFFFFF" />
              </View>
            </View>
          </Animated.View>

          <Animated.View style={[styles.heroText, { opacity: contentOpacity }]}>
            <Text style={styles.submittedTitle}>Claim Submitted!</Text>
            <View style={styles.refRow}>
              <Text style={styles.refLabel}>Reference Number</Text>
              <View style={styles.refBadge}>
                <Text style={styles.refNumber}>{displayedClaimId}</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <Animated.View style={[styles.mainContent, { opacity: contentOpacity }]}>
          {/* Status message */}
          <View style={[styles.statusCard, { backgroundColor: content.bgColor, borderColor: content.color + '60' }]}>
            <Ionicons name="information-circle" size={20} color={content.color} style={styles.statusIcon} />
            <Text style={[styles.statusMessage, { color: content.color }]}>{content.message}</Text>
          </View>

          {/* What happens next */}
          <View style={styles.nextStepsCard}>
            <Text style={styles.nextStepsTitle}>What happens next?</Text>

            {content.steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepNumberCircle}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Support info */}
          <View style={styles.supportCard}>
            <View style={styles.supportRow}>
              <View style={styles.supportIconCircle}>
                <Ionicons name="call" size={18} color="#1B4F9B" />
              </View>
              <View>
                <Text style={styles.supportTitle}>Need help?</Text>
                <Text style={styles.supportSubtext}>
                  Call your insurer's claims line or check the app for updates.
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Return Home button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={handleReturnHome}
          activeOpacity={0.85}
        >
          <Ionicons name="home" size={18} color="#FFFFFF" style={styles.returnIcon} />
          <Text style={styles.returnText}>Return Home</Text>
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
    paddingTop: 30,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  checkmarkCircleOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkCircleInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#00A550',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00A550',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  heroText: {
    alignItems: 'center',
  },
  submittedTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  refRow: {
    alignItems: 'center',
  },
  refLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  refBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  refNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B4F9B',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  mainContent: {
    width: '100%',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  statusIcon: {
    marginRight: 10,
    marginTop: 1,
    flexShrink: 0,
  },
  statusMessage: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  nextStepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  nextStepsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepNumberCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B4F9B',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
    lineHeight: 19,
  },
  supportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  supportSubtext: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
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
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4F9B',
    borderRadius: 14,
    paddingVertical: 16,
  },
  returnIcon: {
    marginRight: 8,
  },
  returnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ConfirmationScreen;
