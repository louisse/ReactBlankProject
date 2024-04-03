export const findUsername = (username, accounts) =>
  accounts.some((account) => username === account.username);
export const findUser = (username, password, accounts) =>
  accounts.some(
    (account) => username === account.username && password === account.password
  );

export const checkPassword = (password) =>
  new RegExp(
    "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[1-9])(?=.*?[`~!@#$%^&*()_+=[|;':\",./<>?\\\\\\]-]).{8,}"
  ).test(password);
