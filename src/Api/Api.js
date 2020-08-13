import axios from 'axios';

export const fetchCurrentAndComingDateData = async (country) => {
	let url = `http://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=0fe4b62e55a918e3336944107d452963`;

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
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

// export const fetchDailyData = async () => {
//    try {
//       const { data } = await axios.get(`${url}/daily`);

//       const modifiedData = data.map((d) => ({
//          confirmed: d.confirmed.total,
//          deaths: d.deaths.total,
//          date: d.reportDate,
//       }));

//       return modifiedData;
//    } catch (err) {
//       console.log(err);
//    }
// };

// export const country = async () => {
//    try {
//       const {
//          data: { countries },
//       } = await axios.get(`${url}/countries`);
//       return countries.map((country) => country.name);
//    } catch (err) {
//       console.log(err);
//    }
// };
