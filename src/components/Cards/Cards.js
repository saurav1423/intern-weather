import React from 'react';
import { Grid } from '@material-ui/core';
import CardComponent from './Card/Card';

import styles from './Cards.module.css';

const Info = (props) => {
	return (
		<>
			<h1>
				<span role="img">💙</span> {props.data.city} <span role="img">💙</span>
			</h1>
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
			</div>
		</>
	);
};
export default Info;
