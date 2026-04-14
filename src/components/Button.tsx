import { Image, Platform, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import { colors } from '../res/colors';
import { hp, wp } from '../constants';
import SuperText from './SuperText';

interface ButtonProps {
  onPress?: () => void;
  label: string;
  extraStyle?: ViewStyle | ViewStyle[];
  bordered?: boolean;
  absolute?: boolean;
  icon?: any;
  textColor?: string;
  textSize?: number;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        styles.container,
        props.bordered && styles.bordered,
        props.absolute && styles.absolute,
        props.extraStyle,
        props.disabled && { opacity: 0.5 }
      ]}>
      {props.icon && <Image source={props.icon} style={{ marginRight: wp(3) }} />}
      <SuperText
        value={props.label}
        semiBold
        size={props.textSize || wp(4.5)}
        color={props.textColor ? props.textColor : (props.bordered ? colors.primary : colors.white)}
      />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: '100%',
    borderRadius: wp(10),
    paddingVertical: hp(2),
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: hp(7),
  },
  absolute: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? hp(4) : hp(2),
    alignSelf: 'center',
    width: wp(90),
  },
  bordered: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
