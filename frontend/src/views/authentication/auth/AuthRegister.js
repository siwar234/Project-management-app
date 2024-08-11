import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch,useSelector  } from 'react-redux';
import {  registerUser } from 'src/JS/actions/user';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { FcHighPriority } from 'react-icons/fc';
import {googlepUrl } from "../../../ConnectionString"
const AuthRegister = ({ title, subtitle, subtext }) => {

  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false); 
  const [emailRequiredError, setEmailRequiredError] = React.useState(false);
  
  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail !== '') {
      setEmailError(!isValidEmail(newEmail));
      setEmailRequiredError(false); 
    } else {
      setEmailError(false); 
    }
  };
  
  const emailAlreadyExists = useSelector(state => state.userReducer.emailAlreadyExists);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      setEmailRequiredError(true);
    } else if (!emailError) {
      dispatch(registerUser(email));
      setEmail('');
    }
  };


const isValidEmail = (email) => {
  return /\S+@gmail\.com/.test(email);
};

  

const signInGoogle=()=>{
        
  window.location.replace(`${googlepUrl}/auth/google`);

}

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <form onSubmit={handleSubmit}>
          <Stack mb={2} sx={{ alignItems: 'center' }}>
            <Typography color="textSecondary" variant="h6" fontWeight={500}>
              Subscibe to continue
            </Typography>
          </Stack>

          <Stack mb={4} mt={0}   sx={{ alignItems: 'left',justifyContent:"center" }}>

          {emailAlreadyExists && ( 
          <Typography variant="h9" color="rgb(90 98 113)"  fontWeight={410}  textAlign={"center"} fontSize={"13px"} lineHeight={"17px"}>
             it seems that an account is already associated <br/>
             with this e-mail. Please login to this account or<br/>
      
      reset your password if you have forgotten it.
          </Typography>
       
      )}</Stack>
             <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleChange}
            placeholder="enter your e-mail address"
            error={emailError || emailRequiredError} 
            helperText={emailRequiredError ? (
              <Stack mt={1.5}>
                <Typography color="#AE2A19" variant="body2" mb={2} fontWeight={900}>
                  <FcHighPriority style={{ marginRight: '5px' }} />
                  Email is required
                </Typography>
              </Stack>
            ) : emailError ? (
              <Stack mt={1.5}>
                <Typography color="#AE2A19" variant="body2" mb={2} fontWeight={900}>
                  <FcHighPriority style={{ marginRight: '5px' }} />
                  Please enter a valid Gmail address
                </Typography>
              </Stack>
            ) : null}
          />

          <Stack mb={0} mt={3} sx={{ alignItems: 'center' }}>
            <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
              Subscibe
            </Button>
          </Stack>

          <Stack mb={0} mt={3} sx={{ alignItems: 'center' }}>
            <Typography color="textSecondary" variant="h6" fontWeight={650}>
              Or continue with
            </Typography>
          </Stack>
          <Stack mb={4} sx={{ alignItems: 'center' }}>
            <button className="login" style={{ alignItems: 'center' }} onClick={signInGoogle}>
              Sign up with Google
            </button>
          </Stack>
        </form>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
