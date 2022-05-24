import { Chart as ChartJS, ArcElement, Tooltip , Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
import {useState,useEffect} from 'react'
import axios from 'axios'
import $ from "jquery";
import UpdateStakeHolder from './parts/UpdateStakeHolder.tsx';

export default function Comp ({nameId}) {
	const [dataSetArr,setDataSetArr] = useState([]);
	const [isUpdComp,setIsUpdComp] = useState(false);
	useEffect(() => {
		getStakeHolders();
		$('form').on('click','.btn_remover',function () {
			var numItems = $('form .inputs_grid_line').length;
			if (numItems > 1) $(this).parents('.inputs_grid_line').remove();
		});
		$('form').on('click','.btn_adder',function () {
			$(this).parents('.d_grid').addClass('in_action');
			$(this).parents('.inputs_grid_line').clone().insertAfter("form .d_grid.in_action");
			$('.d_grid').removeClass('in_action');
		});
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
	const handleSubmit = (e) => {
		e.preventDefault();
		var form = document.querySelector('#insert_form');
		var data = new FormData(form);
		data.append( 'name_id', nameId );
		axios.post('api/only_post/save_stakeholder',data).then(res => {
			document.getElementById("insert_form").reset();
			const elements = document.querySelectorAll('#insert_form .inputs_grid_line');
			Array.from(elements).forEach((element, index) => {
			  if (index > 0) element.remove();
			});
			getStakeHolders();
		});
	};
	return (
		<>
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">Stakeholder's Framework</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA IMAGE MAPPING*/}
				{
					dataSetArr.length > 0 ?
					<div style={{ width: `${dataSetArr.length > 2 ? '80%' : dataSetArr.length > 5 ? '100%' : '60%' }`,margin: '0px auto' }}>
						<Doughnut data={data} options={options} plugins={plugins}/>
					</div> : ''
				}
				<br/><br/>
				{/*UPDATION FORM*/}
				{
					dataSetArr.length > 0 ?
					<div className="input_m_div text_right m_t_20">
						{
							isUpdComp ?
							<button className="btn_submit cursor_pointer" onClick={() => setIsUpdComp(false)} type="button">Hide Edit Page</button> :
							<button className="btn_submit cursor_pointer" onClick={() => setIsUpdComp(true)} type="button">Edit Project</button>
						}
					</div> : ''
				}
				{
					isUpdComp ?
					<UpdateStakeHolder dataSetArr={dataSetArr} getStakeHolders={getStakeHolders} />
					:
					<div className="future_form">
						{/*INSERTION FORM*/}
						<h2>Enter Lavel</h2>
						<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post" id="insert_form" className="m_t_30">
	     		        	<div className="d_grid inputs_grid_line" style={{ gridTemplateColumns: '24% 24% 24% 22%' , gridGap: '4%' }}>
				         		<div className="grid_item">
				         			<div className="input_m_div"><input type="text" maxLength="35" name="l_t_inpt[]" required placeholder="Text" /></div>
				         		</div>
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
				         				<button className="btn_submit cursor_pointer btn_remover" type="button">-</button> &nbsp;&nbsp;
				         				<button className="btn_submit cursor_pointer btn_adder" type="button">+</button>
				         			</div>
				         		</div>
				         	</div>
							<div className="input_m_div text_right m_t_20">
								<button className="btn_submit cursor_pointer" type="submit">Save</button>
							</div>
						</form>
					</div>
				}
			</div>
		</>
	)
}