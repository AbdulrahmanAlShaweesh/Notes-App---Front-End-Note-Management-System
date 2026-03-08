import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Input } from '@heroui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FaEyeSlash } from 'react-icons/fa';
import { TbEyeFilled } from 'react-icons/tb';
import { MdAttachEmail, MdOutlineWhatshot } from 'react-icons/md';
import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const { userTokenHandler, userToken } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (userToken) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = data => {
    setIsFormSubmitted(true);
    axios
      .post('https://note-sigma-black.vercel.app/api/v1/users/signIn', data)
      .then(response => {
        setFormAlert({
          type: 'success',
          title: 'Success',
          message: 'Login successfully , redirecting to Home',
        });
        localStorage.setItem('token', response.data.token);
        userTokenHandler(response.data.token);
        setTimeout(() => {
          navigate('/');
        }, 3000);
        reset();
      })
      .catch(error => {
        setFormAlert({
          type: 'danger',
          title: 'Error',
          message: `${error.response?.data?.msg || 'Something went wrong'}`,
        });
      })
      .finally(() => {
        setIsFormSubmitted(false);

        setTimeout(() => {
          setFormAlert(null);
        }, 3000);
      });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 w-full my-10">
        <div className="md:w-1/2 w-full p-4 border border-default rounded-2xl shadow-2xl mx-auto ">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-heading text-2xl font-semibold">Login</h1>
              <p className="text-body text-sm">Login to access your account</p>
            </div>
            <div className="p-2 bg-primary-soft rounded-lg">
              <MdOutlineWhatshot
                className={`text-3xl text-primary-soft pointer-events-none ${
                  Object.keys(errors).length > 0
                    ? 'text-danger'
                    : 'text-success'
                }`}
              />
            </div>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                isRequired
                endContent={
                  <MdAttachEmail
                    className={`text-2xl pointer-events-none ${
                      touchedFields.email
                        ? errors.email
                          ? 'text-danger'
                          : 'text-success'
                        : 'text-default-400'
                    }`}
                  />
                }
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: 'Email is invalid',
                  },
                })}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            </div>

            <div>
              <Input
                label="Password"
                isRequired
                placeholder="Enter your password"
                type={isVisible ? 'text' : 'password'}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-solid outline-transparent"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaEyeSlash
                        className={`text-2xl pointer-events-none ${
                          touchedFields.password
                            ? errors.password
                              ? 'text-danger'
                              : 'text-success'
                            : 'text-default-400'
                        }`}
                      />
                    ) : (
                      <TbEyeFilled
                        className={`text-2xl pointer-events-none ${
                          touchedFields.password
                            ? errors.password
                              ? 'text-danger'
                              : 'text-success'
                            : 'text-default-400'
                        }`}
                      />
                    )}
                  </button>
                }
                {...register('password', {
                  required: 'Password is required',
                })}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </div>

            <Button type="submit" color="primary" className="w-full">
              {isFormSubmitted ? (
                <ImSpinner9 className="animate-spin text-xl" />
              ) : (
                'Login'
              )}
            </Button>
            {formAlert && (
              <Alert
                color={formAlert.type}
                description={formAlert.message}
                endContent={
                  <Button color={formAlert.type} size="sm" variant="flat">
                    {formAlert.type === 'danger' ? 'Try Again' : 'Ok'}
                  </Button>
                }
                title={formAlert.title}
              />
            )}
          </form>
          <p className="text-body text-sm mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-soft font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
