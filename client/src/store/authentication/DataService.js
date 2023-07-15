const authHeader = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
};

export default authHeader;
