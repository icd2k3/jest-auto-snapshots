export default (p, n) => {
  if (!/customproptest/.test(p[n])) {
    return new Error('invalid custom prop');
  }
  return null;
};
