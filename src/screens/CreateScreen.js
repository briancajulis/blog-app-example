import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(Context);

    return <BlogPostForm onSubmit={(title, content) => {
        addBlogPost(title, content, () => { navigation.navigate('Index')})
    }} />;
};

CreateScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Create Blog',
    }
};


export default CreateScreen;