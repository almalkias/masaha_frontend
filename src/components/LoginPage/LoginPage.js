import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from '../../assets/images/logo-new.png';
import "./LoginPage.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoading } from '../contexts/LoadingContext';


const initialValues = {
  email: '',
  password: '',
  non_field_errors: ''
}

const validationSchema = Yup.object({
  email: Yup.string().email('صيغة الايميل غير صحيحه').required('هذا الحقل مطلوب'),
  password: Yup.string().required('هذا الحقل مطلوب'),
})

const notify = () => {
  toast.success("تم ارسال تفعيل الحساب على البريد الالكتروني الرجاء تفعيل الحساب لتتمكن من تسجيل الدخول ", {
    position: "top-center",
    autoClose: 9000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}


function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
  const { setIsLoading } = useLoading();

  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
    setPasswordIcon(passwordIcon === faEye ? faEyeSlash : faEye);
  };

  // useEffect(() => {
  //     if (location.state?.registrationSuccess) {
  //         notify();
  //     }
  // }, [location.state]);

  const onSubmit = async (values, { setErrors }) => {
    setIsLoading(true);

    try {
      await login(values);
      navigate(location.state?.from || "/");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ non_field_errors: error.response.data.detail });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className='container'>
        <div className='logo'>
          <Link to="/">
            <img src={logo} alt="مسحة" className="site-logo" />
          </Link>
        </div>
        <div className='main-content'>
          <div className='form-container'>
            <h1>تسجيل الدخول</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              <Form noValidate>
                <div className='form-field-group'>
                  <label htmlFor="email">بريد إلكتروني</label>
                  <Field type="text" id="email" name="email" />
                  <ErrorMessage name="email">
                    {msg => <div className="errorMessage">{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className='form-field-group'>
                  <label htmlFor="password">كلمة المرور</label>
                  <FontAwesomeIcon icon={passwordIcon} className='eye-icon' onClick={showPassword} />
                  <Field type={passwordType} id="password" name="password" />
                  <ErrorMessage name="password">
                    {msg => <div className="errorMessage">{msg}</div>}
                  </ErrorMessage>
                </div>

                <ErrorMessage name="non_field_errors">
                  {msg => <div className="errorMessage">{msg}</div>}
                </ErrorMessage>

                <div className='submit'>
                  <input type="submit" value="تسجيل دخول" />
                  <div>ليس لديك حساب؟<Link to='/register'> إنشاء حساب</Link></div>
                  <div><Link to='/forget-password'>نسيت كلمة المرور ؟</Link></div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer rtl />
    </div>
  )
}

export default LoginPage;
