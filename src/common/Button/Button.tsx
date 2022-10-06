import React, { useState } from "react";
import "./Button.scss";

function Button({
	onClick,
	text,
	isLoading = false,
	disable = false,
}: {
	onClick: () => void;
	text: string;
	isLoading?: Boolean;
	disable?: Boolean;
}) {
	return (
		<button onClick={onClick} className={`button ${disable ? "disable" : ""} ${isLoading ? "loading" : ""}`}>
			<span>{text}</span>
			{isLoading && <span>{"Loading..."}</span>}
		</button>
	);
}

export default Button;
