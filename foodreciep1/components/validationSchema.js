import * as yup from 'yup';

export const signupSchema  = yup.object({
  username: yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+{}\[\]:;"\'<>,.?~\\/-]/, 'Password must contain at least one special character'),
  email: yup.string().email('Invalid email address').required('Email is required'),
});


export const loginSchema= yup.object({
  username: yup.string().required('Username is required'),
 
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
})

export const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    preparationTime: yup.number().required('Preparation time is required').positive().integer(),
    categoryId: yup.number().required('Category is required'),
    ingredients: yup.array().of(
      yup.object({
        name: yup.string().required('Ingredient name is required'),
        quantity: yup.string().required('Quantity is required'),
        unit: yup.string().required('Unit is required'),
      })
    ).required(),
    steps: yup.array().of(
      yup.object({
        description: yup.string().required('Step description is required'),
      })
    ).required(),
    images: yup.array().of(
      yup.object({
        url: yup.string().required(),
        is_featured: yup.boolean(),
      })
    ).required(),
  });
  