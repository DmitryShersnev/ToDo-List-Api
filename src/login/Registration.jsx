import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Registration = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Введите логин"),
    email: Yup.string().email("Некорректный email").required("Введите email"),
    password: Yup.string()
      .min(8, "Минимальная длина - 8 символов")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?])/,
        "Пароль должен содержать минимум 1 заглавную букву, 1 прописную, 1 число и 1 символ",
      )
      .required("Введите пароль"),
    gender: Yup.string().required("Выберите пол"),
    age: Yup.number().required("Введите ваш возраст"),
  });

  const addNewUser = async (data) => {
    try {
      const response = await fetch(
        "https://todo-redev.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (data) => {
    addNewUser(data);
    console.log(data);
  };
  return (
    <>
      <h1>Регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>Логин: </label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>
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
          <div>
            <label>Пол: </label>
            <label>
              <Field type="radio" name="gender" value="male" />
              male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              female
            </label>
            <ErrorMessage name="gender" component="div" />
          </div>
          <div>
            <label>Возраст </label>
            <Field type="number" id="age" name="age" />
            <ErrorMessage name="age" component="div" />
          </div>
          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </>
  );
};

export default Registration;
