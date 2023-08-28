import utils from 'utilities';
let { removeClass } = utils;

let handleNavShadow = {
	init: () => {
		window.addEventListener('scroll', handleNavShadow.windowScrolling);
	},

	exit: () => {
		window.removeEventListener('scroll', handleNavShadow.windowScrolling);
	},
	windowScrolling: () => {
		let navbarEles = document.querySelectorAll('.nav-toolbar-container');
		navbarEles.forEach(navbarEle => {
			if (window.scrollY >= 50) {
				removeClass(navbarEle, 'transition-out-dark-bg');
				navbarEle.classList.add('add-bg-dark-blur');
			} else {
				navbarEle.classList.add('transition-out-dark-bg');
				removeClass(navbarEle, 'add-bg-dark-blur');
			}
		});
	},
};

export default handleNavShadow;
