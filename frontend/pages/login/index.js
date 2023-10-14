import { authLogin } from '@/redux/auth/auth-thunk';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function Login() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  useEffect(() => {
    if (!token) return;
    Cookies.set('token', token, { expires: 2 });

    Router.push('/question').then((_) => console.log('Go to dashboard'));
  }, [token]);

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  const onSubmit = () => {
    //TODO: authen
    dispatch(authLogin(formData));
    console.log(formData);
  };
  return (
    <Card shadow={false} className='flex items-center mt-8'>
      <Typography variant='h4' color='blue-gray'>
        Đăng nhập
      </Typography>
      <div className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            type='text'
            name='userName'
            size='lg'
            label='Tài khoản'
            value={formData.userName}
            onChange={handleInput}
          />
          <Input
            type='password'
            name='password'
            size='lg'
            label='Mật khẩu'
            value={formData.password}
            onChange={handleInput}
          />
        </div>
        <Button onClick={onSubmit} className='mt-6 bg-blue-600' fullWidth>
          Đăng nhập
        </Button>
      </div>
    </Card>
  );
}
