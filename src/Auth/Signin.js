import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from './Signin.module.css';

const SignIn = () => {
	const history = useHistory();
	const [password, setPasword] = useState('');
	const [email, setEmail] = useState('');

	const handleSignIn = async () => {
		try {
			const authData = {
				email: email,
				password: password,
				returnSecureToken: true,
			};

			const x = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDIuIVE1lnTZrZRYCMv-3OJzEA2bXKweIk',
				authData
			);
			localStorage.setItem('user', x.data.idToken);
			history.push('/weather');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Container component="main" maxWidth="xs" className={styles.container}>
			<CssBaseline />
			<div className={styles.paper}>
				<Typography component="h1" variant="h5" style={{ color: 'red' }}>
					Sign In
				</Typography>
				<form className={styles.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						type="text"
						label="Email Address"
						name="email"
						autoComplete="email"
						className={styles.inputField}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						className={styles.inputField}
						id="password"
						onChange={(e) => setPasword(e.target.value)}
					/>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={styles.submit}
						onClick={handleSignIn}
					>
						Sign In
					</Button>
					<Link to="/signup" variant="body2" className={styles.changeLink}>
						Dont have an account ?
					</Link>
				</form>
			</div>
		</Container>
	);
};

export default SignIn;
