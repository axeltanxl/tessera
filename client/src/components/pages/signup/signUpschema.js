import * as yup from "yup"


export const signUpSchema = yup.object()
    .shape(
        {
            email: yup.string()
                .email("Invalid email format")
                .required("This field is required"),
            phoneNumber: yup.string()
                .required("This field is required"),
            password: yup.string()
                .required("This field is required"),
            confirmPassword: yup.string()
                .required("This field is required")
        }
    ).required()
