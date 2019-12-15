import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const {state, getBlogPost, deleteBlogPost} = useContext(BlogContext);
    
    useEffect(() => {
        getBlogPost();
        const listener = navigation.addListener('didFocus', () => { // calls the callback function whenever this screen is "in focus"
            getBlogPost();
        });
        
        return () => {
            listener.remove(); // cleans up listener(leaving listener could lead to memory leak)
        };
    }, []) // the empty array tells useEffect to only run one time when it loads on screen

    const blogList = (
        <FlatList
            data={state}
            keyExtractor={blogPost => blogPost.title}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Show', {id: item.id, title: item.title})}
                    >
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title} - {item.id}</Text>
                            <TouchableOpacity
                                onPress={() => deleteBlogPost(item.id)}
                            >
                                <Feather style={styles.trashIcon} name="trash-2"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );

    const noBlogs = (
        <Text style={styles.noBlogs}>No blogs to show.</Text>
    );

    return(
        <>
            { state.length > 0 ? blogList : noBlogs }
        </>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: (
            <TouchableOpacity
                onPress={() => navigation.navigate('Create')}
            >
                <Feather style={styles.plusIcon} name='plus'/>
            </TouchableOpacity>
        ),
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        margin: 15,
        marginTop: 15,
        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: { width: 0, height: 2},
        backgroundColor: 'white',
        elevation: 1, // adds box shadow for android
    },
    title: {
        fontSize: 18
    },  
    trashIcon: {
        fontSize: 24,
    },
    plusIcon: {
        fontSize: 30,
        marginRight: 10,
    },
    noBlogs: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    }
});

export default IndexScreen;