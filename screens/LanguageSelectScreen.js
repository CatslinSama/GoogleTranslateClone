import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'

const CustomHeaderButtom = props => {
    return <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={23}
        color={props.color || colors.primary}
    />
}

export default function LanguageSelectScreen({ navigation,route }) {
    const parms = route.parms || {};
    const {title} = parms;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButtom}>
                    <Item
                        iconName='close'
                        color={colors.textColor}
                        onPress={() => navigation.goBack()}
                    />
                </HeaderButtons>
            )
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text>LanguageSelectScreen Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
