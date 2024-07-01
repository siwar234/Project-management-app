import {
  IconAperture, IconLayoutDashboard, 
} from '@tabler/icons';

import { uniqueId } from 'lodash';




const Menuitems = (projectId) => [
  {
    navlabel: true,
    subheader: 'PLANIFICATION',
  },
  {
    id: uniqueId(),
    title: 'BackLog',
    icon: IconLayoutDashboard,
    href: `/dashboard/${projectId}`,
  },
  {
    id: uniqueId(),
    title: 'User management',
    icon: IconAperture,
    href: '/user/management',
  },
  {
    id: uniqueId(),
    title: 'Table ',
    icon: IconAperture,
    href: `/Table/${projectId}`,
  },

  {
    id: uniqueId(),
    title: 'Timeline ',
    icon: IconAperture,
    href: `/Timeline/${projectId}`,
  },
  // {
  //   navlabel: true,
  //   subheader: 'STATISTICS',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Statistics',
  //   icon: IconLayoutDashboard,
  //   href: `/statistic`,
  // },
];



export default Menuitems;
