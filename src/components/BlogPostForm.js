import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Title:</Text>
            <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                style={styles.titleInput}
                value={title} onChangeText={(text) => setTitle(text)}
            />

            <Text style={styles.label}>Enter Content:</Text>
            <TextInput
                style={styles.contentInput} 
                value={content} onChangeText={(text) => setContent(text)}
                autoCapitalize="sentences"
                autoCorrect={false}    
            />
            <Button
                title="Save Blog Post"
                onPress={() => {
                    onSubmit(title,content);
                }}
            />
        </View>
    );
};

// Gives our component default values
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: '',
    }
};


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    label: {
        fontWeight: "bold",
        fontSize: 20,
    },
    titleInput: {
        borderColor: "black",
        borderWidth: 2,
        fontSize: 18,
        paddingVertical: 5,
        marginBottom: 20,
    },
    contentInput: {
        borderColor: "black",
        borderWidth: 2,
        fontSize: 18,
        paddingVertical: 5,
    },
});

export default BlogPostForm;