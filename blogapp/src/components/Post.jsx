import { getDatabase } from "firebase/database"
import { onValue } from "firebase/database"
import { ref } from "firebase/database"
import app from "../auth/firebase"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getPosts } from "../redux/features/postSlice"
import { useEffect, useState } from "react"

const Post = () => {
    const dispatch =useDispatch();
    const [postsArr, setPostsArr] = useState([])    
    const {posts} = useSelector((state)=> state.postsSlice)
    console.log(posts);
    console.log(postsArr)
    useEffect(()=>{
        const database= getDatabase(app);
        const postsRef = ref(database, "/posts")
        onValue(postsRef, (snapshot)=>{
            const data = snapshot.val()
            const postsArray = []

            for(let id in data) {
                postsArray.push({id, ...data[id]})
            }
            dispatch(getPosts({posts:postsArray}))        })
    },[])
  return (
    <div>
post
    </div>
  )
}

export default Post