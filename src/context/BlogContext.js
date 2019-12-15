import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

// Context does not manage state, it only moves information
// Allows the ability to move information directly a component
// const BlogContext = createContext();

const blogReducer = (state, action) => {
    switch(action.type) {
        // case 'add_blogpost':
        //     return [...state, {
        //         id: Math.floor(Math.random() * 99999),
        //         title: action.payload.title,
        //         content: action.payload.content
        //     }];
        case 'delete_blogpost':
            return state.filter(blogPost => blogPost.id !== action.payload);
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });
        case 'get_blogposts':
            return action.payload;
        default:
            return state;
    }
};

const getBlogPost = (dispatch) => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        dispatch({ type: 'get_blogposts', payload: response.data });
    };
};

const addBlogPost = () => {
    return async (title, content, callback) => {
        // dispatch({ type: 'add_blogpost', payload: { title, content } });

       await jsonServer.post('/blogposts', { title, content });
        if (callback) {
            callback();
        }
    };
};

const deleteBlogPost = (dispatch) => {
    return async id => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id});
    };
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title, content })
        dispatch({ type: 'edit_blogpost', payload: { id, title, content }});
        callback();
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

export const { Context, Provider } = createDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },
    []
);