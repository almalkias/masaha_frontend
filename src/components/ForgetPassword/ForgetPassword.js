import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-new.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import apiClient from "../../api/client";
import './ForgetPassword.css';
import { useLoading } from '../contexts/LoadingContext';


const initialValues = {
  email: '',
}


const validationSchema = Yup.object({
  email: Yup.string().email('صيغة الايميل غير صحيحه').required('هذا الحقل مطلوب'),
})

const notify = () => {
  toast.success("ستصلك رسالة على بريدك الإلكتروني لإكمال عملية إعادة تعيين كلمة المرور", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

function ForgetPassword() {
  const { setIsLoading } = useLoading();

  const onSubmit = async (values, { setErrors }) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post('accounts/forgot-password/', values);
      notify()
      console.log("Password reset request sent", response);
    } catch (error) {
      setErrors(error.response.message);
      console.error("Error sending password reset request", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forget-password">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="مسحة" className="site-logo" />
        </Link>
      </div>
      <Formik initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}>
        <Form noValidate>
          <h1>إعادة تعيين كلمة المرور</h1>
          <div className='form-field-group'>
            <label htmlFor="email">بريد إلكتروني</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email">
              {msg => <div className="errorMessage">{msg}</div>}
            </ErrorMessage>
          </div>
          <input type="submit" value="ارسال" />
          <div>العودة إلى <Link to='/login'>تسجيل الدخول </Link></div>
        </Form>
      </Formik>
      <ToastContainer rtl />
    </div>
  );
}

export default ForgetPassword;
