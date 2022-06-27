import MultiMainComp from './parts/MultiMainComp.tsx'
import axios from 'axios'
import {useState,useEffect} from 'react'
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

export default function Comp ({nameId,props}) {
	const [multiArr,setMultiArr] = useState([]);
	useEffect(() => {
		getCompKpis();
	},[]);
	const getCompKpis = () => {
		axios.get('api/getById/get_multi_kpis/'+nameId).then(res => {
			setMultiArr(res.data);
		});
	};
	const saveCanvasNow = () => {
		setTimeout(() => {
			var pdfElement = document.getElementById("printPDF");
			html2canvas(pdfElement).then(canvas => {
				var canImg = canvas.toDataURL('image/png');
				var data = new FormData();
				data.append( 'name_id', nameId );
				data.append( 'canvas_url', canImg );
				data.append( 'type', 'multiple_dashboard' );
				axios.post('api/only_post/make_canvas_image',data);
			});
		},1500);
	};
	const printPDF = () => {
		props.Swal.showLoading();
		var pdfElement = document.getElementById("printPDF");
		html2canvas(pdfElement).then(canvas => {
			var canImg = canvas.toDataURL('image/png');
			const pdf = new jsPdf({ orientation: 'portrait' });
			const imgProps= pdf.getImageProperties(canImg);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			var imgHeight = imgProps.height * pdfWidth / imgProps.width;
			pdf.text(100, 15, "Multi-View Charts", 'center');
			if (multiArr.length < 5) pdf.addImage(canImg, 'PNG', 0, 25, pdfWidth, imgHeight); else pdf.addImage(canImg, 'PNG', 0, 25, pdfWidth, imgHeight-100);
			pdf.save(`${new Date().toISOString()}.pdf`);
			props.Swal.close();
		});
	};
	return (
		<div id="multi_dash_comp">
			<div className="m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">Multi-View Charts</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button onClick={printPDF} className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
			</div>
			<div className="d_grid" style={{ gridTemplateColumns: '48% 48%' , gridGap: '0 4%', padding: '0 10px' }} id="printPDF">
				{
					multiArr.map(function (obj,indx) {
						return (
							<MultiMainComp obj={obj} key={indx} saveCanvasNow={saveCanvasNow}/>
						)
					})
				}
			</div><br/><br/>
		</div>
	)
}