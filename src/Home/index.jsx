import { HeartIcon, UsersIcon } from "@heroicons/react/outline";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useFormik } from "formik";
import img0 from '../img/icon0.png'
import img1 from '../img/icon1.png'
import img2 from '../img/icon2.png'
import img3 from '../img/icon3.png'
import github from '../img/github.svg'
import logo from '../img/logo.png'
import Menu from "../Menu";

import './styles.css'

const MAX_POST_CHAR = 250;

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
		<div className="form-box">
			<form className="form-post" onSubmit={formik.handleSubmit}>
				<textarea
					type="text"
					name="text"
					value={formik.values.text}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className="textarea-post"
					placeholder="Escreva sua mensagem"
					required
					disabled={formik.isSubmitting}
				></textarea>

				<div className="bottom-text">
					<span className="char-limit-box" >
							<span>{formik.values.text.length}</span> /{" "}
							<span className="text-red-300">{MAX_POST_CHAR}</span>
					</span>
					<button
						type="submit"
						disabled={
							formik.values.text.length > MAX_POST_CHAR || formik.isSubmitting
						}
						className="btn-post"
					>
						Sussurrar
					</button>
				</div>
			</form>
		</div>
	);
}
function Tweet({ name, username, children, loggedInUser, id, allLikes, getLikes }) {
	const randNumber = Math.floor(Math.random() * 3)
	const avatares = [img0, img1, img2, img3]
	const actualTweetLikes = allLikes.filter((like) => like.tweetId === id)
	const numLikes = actualTweetLikes.length
	let redHeart = false
	actualTweetLikes.map((tweet) => {
		if (tweet.userId === loggedInUser.id)
		redHeart = true
	})

	const handleLike = async (e) => {
		let UID = localStorage.getItem('user')
		if (UID) {
			const data = {
				userId: JSON.parse(UID).id,
				tweetId: e.target.id}
			const res = await axios.post(`${import.meta.env.VITE_API_HOST}/likes`, data, {
				headers: {
					"authorization": `Bearer ${loggedInUser.accessToken}`,
				},
			});
			getLikes()
		}
	}



	return (
		<div className="post-box flex space-x-3 items-center justify-between pt-4 pb-4 border-b border-silver">
			<div>
				<img className="w-10" src={avatares[randNumber]} />
			</div>

			<div className="text-sm w-[100%]">
				<span className="font-bold">{name}</span>{" "}
				<span className="text-silver">@{username}</span>
				<p>{children}</p>
				<div className="flex space-x-1 items-center text-silver">
				<span  id={id} className={redHeart?"material-symbols-outlined redcolor":"material-symbols-outlined"} onClick={handleLike}>favorite</span>
					<span>{numLikes?numLikes:0}</span>
				</div>
			</div>
		</div>
	);
}

export function Home({ loggedInUser }) {
	const [data, setData] = useState([]);
	const [allLikes, setAllLikes] = useState([])

	async function getData() {
		const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
			headers: {
				"authorization": `Bearer ${loggedInUser.accessToken}`,
			},
		});
		setData(res.data.reverse());
	}

	async function getLikes () {
	try{
		axios.get(`${import.meta.env.VITE_API_HOST}/likes`).then(resp => {
			setAllLikes(resp.data)
		})

	}catch(error){
		console.log('erro: ' + error)
	}
	}

	useEffect(() => {
		getData();
		getLikes();
	}, []);

	// const minimizeHandler = () => {
	// 	const card = document.querySelector('.card')
	// 	card.classList.contains('minimize')? card.classList.remove('minimize'): card.classList.add('minimize')
	// }

	// const allPosts = () => {
	// 	getData()
	// }
	// const myPosts = () => {
	// 	let myUser = localStorage.getItem('user')
	// 	myUser = myUser? JSON.parse(myUser): null
	// 	const postsFiltrados = data.filter(post => post.user.id === myUser.id)
	// 	setData(postsFiltrados)
	// }
	return (
		<>
			<div className="homepage">
				<div className="logo-box">
					<div className="logo">
						<img src={logo} />
					</div>
					<TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
				</div>
				<div>
					{
						data.map((tweet) => (
							<Tweet
								key={tweet.id}
								name={tweet.user.name}
								username={tweet.user.username}
								loggedInUser = {loggedInUser}	
								id = {tweet.id}
								allLikes = {allLikes}
								getLikes = {getLikes}
>								
								{tweet.text}
							</Tweet>
						))}
				</div>

			{/* <div className="m-2 flex flex-col w-[50%]">
					<div className="card w-40 flex flex-col relative justify-center items-center shadow-lg p-4 self-center border-0 rounded-md">
						<span className="self-start cursor-pointer absolute top-0 left-2" onClick={minimizeHandler}>___</span>
						<a className="flex flex-col items-center" href='https://www.github.com/luccasandrade' target='_blank'>
							<span className="text-sm opacity-60">created by</span>
							<span className="text-sm opacity-80">Luccas Andrade</span>
							<img className="rounded-full mb-2 border-purple-700 w-32" src='https://www.github.com/luccasandrade.png'></img>
							<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
							<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
							</svg>
							<span>Github</span>
						</a>
					</div>
			</div> */}
			<Menu></Menu>
			</div>
		</>
	);
}
