import { Typography } from '@material-ui/core';

export default function Label({ children, ...rest }) {
   return (
      <label {...rest}>
         <Typography paragraph className='inner-ele'>
            {children}
         </Typography>
      </label>
   );
}
