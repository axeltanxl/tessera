import * as yup from "yup"


export const accDetSchema = yup.object()
    .shape(
        {
            name: yup.string()
                .required("This field is required"),
            email: yup.string()
                .email("Invalid email format")
                .required("This field is required"),
            contactNum: yup.number()
                            .typeError('must be a number')
                            .test('len', 'Must be exactly 8 characters', 
                                val => val.toString().length === 8)
                                .label("Phone Number"),
            address: yup.string()
                .required("This field is required"),
        }
    ).required()


export const pwSchema = yup.object()
    .shape(
        {
        currPassword: yup.string()
            .required("This field is required"),
        newPassword: yup.string()
            .required("This field is required"),
        confirmPassword: yup.string()
            .required("this field is required")
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        }
    ).required()
