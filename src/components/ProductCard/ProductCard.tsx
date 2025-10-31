import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./ProductCard.style";

interface ProductCardProps {
  title: string;
  price: string;
  imgURL: string;
  inStock?: boolean;
  onPress: () => void;
  fullWidth?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, imgURL, inStock, onPress, fullWidth }) => {
  return (
    <TouchableOpacity style={[styles.card, fullWidth && { width: '95%' }]} onPress={onPress}>
      <Image source={{ uri: imgURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        {inStock !== undefined && (
          <Text style={{ color: inStock ? 'green' : 'red', marginTop: 5 }}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
