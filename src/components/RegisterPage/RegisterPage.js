import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo-new.png';
import circle_1 from '../../assets/images/1.svg';
import circle_2 from '../../assets/images/2.svg';
import circle_3 from '../../assets/images/3.svg';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import "./RegisterPage.css";
import apiClient from '../../api/client';
import { useLoading } from '../contexts/LoadingContext';


const initialValues = {
  email: '',
  password: '',
  password_confirm: '',
  terms: false
}

const validationSchema = Yup.object({

  email: Yup.string()
    .required('هذا الحقل مطلوب')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      'صيغة الايميل غير صحيحه'
    ),

  password: Yup.string()
    .required('هذا الحقل مطلوب')
    .min(8, 'كلمة المرور قصيرة'),

  password_confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة')
    .required('هذا الحقل مطلوب'),

  terms: Yup.bool()
    .oneOf([true], 'يجب قراءة الشروط و الأحكام و الموافقة ')
    .required('هذا الحقل مطلوب')
})

function RegisterPage() {
  const [showModal, setShowModal] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
  const [password2Type, setPassword2Type] = useState("password");
  const [password2Icon, setPassword2Icon] = useState(faEyeSlash);
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const showPassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
    setPasswordIcon(passwordIcon === faEye ? faEyeSlash : faEye);
  };

  const showPassword2 = () => {
    setPassword2Type(password2Type === "password" ? "text" : "password");
    setPassword2Icon(password2Icon === faEye ? faEyeSlash : faEye);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async (values, { setErrors }) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('accounts/register/', values);
      console.log('Registration successful', response);
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (error) {
      if (error.response && error.response.data) {
        console.log('err', error.response)
        setErrors(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => {
    //     setIsLoading(false);
    // }, 100000);
  };

  return (
    <div className="register">
      <div className='container'>
        <div className='logo'>
          <Link to="/">
            <img src={logo} alt="مسحة" className="site-logo" />
          </Link>
        </div>
        <div className='main-content'>
          <div className='form-container'>
            <h1>إنشاء حساب</h1>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ handleChange }) => (
                <Form noValidate>
                  <div className='form-field-group'>
                    <label htmlFor="email"><span> * </span>الايميل</label>
                    <Field type="email" id="email" name="email" />
                    <ErrorMessage name="email">
                      {msg => <div className="errorMessage">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className='form-field-group'>
                    <label htmlFor="password"><span> * </span>كلمة المرور</label>
                    <FontAwesomeIcon icon={passwordIcon} className='eye-icon' onClick={showPassword} />
                    <Field type={passwordType} name="password" id="password" onChange={(e) => {
                      handleChange(e);
                    }} />
                    <ErrorMessage name="password">
                      {msg => <div className="errorMessage">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className='form-field-group'>
                    <label htmlFor="password_confirm"><span> * </span>تأكيد كلمة المرور</label>
                    <FontAwesomeIcon icon={password2Icon} className='eye-icon' onClick={showPassword2} />
                    <Field type={password2Type} name="password_confirm" id="password_confirm" />
                    <ErrorMessage name="password_confirm">
                      {msg => <div className="errorMessage">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className='terms'>
                    <div className='content'>
                      <label>أوافق على <span onClick={openModal}> الشروط والأحكام</span></label>
                      {/* <Terms show={showModal} onClose={closeModal} /> */}
                      <Field type="checkbox" id="terms" name="terms" />
                    </div>
                    <ErrorMessage name="terms">
                      {msg => <div className="errorMessage">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className='submit'>
                    <input type="submit" value="التسجيل" />
                    <div className='login-link'>
                      هل لديك حساب بالفعل؟
                      <Link to='/login'>سجل الدخول</Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className='register-image'>
            <img src={circle_1} alt='' className='circle-one' />
            <img src={circle_2} alt='' className='circle-two' />
            <img src={circle_3} alt='' className='circle-three' />
            <div className='quarter quarter-1'>
              <div className='circle circle-1'></div>
            </div>
            <div className='quarter quarter-2'>
              <div className='circle circle-2'></div>
            </div>
            <div className='quarter quarter-3'>
              <div className='circle circle-3'></div>
            </div>
            <div className='quarter quarter-4'>
              <div className='circle circle-4'></div>
            </div>
            <div className='quarter quarter-5'>
              <div className='circle circle-5'></div>
            </div>
            <div className='quarter quarter-6'>
              <div className='circle circle-6'></div>
            </div>
            <div className='quarter quarter-7'>
              <div className='circle circle-7'></div>
            </div>
            <div className='quarter quarter-8'>
              <div className='circle circle-8'></div>
            </div>
            <div className='quarter quarter-9'>
              <div className='circle circle-9'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
