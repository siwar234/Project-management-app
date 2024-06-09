import { Link } from 'react-router-dom';
import logoImg from 'src/assets/images/logo.png';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';

import { styled } from '@mui/material';
const LinkStyled = styled(Link)(() => ({
  height: '80px',
  width: '290px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center', 
  
}));

const Logo = () => {
  return (
    <LinkStyled >
      <img src={logoImg} alt="Logo" style={{ height: '50px', width: '175px' }} />
    </LinkStyled>
  );
};

export default Logo;
