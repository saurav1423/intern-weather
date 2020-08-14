import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form/Form';
import SignIn from './Auth/Signin';
import SignUp from './Auth/Signup';
import { BrowserRouter, Route, useHistory, withRouter } from 'react-router-dom';

function App() {
	const history = useHistory();

	const user = localStorage.getItem('user');

	useEffect(() => {
		if (user) {
			history.push('/weather');
		} else {
			history.push('/signin');
		}
	}, user);

	return (
		<div>
			<Route path="/weather" component={Form} />
			<Route path="/signup" component={SignUp} />
			<Route path="/signin" component={SignIn} />
		</div>
	);
}

export default App;
