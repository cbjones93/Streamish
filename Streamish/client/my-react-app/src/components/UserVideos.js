import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "./Video";
import { GetVideosByUserId } from "../modules/videoManager";

const UserVideoList = () => {
    const [videos, setVideos] = useState([])
    const { id } = useParams();

    const getVideosByUser = () => {
        GetVideosByUserId(id).then(videos => setVideos(videos));
    }

    useEffect(() =>{
        getVideosByUser();
    }, [])
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    {/* {videos.map((video) => (
                        <Video video={video} key={video.id} />
                    ))} */}
                </div>
            </div>
        </>
    )
}

export default UserVideoList