import { Box, Container, Typography } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import StlParagraph from 'components/StlParagraph';
import RichText from 'components/RichText';
import './style.scss';

export default function StandaloneText({
   lightMode,
   title,
   subtitle,
   texts,
   richText,
}) {
   const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
   return (
      <Box
         className={`standalone-text-container ${
            lightMode ? 'light-mode' : ''
         }`}
      >
         <Container maxWidth='md' className='text-container'>
            {title ? (
               <Typography className='title' variant={isMobile ? 'h3' : 'h1'}>
                  {title}
               </Typography>
            ) : (
               <></>
            )}
            {subtitle ? (
               <Typography
                  className='subtitle'
                  variant={isMobile ? 'h6' : 'h5'}
               >
                  {subtitle}
               </Typography>
            ) : (
               <></>
            )}
            {texts ? (
               texts.map((text, i) => {
                  return (
                     <StlParagraph className='text' key={i}>
                        {text}
                     </StlParagraph>
                  );
               })
            ) : (
               <></>
            )}
            {richText ? (
               <Box mt={title ? '1rem' : '0rem'}>
                  <RichText richText={richText} />{' '}
               </Box>
            ) : (
               <></>
            )}
         </Container>
      </Box>
   );
}
