import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StaticSearchBarProps {
  placeholder?: string; 
  onPress?: () => void; 
}

const StaticSearchBar: React.FC<StaticSearchBarProps> = ({ 
  placeholder = "Search...", 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.searchBarContainer} 
      activeOpacity={0.8}
      onPress={onPress} 
    >
      <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      <Text style={styles.placeholderText}>
        {placeholder}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', 
    borderRadius: 10, 
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15, 
    marginBottom: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2, 
  },
  searchIcon: {
    marginRight: 10, 
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
  },
});

export default StaticSearchBar;