import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signinAfterInvitation } from '../../../JS/actions/user';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { GoAlertFill } from 'react-icons/go';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [invitationEmail, setInvitationEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const passwordinvalid = useSelector((state) => state.userReducer.passwordinvalid);

  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const equipeId = params.get('equipeId');

  const signInGoogle = () => {
    window.location.replace('http://localhost:8000/auth/google');
  };

  const isInvitationUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.has('equipeId') && params.has('token');
  };

  useEffect(() => {
    if (token) {
      axios
        .post(`http://localhost:8000/api/auth/get-email-from-token/${token}`)
        .then((response) => {
          setInvitationEmail(response.data.email);
        })
        .catch((error) => {
          console.error('Error fetching email:', error);
        });
    }
  }, [token]);

  const initialValues = {
    email: invitationEmail,
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isInvitationUrl()) {
        await dispatch(signinAfterInvitation(token, invitationEmail, equipeId, values.password, navigate));
      } else {
        await dispatch(loginUser(values, navigate));
      }
      setSubmitting(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  function checkTokenAndNavigate() {
    try {
      const decodedToken = jwtDecode(token);
      const expiryTimestamp = decodedToken.exp;

      if (expiryTimestamp < Date.now() / 1000) {
        window.location.href = '/authentificate/login';
        alert('Your invitation has expired.');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  useEffect(() => {
    if (isInvitationUrl()) {
      checkTokenAndNavigate();
    }
  }, [isInvitationUrl()]);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {passwordinvalid && (
              <Box display="flex" alignItems="center" bgcolor="#FFFDE7" p={2} borderRadius={4} mb={2}>
                <GoAlertFill style={{ color: '#f5b87f', fontSize: '20px', marginRight: '14px', marginLeft: '15px' }} />
                <Typography
                  variant="body1"
                  color="rgb(90 98 113)"
                  fontWeight={410}
                  textAlign="center"
                  fontSize="13px"
                  lineHeight="17px"
                >
                  Incorrect e-mail address and/or password.
                </Typography>
              </Box>
            )}
            <Stack>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="email"
                  mb="5px"
                >
                  Email
                </Typography>
                <Field as={CustomTextField} id="email" name="email" variant="outlined" fullWidth />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
              </Box>
              <Box mt="25px">
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="password"
                  mb="5px"
                >
                  Password
                </Typography>
                <Field
                  as={CustomTextField}
                  id="password"
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </Box>
              <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember this Device"
                  />
                </FormGroup>
                <Typography
                  component={Link}
                  to="/authentificate/resetpassword"
                  fontWeight="500"
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Stack>
            </Stack>
            <Box>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Box>
            {!isInvitationUrl() && (
              <Stack mb={4} sx={{ alignItems: 'center' }}>
                <button className="login" onClick={signInGoogle} style={{ alignItems: 'center' }}>
                  Sign up with Google
                </button>
              </Stack>
            )}
          </Form>
        )}
      </Formik>

      {subtitle}
    </>
  );
};

export default AuthLogin;
