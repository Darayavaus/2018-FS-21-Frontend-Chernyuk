import { ADD_ARTICLE, CREATE_POST, LOAD_POSTS } from "../constants/action-types.js"

export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });

export const createPost = post => ({type: CREATE_POST, content: post});

export const loadPosts = posts => ({type: LOAD_POSTS, content: posts});