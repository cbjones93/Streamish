const baseUrl = '/api/video';

export const getAllVideos = () => {
  return fetch(`${baseUrl}/GetWithComments/`)
    .then((res) => res.json())
};
export const getVideo = (id) => {
    return fetch(`${baseUrl}/GetVideoByIdWithComments?id=${id}`).then((res) => res.json());
};

export const searchVideos = (search) => {
    return fetch(`${baseUrl}/search?q=${search}`)
    .then((res) => res.json())
};
export const addVideo = (video) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });
};

export const GetVideosByUserId =(id) =>{
    return fetch (`/api/UserProfile/GetVideosByUserProfileId?id=${id}`)
}
