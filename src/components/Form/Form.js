import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Cards from '../Cards/Cards';
import Chart from '../Chart/Chart';
import Table from '../Table/Table';

import { fetchCurrentData } from '../../Api/Api';

const Form = () => {
	const [inputValue, setInputValue] = useState('');
	const [sendInputData, setSendInputData] = useState('');
	const [loadChart, setLoadChart] = useState(false);
	const [data, setData] = useState({});

	const handleChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		setSendInputData(value);
		setLoadChart(false);
	};

	const handleClick1 = async () => {
		const x = await fetchCurrentData(inputValue);

		setData(x);
		setLoadChart(true);
	};

	const handleClick2 = () => {
		const getLatiLongi = () => {
			navigator.geolocation.getCurrentPosition(
				async function (position) {
					const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1Ijoic2VycnlzYXVyYXYxMiIsImEiOiJja2RzMzF2bjYxanc0MndtcWh0dXozbm1zIn0.Z1xghK1OjOpx2bWaCzdOyg&limit=1`;
					const { data } = await axios.get(url);
					const cityName = data.features[0].context[2].text;
					const y = await fetchCurrentData(cityName);
					setData(y);
					setSendInputData(cityName);
					setLoadChart(true);
				},
				function (error) {
					console.log('The Locator was denied. :(');
				}
			);
		};
		getLatiLongi();
	};

	function isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	}

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
				<Button
					className={styles.button2}
					variant="outlined"
					color="primary"
					onClick={handleClick2}
				>
					Use my Location
				</Button>
			</div>
			{!isEmpty(data) ? (
				<>
					{data.city ? <Cards data={data} /> : null}
					{loadChart ? <Table data={sendInputData} /> : null}
					{loadChart ? <Chart data={sendInputData} /> : null}
				</>
			) : (
				<p className={styles.error}>Please type City Name/Correct City Name</p>
			)}
		</>
	);
};

export default Form;
