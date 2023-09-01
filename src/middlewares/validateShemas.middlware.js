export const validateShemas = (schema) => (req, res, next) => {
  const validacion = schema.safeParse(req.body);
  if (!validacion.success) {
    return res.status(400).json({
      message: validacion.error.errors.map(
        (error) => `${error.path} - ${error.message}`
      ),
    });
  }
  req.body = validacion.data;
  next();
};
