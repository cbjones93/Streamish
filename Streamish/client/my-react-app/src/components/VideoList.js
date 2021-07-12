import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos, searchVideos } from "../modules/videoManager";
import VideoForm from "./VideoForm"

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [search, setSearch] = useState("")

    const getVideos = () => {
        if (search == "")
        {
        getAllVideos().then(videos => setVideos(videos));
        }
        else {
            searchVideos(search).then(videos => setVideos(videos))
        }
    };

    const handleSearch = (event) => {
        event.preventDefault()
        let searchInput = event.target.value
        setSearch(searchInput)
    }

    useEffect(() => {
        getVideos();
    }, [search]);

    useEffect(() => {
        searchVideos()
    }, [search])


    return (
        <>
  
            <section className="event_search">
                <div>
                    <input
                        type='text'
                        className="search"
                        required onChange={handleSearch}
                        id="search_box"
                        placeholder="Search" />
                </div>
            </section>
            <div className="container">
                <div className="row justify-content-center">
                    {videos.map((video) => (
                        <Video video={video} key={video.id} />
                    ))}
                </div>
            </div>
            {/* allows VideoForm to use the getVideos method  */}
          
        </>
    );
};

export default VideoList;

