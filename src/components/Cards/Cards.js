import React from 'react';
import { Grid } from '@material-ui/core';
import CardComponent from './Card/Card';
import Spinner from '../../Spinner/Spinner';

import styles from './Cards.module.css';

const Info = (props) => {
	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify="center">
				<CardComponent
					className={styles.infected}
					cardTitle="Temperature °C"
					value={props.data.temp - 273.15}
					cardSubtitle="Last updated on: "
					lastUpdate={props.data.date}
				/>
				<CardComponent
					className={styles.recovered}
					cardTitle="Humidity %"
					value={props.data.humidity}
					cardSubtitle="Last updated on: "
					lastUpdate={props.data.date}
				/>
				<CardComponent
					className={styles.deaths}
					cardTitle="Clouds %"
					value={props.data.clouds}
					cardSubtitle="Last updated on: "
					lastUpdate={props.data.date}
				/>
			</Grid>
			<h1>cards</h1>
		</div>
	);
};
export default Info;
