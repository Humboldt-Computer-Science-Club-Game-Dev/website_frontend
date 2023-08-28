import { useLayoutEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Parallax, useController } from 'react-scroll-parallax';
import './style.scss';

export default function VideoBackground({ src, CustomZIndex, style, ...rest }) {
   const ParallaxCache = () => {
      const { parallaxController } = useController();

      useLayoutEffect(() => {
         const handler = () => parallaxController.update();
         window.addEventListener('load', handler);
         return () => window.removeEventListener('load', handler);
      }, [parallaxController]);

      return null;
   };

   return (
      <Box
         className='video-background'
         width='100%'
         height='100%'
         position='absolute'
         style={{
            ...{
               zIndex: CustomZIndex,
            },
            ...style,
         }}
         {...rest}
      >
         <ParallaxCache />
         <Parallax
            className='video-background-parallax'
            y={[-50, 50]}
            tagOuter='div'
         >
            <video
               autoPlay
               playsInline
               muted
               loop
               className='videobackground match-container object-fit-cover video-element'
               src={src}
            ></video>
         </Parallax>
      </Box>
   );
}
