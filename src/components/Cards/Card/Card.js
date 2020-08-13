import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Card.module.css';

const CardComponent = (props) => (
	<Grid
		item
		xs={12}
		md={3}
		component={Card}
		className={cx(styles.card, props.className)}
	>
		<CardContent>
			<Typography color="textSecondary" gutterBottom>
				{props.cardTitle}
			</Typography>
			<Typography variant="h5" component="h2">
				<CountUp start={0} end={props.value} duration={2.75} separator="," />
			</Typography>
			<Typography variant="body2" component="p">
				{props.cardSubtitle}
			</Typography>
			<Typography color="textSecondary">{props.lastUpdate}</Typography>
		</CardContent>
	</Grid>
);

export default CardComponent;
