import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import {url} from "../../../ConnectionString"

const ResetPassword = ({ title, subtext, subtitle }) => {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required('Required').min(6, 'Too Short!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const { newPassword } = values;
      const token = window.location.pathname.split('/').pop();

      axios
        .post(`${url}/auth/reset-password/${token}`, { newPassword })
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.href = '/authentificate/login';
          }, 3000);
        })
        .catch((error) => {
          toast.error('Your link has expired');
        });
    },
  });
  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box>
        <Stack mb={2} sx={{ alignItems: 'center' }}>
          <Typography color="textSecondary" variant="h6" fontWeight={500}>
            Reset Password
          </Typography>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack mb={3} mt={0} sx={{ alignItems: 'left', justifyContent: 'center' }}>
            <CustomTextField
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              helperText={formik.touched.newPassword && formik.errors.newPassword}
            />
          </Stack>
          <Stack>
            <CustomTextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />

            <Stack mb={0} mt={3} sx={{ alignItems: 'center' }}>
              <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
                Reset Password
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
      {subtitle}
    </>
  );
};
export default ResetPassword;
