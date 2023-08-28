import { Box, Container, Grid } from '@material-ui/core';
import Decision from './Decision';
import { useMediaQuery } from 'react-responsive';
import Zoom from 'react-reveal/Zoom';
import './style.scss';

export default function DecisionSection({ decitions }) {
   const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
   const isTablet = useMediaQuery({ query: '(max-width: 960px)' });

   return (
      <Box
         className='decision-section-container'
         display='flex'
         bgcolor='#F9DDC8'
      >
         <Container className='first-inner-section-container' maxWidth='md'>
            <Grid
               container
               spacing={isMobile ? 0 : isTablet ? 4 : 10}
               justifyContent='space-between'
            >
               {decitions ? (
                  decitions.map((decition, i) => {
                     if (i > 2) {
                        return <></>;
                     }
                     return (
                        <Grid xs={12} sm={4} item key={i}>
                           <Zoom>
                              <Decision {...decition} />
                           </Zoom>
                        </Grid>
                     );
                  })
               ) : (
                  <></>
               )}
            </Grid>
         </Container>
      </Box>
   );
}
