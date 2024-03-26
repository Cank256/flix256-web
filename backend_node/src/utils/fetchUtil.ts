const fetchData = require('cross-fetch');

const fetchRequest = async (url: string, options: any = {}) => {
    try {
        const response = await fetchData(url, options);
        return response;
    } catch (error) {
        throw error;
    }
};

export default fetchRequest;
