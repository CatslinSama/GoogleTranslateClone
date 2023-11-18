import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../utils/colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setSavedItems } from "../store/savedItemsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default TranslationResult = props => {
    const dispath = useDispatch();
    const { itemId } = props;
    const item = useSelector(state => state.history.items.find(item => item.id === itemId));
    const savedItems = useSelector(state => state.savedItems.items)
    const isSvaed = savedItems.some(i => i.id === itemId);
    const startIconColor = isSvaed ? colors.primary : 'gray';


    const startItem = useCallback(async() => {
        let newsavedItems;
        if (isSvaed) {
            newsavedItems = savedItems.filter(i => i.id !== itemId)
        } else {
            newsavedItems = savedItems.slice();
            newsavedItems.push(item)
        }

        await AsyncStorage.setItem('savedItems',JSON.stringify(newsavedItems))

        dispath(setSavedItems({ items: newsavedItems }));
    }, [dispath,savedItems]);

    return <View
        style={styles.container}
        onPress={props.onPress}>
        <View style={styles.textContainer}>
            <Text
                numberOfLines={4}
                style={styles.title}>{item.trans_result[0].src}</Text>
            <Text
                numberOfLines={4}
                style={styles.subTitle}>{item.trans_result[0].dst}</Text>
        </View>

        <TouchableOpacity
            onPress={startItem}
            style={styles.iconContainer}
        >
            <MaterialCommunityIcons name='star' size={24} color={startIconColor} />
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