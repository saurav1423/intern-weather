import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Cards from '../Cards/Cards';

import { fetchCurrentAndComingDateData } from '../../Api/Api';

const Form = () => {
	const [inputValue, setInputValue] = useState('');
	const [data, setData] = useState({});

	const handleChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
	};

	const handleClick1 = async () => {
		const x = await fetchCurrentAndComingDateData(inputValue);
		console.log(x);
		setData(x);
	};

	return (
		<>
			<div className={styles.container}>
				<TextField
					className={styles.textField}
					id="standard-basic"
					label="Your City"
					onChange={handleChange}
				/>
				<Button
					className={styles.button1}
					variant="contained"
					color="primary"
					onClick={handleClick1}
				>
					Get Weather
				</Button>
				<Button className={styles.button2} variant="outlined" color="primary">
					Use my Location
				</Button>
			</div>
			{data.city ? <Cards data={data} /> : null}
		</>
	);
};

export default Form;
