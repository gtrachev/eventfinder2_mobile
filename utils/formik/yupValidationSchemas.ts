import * as yup from "yup";

export const createValidationSchema = yup.object().shape({
  name: yup.string().max(50).min(3).required(),
  price: yup.number().min(0).max(1000).required(),
  description: yup.string().max(1000).min(3).required(),
  address: yup.string().max(200).min(3).required(),
  date: yup
    .date()
    .min(
      new Date(),
      `Date must be later than ${new Date().toLocaleDateString()}`
    )
    .required(),
  country: yup.string().max(100).min(3).required(),
  city: yup.string().max(100).min(3).required(),
  time: yup.string().min(1).required(),
  ageGroup: yup.string().min(3).required(),
  interestCategories: yup
    .array()
    .of(yup.string().min(1).max(100).required())
    .min(1)
    .max(5)
    .required(),
});

export const registerValidationSchema = yup.object().shape({
  username: yup.string().required().min(1).max(50),
  email: yup.string().email().required().min(1),
  password: yup.string().required().min(5),
  age: yup.number().required().min(12),
  country: yup.string().required().min(2).max(50),
  city: yup.string().min(2).max(50).notRequired(),
  interests: yup
    .array()
    .of(yup.string().min(1).max(100).required())
    .min(1)
    .max(10)
    .required(),
});

export const editAccountValidationSchema = yup.object().shape({
  age: yup.number().required().min(12),
  country: yup.string().required().min(2).max(50),
  city: yup.string().min(2).max(50),
  interests: yup
    .array()
    .of(yup.string().min(1).max(100).required())
    .min(1)
    .max(10)
    .required(),
});
