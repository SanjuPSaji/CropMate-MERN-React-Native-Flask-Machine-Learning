import axios from 'axios';
const url = require('../url');

const deleteData = async (postId, urlwithport,type) => {
    if(type=="comment"){
        try {
            const response = await axios.delete(`${url}${urlwithport}?commentId=${postId}`);
            return response.data;
          } catch (error) {
            console.error(error);
            throw error; // Re-throw the error for handling in the calling component
          }
    }else {
  try {
    const response = await axios.delete(`${url}${urlwithport}?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the calling component
  }}
};

export default deleteData;
