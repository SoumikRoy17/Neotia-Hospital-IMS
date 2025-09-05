import Joi from 'joi';

export const equipmentSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  serialNumber: Joi.string().required(),
  manufacturer: Joi.string().allow(''),
  model: Joi.string().allow(''),
  purchaseDate: Joi.string().isoDate(),
  warrantyExpiry: Joi.string().isoDate(),
  location: Joi.string().allow(''),
  status: Joi.string().valid('Active','Maintenance','Retired','Out of Order').default('Active'),
  lastMaintenance: Joi.string().isoDate(),
  nextMaintenance: Joi.string().isoDate(),
  cost: Joi.number().min(0).default(0),
});
