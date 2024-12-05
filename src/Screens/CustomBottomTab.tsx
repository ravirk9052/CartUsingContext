import React, { useContext } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cartContext from '../../AppProvider';

interface ICustom {
  state: {
    routes: {
      route: string,
      index: number,
    },
  }
  descriptors: {
    'CartPage-gYPh3SJ9Xmy5pvqik-s1c': {
      route: {
        key: string,
      }
    }
  }

  navigation: {
    emit: {},
    navigate: () => void
  }
  }



const CustomBottomTab = ({state, descriptors, navigation}: ICustom) => {
  const data = useContext(cartContext);
  const {addedCartdata} = data;
  // console.log('10',navigation.navigate)
  const lengthofCart = addedCartdata.length;
  //  console.log('10',descriptors['CartPage-gYPh3SJ9Xmy5pvqik-s1c'].route.key)
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        // console.log('11', options)
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // console.log('18', label);
        const isFocused = state.index === index;

        let IconComponent;
        if (label === 'HomeScreen') {
          IconComponent = (
            <MaterialCommunityIcons
              name={isFocused ? 'home' : 'home-outline'}
              size={30}
              color={isFocused ? 'red' : 'grey'}
            />
          );
        } else {
          IconComponent = (
            <View>
              {isFocused && <Text style={styles.badge}>{lengthofCart}</Text> }
              <Ionicons
                name={isFocused ? 'cart' : 'cart-outline'}
                size={30}
                color={isFocused ? 'red' : 'grey'}
              />
            </View>
          );
        }

        // console.log('42', IconComponent);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.textContainer}
            key={index}>
            {IconComponent}
            <Text style={{color: isFocused ? 'red' : 'grey'}}>
              {typeof label === 'string' ? label : null}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 2,
  },
  badge: {
    color: 'red',
    left: 25,
    top: 8,
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default CustomBottomTab;
