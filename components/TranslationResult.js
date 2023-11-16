import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../utils/colors";
import { Feather } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default TranslationResult = props => {
    return <View
        style={styles.container}
        onPress={props.onPress}>
        <View style={styles.textContainer}>
            <Text 
            numberOfLines={4}
            style={styles.title}>Some item</Text>
            <Text 
            numberOfLines={4}
            style={styles.subTitle}>Some sub title</Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons name="star" size={24} color={colors.subTextColor} />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        borderColor: colors.lightGrey,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderTopWidth: 0
    },
    textContainer: {
        flex: 1,
        marginRight: 8
    },
    title: {
        fontFamily: 'medium',
        letterSpacing: 0.3,
        color: colors.textColor
    },
    subTitle: {
        fontFamily: 'regular',
        letterSpacing: 0.3,
        color: colors.subTextColor,
        fontSize: 13
    },
    iconContainer: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})