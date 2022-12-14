import { getDatabase } from "firebase/database"
import { onValue } from "firebase/database"
import { ref } from "firebase/database"
import app from "../auth/firebase"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getPosts } from "../redux/features/postSlice"
import { useEffect, useState } from "react"

const Post = () => {
    const dispatch =useDispatch()
    
    const {posts} = useSelector((state)=> state.postsSlice)
    console.log(posts);
    useEffect(()=>{
        const database= getDatabase(app);
        const postsRef = ref(database, "/posts")
        onValue(postsRef, (snapshot)=>{
            const data = snapshot.val()
            const postArray = []

            for(let id in data) {
                postArray.push({id, ...data.id})
            }
            dispatch(getPosts({posts:postArray}))
        })
    })
  return (
    <div>
post
    </div>
  )
}

export default Post