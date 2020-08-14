import React, { useState, useEffect } from 'react';
import { fetchPastData } from '../../Api/Api';
import { Line } from 'react-chartjs-2';
import Spinner from '../../Spinner/Spinner';

import styles from './Chart.module.css';

const Chart = (props) => {
	const [pastData, setPastData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			const pastDataVar = await fetchPastData(props.data);
			setPastData(pastDataVar);
		};
		fetchAPI();
	}, []);

	const lineChart = pastData.length ? (
		<div className={styles.graph}>
			<Line
				data={{
					labels: pastData.map((d) => d.timeStampDate + ' ' + d.timeStampMonth),
					datasets: [
						{
							data: pastData.map((d) => d.temp),
							label: 'Temperature °C',
							borderColor: '#aeea00',
							fill: true,
						},
						{
							data: pastData.map((d) => d.humidity),
							label: 'Humidity %',
							borderColor: '#ff9800',
							fill: true,
						},
						{
							data: pastData.map((d) => d.clouds),
							label: 'Clouds %',
							borderColor: '#f4511e',
							backgroundColor: '#ffab91',
							fill: true,
						},
					],
				}}
			/>
		</div>
	) : (
		<div>
			<Spinner />
		</div>
	);

	return <div>{lineChart}</div>;
};

export default Chart;
