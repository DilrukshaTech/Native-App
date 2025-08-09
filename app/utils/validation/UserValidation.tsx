import * as Yup from "yup";

const UserValidationSchemas = () => {
  return {
    CreateUserValidation: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
     
    }),
    SigninUserValidation: Yup.object().shape({
      password: Yup.string().required("password is required"),
     email: Yup.string().required("email is required"),
    }),

UserProfileValidation: Yup.object().shape({
      user_name: Yup.string().required("User name is required"),

      district: Yup.string().required("District is required"),
      grade: Yup.number().required("Grade is required").min(1, "Grade must be at least 10").max(13, "Grade must be at most 11"),
    }),

 };
};

export default UserValidationSchemas;
