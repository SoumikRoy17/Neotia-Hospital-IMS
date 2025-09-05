import Joi from 'joi';

export const purchaseSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  equipmentId: Joi.string().uuid().allow(null),
  equipmentName: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  unitPrice: Joi.number().min(0).required(),
  totalAmount: Joi.number().min(0).required(),
  purchaseDate: Joi.string().isoDate().required(),
  vendorName: Joi.string().required(),
  vendorContact: Joi.string().allow(''),
  billNumber: Joi.string().required(),
  paymentMethod: Joi.string().valid('Cash','Card','Bank Transfer','Cheque').required(),
  paymentStatus: Joi.string().valid('Paid','Pending','Partial').required(),
  notes: Joi.string().allow('', null),
  items: Joi.array().items(Joi.object({
    equipmentName: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    unitPrice: Joi.number().min(0).required(),
    totalAmount: Joi.number().min(0).required(),
  })).optional()
});
