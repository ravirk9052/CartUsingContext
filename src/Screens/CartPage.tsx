import React, {useCallback, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import cartContext from '../../AppProvider';
import Icons from 'react-native-vector-icons/Entypo';
import { IItemObj, IItemObject } from '../../App';
import { IObject } from './HomeScreen';

const CartPage = () => {
  const cartData = useContext(cartContext);
  const {addedCartdata, count, onAddCartData} = cartData;

  const renderAddedCartItem = (Item: IItemObject) => {
    // console.log('19', Item);
    const {item} = Item;

    const {
      id,
      title,
      quantity,
      total,
      discountPercentage,
      discountedTotal,
      thumbnail,
      itemCount,
    } = item;

    // console.log('32', itemCount);

    const onPressPlusButton = (item: IItemObj) => {
      addedCartdata.find((cartItem: IItemObj) => {
        if (cartItem.id == item.id) {
          cartItem.itemCount = cartItem.itemCount + 1;
          onAddCartData(cartItem);
        }
      });
    };

    const onPressMinusButton = () => {
        addedCartdata.find((cartItem: IItemObj) => {
          // console
            if (cartItem.id == item.id) {
              cartItem.itemCount = cartItem.itemCount - 1;
              onAddCartData(cartItem);
            }
          });
    };

    return (
      <SafeAreaView>
        {itemCount > 0 && (
          <View style={styles.cartContainer}>
            <View style={styles.imgStyle}>
              <Image source={{uri: thumbnail}} style={styles.img} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.titleText} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.stockText}>
                In Stock: <Text style={styles.quantity}>({quantity})</Text>
              </Text>
              <View style={styles.plusMinusContaner}>
                <TouchableOpacity
                  style={styles.plusContainer}
                  onPress={onPressMinusButton}>
                  <Icons name="minus" size={25} color="#9B9B9B" />
                </TouchableOpacity>

                <View>
                  <Text style={styles.itemCount}>{itemCount}</Text>
                </View>
                <TouchableOpacity
                  style={styles.plusContainer}
                  onPress={() => onPressPlusButton(item)}>
                  <Icons name="plus" size={25} color="#9B9B9B" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.dotsContainer}>
              <Icons name="dots-three-vertical" color="grey" size={25} />
              <Text style={styles.price}>
                {' '}
                ₹ {discountPercentage * itemCount}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.bagContainer}>
        <Text style={styles.bagText}>My Bag</Text>
      </View>
      <FlatList
        data={addedCartdata}
        renderItem={renderAddedCartItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  cartContainer: {
    // borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    margin: 10,
    // padding: 8,
    // marginLeft: 10,
    marginTop: 10,
  },
  textContainer: {
    // borderWidth: 1,
    width: '45%',
    // borderWidth: 1,
    marginLeft: 15,
    padding: 3,
  },
  img: {
    height: '100%',
  },
  imgStyle: {
    width: '30%',
    height: 100,
    padding: 0,
    borderTopLeftRadius: 12,
  },
  titleText: {
    // flex: 1,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: 700,
    color: '#222222',
    width: '100%',
  },
  stockText: {
    paddingLeft: 5,
    fontSize: 14,
    color: 'grey',
  },
  quantity: {
    fontWeight: 700,
    fontSize: 15,
    color: '#222222',
  },
  plusContainer: {
    // width: 25,
    // height: 25,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    elevation: 10,
  },
  plusMinusContaner: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // justifyContent: 'flex-start',
    // borderWidth: 1,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: 700,
  },
  dotsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginRight: 10,
    // borderWidth: 1,
  },
  price: {
    color: '#222222',
    fontSize: 16,
    fontWeight: 700,
  },
  bagContainer: {
    marginLeft: 10,
    // borderWidth: 1,
    marginTop: 50,
  },
  bagText: {
    color: '#222222',
    fontSize: 34,
    fontWeight: 'bold',
  },
});
