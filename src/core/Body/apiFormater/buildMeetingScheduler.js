export default function buildMeetingScheduler(rawS) {
	return {
		name: rawS._type,
		props: {
			calendyTitle: rawS?.calendyTitle,
			calendyRouteID: rawS?.calendyRouteID,
			fixedCalendyHeightDesktop: rawS?.fixedCalendyHeightDesktop,
			fixedCalendyHeightMobile: rawS?.fixedCalendyHeightMobile,
			phoneNumberTitle: rawS?.phoneNumberTitle,
			phoneNumber: rawS?.phoneNumber,
			phoneNumberSubtitle: rawS?.phoneNumberSubtitle,
			phoneNumberInstructions: rawS?.phoneNumberInstructions
				? rawS.phoneNumberInstructions.map(instruction => {
						return { title: instruction.title, subtitle: instruction.subtitle };
				  })
				: null,
		},
	};
}
