import createDataContext from './createDataContext';

// Context does not manage state, it only moves information
// Allows the ability to move information directly a component
// const BlogContext = createContext();

const blogReducer = (state, action) => {
    switch(action.type) {
        case 'add_blogpost':
            return [...state, { id: Math.floor(Math.random() * 99999), title: `Blog Post #${state.length + 1}`}];
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        default:
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return () => {
        dispatch({ type: 'add_blogpost' });
    };
};

const deleteBlogPost = (dispatch) => {
    return id => {
        dispatch({ type: 'delete_blogpost', payload: id});
    };
};

// Children are the contents within the BlogProvider tags in App.js
// export const BlogProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(blogReducer, []);

//     return (
//         <BlogContext.Provider value={{ data: state, addBlogPost }}>
//             {children}
//         </BlogContext.Provider>
//     );
// };

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost }, []);