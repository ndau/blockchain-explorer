import axios from 'axios';
import React from 'react'
const BookMark = () => {
    const [bookmark,setBookmark]=React.useState();
    React.useEffect(()=>{
        axios.get("http://localhost:3001/api/user/bookmarks").then((val)=>{
            setBookmark(val.data.user_bookmarks);
        })
    },[])
    return ( 
        BookMark.map((val)=>{
           return <>
           <h4>{val.bookmark_value}</h4>
           <h4>{val.bookmark_type}</h4>
           </>
        })
     );
}
 
export default BookMark;
