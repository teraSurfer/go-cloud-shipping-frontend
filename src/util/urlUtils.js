const handleHash = (hash) => {
  const components = {
    '&token_type=': 'tokenType',
    '&expires_in=': 'expiresIn',
    '&access_token=': 'accessToken',
    '#id_token=': 'idToken'
  };
  const tokens = {};
  Object.keys(components).forEach(c => {
    const h = hash.split(c);
    tokens[components[c]] = h[1];
    hash = h[0];
  });
  return tokens;
};

export { handleHash };
