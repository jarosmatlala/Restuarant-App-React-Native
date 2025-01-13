import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../redux/CartReducer';
import { getOfferings } from '../../services/offferingsApi';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();  
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const offeringsData = await getOfferings();
        setOfferings(offeringsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offerings:', error);
        setError('Unable to load offerings.');
        setLoading(false);
      }
    };

    fetchOfferings();
  }, []);

  const addItemToCart = useCallback((item) => {
    dispatch(addToCart(item));
  }, [dispatch]);

  const removeItemFromCart = useCallback((item) => {
    dispatch(removeFromCart(item));
  }, [dispatch]);

  const increaseQuantity = useCallback((item) => {
    dispatch(incrementQuantity(item));
  }, [dispatch]);

  const decreaseQuantity = useCallback((item) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Restaurant Offerings</Text>

      {offerings.map((item) => (
        <Pressable key={item._id} style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>

            {cart.some((value) => value.id === item._id) ? (
              <Pressable onPress={() => removeItemFromCart(item)}>
                <Text style={styles.button}>REMOVE FROM CART</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => addItemToCart(item)}>
                <Text style={styles.button}>ADD TO CART</Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      ))}

      {cart.map((item) => (
        <View style={styles.cartItem} key={item.id}>
          <Text>{item.name}</Text>
          <Image style={styles.image} source={{ uri: item.image }} />
          <View style={styles.quantityControl}>
            <Pressable onPress={() => decreaseQuantity(item)}>
              <Text style={styles.quantityButton}>-</Text>
            </Pressable>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <Pressable onPress={() => increaseQuantity(item)}>
              <Text style={styles.quantityButton}>+</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
  },
  button: {
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
    textAlign: "center",
  },
  cartItem: {
    padding: 10,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FF3366",
    borderRadius: 5,
    paddingVertical: 5,
  },
  quantityButton: {
    fontSize: 25,
    color: "white",
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default CartScreen;
