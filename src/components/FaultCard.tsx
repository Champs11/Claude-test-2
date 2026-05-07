import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FaultCardProps {
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
  selected: boolean;
  onPress: () => void;
}

const FaultCard: React.FC<FaultCardProps> = ({
  title,
  description,
  iconName,
  color,
  selected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && { borderColor: color, borderWidth: 2 },
        !selected && styles.cardUnselected,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '1A' }]}>
        <Ionicons name={iconName} size={28} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {selected && (
        <Ionicons name="checkmark-circle" size={22} color={color} style={styles.checkmark} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardUnselected: {
    borderColor: '#E5E7EB',
    borderWidth: 1.5,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  checkmark: {
    marginLeft: 8,
    flexShrink: 0,
    alignSelf: 'center',
  },
});

export default FaultCard;
