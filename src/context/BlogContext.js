import React, { useState, createContext } from 'react';

// Context does not manage state, it only moves information
// Allows the ability to move information directly a component
const BlogContext = createContext();

// Children are the contents within the BlogProvider tags in App.js
export const BlogProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([]);

    const addBlogPost = () => {
        setBlogPosts([...blogPosts, {title: `Blog Post #${blogPosts.length + 1}`}])
    };

    return (
        <BlogContext.Provider value={{ data: blogPosts, addBlogPost }}>{children}</BlogContext.Provider>
    );
};

export default BlogContext;