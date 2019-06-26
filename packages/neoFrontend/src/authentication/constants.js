export const clientId = process.env.REACT_APP_VIZHUB_GITHUB_CLIENT_ID;
export const oAuthURLBase = 'https://github.com/login/oauth/authorize';
export const oAuthURL = oAuthURLBase + '?client_id=' + clientId;
