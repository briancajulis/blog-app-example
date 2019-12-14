import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const {state, addBlogPost, deleteBlogPost} = useContext(BlogContext);
    
    return(
        <>
            <Button
                title= 'Add Post'
                onPress={addBlogPost}
            />
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
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        margin: 15,
        shadowColor: '#000',
        shadowOpacity: .5,
        shadowOffset: { width: 0, height: 2},
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18
    },  
    trashIcon: {
        fontSize: 24,
    }
});

export default IndexScreen;