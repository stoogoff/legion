
import React from "react";
import Button from "./common/button";

// expected props:
// - object: the object to display (in this case, a game)
export default (props) => (
	<div className="box">
		<h1 className="title">{ props.object.name }</h1>
		<div className="media">
			<figure className="media-left is-3by4">
				<img src={ props.object.image } />
			</figure>
			<p className="media-right">{ props.object.description }</p>
		</div>
		<Button onClick={ props.onSelect.bind(null, props.object) } primary fullwidth label={ `Play ${props.object.name}` } />
	</div>
);
