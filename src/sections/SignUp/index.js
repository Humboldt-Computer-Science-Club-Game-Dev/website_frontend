import StlFormContainer from 'components/StlFormContainer';
import ContinueWithGoogle from 'components/ContinueWithGoogle';

export default function SignUp({ title = 'Sign Up' }) {
	return (
		<StlFormContainer height='auto' title={title} extraPadding={true}>
			<ContinueWithGoogle />
		</StlFormContainer>
	);
}
