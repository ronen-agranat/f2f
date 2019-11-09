const axios = require('axios').default;

const FaceToFace = axios.create({
  baseURL: 'http://localhost:3001'
});

export default FaceToFace;
