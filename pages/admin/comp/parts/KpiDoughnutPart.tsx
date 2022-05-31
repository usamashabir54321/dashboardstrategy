import { Chart as ChartJS, ArcElement, Tooltip , Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
import {useState,useEffect} from 'react'
import axios from 'axios'
import DonutPieInsertForm from './childParts/DonutPieInsertForm.tsx';
import DonutPieUpdateForm from './childParts/DonutPieUpdateForm.tsx';

export default function Comp ({nameId}) {
	const [dataSetArr,setDataSetArr] = useState([]);
	const [isUpdate,setIsUpdate] = useState(false);
	const [reqPending,setReqPending] = useState(false);
	const [isValError,setIsValError]= useState(false);
	const [maxThan100,setMaxThan100]= useState('');
	useEffect(() => {
		getStakeHolders();
	},[]);
	const getStakeHolders = () => {
		axios.get('api/getById/get_donut_kpi/'+nameId).then(res => {
			if (res.data.labels) {
				var chartTotalArr = [];
			  	var chartObj = {labels: [],data: [],backgroundColor: [],borderColor: ['white'],borderWidth: 2,id: null};
			  	chartObj.labels = res.data.labels.split("|");
			  	chartObj.data = res.data.percent_val.split("|");
			  	chartObj.backgroundColor = res.data.colors.split("|");
			  	chartObj.id = res.data.id;
			  	chartTotalArr.push(chartObj);
				setDataSetArr(chartTotalArr);
				setIsUpdate(false);
			}
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
	const handleSubmit = (e) => {
		e.preventDefault();
		var form = e.target;
		var data = new FormData(form);
		const labelValues = form.querySelectorAll("input[name='l_p_inpt[]']");
		var totalVal = 0;
		for (var a=0; a<labelValues.length; a++) {
			var thisVal = labelValues[a].value;
			totalVal = totalVal + parseInt(thisVal);
		}
		if (totalVal > 100) {
			setMaxThan100(totalVal-100+'%');
			setIsValError(true);setTimeout(() => { setIsValError(false) },2000);
			return false;
		}
		else if (totalVal < 100) {
			var emptyVal = 100-totalVal;
			data.append( 'l_t_inpt[]', '' );
			data.append( 'l_p_inpt[]', emptyVal );
			data.append( 'l_b_inpt[]', 'black' );
		}
		data.append( 'name_id', nameId );
		setReqPending(true);
		axios.post('api/only_post/save_donut_kpi',data).then(res => {
			getStakeHolders();setReqPending(false);
		});
	};
	return (
		<>
			{reqPending ? <span className="react-loading-skeleton green" style={{position: 'fixed', top: '0px', left: '0px', height: '3px'}}></span> : ''}
			{isValError ? <div className="toast toast-error"><div className="toast-title">Error</div><div className="toast-message">Your percentage value is <b>{maxThan100}</b> than <b>100</b>.</div></div> : ''}
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">Donut Pie Chart</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA IMAGE MAPPING*/}
				{
					dataSetArr.length > 0 ?
					<div style={{ width: '60%' , margin: '0px auto' }}>
						<Doughnut data={data} options={options} />
					</div> : ''
				}
				<br/><br/>
				{
					dataSetArr.length > 0 ?
					<div className="input_m_div text_right m_t_20">
						{
							isUpdate ?
							<button className="btn_submit cursor_pointer" type="submit" onClick={() => setIsUpdate(false)}>Hide Edit Project</button>
							: <button className="btn_submit cursor_pointer" type="submit" onClick={() => setIsUpdate(true)}>Edit Project</button>
						}
					</div>
					: <DonutPieInsertForm handleSubmit={handleSubmit} />
				}
				{isUpdate ? <DonutPieUpdateForm handleSubmit={handleSubmit} data={dataSetArr[0]} /> : ''}
			</div>
		</>
	)
}