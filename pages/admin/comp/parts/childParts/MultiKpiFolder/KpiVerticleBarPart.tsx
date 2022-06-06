import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
import {useState,useEffect} from 'react'

export default function Part ({chartData}) {
	const [dataLablesArr,setDataLablesArr] = useState([]);
	const [dataSetArr,setDataSetArr] = useState([]);
	useEffect(() => {
		var label_arr = chartData.labels.split('|');
		setDataLablesArr(label_arr);
		var chartTotalArr = [];
	  	var achievedObj = {
	  		labels: 'Verticle Bar Chart',
	  		data: [],
	  		backgroundColor: 'white',
	  		datalabels: {
	  			display: true,
	  			formatter: (val, ctx) => {
	  				return val+'%';
	  			},
	  			color: 'black',
	  			font: {
					size: 14,
				},
	  		}
	  	};
	  	var projectObj = {
	  		labels: 'Verticle Bar Chart',
	  		data: [],
	  		backgroundColor: '#0c94cd',
	  		categoryPercentage: 0.5,
		  		datalabels: {
		  			display: true,
		  			formatter: (val, ctx) => {
		  				return val+'%';
		  			},
		  			color: 'white',
		  			font: {
						size: 14,
					},
					anchor: 'end',
					align: 'top',
		  		}
	  	};
	  	achievedObj.data = chartData.percent_val.split("|");
	  	projectObj.data = chartData.project_vals.split("|");
	  	chartTotalArr.push(achievedObj);
	  	chartTotalArr.push(projectObj);
		setDataSetArr(chartTotalArr);
	},[]);
	const options = {
		responsive: true,
		scales: {
			x: {
				grid: {
					color: 'white',
					borderColor: 'white',
				},
				ticks: {
					color: 'white',
					padding: 0,
					font: {
						size: 14,
					}
				},
				stacked: true,
			},
			y: {
				beginAtZero: true,
				grid: {
					color: 'white',
					borderColor: 'white',
				},
				ticks: {
					color: 'white',
					padding: 15,
					font: {
						size: 13,
					}
				}
			},
		},
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
			title: {
				display: false,
			},
		},
		maintainAspectRatio: true,
		animation: {
			animateScale: true,
			animateRotate: true
		}
	};
	const data = {labels: dataLablesArr , datasets: dataSetArr};
	return (
		<div style={{ width: '100%' , margin: '5% auto' }}>
			<Bar options={options} data={data} />
		</div>
	)
};