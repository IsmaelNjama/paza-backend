module.exports = (req, res, next) => {
  const publicRoutes = [
    { method: "POST", path: "/auth/signup" },
    { method: "POST", path: "/auth/login" },
  ];
  const isPublicRoute = publicRoutes.find(
    (route) => route.method === req.method && route.path === req.path
  );
  if (isPublicRoute) {
    return next();
  }

  console.log("Middleware working...");
  next();
};
