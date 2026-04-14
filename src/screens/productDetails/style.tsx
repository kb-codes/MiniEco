import { StyleSheet } from 'react-native';
import { Spacing } from '../../res/theme';
import { colors } from '../../res/colors';
import { wp, hp } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.two,
    },
    backButton: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSpacer: {
        width: wp(10),
    },
    scrollContent: {
        paddingHorizontal: Spacing.three,
        paddingBottom: Spacing.five,
    },
    heroImage: {
        width: '100%',
        height: hp(45),
        borderRadius: Spacing.three,
        backgroundColor: colors.white,
    },
    category: {
        letterSpacing: 1,
    },
    name: {
        lineHeight: wp(8),
    },
    description: {
        lineHeight: wp(6),
    },
    centerLoad: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineBanner: {
        backgroundColor: '#D32F2F',
        alignItems: 'center',
        paddingVertical: Spacing.one,
    }
});