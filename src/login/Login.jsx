import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const Login = ({ setToken, token }) => {
  console.log("login");

  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Некорректный email").required("Введите email"),
    password: Yup.string()
      .min(8, "Минимальная длина - 8 символов")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?])/,
        "Пароль должен содержать минимум 1 заглавную букву, 1 прописную, 1 число и 1 символ",
      )
      .required("Введите пароль"),
  });

  const login = async (data) => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const res = await response.json();
      if (response.ok) {
        navigate("/");
        localStorage.setItem("token", res.token);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (data) => {
    login(data);
  };
  return (
    <>
      <h1>Вход</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>E-mail: </label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Пароль: </label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
