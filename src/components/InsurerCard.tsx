import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Insurer } from '../types';

interface InsurerCardProps {
  insurer: Insurer;
  selected: boolean;
  onPress: () => void;
}

const ICON_COLORS: Record<string, string> = {
  aami: '#E53935',
  nrma: '#1565C0',
  allianz: '#1B5E20',
  gio: '#F57F17',
  'budget-direct': '#6A1B9A',
  qbe: '#0277BD',
};

const InsurerCard: React.FC<InsurerCardProps> = ({ insurer, selected, onPress }) => {
  const iconColor = ICON_COLORS[insurer.id] ?? '#1B4F9B';

  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.iconCircle, { backgroundColor: iconColor + '1A' }]}>
        <Ionicons name={insurer.logo as keyof typeof Ionicons.glyphMap} size={26} color={iconColor} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{insurer.name}</Text>
        <Text style={styles.phone}>Claims line: {insurer.phone}</Text>
      </View>
      {selected && (
        <Ionicons name="checkmark-circle" size={24} color="#1B4F9B" style={styles.checkmark} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#1B4F9B',
    borderWidth: 2,
    backgroundColor: '#F0F4FF',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 2,
  },
  phone: {
    fontSize: 12,
    color: '#6B7280',
  },
  checkmark: {
    marginLeft: 8,
  },
});

export default InsurerCard;
