import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Insurer } from '../types';
import { mockInsurers } from '../data/mockData';
import InsurerCard from '../components/InsurerCard';

type Props = NativeStackScreenProps<RootStackParamList, 'InsurerSelection'>;

const InsurerSelectionScreen: React.FC<Props> = ({ navigation, route }) => {
  const { driverData, faultType, claimData } = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInsurer, setSelectedInsurer] = useState<Insurer | null>(null);

  const filteredInsurers = mockInsurers.filter((ins) =>
    ins.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    if (!selectedInsurer) {
      return;
    }
    navigation.navigate('ClaimSummary', {
      driverData,
      faultType,
      claimData,
      insurer: selectedInsurer,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      {/* Header section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Your Insurance Provider</Text>
        <Text style={styles.subtitle}>Who is your car insured with?</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search insurers..."
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Insurer list */}
      <FlatList
        data={filteredInsurers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InsurerCard
            insurer={item}
            selected={selectedInsurer?.id === item.id}
            onPress={() => setSelectedInsurer(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={40} color="#9CA3AF" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>No insurers match "{searchQuery}"</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        }
      />

      {/* Confirm button */}
      <View style={styles.footer}>
        {selectedInsurer && (
          <View style={styles.selectedLabel}>
            <Ionicons name="checkmark-circle" size={15} color="#2E7D32" style={styles.selectedIcon} />
            <Text style={styles.selectedText}>Selected: {selectedInsurer.name}</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.confirmButton, !selectedInsurer && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={!selectedInsurer}
          activeOpacity={0.85}
        >
          <Text style={[styles.confirmText, !selectedInsurer && styles.confirmTextDisabled]}>
            Confirm Insurer
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={selectedInsurer ? '#FFFFFF' : '#9CA3AF'}
            style={styles.confirmArrow}
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
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: '#1A1A2E',
  },
  clearButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: '#F0F4F8',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  selectedLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedIcon: {
    marginRight: 6,
  },
  selectedText: {
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '600',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B4F9B',
    borderRadius: 14,
    paddingVertical: 16,
  },
  confirmButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  confirmTextDisabled: {
    color: '#9CA3AF',
  },
  confirmArrow: {
    marginLeft: 8,
  },
});

export default InsurerSelectionScreen;
