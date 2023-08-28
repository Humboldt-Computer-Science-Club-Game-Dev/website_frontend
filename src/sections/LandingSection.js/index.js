import Box from '@material-ui/core/Box';
import landingBackground from '../../Media/Videos/landingBackground.mp4';
import CenterContent from './CenterContent';
import VideoBackground from 'components/VideoBackground';
import MaxVignette from 'components/MaxVignette';
import FluidTint from 'components/FluidTinter';
import './style.scss';

export default function LandingScreen({
   subtitles,
   title,
   iconSrc,
   actionButtons,
   videoBG,
}) {
   return (
      <Box
         className='landing-screen'
         width={`100%`}
         height={`110vh`}
         position='relative'
      >
         <VideoBackground
            src={videoBG ? videoBG : landingBackground}
            CustomZIndex='0'
         />
         <MaxVignette CustomZIndex='1' />
         <MaxVignette CustomZIndex='1' opacity='20%' />
         <FluidTint CustomZIndex='1' opacity='20%' />
         <CenterContent
            subtitles={subtitles}
            title={title}
            iconSrc={iconSrc}
            actionButtonsData={actionButtons}
            CustomZIndex='5'
         />
      </Box>
   );
}
