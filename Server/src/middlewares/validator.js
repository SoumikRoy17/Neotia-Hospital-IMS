const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details.map((d) => d.message), // return all errors
      });
    }
    next();
  };
};

export default validate;
