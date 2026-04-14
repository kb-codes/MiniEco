import { StyleSheet } from 'react-native';
import { Spacing } from '../../res/theme';
import { colors } from '../../res/colors';
import { wp, hp } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerSection: {
        alignItems: 'center',
        paddingTop: Spacing.three,
        paddingBottom: Spacing.four,
    },
    collectionTitle: {
        letterSpacing: 1,
        textTransform: 'uppercase'
    },
    searchButton: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    listContent: {
        paddingHorizontal: Spacing.three,
        paddingBottom: Spacing.five,
        flexGrow: 1,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: Spacing.three,
    },
    card: {
        width: wp(44),
        backgroundColor: colors.white,
        borderRadius: Spacing.three,
        overflow: 'hidden',
        paddingBottom: Spacing.two,
    },
    productImage: {
        width: '100%',
        height: hp(22),
        backgroundColor: colors.white,
    },
    category: {
        letterSpacing: 0.5,
        paddingHorizontal: Spacing.two,
    },
    name: {
        lineHeight: wp(5),
        paddingHorizontal: Spacing.two,
    },
    price: {
        paddingHorizontal: Spacing.two,
    },
    centerLoad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerLoader: {
        paddingVertical: Spacing.three,
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(10),
    },
    offlineBanner: {
        backgroundColor: '#D32F2F',
        alignItems: 'center',
        paddingVertical: Spacing.one,
    }
});