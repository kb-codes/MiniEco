import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SuperText from '../../components/SuperText';
import Spacer from '../../components/Spacer';
import { Spacing } from '../../res/theme';
import { colors } from '../../res/colors';
import { strings } from '../../res/strings';
import { wp, hp } from '../../constants';
import { useProductDetailViewModel } from '../../viewModels/useProductDetailViewModel';
import { useNetInfo } from '@react-native-community/netinfo';
import { styles } from './style';

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

const ProductDetails = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const initialProduct = route?.params?.product;
    const { product, loading, error } = useProductDetailViewModel(initialProduct);

    if (!product) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerLoad}>
                    <SuperText value={strings.productNotFound} color={colors.gray} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <OfflineBanner />

            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={wp(5)} color={colors.black} />
                </TouchableOpacity>

                <SuperText
                    value={strings.productDetailTitle}
                    size={wp(4.5)}
                    semiBold
                    color={colors.black}
                />

                <View style={styles.headerSpacer} />
            </View>

            {loading ? (
                <View style={styles.centerLoad}>
                    <ActivityIndicator size="large" color={colors.gray} />
                </View>
            ) : error ? (
                <View style={styles.centerLoad}>
                    <SuperText value={error} color={colors.gray} />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* ── Hero Image ── */}
                    {/* Display the first image from the images array, or fallback to thumbnail */}
                    <Image
                        source={{ uri: product.images?.[0] || product.thumbnail }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />

                    <Spacer space={Spacing.three} />

                    {/* ── Category ── */}
                    <SuperText
                        value={product.category?.toUpperCase()}
                        size={wp(3)}
                        color={colors.gray}
                        medium
                        style={styles.category}
                    />

                    <Spacer space={Spacing.one} />

                    {/* ── Product Name ── */}
                    <SuperText
                        value={product.title}
                        size={wp(6)}
                        bold
                        color={colors.black}
                        style={styles.name}
                    />

                    <Spacer space={Spacing.two} />

                    {/* ── Price ── */}
                    <SuperText
                        value={`$${Number(product.price).toFixed(2)}`}
                        size={wp(6)}
                        bold
                        color={colors.black}
                    />

                    <Spacer space={Spacing.two} />

                    {/* ── Description ── */}
                    <SuperText
                        value={product.description}
                        size={wp(3.8)}
                        color={colors.gray}
                        style={styles.description}
                    />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default ProductDetails;