import {useState,useEffect} from 'react'
import axios from 'axios'
import ReactTooltip from 'react-tooltip';
import PageTabNote from './parts/PageTabNote.tsx'
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

export default function Comp ({nameId,tab,props}) {
	const [nameName,setNameName] = useState('');
	const [mySTId,setMySTId] = useState('');
	const [leftTopData,setLeftTopData] = useState([]);
	const [leftBottomData,setLeftBottomData] = useState([]);
	const [rightTopData,setRightTopData] = useState([]);
	const [rightBottomData,setRightBottomData] = useState([]);
	const [nowRectTool,setNowRectTool] = useState(false);
	useEffect(() => {
			const getingName = () => { axios.get('api/getById/get_name_byid/'+nameId).then(res => { setNameName(res.data.name); }); };
			getingName();
			getSwotTows('get');
	},[]);
	function getSwotTows (status) {
		setNowRectTool(false);
		axios.get('api/getById/get_swot_tows/'+nameId).then(res => {
			if(res.data.id) {
				setMySTId(res.data.id);
				setLeftTopData(res.data.l_t_data.split('|'));
				setLeftBottomData(res.data.l_b_data.split('|'));
				setRightTopData(res.data.r_t_data.split('|'));
				setRightBottomData(res.data.r_b_data.split('|'));
			}
			if (status == 'update') {
				setTimeout(() => {
					var pdfElement = document.getElementById("swottowsdiv");
					html2canvas(pdfElement).then(canvas => {
						var canImg = canvas.toDataURL('image/png');
						var data = new FormData();
						data.append( 'name_id', nameId );
						data.append( 'canvas_url', canImg );
						data.append( 'type', tab );
						axios.post('api/only_post/make_canvas_image',data);
					});
				},2000);
			}
			setNowRectTool(true);
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		var form = document.querySelector('#insert_form');
		var data = new FormData(form);
		data.append( 'name_id', nameId );
		props.Swal.showLoading();
		axios.post('api/only_post/save_swot_tows',data).then(res => {
			getSwotTows('update');props.Swal.close();
		});
	};
	const printPDF = () => {
		props.Swal.showLoading();
		var pdfElement = document.getElementById("swottowsdiv");
		html2canvas(pdfElement).then(canvas => {
			var canImg = canvas.toDataURL('image/png');
			const pdf = new jsPdf({ orientation: 'portrait' });
			const imgProps= pdf.getImageProperties(canImg);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			var imgHeight = imgProps.height * pdfWidth / imgProps.width;
			if (tab == 'swot') pdf.text(100, 15, 'SWOT', 'center'); else pdf.text(100, 15, 'TWOS', 'center');
			pdf.addImage(canImg, 'PNG', 0, 25, pdfWidth, imgHeight);
			pdf.save(`${new Date().toISOString()}.pdf`);
			props.Swal.close();
		});
	};
	return (
		<>
			{nowRectTool ? <ReactTooltip /> : ''}
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">{ tab == 'swot' ? 'SWOT' : 'TWOS' }</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button onClick={printPDF} className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA IMAGE MAPPING*/}
				{
					mySTId ?
					<div id="swottowsdiv" className="m_t_20">
						<div className="d_grid" style={{ gridTemplateColumns: '37% 21% 36%', gridGap: '2%' }}>
							<div className="grid_item left">
								<ul className="top">{ leftTopData.map(function(obj, idx){return <li key={obj.id}>{obj ? <p data-tip={obj}>{obj}</p> : <b >&nbsp;</b> }</li> }) }</ul>
								<ul className="bottom">{ leftBottomData.map(function(obj, idx){return <li key={obj.id}>{obj ? <p data-tip={obj}>{obj}</p> : <b>&nbsp;</b> }</li> }) }</ul>
							</div>
							<div className="grid_item" style={{ display: 'table' }}><h2 id="swottowscat">{nameName}</h2></div>
							<div className="grid_item right text_right">
								<ul className="top">{ rightTopData.map(function(obj, idx){return <li key={obj.id}>{obj ? <p data-tip={obj}>{obj}</p> : <b>&nbsp;</b> }</li> }) }</ul>
								<ul className="bottom">{ rightBottomData.map(function(obj, idx){return <li key={obj.id}>{obj ? <p data-tip={obj}>{obj}</p> : <b>&nbsp;</b> }</li> }) }</ul>
							</div>
						</div>
					</div> : ''
				}
				<br/><div className="input_m_div text_center m_t_10"><PageTabNote nameId={nameId} tab="name_note" /></div>
				{/*INSERTION OR UPDATION FORM*/}
				<div className="future_form">
					<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post" id="insert_form" className="m_t_30">
						{
							mySTId ?
							<>
					         	<div className="d_grid" style={{ gridTemplateColumns: '23% 23% 23% 23%' , gridGap: '3%' }}>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 1</b></label></div><br/>
					         			{ leftTopData.map(function(obj, idx){return <div className="input_m_div"><input type="text" maxLength="80" name="l_t_data[]" defaultValue={obj} placeholder="Text" /></div> }) }
					         		</div>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 2</b></label></div><br/>
					         			{ leftBottomData.map(function(obj, idx){return <div className="input_m_div"><input type="text" maxLength="80" name="l_b_data[]" defaultValue={obj} placeholder="Text" /></div> }) }
					         		</div>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 3</b></label></div><br/>
					         			{ rightTopData.map(function(obj, idx){return <div className="input_m_div"><input type="text" maxLength="80" name="r_t_data[]" defaultValue={obj} placeholder="Text" /></div> }) }
					         		</div>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 4</b></label></div><br/>
					         			{ rightBottomData.map(function(obj, idx){return <div className="input_m_div"><input type="text" maxLength="80" name="r_b_data[]" defaultValue={obj} placeholder="Text" /></div> }) }
					         		</div>
					         	</div>
								<div className="input_m_div text_right m_t_20">
									<button className="btn_submit cursor_pointer" type="submit">Update</button>
								</div>
							</>
							:
							<>
					         	<div className="d_grid" style={{ gridTemplateColumns: '23% 23% 23% 23%' , gridGap: '3%' }}>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 1</b></label></div><br/>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="l_t_data[]" required placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="l_t_data[]" placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="l_t_data[]" placeholder="Text" /></div>
					         		</div>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 2</b></label></div><br/>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="l_b_data[]" required placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="l_b_data[]" placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="l_b_data[]" placeholder="Text" /></div>
					         		</div>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 3</b></label></div><br/>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="r_t_data[]" required placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="r_t_data[]" placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="r_t_data[]" placeholder="Text" /></div>
					         		</div>
					         		<div className="grid_item">
					         			<div className="input_m_div"><label><b>Entry 4</b></label></div><br/>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="r_b_data[]" required placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="r_b_data[]" placeholder="Text" /></div>
					         			<div className="input_m_div"><input type="text" maxLength="80" name="r_b_data[]" placeholder="Text" /></div>
					         		</div>
					         	</div>
								<div className="input_m_div text_right m_t_20">
									<button className="btn_submit cursor_pointer" type="submit">Save</button>
								</div>
							</>
						}
					</form>
				</div>				
			</div>
		</>
	)
}