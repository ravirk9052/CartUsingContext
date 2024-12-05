import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import cartContext from './AppProvider';
import CartPage from './src/Screens/CartPage';
import CustomBottomTab from './src/Screens/CustomBottomTab';
import HomeScreen from './src/Screens/HomeScreen';

const Tabs = createBottomTabNavigator();
export interface IItemObj {
  discountPercentage: number;
  discountedTotal: number;
  id: number;
  itemCount: number;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
  total: number;
}

export interface IItemObject {
  item: {
    discountPercentage: number;
    discountedTotal: number;
    id: number;
    itemCount: number;
    price: number;
    quantity: number;
    thumbnail: string;
    title: string;
    total: number;
  };
}

const App = () => {
  const [count, setCount] = useState(1);
  const [addedCartdata, setCartData] = useState([]);

  const onIncrement = (count: number) => {
    setCount(count + 1);
  };

  const onDecrement = (count: number) => {
    setCount(count - 1);
  };

  const onAddCartData = (item: IItemObj) => {
    // console.log('28', item);
    if (item.itemCount > 0) {
      setCartData(prevState => {
        const itemIndex = prevState.findIndex(
          cartItem => cartItem.id === item.id,
        );

        if (itemIndex !== -1) {
          const updatedCartData = [...prevState];
          const existingItem = updatedCartData[itemIndex];

          if (existingItem.itemCount !== item.itemCount) {
            existingItem.itemCount = item.itemCount;
          }

          return updatedCartData;
        } else {
          return [...prevState, item];
        }
      });
    } else if (item.itemCount == 0) {
      setCartData(prevState => {
        const updatedCartData = prevState.filter(
          cartItem => cartItem.id !== item.id,
        );
        return updatedCartData;
      });
    }
  };

  return (
    <>
      <cartContext.Provider
        value={{
          count,
          onIncrement: onIncrement,
          onDecrement: onDecrement,
          addedCartdata,
          onAddCartData: onAddCartData,
        }}>
        <NavigationContainer>
          <Tabs.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="HomeScreen"
            tabBar={props => <CustomBottomTab {...props} />}>
            <Tabs.Screen name="HomeScreen" component={HomeScreen} />
            <Tabs.Screen name="CartPage" component={CartPage} />
          </Tabs.Navigator>
        </NavigationContainer>
      </cartContext.Provider>
    </>
  );
};

export default App;
