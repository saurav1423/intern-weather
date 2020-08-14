import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './signup.module.css';
import Spinner from '../Spinner/Spinner';

const SignUp = () => {
	const history = useHistory();
	const [password, setPasword] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSignup = async () => {
		try {
			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
				alert('You have entered an invalid email address!');
				history.push('/signup');
			}

			setLoading(true);
			const authData = {
				email: email,
				password: password,
				returnSecureToken: true,
			};

			await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIuIVE1lnTZrZRYCMv-3OJzEA2bXKweIk',
				authData
			);
			history.push('/signin');
		} catch (error) {
			alert('You are already our Family!!');
			setLoading(false);
		}
	};

	let form = (
		<Container component="main" maxWidth="xs" className={styles.container}>
			<CssBaseline />
			<div className={styles.paper}>
				<Typography component="h1" variant="h5" style={{ color: 'red' }}>
					Sign Up
				</Typography>
				<form className={styles.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						type="text"
						className={styles.inputField}
						autoComplete="email"
						autoFocus
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						className={styles.inputField}
						type="password"
						id="password"
						onChange={(e) => setPasword(e.target.value)}
					/>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={styles.submit}
						onClick={handleSignup}
					>
						Sign Up
					</Button>
					<Link to="/signin" className={styles.changeLink}>
						Have an account ?
					</Link>
				</form>
			</div>
		</Container>
	);

	if (loading) {
		form = <Spinner />;
	}

	return <div>{form}</div>;
};

export default SignUp;
