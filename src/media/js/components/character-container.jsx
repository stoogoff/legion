
import React from "react";
import Button from "./common/button";

export default (props) => (
	<div className="box">
		<h1 className="title">{ props.object.name }</h1>
		<div className="media">
			<figure className="media-left is-3by4">
				<img src={ props.object.image } />
			</figure>
			<p className="media-right">{ props.object.description }</p>
		</div>
		<Button onClick={ props.onSelect.bind(null, props.object) } fullwidth label="Choose" />
	</div>
);
