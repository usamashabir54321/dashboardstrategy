import {useState,useEffect} from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import KpiDoughnutPart from './parts/KpiDoughnutPart.tsx'
import Kpi2dPiePart from './parts/Kpi2dPiePart.tsx'
import KpiVerticleBarPart from './parts/KpiVerticleBarPart.tsx'
import KpiHorizontalBarPart from './parts/KpiHorizontalBarPart.tsx'
Modal.setAppElement('body');
const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: '#323232',
		boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		borderRadius: '20px',
		border: 'none',
		width: '40%'
	}, overlay: {
			backgroundColor: 'rgba(71, 71, 71, 0.6)'
	},
};

export default function Comp ({nameId,props}) {
	const [nameKpis,setNameKpis] = useState({});
	const [mainChart,setMainChart] = useState('');
	const [deepChart,setDeepChart] = useState('');
	const [modalIsOpen, setIsOpen] = useState(true);
	useEffect(() => {
		gettingNameData();
	},[]);
	const gettingNameData = () => {
		axios.get('api/getById/get_kpi_name_data/'+nameId).then(res => {
			if (res.data.deep_chart) setNameKpis(res.data); else setNameKpis({ noData : '1', });
		});
	};
	const selectDeepChart = (chartName) => {
		setDeepChart(chartName);
		var data = new FormData();
		data.append( 'name_id', nameId );
		data.append( 'main_chart', mainChart );
		data.append( 'deep_chart', chartName );
		props.Swal.showLoading();
		axios.post('api/only_post/save_kpi_name_chart',data).then(res => { gettingNameData();props.Swal.close(); });
	};
	function openModal() { setIsOpen(true); }
	function closeModal() { setIsOpen(false); }
	return (
		<>
			<div className="card m_t_25">
				{
					nameKpis.deep_chart == 'donut_pie_chart' ? <KpiDoughnutPart nameId={nameId} /> :
					nameKpis.deep_chart == '2d_pie_chart' ? <Kpi2dPiePart nameId={nameId} /> :
					nameKpis.deep_chart == 'verticle_bar_chart' ? <KpiVerticleBarPart nameId={nameId} /> :
					nameKpis.deep_chart == 'horizontal_bar_chart' ? <KpiHorizontalBarPart nameId={nameId} /> : ''
				}
				{
					nameKpis.noData ?
					<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} contentLabel="Select Kpi Modal" id="kpi_model_id">
						<button className="close_modal" onClick={closeModal}>x</button><br/><br/>
						<div className="select_kpi_model text_center"><br/>
							{!mainChart ? <h2>What kind of KPI's do you want?</h2> : <h2>Select One Option.</h2>}<br/><br/>
							<div className="d_grid" style={{ gridTemplateColumns: '20% 30% 30% 20%', gridGap: '0%' }}>
								<div className="grid_item"></div>
								{
									!mainChart ?
									<>
										<div className="grid_item">
											<div className="input_m_div">
												<button className="kpi_modl_btn" onClick={()=>setMainChart('bar_chart')}><img src="/assets/img/bar_hor_chart.png" alt="icon"/></button><br/><br/>
												<h4>Bar Chart</h4>
											</div>
										</div>
										<div className="grid_item">
											<div className="input_m_div">
												<button className="kpi_modl_btn" onClick={()=>setMainChart('pie_chart')}><img src="/assets/img/donut_pie_chart.png" alt="icon"/></button><br/><br/>
												<h4>Pie Chart</h4>
											</div>
										</div>
									</>
									:
									<>
										{
											mainChart == 'bar_chart' ?
											<>
												<div className="grid_item">
													<div className="input_m_div">
														<button className="kpi_modl_btn" onClick={()=>selectDeepChart('verticle_bar_chart')}><img src="/assets/img/bar_hor_chart.png" alt="icon"/></button><br/><br/>
														<h4>Verticle Bar Chart</h4>
													</div>
												</div>
												<div className="grid_item">
													<div className="input_m_div">
														<button className="kpi_modl_btn" onClick={()=>selectDeepChart('horizontal_bar_chart')}><img src="/assets/img/verticle_bar_chart.png" alt="icon"/></button><br/><br/>
														<h4>Horizental Bar Chart</h4>
													</div>
												</div>
											</>
											:
											<>
												<div className="grid_item">
													<div className="input_m_div">
														<button className="kpi_modl_btn" onClick={()=>selectDeepChart('2d_pie_chart')}><img src="/assets/img/donut_pie_chart.png" alt="icon"/></button><br/><br/>
														<h4>2D Pie Chart</h4>
													</div>
												</div>
												<div className="grid_item">
													<div className="input_m_div">
														<button className="kpi_modl_btn" onClick={()=>selectDeepChart('donut_pie_chart')}><img src="/assets/img/donut_chart_icon.png" alt="icon"/></button><br/><br/>
														<h4>Donut Pie Chart</h4>
													</div>
												</div>
											</>
										}
									</>
								}
								<div className="grid_item"></div>
							</div><br/>
						</div>
					</Modal> : ''
				}
			</div>
		</>
	)
}