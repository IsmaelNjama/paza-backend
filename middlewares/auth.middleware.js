const jwt = require("../utils/jwt");
const services = require("../services/users.service");
const { ERR_INVALID } = require("../utils/error");

module.exports = async (req, res, next) => {
  const publicRoutes = [
    { method: "POST", path: "/auth/signup" },
    { method: "POST", path: "/auth/login" },
    { method: "POST", path: "/auth/forgot-password" },
    { method: "GET", path: /^\/auth\/verify\/[^/]+$/ },
    { method: "GET", path: /^\/auth\/reset-password\/[^/]+$/ },
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    route.method === req.method && route.path instanceof RegExp
      ? route.path.test(req.path)
      : route.path === req.path
  );
  if (isPublicRoute) {
    return next();
  }
  const { authorization: token } = req.headers;

  if (!token) {
    return next(ERR_INVALID);
  }

  try {
    const payload = jwt.verify(token);

    const user = await services.getUserById(payload.id);

    req.user = user;
  } catch (error) {
    next(ERR_INVALID);
  }
  console.log("Middleware working...");
  next();
};
