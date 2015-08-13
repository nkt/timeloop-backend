function createCheckAuthMiddleware() {
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      next({
        status: 401,
        code: 'unauthorized',
        message: 'Unauthorized'
      });
    }
  }

  return checkAuth;
}

module.exports = createCheckAuthMiddleware;
