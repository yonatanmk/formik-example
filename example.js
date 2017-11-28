import React from "react";
import { render } from "react-dom";
import { withFormik, Form, Field } from "formik";
import Yup from "yup"; // use for validation

// const App = ({ values, handleChange, handleSubmit }) => (
//   <form onSubmit={handleSubmit}>
//     <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
//     <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
//     <button>Submit</button>
//   </form>
// );

// const FormikApp = withFormik({
//   mapPropsToValues({ email, password }) {
//     return {
//       // key same as name prop of input
//       email: email || '',
//       password: password || ''
//     }
//   },
//   handleSubmit(values) {
//     console.log(values)
//     // send data to api here
//   }
// })(App);

// render(<FormikApp email="test@test.com"/>, document.getElementById("root"));

const App = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <div>
      <Field type="email" name="email" placeholder="Email" />
      {touched.email && errors.email && <p>{errors.email}</p>}
    </div>
    <div>
      <Field type="password" name="password" placeholder="Password" />
      {touched.password && errors.password && <p>{errors.password}</p>}
    </div>
    <label>
      <Field type="checkbox" name="checkbox" checked={values.checkbox} />
      This is a checkbox
    </label>
    <Field component="select" name="dropdown">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </Field>
    <button disabled={isSubmitting}>Submit</button>
  </Form>
);

const FormikApp = withFormik({
  mapPropsToValues({ email, password, checkbox, dropdown }) {
    return {
      // key same as name prop of input
      email: email || "",
      password: password || "",
      checkbox: checkbox || true,
      dropdown: dropdown || "option2"
    };
  },
  validationSchema: Yup.object().shape({
    // throw error if fail validation
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 char long")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    // console.log(values);
    setTimeout(() => {
      if (values.email === "test@test.com") {
        setErrors({ email: "Use another email lazy!" });
      } else {
        console.log(values);
        resetForm();
      }
      setSubmitting(false);
    }, 2000); // send data to api here
  }
})(App);

render(<FormikApp email="test@test.com" />, document.getElementById("root"));
