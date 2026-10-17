import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import data from './data.json';
import ProductCard from './components/ProductCard/ProductCard';
import StaticSearchBar from './components/SearchBar/StaticSearchBar';

interface Product {
  id: number;
  title: string;
  price: string;
  inStock: boolean;
  imgURL: string;
  categoryId?: string;
}

const CATEGORIES = [
  { id: '1', name: 'Kadın', icon: '👗' },
  { id: '2', name: 'Erkek', icon: '👔' },
  { id: '3', name: 'Anne & Çocuk', icon: '👶' },
  { id: '4', name: 'Ev & Mobilya', icon: '🛋️' },
  { id: '5', name: 'Kozmetik', icon: '💄' },
  { id: '6', name: 'Saat & Aksesuar', icon: '⌚' },
  { id: '7', name: 'Elektronik', icon: '📱' },
  { id: '8', name: 'Spor & Outdoor', icon: '⛺' },
  { id: '9', name: 'Kitap, Kırtasiye', icon: '📚' },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setPopupMessage(`🛒 ${product.title} sepete eklendi!`);
    setTimeout(() => {
      setPopupMessage(null);
    }, 2500);
  };

  const handleRemoveFromCart = (indexToRemove: number) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  const filteredAndSortedData = data
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.inStock === b.inStock) return 0;
      return a.inStock ? -1 : 1;
    });

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => {
            setSearchTerm('');
            setSelectedCategory(null);
          }}
        >
          <Text style={styles.headerText}>FridayStore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cartBadge} onPress={() => setIsCartVisible(true)}>
          <Text style={styles.cartText}>🛒 {cart.length}</Text>
        </TouchableOpacity>
      </View>
      
      <StaticSearchBar
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Ara..."
      />
      
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.categoryItem}
              onPress={() => setSelectedCategory(item.id === selectedCategory ? null : item.id)}
            >
              <View style={[
                styles.categoryIconBox, 
                selectedCategory === item.id && styles.categoryIconBoxSelected
              ]}>
                <Text style={styles.categoryIcon}>{item.icon}</Text>
              </View>
              <Text style={[
                styles.categoryText,
                selectedCategory === item.id && styles.categoryTextSelected
              ]} numberOfLines={2}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <FlatList
        numColumns={2}
        data={filteredAndSortedData}
        renderItem={({ item, index }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            inStock={item.inStock}
            imgURL={item.imgURL}
            onPress={() => console.log(`Product ${item.id} detayına tıklandı`)}
            onAddToCart={() => handleAddToCart(item as Product)}
            fullWidth={index === filteredAndSortedData.length - 1 && filteredAndSortedData.length % 2 !== 0}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {popupMessage && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>{popupMessage}</Text>
        </View>
      )}

      <Modal visible={isCartVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sepetim ({cart.length})</Text>
            <TouchableOpacity onPress={() => setIsCartVisible(false)}>
              <Text style={styles.closeButtonText}>Kapat ✖</Text>
            </TouchableOpacity>
          </View>

          {cart.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyCartText}>Sepetiniz şu an boş.</Text>
            </View>
          ) : (
            <FlatList
              data={cart}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.cartItem}>
                  <Image source={{ uri: item.imgURL }} style={styles.cartItemImage} />
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemTitle}>{item.title}</Text>
                    <Text style={styles.cartItemPrice}>{item.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(index)}>
                    <Text style={styles.removeButtonText}>Sil</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}

          {cart.length > 0 && (
            <TouchableOpacity style={styles.checkoutButton} onPress={() => {
              alert('Sipariş başarıyla oluşturuldu!');
              setCart([]);
              setIsCartVisible(false);
            }}>
              <Text style={styles.checkoutButtonText}>Alışverişi Tamamla</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50, backgroundColor: '#fff' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 20 },
  headerText: { fontSize: 40, fontWeight: 'bold', margin: 10, marginLeft: 25 },
  cartBadge: { backgroundColor: '#007bff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20 },
  cartText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  categoriesContainer: { paddingVertical: 15, paddingLeft: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: 10 },
  categoryItem: { alignItems: 'center', marginRight: 15, width: 75 },
  categoryIconBox: { width: 65, height: 65, borderRadius: 35, backgroundColor: '#f8f9fa', justifyContent: 'center', alignItems: 'center', marginBottom: 8, borderWidth: 1, borderColor: '#e9ecef', elevation: 2 },
  categoryIconBoxSelected: { borderColor: '#007bff', backgroundColor: '#e6f2ff', borderWidth: 2 },
  categoryIcon: { fontSize: 28 },
  categoryText: { fontSize: 12, textAlign: 'center', color: '#555', fontWeight: '500' },
  categoryTextSelected: { color: '#007bff', fontWeight: 'bold' },
  
  popupContainer: { position: 'absolute', top: 10, right: 20, backgroundColor: '#32cd32', padding: 15, borderRadius: 10, zIndex: 1000, elevation: 5 },
  popupText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  modalContainer: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  modalTitle: { fontSize: 24, fontWeight: 'bold' },
  closeButtonText: { color: '#d9534f', fontSize: 16, fontWeight: 'bold' },
  emptyCartContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyCartText: { fontSize: 18, color: '#888' },
  cartItem: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cartItemImage: { width: 50, height: 50, resizeMode: 'contain', marginRight: 15, borderRadius: 8 },
  cartItemInfo: { flex: 1 },
  cartItemTitle: { fontSize: 16, fontWeight: 'bold' },
  cartItemPrice: { fontSize: 16, color: '#808080', marginTop: 4 },
  removeButton: { backgroundColor: '#ff4444', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 5, marginLeft: 10 },
  removeButtonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  checkoutButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  checkoutButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});