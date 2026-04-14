import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SuperText from '../../components/SuperText';
import Spacer from '../../components/Spacer';
import Button from '../../components/Button';
import { Spacing } from '../../res/theme';
import { colors } from '../../res/colors';
import { strings } from '../../res/strings';
import { wp, hp } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';

import { useProductListViewModel } from '../../viewModels/useProductListViewModel';
import { Product } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
import { styles } from './style';

const ProductCard = ({ item, onPress }: { item: Product; onPress: () => void }) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} resizeMode="cover" />
        <Spacer space={Spacing.two} />
        <SuperText
            value={item.category.toUpperCase()}
            size={wp(2.8)}
            color={colors.gray}
            medium
            style={styles.category}
        />
        <Spacer space={Spacing.one} />
        <SuperText
            value={item.title}
            size={wp(3.5)}
            color={colors.black}
            semiBold
            numberOfLines={2}
            style={styles.name}
        />
        <Spacer space={Spacing.one} />
        <SuperText
            value={`$${item.price.toFixed(2)}`}
            size={wp(4.2)}
            color={colors.black}
            bold
            style={styles.price}
        />
    </TouchableOpacity>
);

const OfflineBanner = () => {
    const netInfo = useNetInfo();
    // Only show if definitely offline
    if (netInfo.isConnected !== false) return null;
    return (
        <View style={styles.offlineBanner}>
            <SuperText value={strings.offlineBanner} color={colors.white} size={wp(3)} medium />
        </View>
    );
};

const ProductList = () => {
    const navigation = useNavigation<any>();
    const {
        products,
        loading,
        refreshing,
        loadingMore,
        error,
        handleLoadMore,
        handleRefresh,
    } = useProductListViewModel();

    const renderFooter = () => {
        if (!loadingMore) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={colors.gray} />
            </View>
        );
    };

    const renderEmpty = () => {
        if (loading) return null;
        return (
            <View style={styles.emptyContainer}>
                <SuperText value={error ? strings.emptyError : strings.emptyNoProducts} size={wp(4)} color={colors.gray} />
                {error && (
                    <Button
                        label={strings.tryAgain}
                        onPress={handleRefresh}
                        extraStyle={{ marginTop: Spacing.three, width: wp(40), height: hp(5) }}
                    />
                )}
            </View>
        );
    };

    return (
        <LinearGradient
            colors={['#FFFFFF', '#EAE8E0']}
            style={styles.container}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <OfflineBanner />

                {/* ── New Header Layout ── */}
                <View style={styles.headerSection}>
                    <SuperText
                        value={strings.discoverTitle}
                        size={wp(8)}
                        color={colors.black}
                        style={styles.collectionTitle}
                    />
                    <Spacer space={Spacing.half} />
                    <SuperText
                        value={strings.discoverSubtitle}
                        size={wp(3.5)}
                        color={colors.gray}
                    />
                </View>

                {loading ? (
                    <View style={styles.centerLoad}>
                        <ActivityIndicator size="large" color={colors.gray} />
                    </View>
                ) : (
                    <FlatList
                        data={products}
                        keyExtractor={(item, index) => item.id.toString() + index}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.gray} />
                        }
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmpty}
                        renderItem={({ item }) => (
                            <ProductCard
                                item={item}
                                onPress={() =>
                                    navigation.navigate('ProductDetails', { product: item })
                                }
                            />
                        )}
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ProductList;