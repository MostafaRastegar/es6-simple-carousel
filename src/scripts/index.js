import '../styles/index.scss';
// import config from './config';
import slide from './events';

const slideConfig = {
	slider: "#slider2",//add user
	threshold: 50, // add user
	infinite: false, //add user
	responsive: { //add user
		0: {
			items: 2
		},
		560: {
			items: 2.5
		},
		760: {
			items: 2
		}
	}
};

slide(slideConfig);