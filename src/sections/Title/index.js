import Box from '@material-ui/core/Box';
import { Typography, Container } from '@material-ui/core';

export default function Title({
   title,
   bgcolor = 'black',
   color = 'white',
   size,
   pt = null,
   pb = 2,
}) {
   if (!title) {
      return <></>;
   }
   return (
      <Box
         bgcolor={bgcolor}
         style={{
            paddingTop: pt === 0 || pt ? `${pt}rem` : '1rem',
            paddingBottom: pb === 0 || pb ? `${pb}rem` : '1rem',
         }}
      >
         <Container maxWidth='md'>
            <Typography
               className={
                  color === 'white' && bgcolor === 'white'
                     ? 'add-text-shadow'
                     : ''
               }
               variant={size}
               align='center'
               style={{ color: color }}
            >
               {title ? title : <></>}
            </Typography>
         </Container>
      </Box>
   );
}
