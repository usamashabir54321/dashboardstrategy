import { Chart as ChartJS, ArcElement, Tooltip , Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
import {useState,useEffect} from 'react'
import axios from 'axios'

export default function SubPart ({nameId}) {
	const [dataSetArr,setDataSetArr] = useState([]);
	useEffect(() => {
		getStakeHolders();
	},[]);
	const getStakeHolders = () => {
		axios.get('api/getById/get_stake_holder/'+nameId).then(res => {
			var chartTotalArr = [];
			for (let loop = 0; loop < res.data.length; loop++) {
			  	var chartObj = {labels: [],data: [],backgroundColor: [],borderColor: ['white'],borderWidth: 2,id: null};
			  	chartObj.labels = res.data[loop].labels.split("|");
			  	chartObj.data = res.data[loop].percent_val.split("|");
			  	chartObj.backgroundColor = res.data[loop].colors.split("|");
			  	chartObj.id = res.data[loop].id;
			  	chartTotalArr.push(chartObj);
			}
			setDataSetArr(chartTotalArr);
		});
	};
	const data = { datasets: dataSetArr, };
	const options = {
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
	const plugins = [{
		beforeDraw: function(chart) {
			var width = chart.width,
			height = chart.height,
			ctx = chart.ctx;
			ctx.restore();
			var fontSize = (height / 200).toFixed(2);
			ctx.font = fontSize + "em sans-serif";
			ctx.textBaseline = "top";
			var text = "ECO",
			textX = Math.round((width - ctx.measureText(text).width) / 2),
			textY = height / 2;
			ctx.fillText(text, textX, textY);
			ctx.fillStyle = "white";
			ctx.save();
		}
	}];
	return (
		<>
			{
				dataSetArr.length > 0 ?
				<div style={{ width: '80%',margin: '0px auto' }}>
					<Doughnut data={data} options={options} plugins={plugins}/>
				</div> : ''
			}
		</>
	)
};