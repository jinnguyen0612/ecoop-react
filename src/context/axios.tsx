import axios from 'axios';

export default axios.create({
    //baseURL: "https://node-vercel-server.vercel.app",
    baseURL: 'http://192.168.1.71:3030',
    //   baseURL: "https://4478-27-64-140-160.ngrok-free.app",
});
