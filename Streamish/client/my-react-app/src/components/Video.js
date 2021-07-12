import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


const Video = ({ video }) => {
    return (
        <Card >
            <p className="text-left px-2">Posted by: {video.userProfile.name}</p>
            <CardBody>
                <div>
                    <iframe className="video"
                        src={video.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                </div>
                <Link to={`/videos/${video.id}`}>
                    <strong>{video.title}</strong>
                </Link>
                <p>{video.description}</p>
                {/* if there are comments in the video it will map into new array */}
                {/* <p>Comments: {video.comments?.map((message) => (<p>{message.message} </p>))}</p> */}
            </CardBody>
        </Card>
    );
};

export default Video;
