import {
  IconAperture, IconLayoutDashboard,IconLayoutList , IconTimeline ,IconShare 
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
    icon: IconLayoutList,
    href: `/Table/${projectId}`,
  },

  {
    id: uniqueId(),
    title: 'Timeline ',
    icon: IconTimeline,
    href: `/Timeline/${projectId}`,
  },

  {
    navlabel: true,
    subheader: 'Communication spaces',
  },

  {
    id: uniqueId(),
    title: 'Communication space ',
    icon: IconShare,
    href: `/communication/space/list/${projectId}`,
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
