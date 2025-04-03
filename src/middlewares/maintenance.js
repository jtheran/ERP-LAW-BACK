let isMaintenanceMode = false; // Estado inicial

export const setMaintenanceMode = (status) => {
  isMaintenanceMode = status;
};

export const maintenanceMiddleware = (req, res, next) => {
  if (isMaintenanceMode) {
    return res.status(503).json({
      message: "⚠️ The system is in maintenance mode. Please try again later."
    });
  }
  next();
};
