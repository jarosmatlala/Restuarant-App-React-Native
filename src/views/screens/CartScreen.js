import React, { useCallback } from "react";
import { StyleSheet, Text, View, Image, Pressable, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../../redux/CartReducer';  

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch(); 
  const images = [
    {
      id: "0",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqg_OBzcVDnKHv1d3hyVk_WlCo43pzit4CJQ&usqp=CAU",
      name: "Ice Cream",
    },
    {
      id: "1",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85O96gPiso_j2gaS0cePTBY4mCR3pumV6tw&usqp=CAU",
      name: "Biscuit",
    },
    {
      id: "2",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicQWeRoxxLEr1RLIp8dJtw-NQvSE4xtlhwA&usqp=CAU",
      name: "Chocolate",
    },
  ];

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Restuarant Offerings</Text>

      {images.map((item) => (
        <Pressable key={item.id} style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.image }} />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>

            {cart.some((value) => value.id === item.id) ? (
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
});

export default CartScreen;
