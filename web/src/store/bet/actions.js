const axios = require('axios')

export const getBetter = async () => {
    const res = await axios.get('/bet/GetBetter');
    return res;
}