import React from 'react';
import { Navigate } from 'react-router-dom';
import PrivateRouteAD from './PrivateRouteAD';
import PrivateRole from './PrivateRole';
import UserRole from './UserRole';

import { useSelector } from 'react-redux';

/* ****Pages***** */
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const SamplePage = React.lazy(() => import('../views/sample-page/SamplePage'));
const Icons = React.lazy(() => import('../views/icons/Icons'));
const TypographyPage = React.lazy(() => import('../views/utilities/TypographyPage'));
const Shadow = React.lazy(() => import('../views/utilities/Shadow'));
const ErrorPage = React.lazy(() => import('../views/authentication/Error'));
const Register = React.lazy(() => import('../views/authentication/Register'));
const Login = React.lazy(() => import('../views/authentication/Login'));
const Activate = React.lazy(() => import('../views/authentication/Activate'));
const ResetPasswordd = React.lazy(() => import('../views/authentication/resetpassword'));
const LandingPage = React.lazy(() => import('../pages/landing-page/LandingPage'));
const ResetPassword = React.lazy(() => import('../views/authentication/forgotPassword'));
const FullLayout = React.lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = React.lazy(() => import('../layouts/blank/BlankLayout'));
const JoinTeam = React.lazy(() => import('../views/authentication/JoinTeam'));

const Teams = React.lazy(() => import('../views/teams/Teams'));
const EquipeDetails = React.lazy(() => import('../views/teams/EquipeDetails'));

const Router = () => {
  const isAuth = useSelector(state => state.userReducer.isAuth);
  const user = useSelector(state => state.userReducer.user);
 

  return [

    
    {
      path: '/',
      element: <PrivateRouteAD><FullLayout /></PrivateRouteAD>,
      children: [
        { path: '/dashboard', exact: true, element: <Dashboard /> },
        { path: '/profileuser/:token/:id', exact: true, element:  <Icons />  },
        { path: '/ui/typography', exact: true, element:  <TypographyPage />  },
        { path: '/ui/shadow', exact: true, element: <Shadow /> },

        { path: '*', element: <Navigate to="/auth/404" /> },
      ],
    },
   
    {
      path: '/',
      element: <PrivateRouteAD> <PrivateRole><FullLayout /></PrivateRole></PrivateRouteAD>,
      children: [
        { path: '/user/management', exact: true, element: <SamplePage /> },
      ],
    },

    {
      path: '/team',
      element: !isAuth ? <Login /> :<UserRole> <FullLayout /></UserRole>,
      children: [
      
        { path: '/team/teams', exact: true, element: !isAuth ? <Login /> :<Teams /> },
       { path: '/team/equipe/:id', exact: true, element:  <EquipeDetails />},


      ],
    },

    {
      path: '/authentificate/',
      element: <BlankLayout />,
      children: [
        { path: '/authentificate/login', element: !isAuth ?  <Login /> : <Navigate to="/dashboard" /> },
      ],
    },

    {
      path: '/landingpage',
      element: <LandingPage />,
      children: [
        { path: '/landingpage/page', element: <LandingPage /> },
      ],
    },
    {
      path: '/email',
      element: <BlankLayout />,
      children: [
        { path: '/email/activate/', exact: true, element: <Activate /> },
      ],
    },

    {
      path: '/join',
      element: <BlankLayout />,
      children: [
        { path: '/join/jointeam/', exact: true, element:  <JoinTeam /> },
      ],
    },


    {
      path: '/authentificate',
      element: <BlankLayout />,
      children: [
        { path: '404', element: <ErrorPage /> },
        { path: '/authentificate/register', element: <Register /> },
        { path: '/authentificate/resetpassword', element: <ResetPasswordd /> },
        { path: '/authentificate/password/:token', element: <ResetPassword /> },
        { path: '*', element: <Navigate to="/authentificate/404" /> },
      ],
    },
  ];
};

export default Router;
