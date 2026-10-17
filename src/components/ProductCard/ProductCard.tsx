import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { styles } from "./ProductCard.style";

interface ProductCardProps {
  title: string;
  price: string;
  imgURL: string;
  inStock?: boolean;
  onPress: () => void;
  onAddToCart: () => void;
  fullWidth?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  price, 
  imgURL, 
  inStock, 
  onPress, 
  onAddToCart, 
  fullWidth 
}) => {

  // E-posta uygulamasını açacak fonksiyon
  const handleNotifyMail = () => {
    const email = "destek@fridaystore.com"; // Kendi iletişim adresin
    const subject = `Stok Bildirimi Talebi: ${title}`;
    const body = `Merhaba, \n\n"${title}" isimli ürün stoğa girdiğinde bilgilendirilmek istiyorum.\n\nTeşekkürler.`;
    
    Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  return (
    <TouchableOpacity style={[styles.card, fullWidth && { width: '95%' }]} onPress={onPress}>
      <Image source={{ uri: imgURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        
        {inStock ? (
          <TouchableOpacity 
            style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 5, marginTop: 10, alignItems: 'center' }}
            onPress={onAddToCart}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Satın Al</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={{ marginTop: 10, alignItems: 'flex-start' }}
            onPress={handleNotifyMail}
          >
            <Text style={{ color: 'red', fontWeight: 'bold', textDecorationLine: 'underline', fontSize: 12 }}>
              Gelince haber ver
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;