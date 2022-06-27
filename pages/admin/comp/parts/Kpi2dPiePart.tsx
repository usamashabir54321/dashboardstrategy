import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, ChartDataLabels);
import {useState,useEffect} from 'react'
import axios from 'axios'
import DonutPieInsertForm from './childParts/DonutPieInsertForm.tsx';
import DonutPieUpdateForm from './childParts/DonutPieUpdateForm.tsx';
import PageTabNote from './PageTabNote.tsx'
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import Swal from 'sweetalert2'

export default function Comp ({nameId}) {
	const [dataSetArr,setDataSetArr] = useState([]);
	const [isUpdate,setIsUpdate] = useState(false);
	const [isValError,setIsValError]= useState(false);
	const [maxThan100,setMaxThan100]= useState('');
	useEffect(() => {
		getStakeHolders('get');
	},[]);
	const getStakeHolders = (status) => {
		axios.get('api/getById/get_donut_kpi/'+nameId).then(res => {
			if (res.data.labels) {
				var chartTotalArr = [];
			  	var chartObj = {labels: [],data: [],backgroundColor: []};
			  	chartObj.labels = res.data.labels.split("|");
			  	chartObj.data = res.data.percent_val.split("|");
			  	chartObj.backgroundColor = res.data.colors.split("|");
			  	chartObj.id = res.data.id;
			  	chartTotalArr.push(chartObj);
				setDataSetArr(chartTotalArr);
				setIsUpdate(false);
				if (status == 'update') {
					setTimeout(() => {
						var pdfElement = document.getElementById("printPDF");
						html2canvas(pdfElement).then(canvas => {
							var canImg = canvas.toDataURL('image/png');
							var data = new FormData();
							data.append( 'name_id', nameId );
							data.append( 'canvas_url', canImg );
							data.append( 'type', 'kpis' );
							axios.post('api/only_post/make_canvas_image',data);
						});
					},2000);
				}
			}
		});
	};
	const data = { datasets: dataSetArr, };
	const options = {
		plugins: {
			datalabels: {
				display: true,
				formatter: (val, ctx) => {
					return ctx.chart.data.datasets[ctx.datasetIndex].labels[ctx.dataIndex]+' - '+val+'%';;
				},
				color: '#fff',
				font: {
					size: 14,
				}
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
		maintainAspectRatio: true,
		animation: {
			animateScale: true,
			animateRotate: true
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
			data.append( 'l_t_inpt[]', 'Empty' );
			data.append( 'l_p_inpt[]', emptyVal );
			data.append( 'l_b_inpt[]', 'black' );
		}
		data.append( 'name_id', nameId );
		Swal.showLoading();
		axios.post('api/only_post/save_donut_kpi',data).then(res => {
			getStakeHolders('update');Swal.close();
		});
	};
	const printPDF = () => {
		Swal.showLoading();
		var pdfElement = document.getElementById("printPDF");
		html2canvas(pdfElement).then(canvas => {
			var canImg = canvas.toDataURL('image/png');
			const pdf = new jsPdf({ orientation: 'portrait' });
			const imgProps= pdf.getImageProperties(canImg);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			var imgHeight = imgProps.height * pdfWidth / imgProps.width;
			pdf.text(100, 15, "2d Pie Chart", 'center');
			pdf.addImage(canImg, 'PNG', 0, 25, pdfWidth, imgHeight);
			pdf.save(`${new Date().toISOString()}.pdf`);
			Swal.close();
		});
	};
	return (
		<>
			{isValError ? <div className="toast toast-error"><div className="toast-title">Error</div><div className="toast-message">Your percentage value is <b>{maxThan100}</b> than <b>100</b>.</div></div> : ''}
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">2d Pie Chart</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button onClick={printPDF} className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA IMAGE MAPPING*/}
				{
					dataSetArr.length > 0 ?
					<div style={{ width: '70%' , margin: '0px auto' }} id="printPDF">
						<Pie data={data} options={options} />
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
					: <DonutPieInsertForm handleSubmit={handleSubmit} />
				}
				{isUpdate ? <DonutPieUpdateForm handleSubmit={handleSubmit} data={dataSetArr[0]} /> : ''}
			</div>
		</>
	)
}