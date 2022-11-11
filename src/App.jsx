import { Home } from "./Home";
import { Login } from "./Login";
import { useEffect, useState } from "react";
import { Signup } from "./Signup";

export function App() {
	const [user, setUser] = useState();
	
	useEffect(() => {
		const userStorage = localStorage.getItem('user')
		if (userStorage !== 'undefined'){
			setUser(JSON.parse(userStorage))
		}
	}, [])
	
	if (user) {
		localStorage.setItem('user', JSON.stringify(user))
		return <Home loggedInUser={user} />;
	}
	return window.location.pathname === "/signup" ? (
		<Signup signInUser={setUser} />
	) : (
		<Login signInUser={setUser} />
	);
	//return user ? <Home /> : <Login signInUser={setUser} />;
}
