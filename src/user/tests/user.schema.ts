import joi from '@hapi/joi';

export const findOnceSchema = joi.object({
  params: joi.object({
    id: joi.string().required(),
  }),
});
