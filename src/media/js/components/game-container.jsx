
import React from "react";
import Button from "./common/button";

export default (props) => (
	<div className="box">
		<h1 className="title">{ props.game.name }</h1>
		<div className="media">
			<figure className="media-left is-3by4">
				<img src={ props.game.image } />
			</figure>
			<p className="media-right">{ props.game.description }</p>
		</div>
		<Button onClick={ props.onClick.bind(null, props.game) } fullwidth label={ `Play ${props.game.name}` } />
	</div>
);
