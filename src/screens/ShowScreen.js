import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShowScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Show Screen</Text>
        </View>
    );
};

// Changes the header title in navigation
ShowScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title')
})

const styles = StyleSheet.create({

});

export default ShowScreen;