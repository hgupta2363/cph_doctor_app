const API_BASE_URL = 'https://api.videosdk.live';
export const VIDEOSDK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5ZmYzYjhkYi00MjZhLTQwZGUtYjgyYS03MDc5ZTMyMjNiMzIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY4MTM4NDA1OSwiZXhwIjoxNzEyOTIwMDU5fQ.Mbq38YYZe3YerwX9NAEhs5U1KYMiRHXRa6fWE1CYdsw';
const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const createMeeting = async () => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: VIDEOSDK_TOKEN,
      'Content-Type': 'application/json',
    },
  };

  const { roomId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error('error', error));

  return roomId;
};
