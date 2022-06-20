import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, ChartDataLabels);
import {useState,useEffect} from 'react'

export default function Comp ({chartData}) {
	const [dataSetArr,setDataSetArr] = useState([]);
	useEffect(() => {
		var chartTotalArr = [];
	  	var chartObj = {labels: [],data: [],backgroundColor: []};
	  	chartObj.labels = chartData.labels.split("|");
	  	chartObj.data = chartData.percent_val.split("|");
	  	chartObj.backgroundColor = chartData.colors.split("|");
	  	chartObj.id = chartData.id;
	  	chartTotalArr.push(chartObj);
		setDataSetArr(chartTotalArr);
	},[]);
	const data = { datasets: dataSetArr, };
	const options = {
		plugins: {
			datalabels: {
				display: true,
				formatter: (val, ctx) => {
					return ctx.chart.data.datasets[ctx.datasetIndex].labels[ctx.dataIndex]+'-'+val+'%';;
				},
				color: '#fff',
			},
			tooltip: {
				enabled: false
			},
		},
		elements: {
			arc: {
				borderWidth: 10,
				borderColor: '#474747',
				hoverBorderColor: '#474747',
			}
		},
		responsive: true,
		maintainAspectRatio: false,
		animation: {
			animateScale: true,
			animateRotate: true
		}
	};
	return (		
		<Pie data={data} options={options} />
	)
}