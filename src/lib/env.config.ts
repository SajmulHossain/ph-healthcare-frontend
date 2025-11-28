const loadEnv = () => {
  return {
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    backend_api_url: process.env.NEXT_PUBLIC_BASE_API_URL,
  };
};

export default loadEnv();