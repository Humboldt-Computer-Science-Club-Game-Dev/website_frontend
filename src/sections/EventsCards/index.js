import { Box, Container, Typography } from '@material-ui/core';
import StlButton from 'components/StlButton';
import './style.scss';

export default function EventCards({ events, lightMode }) {
   return (
      <Box
         className={`event-cards-container ${lightMode ? 'lightMode' : ''}`}
         display='flex'
         flexDirection='column'
      >
         <Container maxWidth='md' className='events-container'>
            {events ? (
               events.map((event, i) => {
                  return (
                     <div
                        className={`event-container ${
                           i % 2 === 0 ? 'mr-sm' : 'ml-sm'
                        }`}
                        key={i}
                     >
                        <Box
                           display='flex'
                           width='100%'
                           height='auto'
                           className='image-container'
                           position='relative'
                        >
                           <img src={event.thumbnail} alt='event thumbnail' />
                           <div className='film'></div>
                           <Typography
                              paragraph
                              className='event-title'
                              variant='h5'
                           >
                              {event.title}
                           </Typography>
                        </Box>
                        <Typography
                           className='date-description-text'
                           align='center'
                           paragraph
                        >
                           {`${event.date}${
                              event.time ? ' ' + event.time : ''
                           }`}
                        </Typography>
                        <Typography
                           className='date-description-text'
                           align='center'
                           paragraph
                        >
                           {event.description}
                        </Typography>
                        {event.standardClick ? (
                           <StlButton
                              standardClick={event.standardClick}
                              className='action-button'
                           >
                              Learn More
                           </StlButton>
                        ) : (
                           <></>
                        )}
                     </div>
                  );
               })
            ) : (
               <div>Failed to load event data</div>
            )}
         </Container>
      </Box>
   );
}
