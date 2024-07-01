import React from 'react'
import { Box, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import { Stack } from '@mui/system';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';
import { Navigate } from 'react-router';




 const PassowrdReset = ({ title, subtext,subtitle }) => {

    
        const formik = useFormik({
          initialValues: {
            email: "",
          },
          validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Required"),
          }),
          onSubmit: (values) => {
            axios
              .post("http://localhost:8000/api/auth/forgetPassword", values)
              .then((response) => {
                toast.success("Email sent successfully");
                Navigate('/authentificate/login')
              })
              .catch((error) => {
              console.log(error);
                  // toast.error("Server error");
                }
              )
          },
        })


  return (
    <>
   {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box>
        <Stack mb={4}  sx={{ alignItems: 'center' }}>
          <Typography color="textSecondary" variant="h6" fontWeight={500}>
          Can't connect?
                    </Typography>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack mb={4} mt={0} sx={{ alignItems: 'left', justifyContent: "center" }}>
          <Stack mb={1}  sx={{ alignItems: 'left' }}>
          <Typography color="#575555" variant="h12" fontWeight={120} fontSize={"14px"} fontFamily={"'Plus Jakarta Sans',sans-serif"}>
          We will send you a recovery link to
                    </Typography>
        </Stack>
            <CustomTextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Stack mb={0} mt={3} sx={{ alignItems: 'center' }}>
              <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
              send a recovery link
              </Button>
            </Stack>
          </Stack>
        </form>

        
      </Box>
      {subtitle}
    </>
  );
};
export default PassowrdReset