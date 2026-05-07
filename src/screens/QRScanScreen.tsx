import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { mockDriverData } from '../data/mockData';

type Props = NativeStackScreenProps<RootStackParamList, 'QRScan'>;

const { width } = Dimensions.get('window');
const FRAME_SIZE = width * 0.72;

const QRScanScreen: React.FC<Props> = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);

  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;

  // Scanning line animation
  useEffect(() => {
    const scanLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    scanLoop.start();
    return () => scanLoop.stop();
  }, [scanLineAnim]);

  // Corner bracket pulse animation
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [pulseAnim]);

  // Auto-scan after 2500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setScanned(true);
      // Animate checkmark in
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 60,
          friction: 6,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Navigate after brief pause
      setTimeout(() => {
        navigation.navigate('FaultSelection', { driverData: mockDriverData });
      }, 900);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, checkmarkScale, checkmarkOpacity]);

  const scanLineTranslateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, FRAME_SIZE - 4],
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>

        {/* Instruction text */}
        <View style={styles.instructionSection}>
          <Text style={styles.instructionTitle}>Scan Your Digital Licence</Text>
          <Text style={styles.instructionStep}>
            Open Service Victoria app {'→'} tap your licence {'→'} tap{' '}
            <Text style={styles.instructionHighlight}>'Share QR'</Text>
          </Text>
        </View>

        {/* QR Frame area */}
        <View style={styles.frameArea}>
          <Animated.View style={[styles.frameWrapper, { transform: [{ scale: pulseAnim }] }]}>
            {/* Corner brackets */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* QR code placeholder icon */}
            {!scanned && (
              <Ionicons name="qr-code-outline" size={FRAME_SIZE * 0.45} color="rgba(255,255,255,0.15)" />
            )}

            {/* Scanning line */}
            {!scanned && (
              <Animated.View
                style={[
                  styles.scanLine,
                  { transform: [{ translateY: scanLineTranslateY }] },
                ]}
              />
            )}

            {/* Success checkmark overlay */}
            {scanned && (
              <Animated.View
                style={[
                  styles.checkmarkOverlay,
                  {
                    opacity: checkmarkOpacity,
                    transform: [{ scale: checkmarkScale }],
                  },
                ]}
              >
                <View style={styles.checkmarkCircle}>
                  <Ionicons name="checkmark" size={56} color="#FFFFFF" />
                </View>
                <Text style={styles.checkmarkLabel}>QR Verified!</Text>
              </Animated.View>
            )}
          </Animated.View>

          {/* Status text */}
          <View style={styles.statusRow}>
            {!scanned ? (
              <>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Waiting for QR code...</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={16} color="#00A550" style={styles.statusIcon} />
                <Text style={[styles.statusText, styles.statusTextSuccess]}>Licence scanned successfully</Text>
              </>
            )}
          </View>
        </View>

        {/* Privacy strip */}
        <View style={styles.privacyStrip}>
          <View style={styles.privacyStripHeader}>
            <Ionicons name="lock-closed" size={14} color="#00A550" style={styles.privacyStripIcon} />
            <Text style={styles.privacyStripTitle}>Privacy Protected</Text>
          </View>
          <View style={styles.privacyColumns}>
            <View style={styles.privacyColumn}>
              <Text style={styles.privacyColumnTitle}>Only shares:</Text>
              <Text style={styles.privacyShared}>{'• '} Name</Text>
              <Text style={styles.privacyShared}>{'• '} Licence No.</Text>
              <Text style={styles.privacyShared}>{'• '} Date of Birth</Text>
              <Text style={styles.privacyShared}>{'• '} State</Text>
            </View>
            <View style={styles.privacyDivider} />
            <View style={styles.privacyColumn}>
              <Text style={styles.privacyColumnTitle}>Never shares:</Text>
              <Text style={styles.privacyNotShared}>{'• '} Home address</Text>
              <Text style={styles.privacyNotShared}>{'• '} Phone number</Text>
              <Text style={styles.privacyNotShared}>{'• '} Email</Text>
              <Text style={styles.privacyNotShared}>{'• '} Financial info</Text>
            </View>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionSection: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionStep: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 10,
  },
  instructionHighlight: {
    color: '#00A550',
    fontWeight: '600',
  },
  frameArea: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  frameWrapper: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: '#00A550',
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 6,
  },
  scanLine: {
    position: 'absolute',
    top: 2,
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: '#00A550',
    shadowColor: '#00A550',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 0,
    borderRadius: 1,
  },
  checkmarkOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#00A550',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#00A550',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  checkmarkLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00A550',
    marginRight: 8,
  },
  statusIcon: {
    marginRight: 6,
  },
  statusText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  statusTextSuccess: {
    color: '#00A550',
    fontWeight: '600',
  },
  privacyStrip: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,165,80,0.3)',
  },
  privacyStripHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  privacyStripIcon: {
    marginRight: 6,
  },
  privacyStripTitle: {
    color: '#00A550',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  privacyColumns: {
    flexDirection: 'row',
  },
  privacyColumn: {
    flex: 1,
  },
  privacyDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 14,
  },
  privacyColumnTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  privacyShared: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 3,
  },
  privacyNotShared: {
    fontSize: 12,
    color: '#C62828',
    marginBottom: 3,
  },
});

export default QRScanScreen;
