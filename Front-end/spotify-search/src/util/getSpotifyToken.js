const CLIENT_ID =; //type your client_id in here
const CLIENT_SECRET =; //type your client_secret in here 

const baseURL = (id, secret) => `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${id}&client_secret=${secret}`

export default async function getSpotifyToken(params) {

  try {
    const response = await fetch(baseURL(CLIENT_ID, CLIENT_SECRET), { 
      method: 'POST', 
      headers: { 
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })
    const { access_token, token_type } = await response.json();
    return `${token_type} ${access_token}`
    
  } catch (error) {
    return error.message;
  }
}