import Box from '@material-ui/core/Box';
import StlButton from 'components/StlButton';
import Zoom from 'react-reveal/Zoom';
import { useMediaQuery } from 'react-responsive';

export default function ActionButtons({ actionButtonsData }) {
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
	if (!actionButtonsData) return <></>;
	if (actionButtonsData.length > 2) {
		actionButtonsData = actionButtonsData.slice(0, 1);
	}
	return (
		<Box display='flex' width='100%'>
			<Box width='100%' display='flex' flexDirection={isMobile ? 'column' : 'row'}>
				{actionButtonsData ? (
					actionButtonsData.map((actionButton, i) => {
						let isLeft = i === 0;
						return (
							<Box
								mr={isMobile ? 'auto' : isLeft ? 3 : 'auto'}
								ml={isMobile ? 'auto' : isLeft ? 'auto' : 3}
								mt={isMobile ? 2 : 6}
								key={i}
							>
								<Zoom>
									<StlButton standardClick={actionButton.standardClick}>
										{actionButton.title}
									</StlButton>
								</Zoom>
							</Box>
						);
					})
				) : (
					<></>
				)}
			</Box>
		</Box>
	);
}
