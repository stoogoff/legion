
import getLogger from "./lib/logger";

const logger = getLogger("app", 15);

logger.warn(process.env)
logger.warn(process.env.TEST)



import React from "react";
import ReactDOM from "react-dom";

class HelloMessage extends React.Component {
	render() {
		return <div>Hello {this.props.name}</div>;
	}
}


ReactDOM.render(<HelloMessage name="Sebastian" />, document.getElementById("container"));
