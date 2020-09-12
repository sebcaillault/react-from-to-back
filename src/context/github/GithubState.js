import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import githubReducer from "./githubReducer";
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from "../types"

const GithubState = (props) => {
    const initState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initState);

    // Search users
    const searchUsers = async search => {
        setLoading();

        const res = await axios.get(
            `https://api.github.com/search/users?q=${search}&client_id=${process.env.GITHUB_APP_ID}&client_secret=${process.env.GITHUB_APP_SECRET}`
        );

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });

    };

    // GET USER
    const getUser = async (username) => {

        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.GITHUB_APP_ID}&client_secret=${process.env.GITHUB_APP_SECRET}`
        );

        dispatch({
            type: GET_USER,
            payload: res.data
        })

    }

    // GET REPOS
    const getUserRepos = async (username) => {

        setLoading();

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_APP_ID}&client_secret=${process.env.GITHUB_APP_SECRET}`
        );

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });

    }

    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // Set loading 
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos
            }}
        >
            {props.children}
        </GithubContext.Provider>)

}

export default GithubState;