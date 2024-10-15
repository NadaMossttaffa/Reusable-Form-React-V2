const schema = yup.object().shape({
    exampleText: yup.string().required('This field is required'),
    checkboxField: yup.array().min(1, 'At least one checkbox must be selected'),
    radioField: yup.string().required('A radio option must be selected'),
    fileField: yup.mixed().required('A file is required'),
});
