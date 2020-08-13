import React, { useState, useEffect } from 'react';
import { fetchComingData } from '../../Api/Api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from './Table.module.css';

const TableComp = (props) => {
	const [comingData, setComingData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			const comingDataVar = await fetchComingData(props.data);
			setComingData(comingDataVar);
		};
		fetchAPI();
	}, []);

	const table = comingData.length ? (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Coming Dates</TableCell>
						<TableCell align="right">Temperature(°C)</TableCell>
						<TableCell align="right">Humidity(%)</TableCell>
						<TableCell align="right">Clouds(%)</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{comingData.map((data) => (
						<TableRow key={data.date}>
							<TableCell component="th" scope="row">
								{data.date}
							</TableCell>
							<TableCell align="right">{data.temp}</TableCell>
							<TableCell align="right">{data.humidity}</TableCell>
							<TableCell align="right">{data.clouds}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : null;

	return <div className={styles.container}>{table}</div>;
};

export default TableComp;
