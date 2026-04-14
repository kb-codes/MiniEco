import { StyleSheet } from 'react-native';
import { fonts } from './fonts';

export const common = StyleSheet.create({
  bold: {
    fontFamily: fonts.Bold,
  },
  regular: {
    fontFamily: fonts.Regular,
  },
  medium: {
    fontFamily: fonts.Medium,
  },
  semiBold: {
    fontFamily: fonts.SemiBold,
  },
  light: {
    fontFamily: fonts.Light,
  },
  extraBold: {
    fontFamily: fonts.ExtraBold,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
