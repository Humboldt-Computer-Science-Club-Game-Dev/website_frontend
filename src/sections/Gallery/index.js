import { useState } from 'react';
import {
   Box,
   Container,
   ImageList,
   ImageListItem,
   Typography,
   ImageListItemBar,
   IconButton,
} from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import { useMediaQuery } from 'react-responsive';
import './style.scss';
import StlButton from 'components/StlButton';
import useSortedImages from './useSortedImages';
import ImageModel from 'components/ImageModal';

export default function Gallery({
   images,
   title,
   customPaddingTop = 2,
   customPaddingBottom = 2,
   lightMode = true,
}) {
   let [isExtended, setIsExtended] = useState(false);
   const isSmall = useMediaQuery({ query: '(max-width: 840px)' });
   const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
   const [showModal, setShowModal] = useState({
      show: false,
      src: null,
      meta: null,
   });

   let sortedImages = useSortedImages(images);
   let showSeeMore = (() => {
      if (isMobile && sortedImages && sortedImages.length < 4) {
         return false;
      } else if (!isMobile && sortedImages && sortedImages.length < 5) {
         return false;
      }
      return true;
   })();

   return (
      <Box
         className={`gallery-container ${lightMode ? 'light-mode' : ''}`}
         style={{
            paddingTop: `${customPaddingTop}rem`,
            paddingBottom: `${customPaddingBottom}rem`,
         }}
      >
         {showModal.show ? (
            <ImageModel
               {...showModal}
               model={showModal}
               setShow={setShowModal}
            />
         ) : (
            <></>
         )}
         <Container maxWidth='md' className='gallery-inner-container'>
            {title ? (
               <Typography className='title' variant='h3' align='left'>
                  {title}
               </Typography>
            ) : (
               <></>
            )}
            <Box mt={4}>
               <ImageList
                  className='gallery-grid-container'
                  rowHeight={isSmall ? 220 : 280}
                  cols={isMobile ? 2 : 3}
               >
                  {images ? (
                     sortedImages
                        .filter((image, i) => {
                           if (isMobile && !isExtended && i > 3) {
                              return false;
                           }
                           if (!isExtended && i > 3) {
                              return false;
                           } else if (!image) {
                              return false;
                           }
                           return true;
                        })
                        .map((image, i) => {
                           return (
                              <ImageListItem
                                 cols={image.isTall ? 1 : 2}
                                 key={i}
                              >
                                 <img src={image.src} alt='gallery item' />
                                 <ImageListItemBar
                                    title={
                                       image.title
                                          ? image.title
                                          : 'Unnamed Image'
                                    }
                                    subtitle={
                                       image.description
                                          ? image.description
                                          : null
                                    }
                                    actionIcon={
                                       <IconButton
                                          aria-label={`info about asfsda`}
                                          onClick={() => {
                                             setShowModal({
                                                show: true,
                                                src: image.src,
                                                meta: {
                                                   title: image.title,
                                                   description:
                                                      image.description,
                                                },
                                             });
                                          }}
                                       >
                                          <LaunchIcon />
                                       </IconButton>
                                    }
                                 />
                              </ImageListItem>
                           );
                        })
                  ) : (
                     <></>
                  )}
               </ImageList>
            </Box>
            {showSeeMore ? (
               <StlButton
                  className='action-button'
                  onClick={() => {
                     setIsExtended(!isExtended);
                  }}
                  lightMode={lightMode}
               >
                  {isExtended ? 'See Less' : 'See More'}
               </StlButton>
            ) : (
               <></>
            )}
         </Container>
      </Box>
   );
}
