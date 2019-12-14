import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);
    
    const blogPost = state.find((blogPost) => blogPost.id === navigation.getParam('id'));

    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    );
};

// Changes the header title in navigation
ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight:(
            <TouchableOpacity
                onPress={() => navigation.navigate('Edit', { id: navigation.getParam('id') })}
            >
                <FontAwesome name="pencil" style={styles.editIcon} />
            </TouchableOpacity>
        ),
    }
}

const styles = StyleSheet.create({
    editIcon: {
        fontSize: 30,
        marginRight: 10,
    },
});

export default ShowScreen;