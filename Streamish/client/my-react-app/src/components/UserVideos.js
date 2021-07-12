import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { GetVideosByUserId } from "../modules/videoManager";
import Video from "./Video";

const UserVideoList = () => {
    const [user, setUser] = useState({})
    const { id } = useParams();

    const getVideosByUser = () => {
        GetVideosByUserId(id).then(videos => {
            debugger
            setUser(videos)
        });

    }

    useEffect(() => {
        getVideosByUser();
    }, [] )
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    {user?.videos?.map((video) => (
                        <Video video={video} name={user.name} key={video.id} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserVideoList