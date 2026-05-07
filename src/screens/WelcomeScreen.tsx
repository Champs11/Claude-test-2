import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#1B4F9B', '#0D2E5C']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topSpacer} />

        <View style={styles.heroSection}>
          <View style={styles.iconWrapper}>
            <Ionicons name="shield-checkmark" size={80} color="#FFFFFF" />
          </View>

          <Text style={styles.appName}>ClaimSafe</Text>
          <Text style={styles.tagline}>Insurance claims, without the privacy risk.</Text>
        </View>

        <View style={styles.featureList}>
          <View style={styles.featureRow}>
            <Ionicons name="qr-code" size={20} color="#00A550" style={styles.featureIcon} />
            <Text style={styles.featureText}>Scan your digital licence QR code</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="lock-closed" size={20} color="#00A550" style={styles.featureIcon} />
            <Text style={styles.featureText}>Home address never shared — ever</Text>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="flash" size={20} color="#00A550" style={styles.featureIcon} />
            <Text style={styles.featureText}>File a claim in under 3 minutes</Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#1B4F9B" style={styles.arrowIcon} />
          </TouchableOpacity>

          <Text style={styles.poweredBy}>
            Powered by Service Victoria Digital Licence
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
  },
  topSpacer: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  featureList: {
    flex: 1.5,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  featureIcon: {
    marginRight: 12,
    width: 24,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 12,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: '#1B4F9B',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 6,
  },
  arrowIcon: {
    marginLeft: 2,
  },
  poweredBy: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
