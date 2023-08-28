import { Container, Box } from '@material-ui/core';
import './style.scss';

export default function HorizontalRule({ lightMode }) {
   return (
      <Box
         className={`horizontal-rule-container ${
            lightMode ? 'light-mode' : ''
         }`}
      >
         <Container maxWidth='md'>
            <hr />
         </Container>
      </Box>
   );
}
