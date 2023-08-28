import { Typography } from '@material-ui/core';
import './stlH2.scss';

export default function StlH2({ children, className, ...rest }) {
   return (
      <Typography variant='h2' className={`${className} stlh2`} {...rest}>
         {children}
      </Typography>
   );
}
