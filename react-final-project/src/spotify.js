import axios from "axios"

const authEndpoint = "https://accounts.spotify.com/authorize?"
const clientId= "f0af52bc1f8f4ca9b664ccf36aad68a2"
const redirectUri = "https://apper-frontend-course.vercel.app/"
const scopes = ["user-library-read", "playlist-read-private"]

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
  
const apiClient = axios.create({
    baseURL:"https://api.spotify.com/v1/"
})

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function(config) {
        config.headers.Authorization = "Bearer " + token
        return config
    })
}

export default apiClient