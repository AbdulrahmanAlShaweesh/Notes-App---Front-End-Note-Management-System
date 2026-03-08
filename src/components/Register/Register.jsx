import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Button, Input } from '@heroui/react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FaEyeSlash, FaGetPocket, FaPhone, FaUser } from 'react-icons/fa';
import { TbEyeFilled } from 'react-icons/tb';
import { MdAttachEmail, MdOutlineWhatshot } from 'react-icons/md';
import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';
import { AuthContext } from '../../context/AuthContext';

function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formAlert, setFormAlert] = useState(null);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone: '',
    },
  });

  if (userToken) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = data => {
    setIsFormSubmitted(true);
    axios
      .post('https://note-sigma-black.vercel.app/api/v1/users/signUp', data)
      .then(() => {
        setFormAlert({
          type: 'success',
          title: 'Success',
          message: 'Register successfully , redirecting to Login',
        });
        setTimeout(() => {
          navigate('/login');
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
              <h1 className="text-heading text-2xl font-semibold">Register</h1>
              <p className="text-body text-sm">Register to create an account</p>
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
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                label="Name"
                isRequired
                placeholder="Enter your name"
                type="text"
                endContent={
                  <FaUser
                    className={`text-2xl pointer-events-none ${
                      touchedFields.name
                        ? errors.name
                          ? 'text-danger'
                          : 'text-success'
                        : 'text-default-400'
                    }`}
                  />
                }
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Name must be at most 20 characters long',
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: 'Name must contain only alphabets',
                  },
                })}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
              />
              <Input
                label="Age"
                isRequired
                placeholder="Enter your age"
                type="number"
                endContent={
                  <FaGetPocket
                    className={`text-2xl pointer-events-none ${
                      touchedFields.age
                        ? errors.age
                          ? 'text-danger'
                          : 'text-success'
                        : 'text-default-400'
                    }`}
                  />
                }
                {...register('age', {
                  required: 'Age is required',
                  min: {
                    value: 18,
                    message: 'Age must be at least 18 years old',
                  },
                  max: {
                    value: 100,
                    message: 'Age must be at most 100 years old',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Age must be a number',
                  },
                  validate: {
                    isNotZero: value => value !== 0 || 'Age cannot be zero',
                    isNotNegative: value =>
                      value >= 0 || 'Age cannot be negative',
                    isNotAbove100: value =>
                      value <= 100 || 'Age cannot be above 100',
                    isNot18: value => value >= 18 || 'Age must be at least 18',
                  },
                })}
                isInvalid={!!errors.age}
                errorMessage={errors.age?.message}
              />
            </div>

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
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password must be at most 20 characters long',
                  },
                })}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </div>

            <div>
              <Input
                label="Phone"
                isRequired
                placeholder="Enter your phone"
                type="number"
                endContent={
                  <FaPhone
                    className={`text-2xl pointer-events-none ${
                      touchedFields.phone
                        ? errors.phone
                          ? 'text-danger'
                          : 'text-success'
                        : 'text-default-400'
                    }`}
                  />
                }
                {...register('phone', {
                  required: 'Phone is required',
                  minLength: {
                    value: 10,
                    message: 'Phone must be at least 10 digits long',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Phone must be at most 15 digits long',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Phone must contain only numbers',
                  },
                })}
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isFormSubmitted}
            >
              {isFormSubmitted ? (
                <ImSpinner9 className="animate-spin text-xl" />
              ) : (
                'Register'
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
            Already have an account?{' '}
            <Link to="/login" className="text-primary-soft font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
