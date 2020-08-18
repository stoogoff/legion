
import React from "react";
import Button from "./common/button";

export default (props) => (
	<div className="box">
		<h1 className="title">{ props.object.name }</h1>
		{ props.player.id === props.object.playerId ? <h2>You have chosen this character</h2> : null }
		<div className="media">
			<figure className="media-left is-3by4">
				<img src={ props.object.image } />
			</figure>
			<p className="media-right">{ props.object.description }</p>
		</div>
		<Button primary onClick={ props.onSelect.bind(null, props.object) } disabled={ props.object.selected } fullwidth label="Choose" />
	</div>
);
