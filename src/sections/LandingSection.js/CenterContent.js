import Box from '@material-ui/core/Box';
import { Typography, Container } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import StlH2 from 'components/HeaderTexts/StlH2';
import ActionButtons from './ActionButtons';
import Fade from 'react-reveal/Fade';
import { useMediaQuery } from 'react-responsive';

export default function CenterContent({
   subtitles,
   title,
   iconSrc,
   actionButtonsData,
   CustomZIndex,
}) {
   const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
   return (
      <Box
         color={common.white}
         width='100%'
         height='100vh'
         display='flex'
         flexDirection='column'
         position='absolute'
         zIndex={CustomZIndex}
      >
         <Box
            width='auto'
            height='auto'
            display='flex'
            margin='auto'
            flexDirection='column'
            maxWidth='100%'
         >
            <Container
               maxWidth='md'
               width='auto'
               height='auto'
               margin='auto'
               className='landing-material-container'
            >
               <Fade big>
                  <img className='icon' src={iconSrc} alt='brand icon' />
               </Fade>
               <Fade big>
                  <StlH2
                     className='special-font landing-title add-text-shadow'
                     style={{
                        ...{
                           fontWeight: 700,
                           textAlign: 'center',
                        },
                     }}
                  >
                     {title}
                  </StlH2>
               </Fade>
               <Box
                  width='auto'
                  height='auto'
                  display='flex'
                  flexDirection='column'
               >
                  {subtitles ? (
                     subtitles.map((subtitle, i) => {
                        return (
                           <Box
                              pt={isMobile ? 2 : 4}
                              display='flex'
                              width='100%'
                              key={i}
                              m='auto'
                              className='subtitle-container'
                           >
                              <Fade big className=''>
                                 <Typography
                                    style={{
                                       textAlign: 'center',
                                       width: `100%`,
                                       marginBottom: '0rem',
                                    }}
                                    className='add-text-shadow'
                                    paragraph
                                    height='auto'
                                 >
                                    {subtitle}
                                 </Typography>
                              </Fade>
                           </Box>
                        );
                     })
                  ) : (
                     <></>
                  )}
               </Box>

               <ActionButtons actionButtonsData={actionButtonsData} />
            </Container>
         </Box>
      </Box>
   );
}
