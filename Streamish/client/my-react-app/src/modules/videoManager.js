import { getToken } from "./authManager";

const baseUrl = '/api/video';

export const getAllVideos = () => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/GetWithComments/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get videos.");
      }
    });
  });
};
export const getVideo = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/GetVideoByIdWithComments/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get videos.");
      }
    });
  });
};

export const searchVideos = (search) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/search?q=${search}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An unknown error occurred while trying to get videos.");
      }
    });
  });
};
export const addVideo = (video) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to save a new video.");
      }
    });
  });
}

export const GetVideosByUserId = (id) => {
  return getToken().then((token) => {
    return fetch(`/api/UserProfile/GetVideosByUserProfileId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })}).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get videos.");
      }

  })
};

