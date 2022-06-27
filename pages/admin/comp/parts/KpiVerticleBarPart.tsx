import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
import {useState,useEffect} from 'react'
import axios from 'axios'
import BarCharInsertForm from './childParts/BarCharInsertForm.tsx';
import BarChartUpdateForm from './childParts/BarChartUpdateForm.tsx';
import PageTabNote from './PageTabNote.tsx'
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import Swal from 'sweetalert2'

export default function Part ({nameId}) {
	const [dataLablesArr,setDataLablesArr] = useState([]);
	const [dataSetArr,setDataSetArr] = useState([]);
	const [isUpdate,setIsUpdate] = useState(false);
	useEffect(() => {
		getStakeHolders('get');
	},[]);
	const getStakeHolders = (status) => {
		axios.get('api/getById/get_donut_kpi/'+nameId).then(res => {
			if (res.data.labels) {
				var label_arr = res.data.labels.split('|');
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
							size: 18,
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
	  						size: 18,
	  					},
	  					anchor: 'end',
	  					align: 'top',
	  		  		}
			  	};
			  	achievedObj.data = res.data.percent_val.split("|");
			  	projectObj.data = res.data.project_vals.split("|");
			  	chartTotalArr.push(achievedObj);
			  	chartTotalArr.push(projectObj);
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
					padding: 20,
					font: {
						size: 17,
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
		Swal.showLoading();
		axios.post('api/only_post/save_kpi_bars',data).then(res => {
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
			pdf.text(100, 15, "Verticle Bar Chart", 'center');
			pdf.addImage(canImg, 'PNG', 0, 25, pdfWidth, imgHeight);
			pdf.save(`${new Date().toISOString()}.pdf`);
			Swal.close();
		});
	};
	return (
		<>
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">Verticle Bar Chart</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button onClick={printPDF} className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA IMAGE MAPPING*/}
				<br/>
				{
					dataLablesArr.length > 0 ?
					<div style={{ width: '80%' , margin: '0px auto', backgroundColor: '#464747', padding: '20px' }} id="printPDF">
						<Bar options={options} data={data} />
					</div> : ''
				}
				<br/><div className="input_m_div text_center m_t_10"><PageTabNote nameId={nameId} tab="name_note" /></div>
				{
					dataLablesArr.length > 0 ?
					<div className="input_m_div text_right m_t_20">
						{
							isUpdate ?
							<button className="btn_submit cursor_pointer" type="submit" onClick={() => setIsUpdate(false)}>Hide Edit Project</button>
							: <button className="btn_submit cursor_pointer" type="submit" onClick={() => setIsUpdate(true)}>Edit Project</button>
						}
					</div>
					: <BarCharInsertForm handleSubmit={handleSubmit} />
				}
				{isUpdate ? <BarChartUpdateForm handleSubmit={handleSubmit} data={dataSetArr} labels={dataLablesArr} /> : ''}
			</div>
		</>
	)
};