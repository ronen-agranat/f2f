const axios = require('axios').default;

const FaceToFace = axios.create({
  baseURL: process.env.REACT_APP_F2F_SERVER_ENDPOINT || 'http://localhost:3001'
});

export default FaceToFace;
