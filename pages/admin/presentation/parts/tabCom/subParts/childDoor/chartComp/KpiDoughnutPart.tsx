import { Chart as ChartJS, ArcElement, Tooltip , Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
import {useState,useEffect} from 'react'

export default function Comp ({chartData}) {
	const [dataSetArr,setDataSetArr] = useState([]);
	const [radiusNum,setRadiusNum] = useState('');
	useEffect(() => {
		var chartTotalArr = [];
	  	var chartObj = {labels: [],data: [],backgroundColor: [],borderColor: ['white'],cutout: "80%",borderWidth: 2,id: null};
  	  	var percentValArr = chartData.percent_val.split("|");
  		setRadiusNum(percentValArr[0]);
  	  	chartObj.labels = chartData.labels.split("|");
  	  	chartObj.data = percentValArr;
  	  	chartObj.backgroundColor = chartData.colors.split("|");
  	  	chartObj.id = chartData.id;
	  	chartTotalArr.push(chartObj);
		setDataSetArr(chartTotalArr);
	},[]);
	const data = { datasets: dataSetArr, };
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				display: true,
				formatter: (val, ctx) => {
					return ctx.chart.data.datasets[ctx.datasetIndex].labels[ctx.dataIndex];
				},
				color: '#fff',
			},
		}
	};
	return (
		<>
			<Doughnut data={data} options={options} />
			<div className="donut-inner" style={{ marginTop: '-51%',marginBottom: '50%',textAlign: 'center' }}><h1 style={{ fontWeight: '900',letterSpacing: '2px',fontSize: '39px',color: 'white' }}>{radiusNum} %</h1></div>
		</>
	)
}