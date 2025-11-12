import Joi from "joi";

// ✅ Candidate creation validation
export const validateCandidate = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
    }),
    last_name: Joi.string().min(2).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email address",
    }),
    skills: Joi.array().items(Joi.string()).optional(),
    experience: Joi.number().min(0).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};
