import { Chart as ChartJS, ArcElement, Tooltip , Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
import {useState,useEffect} from 'react'
import axios from 'axios'
import DonutPieInsertForm from './childParts/DonutPieInsertForm.tsx';
import DonutPieUpdateForm from './childParts/DonutPieUpdateForm.tsx';
import PageTabNote from './PageTabNote.tsx'

export default function Comp ({nameId}) {
	const [dataSetArr,setDataSetArr] = useState([]);
	const [isUpdate,setIsUpdate] = useState(false);
	const [radiusNum,setRadiusNum] = useState('');
	const [reqPending,setReqPending] = useState(false);
	const [isValError,setIsValError]= useState(false);
	const [maxThan100,setMaxThan100]= useState('');
	useEffect(() => {
		getStakeHolders();
	},[]);
	const getStakeHolders = () => {
		axios.get('api/getById/get_donut_kpi/'+nameId).then(res => {
			if (res.data.percent_val) {
				var chartTotalArr = [];
			  	var chartObj = {labels: [],data: [],backgroundColor: [],cutout: "80%",borderColor: ['white'],borderWidth: 2,id: null};
			  	var percentValArr = res.data.percent_val.split("|");
				setRadiusNum(percentValArr[0]);
			  	chartObj.labels = res.data.labels.split("|");
			  	chartObj.data = percentValArr;
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
		data.append( 'l_t_inpt[]', '' );
		setReqPending(true);
		axios.post('api/only_post/save_donut_kpi',data).then(res => {
			setRadiusNum('');getStakeHolders();setReqPending(false);
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
					<div style={{ width: '50%' , margin: '0px auto' }}>
						<Doughnut data={data} options={options} />
						<div className="donut-inner" style={{ marginTop: '-51%',marginBottom: '50%',textAlign: 'center' }}><h1 style={{ fontWeight: '900',letterSpacing: '2px',fontSize: '39px' }}>{radiusNum} %</h1></div>
					</div> : ''
				}
				<br/><div className="input_m_div text_center m_t_10"><PageTabNote nameId={nameId} tab="name_note" /></div>
				{
					dataSetArr.length > 0 ?
					<div className="input_m_div text_right m_t_20">
						{
							isUpdate ?
							<button className="btn_submit cursor_pointer" type="submit" onClick={() => setIsUpdate(false)}>Hide Edit Project</button>
							: <button className="btn_submit cursor_pointer" type="submit" onClick={() => setIsUpdate(true)}>Edit Project</button>
						}
					</div>
					:
					<div className="future_form" id="insert_f_grid">
						<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post">
					        <div className="d_grid insert_grid_line" style={{ gridTemplateColumns: '10% 30% 30% 10%' , gridGap: '4%' }}>
				         		<div className="grid_item"></div>
				         		<div className="grid_item">
				         			<div className="input_m_div"><input type="number" name="l_p_inpt[]" required placeholder="Percentage" /></div>
				         		</div>
				         		<div className="grid_item">
				         			<div className="input_m_div">
				         				<select name="l_b_inpt[]" required>
				         					<option value="">Choose Background Color</option>
					         				<option value="#565049">Dark</option>
					         				<option value="#274e94">Navy Blue</option>
					         				<option value="#bf9000">Dark Yellow</option>
				         				</select>
				         			</div>
				         		</div>
				         		<div className="grid_item">
				         			<div className="input_m_div text_center">
				         				<button className="btn_submit cursor_pointer" type="submit">Save</button>
				         			</div>
				         		</div>
				         		<div className="grid_item"></div>
				         	</div>
						</form>
					</div>
				}
				{
					isUpdate ?
					<div className="future_form" id="update_f_grid">
						<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post">
					        <div className="d_grid update_grid_line" style={{ gridTemplateColumns: '10% 30% 30% 10%' , gridGap: '4%' }}>
				         		<div className="grid_item"></div>
				         		<div className="grid_item">
				         			<div className="input_m_div"><input type="number" defaultValue={dataSetArr[0].data[0]} name="l_p_inpt[]" required placeholder="Percentage" /></div>
				         		</div>
				         		<div className="grid_item">
				         			<div className="input_m_div">
				         				<select name="l_b_inpt[]" required defaultValue={dataSetArr[0].backgroundColor[0]}>
				         					<option value="">Choose Background Color</option>
					         				<option value="#565049">Dark</option>
					         				<option value="#274e94">Navy Blue</option>
					         				<option value="#bf9000">Dark Yellow</option>
				         				</select>
				         			</div>
				         		</div>
				         		<div className="grid_item">
				         			<div className="input_m_div text_center">
				         				<button className="btn_submit cursor_pointer" type="submit">Update</button>
				         			</div>
				         		</div>
				         		<div className="grid_item"></div>
				         	</div>
						</form>
					</div>
					: ''
				}
			</div>
		</>
	)
}