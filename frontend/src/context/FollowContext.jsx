import { createContext,useState } from "react";

export const followContext = createContext();

const FollowContextProvider = ({children}) => {
    const [followers,setFollowers] = useState([])
    const [following,setFollowing] = useState([])
     const API_URL = import.meta.env.VITE_BACKEND_URL;
    const fetchFollowers = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/users/fetch-follower`,{withCredentials:true})
            if(res.data.success){
                setFollowers(res.data.followers)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const fetchFollowing = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/users/fetch-following`,{withCredentials:true})
            if(res.data.success){
                setFollowing(res.data.following)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const followUser = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/users/follow-user`,{withCredentials:true})
            if(res.data.success){
                await fetchFollowing()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const unFollowUser = async () => {
        try {
            const res = await axios.delete(`${API_URL}/api/users/unfollow-user`,{withCredentials:true})
            if(res.data.success)
                    await fetchFollowing()
        } catch (error) {
            
        }
    }

    const contextValues = {
        followers,following,fetchFollowers,fetchFollowing,followUser,unFollowUser
    }
    
    return <followContext.Provider value={contextValues}>
        {children}
    </followContext.Provider>
}

export default FollowContextProvider