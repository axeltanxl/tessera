import * as yup from "yup"

export const eventFormSchema = yup.object()
    .shape(
        {
            name: yup.string()
            .required("This field is required"),
            description: yup.string()
            .required("This field is required"),
            duration: yup.number().typeError('Must be a number'),
            priceCatA: yup.number().typeError('Must be a number'),
            priceCatB: yup.number().typeError('Must be a number'),
            priceCatC: yup.number().typeError('Must be a number'),
            priceCatD: yup.number().typeError('Must be a number'),
            startDate: yup.date()
            .required("Must enter start date"),
            endDate: yup.date().required("Must enter end date"),
            category: yup.string()
            .required("This field is required"),
            venue: yup.string()
            .required("This field is required"),
        }
    ).required()