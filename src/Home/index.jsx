import { HeartIcon } from "@heroicons/react/outline";
import { useState } from "react";
const MAX_TWEET_CHAR = 250;
function TweetForm() {
	const [text, setText] = useState("");

	function changeText(e) {
		setText(e.target.value);
	}

	return (
		<div className="border-b border-silver">
			<div className="flex space-x-2  p-4 ">
				<img className="w-7" src="../img/user_icon.png" />
				<h1 className="font-bold text-lg">Página Inicial</h1>
			</div>

			<form className="pl-18 flex flex-col">
				<textarea
					type="text"
					name="text"
					value={text}
					onChange={changeText}
					className="bg-transparent outline-none px-14"
					placeholder="O que está acontecendo?"
				></textarea>

				<div className="space-x-2 text-sm flex items-center px-2 py-2 justify-end">
					<span>
						<span>{text.length}</span> /{" "}
						<span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
					</span>
					<button
						disabled={text.length > MAX_TWEET_CHAR}
						className="bg-birdBlue px-3 font-bold disabled:opacity-50 py-1 rounded-full"
					>
						Tweet
					</button>
				</div>
			</form>
		</div>
	);
}
function Tweet({ name, username, avatar, children }) {
	return (
		<div className="flex space-x-3 p-4 border-b border-silver">
			<div>
				<img src={avatar} />
			</div>

			<div className="text-sm">
				<span className="font-bold">{name}</span>{" "}
				<span className="text-silver">@{username}</span>
				<p>{children}</p>
				<div className="flex space-x-1 items-center text-silver">
					<HeartIcon className="w-6 stroke-1"></HeartIcon>
					<span>1.2k</span>
				</div>
			</div>
		</div>
	);
}

export const Home = () => {
	return (
		<>
			<TweetForm></TweetForm>

			<Tweet
				name="Luccas Andrade"
				username="_khangel"
				avatar="../img/user_icon.png"
			>
				Olá!!!!!
			</Tweet>
			<Tweet
				name="Kamila Gusmão"
				username="kammikat01"
				avatar="../img/user_icon.png"
			>
				Meu namorado é lindo demais! *-*
			</Tweet>
		</>
	);
};
