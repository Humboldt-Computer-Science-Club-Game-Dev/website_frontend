import { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import StlButton from 'components/StlButton';
import { useMediaQuery } from 'react-responsive';
import helpers from 'utilities/helperFunctions';

export default function Decision({ bgImage, title, texts, actionButton }) {
   const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
   let uniqueID = Math.random();
   let { addClassToEle, removeClassFromEle, isHovering } = helpers;

   useEffect(() => {
      let decisionEle = document.getElementById(`${uniqueID}`);
      let decisionExpandContent = decisionEle.querySelector(
         '.hover-content-shrink'
      );

      decisionEle.addEventListener('mouseenter', expandContent);
      decisionEle.addEventListener('mouseleave', shrinkContent);

      function expandContent() {
         addClassToEle(decisionExpandContent, 'hover-content-expand');
         setTimeout(updateHoverStatus, 500);
      }
      function shrinkContent() {
         removeClassFromEle(decisionExpandContent, 'hover-content-expand');
      }

      function updateHoverStatus() {
         if (!isHovering(decisionEle)) {
            shrinkContent();
         } else {
            setTimeout(updateHoverStatus, 500);
         }
      }

      return () => {
         decisionEle.removeEventListener('mouseenter', expandContent);
         decisionEle.removeEventListener('mouseleave', shrinkContent);
      };
   }, [addClassToEle, isHovering, removeClassFromEle, uniqueID]);

   let hasLargeTitle = (() => {
      return title.length >= 20;
   })();

   function TextSection() {
      return texts ? (
         texts.map((text, j) => {
            return (
               <Typography className='text' key={j} paragraph align='center'>
                  {text}
               </Typography>
            );
         })
      ) : (
         <></>
      );
   }

   return (
      <Box
         className='decision-container'
         width='100%'
         height={isMobile ? '90vh' : '70vh'}
         position='relative'
         display='flex'
         id={uniqueID}
      >
         <img src={bgImage} alt='decition section background' />
         <Box
            bgcolor='rgba(0, 0, 0, 0.5)'
            width='100%'
            height='100%'
            zIndex={2}
            position='absolute'
         ></Box>
         <Box
            width='100%'
            height='auto'
            margin='auto'
            position='relative'
            zIndex={3}
            className='inner-decition-container'
         >
            <Typography
               className='decision-title'
               variant={hasLargeTitle ? 'h6' : 'h3'}
               align='center'
            >
               {title}
            </Typography>
            <div
               className={
                  isMobile ? 'hover-content-expand' : 'hover-content-shrink'
               }
            >
               <TextSection />
               <StlButton
                  className='action-button'
                  standardClick={actionButton.standardClick}
               >
                  {actionButton.title}
               </StlButton>
            </div>
         </Box>
      </Box>
   );
}
