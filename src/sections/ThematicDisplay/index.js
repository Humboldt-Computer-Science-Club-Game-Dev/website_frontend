import { useState } from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import bgImage from 'Media/Component_Images/ThematicDisplay.png';
import { useMediaQuery } from 'react-responsive';
import StlParagraph from 'components/StlParagraph';
import RichText from 'components/RichText';
import './style.scss';

export default function ThematicDisplay({
   title,
   subtitle,
   texts,
   lightMode,
   richText,
}) {
   let [imageSize, setImageSize] = useState(0);
   let uniqueID = Math.random.toString();
   const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

   return (
      <Box
         width='100%'
         height='auto'
         pb={4}
         display='flex'
         flexDirection='column'
         className={`thematic-display-container ${
            !lightMode ? 'darkmode' : 'light-mode'
         }`}
         id={uniqueID}
      >
         <div className='image-holder'>
            <img
               src={bgImage}
               onLoad={e => {
                  let imageHeight = e.target.height;
                  setImageSize(imageHeight);
               }}
               alt='thematic display background'
            />
         </div>

         {imageSize ? (
            <Typography
               variant={isMobile ? 'h3' : 'h1'}
               className='title'
               style={{
                  marginTop: Math.round(imageSize / 2),
               }}
            >
               <Container maxWidth='md'>{title}</Container>
            </Typography>
         ) : (
            <div>Loading...</div>
         )}
         <Box
            width='100%'
            height='auto'
            display='flex'
            flexDirection='column'
            className='text-container'
         >
            <Container maxWidth='md' className='text-subtitle-container'>
               <Box width={isMobile ? '60%' : '50%'} mx='auto'>
                  <Typography
                     align='center'
                     className='subtitle'
                     variant={isMobile ? 'h6' : 'h5'}
                  >
                     {subtitle}
                  </Typography>
               </Box>
               {texts ? (
                  texts.map((text, i) => {
                     return (
                        <StlParagraph className='text' align='center' key={i}>
                           {text}
                        </StlParagraph>
                     );
                  })
               ) : (
                  <></>
               )}
               {richText ? <RichText richText={richText} /> : <></>}
            </Container>
         </Box>
      </Box>
   );
}
