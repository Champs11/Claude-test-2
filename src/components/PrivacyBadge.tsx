import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PrivacyBadge: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="lock-closed" size={12} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.text}>Address protected</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default PrivacyBadge;
