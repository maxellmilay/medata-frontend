export function setLoginToken(token: string) {
  sessionStorage.setItem('token', token);
}

export function getLoginToken() {
  const token = sessionStorage.getItem('token');
  return token;
}
