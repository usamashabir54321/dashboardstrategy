import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
import {useState,useEffect} from 'react'
import axios from 'axios'
import BarCharInsertForm from './childParts/BarCharInsertForm.tsx';
import BarChartUpdateForm from './childParts/BarChartUpdateForm.tsx';

export default function Part ({nameId}) {
	const [dataLablesArr,setDataLablesArr] = useState([]);
	const [dataSetArr,setDataSetArr] = useState([]);
	const [isUpdate,setIsUpdate] = useState(false);
	useEffect(() => {
		getStakeHolders();
	},[]);
	const getStakeHolders = () => {
		axios.get('api/getById/get_donut_kpi/'+nameId).then(res => {
			if (res.data.labels) {
				var label_arr = res.data.labels.split('|');
				setDataLablesArr(label_arr);
				var chartTotalArr = [];
			  	var chartObj = {labels: 'Horizontal Bar Chart',data: [],backgroundColor: 'white',id: null};
			  	chartObj.data = res.data.percent_val.split("|");
			  	chartObj.id = res.data.id;
			  	chartTotalArr.push(chartObj);
				setDataSetArr(chartTotalArr);
				setIsUpdate(false);
			}
		});
	};
	const options = {
		responsive: true,
		indexAxis: 'y' as const,
		elements: {
			bar: {
				borderWidth: 2,
			},
		},
		scales: {
			x: {
				grid: {
					color: 'white',
					borderColor: 'white',
				},
				ticks: {
					color: 'white',
					padding: 20,
					font: {
						size: 17,
					}
				}
			},
			y: {
				beginAtZero: true,
				grid: {
					color: 'white',
					borderColor: 'white',
				},
				ticks: {
					color: 'white',
					padding: 20,
					font: {
						size: 14,
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
			datalabels: {
				display: true,
				formatter: (val, ctx) => {
					return val+'%';
				},
				color: 'black',
				font: {
					size: 18,
				}
			},
		},
		maintainAspectRatio: true,
		animation: {
			animateScale: true,
			animateRotate: true
		}
	};
	const data = {labels: dataLablesArr , datasets: dataSetArr};
	const handleSubmit = (e) => {
		e.preventDefault();
		var data = new FormData(e.target);
		data.append( 'name_id', nameId );
		axios.post('api/only_post/save_kpi_bars',data).then(res => {
			getStakeHolders();
		});
	};
	return (
		<>
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">Horizontal Bar Chart</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA IMAGE MAPPING*/}
				{
					dataLablesArr.length > 0 ?
					<div style={{ width: '80%' , margin: '0px auto' }}>
						<Bar options={options} data={data} />
					</div> : ''
				}
				<br/><br/>
				{
					dataLablesArr.length > 0 ?
					<div className="input_m_div text_right m_t_20">
						<button className="btn_submit cursor_pointer" type="submit" onClick={() => setIsUpdate(true)}>Edit Project</button>
					</div>
					: <BarCharInsertForm handleSubmit={handleSubmit} />
				}
				{isUpdate ? <BarChartUpdateForm handleSubmit={handleSubmit} data={dataSetArr[0]} labels={dataLablesArr} /> : ''}
			</div>
		</>
	)
};