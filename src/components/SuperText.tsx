import { StyleSheet, Text, TextStyle } from 'react-native'
import React, { FC } from 'react'
import { fonts } from '../res/fonts'
import { colors } from '../res/colors'
import { wp } from '../constants'

interface SuperTextProps {
    numberOfLines?: number
    value: string
    style?: TextStyle | TextStyle[]
    bold?: boolean
    semiBold?: boolean
    medium?: boolean
    light?: boolean
    color?: string
    size?: number
}

const SuperText: FC<SuperTextProps> = ({
    numberOfLines,
    value,
    style,
    bold,
    color,
    size,
    medium,
    semiBold,
    light
}) => {

    const combinedStyle: TextStyle = StyleSheet.flatten([
        { fontFamily: bold ? fonts.Bold : semiBold ? fonts.SemiBold : medium ? fonts.Medium : light ? fonts.Light : fonts.Regular },
        { color: color ? color : colors.black },
        { fontSize: size ? size : wp(4) },
        style,
    ])
    return (
        <Text
            style={combinedStyle}
            numberOfLines={numberOfLines}
        >
            {value}
        </Text>
    )
}

export default SuperText
