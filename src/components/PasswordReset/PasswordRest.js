import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import apiClient from "../../api/client";
import "./PasswordReset.css";
import logo from "../../assets/images/logo-new.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { useLoading } from "../contexts/LoadingContext";


const notifyError = () => {
  toast.error(
    "حدث خطأ أثناء تغيير كلمة المرور. يرجى محاولة استعادة كلمة المرور من صفحة تسجيل الدخول مرة أخرى",
    {
      position: "top-center",
      autoClose: 5000,
      theme: "light",
    }
  );
};

const initialValues = {
  new_password: "",
  confirm_password: "",
};

const validationSchema = Yup.object({
  new_password: Yup.string()
    .required("هذا الحقل مطلوب")
    .min(8, "كلمة المرور هذه قصيرة جدًا. يجب أن تكون 8 على الأقل")
    .test(
      "not-only-numbers",
      "كلمة المرور هذه تحتوي على ارقام فقط",
      (value) => !/^\d+$/.test(value || "")
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "كلمة المرور غير متطابقة")
    .required("هذا الحقل مطلوب"),
});

function PasswordReset() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const { setIsLoading } = useLoading();
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [newPasswordIcon, setNewPasswordIcon] = useState(faEyeSlash);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(faEyeSlash);

  const toggleNewPassword = () => {
    setNewPasswordType((prev) => (prev === "password" ? "text" : "password"));
    setNewPasswordIcon((prev) => (prev === faEye ? faEyeSlash : faEye));
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordType((prev) => (prev === "password" ? "text" : "password"));
    setConfirmPasswordIcon((prev) => (prev === faEye ? faEyeSlash : faEye));
  };

  const onSubmit = async (values, { setErrors }) => {
    if (!uid || !token) {
      notifyError();
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post("accounts/reset-password-confirm/", {
        ...values,
        uid,
        token,
      });

      navigate("/login");
    } catch (error) {
      notifyError();
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-reset">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="مسحة" className="site-logo" />
          </Link>
        </div>

        <div className="main-content">
          <div className="form-container">
            <h1>إعادة تعيين كلمة المرور</h1>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              <Form noValidate>
                <div className="form-field-group">
                  <label htmlFor="new_password">
                    <span>*</span>كلمة المرور
                  </label>
                  <FontAwesomeIcon
                    icon={newPasswordIcon}
                    className="eye-icon"
                    onClick={toggleNewPassword}
                  />
                  <Field type={newPasswordType} id="new_password" name="new_password" />
                  <ErrorMessage name="new_password">
                    {(msg) => <div className="errorMessage">{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="form-field-group">
                  <label htmlFor="confirm_password">
                    <span>*</span>تأكيد كلمة المرور
                  </label>
                  <FontAwesomeIcon
                    icon={confirmPasswordIcon}
                    className="eye-icon"
                    onClick={toggleConfirmPassword}
                  />
                  <Field
                    type={confirmPasswordType}
                    id="confirm_password"
                    name="confirm_password"
                  />
                  <ErrorMessage name="confirm_password">
                    {(msg) => <div className="errorMessage">{msg}</div>}
                  </ErrorMessage>
                </div>

                <div className="submit">
                  <input type="submit" value="ارسال" />
                  <div>
                    <Link to="/login">العودة إلى تسجيل الدخول</Link>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer rtl />
    </div>
  );
}

export default PasswordReset;
