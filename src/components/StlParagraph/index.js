import { Typography } from '@material-ui/core';

export default function StlParagraph({ children, ...rest }) {
   return (
      <Typography className='mb-0' paragraph {...rest}>
         {children}
      </Typography>
   );
}
