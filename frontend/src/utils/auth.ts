export const saveAuth = (data: any) => {
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
