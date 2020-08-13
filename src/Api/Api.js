import axios from 'axios';

export const fetchCurrentData = async (city) => {
	let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0fe4b62e55a918e3336944107d452963`;

	try {
		const { data } = await axios.get(url);
		const currentData = {
			temp: data.list[0].main.temp,
			humidity: data.list[0].main.humidity,
			clouds: data.list[0].clouds.all,
			city: data.city.name,
			date: data.list[0].dt_txt,
		};
		return currentData;
	} catch (err) {
		console.log(err);
	}
};

export const fetchComingData = async (city) => {
	const comingFiveDayData = [];
	console.log(city);

	let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0fe4b62e55a918e3336944107d452963`;

	try {
		const {
			data: { list },
		} = await axios.get(url);

		for (let i = 0; i < list.length; i += 8) {
			const singleData = {
				temp: (list[i].main.temp - 273.15).toFixed(2),
				humidity: list[i].main.humidity,
				clouds: list[i].clouds.all,
				date: list[i].dt_txt,
			};
			comingFiveDayData.push(singleData);
		}
		console.log(comingFiveDayData);
		return comingFiveDayData;
	} catch (err) {
		console.log(err);
	}
};

export const fetchPastData = async (city) => {
	const prevFiveDaysData = [];

	const cityToLatiLongi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		city
	)}.json?access_token=pk.eyJ1Ijoic2VycnlzYXVyYXYiLCJhIjoiY2tjMjFsZGUzMWd0ZjJ0bjRvbXIzZ2N5dCJ9.yZJRRdiAXZGtZOLYwASp7Q&limit=1`;

	try {
		const { data } = await axios.get(cityToLatiLongi);
		const lati = data.features[0].center[1];
		const longi = data.features[0].center[0];

		for (let i = 0; i < 5; i++) {
			const x = new Date(`Aug ${13 - i},2020`);

			const date = new Date(x);

			const timestamp = date.getTime() / 1000;

			const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lati}&lon=${longi}&dt=${timestamp}&appid=0fe4b62e55a918e3336944107d452963`;

			const dataWeather = await axios.get(url);
			const refractoredData = {
				timeStamp: dataWeather.data.current.dt,
				temp: (dataWeather.data.current.temp - 273.15).toFixed(2),
				humidity: dataWeather.data.current.humidity,
				clouds: dataWeather.data.current.clouds,
			};
			prevFiveDaysData.push(refractoredData);
		}
		return prevFiveDaysData;
	} catch (err) {
		console.log(err);
	}
};
