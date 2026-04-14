import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from '../screens/productList';
import ProductDetails from '../screens/productDetails';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProductList" component={ProductList} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
}