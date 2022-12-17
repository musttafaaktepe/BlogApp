import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    posts:[],
    user:{
        likedPosts:[]
    },
}

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: initialStates,
    reducers: {
        getPosts:(state,action) => {
            state.posts = action.payload.posts
        },
        getUser:(state,action)=>{
            state.user = action.payload.user
        },
        updateFavorite:(state, action)=>{
            state.user.likedPosts = action.payload.likedPosts
        },
        deleteFavorite:(state, action) =>{
            state.user.likedPosts= action.payload.likedPosts
        }
       
    }
})

export const { getPosts, getUser, updateFavorite} = postsSlice.actions;
export default postsSlice.reducer;