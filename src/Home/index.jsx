import { HeartIcon } from "@heroicons/react/outline";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useFormik } from "formik";
import img0 from '../img/icon0.png'
import img1 from '../img/icon1.png'
import img2 from '../img/icon2.png'
import img3 from '../img/icon3.png'

const MAX_TWEET_CHAR = 250;

function TweetForm({ loggedInUser, onSuccess }) {
	const formik = useFormik({
		onSubmit: async (values, form) => {
			await axios({
				method: "post",
				url: `${import.meta.env.VITE_API_HOST}/tweets`,
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
		<div className="border-b border-silver ">
			<div className="flex space-x-2  p-4 ">
				<img className="w-7" src={img0} />
				<h1 className="font-bold text-lg">Deixe sua mensagem:</h1>
			</div>

			<form className="pl-18 flex flex-col" onSubmit={formik.handleSubmit}>
				<textarea
					type="text"
					name="text"
					value={formik.values.text}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="bg-transparent outline-none px-14"
					placeholder="Escreva sua mensagem"
					disabled={formik.isSubmitting}
				></textarea>

				<div className="space-x-2 text-sm flex items-center px-2 py-2 justify-start">
					<span>
						<span>{formik.values.text.length}</span> /{" "}
						<span className="text-birdBlue">{MAX_TWEET_CHAR}</span>
					</span>
					<button
						type="submit"
						disabled={
							formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting
						}
						className="bg-newPurple px-3 font-bold disabled:opacity-50 py-1 px-2 rounded-full"
					>
						Postar
					</button>
				</div>
			</form>
		</div>
	);
}
function Tweet({ name, username, children }) {
	const randNumber = Math.floor(Math.random() * 3)
	const avatares = [img0, img1, img2, img3]
	return (
		<div className="flex space-x-3 p-4 border-b border-silver">
			<div>
				<img className="w-10" src={avatares[randNumber]} />
			</div>

			<div className="text-sm">
				<span className="font-bold">{name}</span>{" "}
				<span className="text-silver">@{username}</span>
				<p>{children}</p>
				<div className="flex space-x-1 items-center text-silver">
					<HeartIcon className="w-6 stroke-1"></HeartIcon>
					<span>{Math.floor(Math.random() * 20)}</span>
				</div>
			</div>
		</div>
	);
}

export function Home({ loggedInUser }) {
	const [data, setData] = useState([]);
	async function getData() {
		const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
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
			<div className="w-[600px] max-w-[90%]">
				<h1 className="text-2xl text-platinum m-4 font-bold">{`Bem vindo, ${loggedInUser.name.split(' ')[0]}!`}</h1>
				<TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
				<div>
					{data.length &&
						data.map((tweet) => (
							<Tweet
								key={tweet.id}
								name={tweet.user.name}
								username={tweet.user.username}
							>
								{tweet.text}
							</Tweet>
						))}
				</div>
			</div>
		</>
	);
}
