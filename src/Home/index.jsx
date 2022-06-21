import { HeartIcon } from "@heroicons/react/outline";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useFormik } from "formik";

const MAX_TWEET_CHAR = 250;

function TweetForm({ loggedInUser, onSuccess }) {
	const formik = useFormik({
		onSubmit: async (values, form) => {
			await axios({
				method: "post",
				url: "http://localhost:9901/tweets",
				headers: {
					"authorization": `Bearer ${loggedInUser.accessToken}`,
				},
				data: {
					text: values.text,
				},
			});
			form.setFieldValue("text", "");
			onSuccess();
		},
		initialValues: {
			text: "",
		},
	});

	function changeText(e) {
		setText(e.target.value);
	}

	return (
		<div className="border-b border-silver">
			<div className="flex space-x-2  p-4 ">
				<img className="w-7" src="../img/user_icon.png" />
				<h1 className="font-bold text-lg">Página Inicial</h1>
			</div>

			<form className="pl-18 flex flex-col" onSubmit={formik.handleSubmit}>
				<textarea
					type="text"
					name="text"
					value={formik.values.text}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="bg-transparent outline-none px-14"
					placeholder="O que está acontecendo?"
					disabled={formik.isSubmitting}
				></textarea>

				<div className="space-x-2 text-sm flex items-center px-2 py-2 justify-end">
					<span>
						<span>{formik.values.text.length}</span> /{" "}
						<span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
					</span>
					<button
						type="submit"
						disabled={
							formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting
						}
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

export function Home({ loggedInUser }) {
	const [data, setData] = useState([]);

	async function getData() {
		const res = await axios.get("http://localhost:9901/tweets", {
			headers: {
				"authorization": `Bearer ${loggedInUser.accessToken}`,
			},
		});
		setData(res.data);
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
			<div>
				{data.length &&
					data.map((tweet) => (
						<Tweet
							key={tweet.id}
							name={tweet.user.name}
							username={tweet.user.username}
							avatar="../img/user_icon.png"
						>
							{tweet.text}
						</Tweet>
					))}
			</div>
		</>
	);
}
