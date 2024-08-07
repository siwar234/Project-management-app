import React from 'react';
import { Navigate } from 'react-router-dom';
import PrivateRouteAD from './PrivateRouteAD';
import UserRole from './UserRole';

import { useSelector } from 'react-redux';

/* ****Pages***** */
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
// const SamplePage = React.lazy(() => import('../views/sample-page/SamplePage'));
const Icons = React.lazy(() => import('../views/Profile/Icons'));
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
const Layout = React.lazy(() => import('../layouts/full/Layout'));
const Projects = React.lazy(() => import('../views/Projects/ViewProjects'));
const DetailsProjects = React.lazy(() => import('../views/Projects/DetailsProjects'));
const Redirect = React.lazy(() => import('../views/Redirect'));
const Workspace = React.lazy(() => import('../views/dashboard/Workspace'));
const Table = React.lazy(() => import('../views/dashboard/Table'));
const Timeline = React.lazy(() => import('../views/dashboard/Timeline/Timeline'));
const Statistics = React.lazy(() => import('../views/dashboard/statistics/Statistics'));
const Space = React.lazy(() => import('../views/dashboard/communicationspace/CommunicationSpace'));
const MeetRoom=React.lazy(() => import('../views/dashboard/communicationspace/MeetRoom'));
const MeetHomePage=React.lazy(() => import('../views/dashboard/communicationspace/MeetPage'));

const Posts=React.lazy(() => import('../views/dashboard/communicationspace/PostSpace'));


const Teams = React.lazy(() => import('../views/teams/Teams'));
const EquipeDetails = React.lazy(() => import('../views/teams/EquipeDetails'));

const Router = () => {
  const isAuth = useSelector(state => state.userReducer.isAuth);
 

  return [

    
    {
      path: '/',
      element: !isAuth ? <Login /> : <Layout />,
      children: [
        { path: '/profileuser/:token/:id', exact: true, element: !isAuth ? <Login /> : <Icons />  },
       

        { path: '*', element: <ErrorPage /> },
      ],
    },

    {
      path: '/',
      element: <BlankLayout />,
      children: [
        { path: '/redirect', exact: true, element:  <Redirect />  },
       

        { path: '*', element: <ErrorPage /> },
      ],
    },

    
    {
      path: '/',
      element: <UserRole><FullLayout /></UserRole>,
      children: [
        { path: '/dashboard/:projectId', exact: true, element: <Dashboard /> },
        { path: '/Table/:projectId', exact: true, element: <Table /> },
        { path: '/Timeline/:projectId', exact: true, element: <Timeline /> },


      ],
    },
    

    {
      path: '/',
      element: <UserRole><Layout /></UserRole>,
      children: [
        { path: '/statistic', exact: true, element: <Statistics /> },
       
        

      ],
    },
  

    {
      path: '/',
      element:<PrivateRouteAD><Layout /></PrivateRouteAD>,
      children: [
        { path: '/workspace', exact: true, element: <Workspace /> },
       

      ],
    },


    {
      path: '/projects',
      element: !isAuth ? <Login /> : <UserRole><Layout /></UserRole>,
      children: [
        { path: '/projects/viewprojects', exact: true, element:!isAuth ? <Login /> : <Projects /> },

      ],
    },
    {
      path: '/projects',
      element: !isAuth ? <Login /> : <UserRole><FullLayout /></UserRole>,
      children: [
        { path: '/projects/details/:projectId', exact: true, element:!isAuth ? <Login /> : <DetailsProjects /> },

      ],
    },
   
   
    // {
    //   path: '/',
    //   element:  <PrivateRole><FullLayout /></PrivateRole>,
    //   children: [
    //     { path: '/user/management', exact: true, element: <SamplePage /> },
    //   ],
    // },

    {
      path: '/team',
      element: !isAuth ? <Login /> :<UserRole> <Layout /></UserRole>,
      children: [
      
        { path: '/team/teams', exact: true, element: !isAuth ? <Login /> :<Teams /> },
       { path: '/team/equipe/:id', exact: true, element:  <EquipeDetails />},


      ],
    },

    {
      path: '/communication/space',
      element: !isAuth ? <Login /> :<UserRole> <FullLayout /></UserRole>,
      children: [
      
        { path: '/communication/space/list/:projectId', exact: true, element: !isAuth ? <Login /> :<Space /> },
        { path: '/communication/space/posts/:projectId/:taskId', exact: true, element: !isAuth ? <Login /> :<Posts /> },
     


      ],
    },


    {
      path: '/communication',
      element: !isAuth ? <Login /> :<UserRole> <Layout /></UserRole>,
      children: [
      
      
        { path: '/communication/meetRoom/:roomID', exact: true, element: !isAuth ? <Login /> :<MeetRoom /> },
        { path: '/communication/meetHomePage/:id', exact: true, element: !isAuth ? <Login /> :<MeetHomePage /> },


      ],
    },

    {
      path: '/authentificate/',
      element: <BlankLayout />,
      children: [
        { path: '/authentificate/login', element: !isAuth ?  <Login /> : <Navigate to="/workspace" /> },
      ],
    },

    {
      path: '/Teamsyn',
      element: <LandingPage />,
      children: [
        { path: '/Teamsyn/', element: <LandingPage /> },
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
