export default function warningFilter() {
	const backup = console.warn;

	console.warn = function filterWarnings(msg) {
		const supressedWarnings = ['componentWillReceiveProps has been renamed', 'DevTools failed to load source map'];

		if (typeof msg.includes === 'function' && !supressedWarnings.some(entry => msg.includes(entry))) {
			backup.apply(console, arguments);
		}
	};

	const errBackup = console.error;

	console.error = function filterWarnings(msg) {
		const supressedErrors = ['GET http://localhost:3005'];

		if (typeof msg.includes === 'function' && !supressedErrors.some(entry => msg.includes(entry))) {
			errBackup.apply(console, arguments);
		}
	};
}
