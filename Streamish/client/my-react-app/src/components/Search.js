import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import Video from './Video';
import { getAllVideos, searchVideos } from "../modules/videoManager";
import VideoList from "./VideoList";

export const Search = () => {
    const [search, setSearch] = useState("")
    const [videos, setVideos] = useState([])


    const getVideos = () => {
        getAllVideos().then(videos => setVideos(videos));
    };


    const handleSearch = (event) => {
        let searchInput = event.target.value

        if (searchInput.length > 0) {
            let searchMatch = videos.filter(videos => {
                if (videos.title.toLowerCase().includes(searchInput.oLowerCase())) {
                    return true
                }

            })
            setSearch(searchMatch)
        }
        else {
            getVideos()
        }
    }


    useEffect(() => {
        getVideos();
    }, [videos]);

    useEffect(() => {
        searchVideos()
    }, [search])


    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    {videos.map((video) => (
                        <Video video={video} key={video.id} />
                    ))}
                </div>
            </div>
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
            <div className="section_content">

            </div>
        </>
    )
}

export default Search