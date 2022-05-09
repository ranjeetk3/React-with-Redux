let URL = "https://api.goodbookbible.study";

let API_URL = process.env.REACT_APP_API_URL || URL;
module.exports = { apiBasePath: API_URL };
