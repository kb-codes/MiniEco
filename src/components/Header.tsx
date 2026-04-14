import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../res/colors';
import { wp, hp } from '../constants';
import SuperText from './SuperText';
import { images } from '../res/images';

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    style?: ViewStyle;
    titleColor?: string;
}

const Header = ({
    title,
    onBackPress,
    style,
    titleColor = colors.white
}: HeaderProps) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, style]}>
            <View style={styles.headerContent}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Image source={images.backIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <SuperText value={title} medium color={titleColor} size={wp(5)} />
                </View>

                <View style={styles.backButton} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: hp(2),
    },
    titleContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        width: wp(12),
        height: wp(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        tintColor: colors.white
    }
});

export default Header;
