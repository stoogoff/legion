

export const LOG = 1;
export const INFO = 2;
export const WARN = 4;
export const ERROR = 8;


const noop = () => {};


export default function getLogger(module, level) {
	let logger = {
		log: noop,
		info: noop,
		warn: noop,
		error: noop
	};

	if(level & LOG) {
		logger.log = (...args) => console.log(`${module}:`, ...args);
	}

	if(level & INFO) {
		logger.info = (...args) => console.info(`${module}:`, ...args);
	}

	if(level & WARN) {
		logger.warn = (...args) => console.warn(`${module}:`, ...args);
	}

	if(level & ERROR) {
		logger.error = (...args) => console.error(`${module}:`, ...args);
	}

	return logger;
};
