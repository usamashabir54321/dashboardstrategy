import {useState,useEffect} from 'react'
import axios from 'axios'
import KpiDoughnutPart from './parts/KpiDoughnutPart.tsx'
import Kpi2dPiePart from './parts/Kpi2dPiePart.tsx'
import KpiVerticleBarPart from './parts/KpiVerticleBarPart.tsx'
import KpiHorizontalBarPart from './parts/KpiHorizontalBarPart.tsx'

export default function Comp ({nameId}) {
	const [nameKpis,setNameKpis] = useState({});
	const [mainChart,setMainChart] = useState('');
	const [deepChart,setDeepChart] = useState('');
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
		axios.post('api/only_post/save_kpi_name_chart',data).then(res => { gettingNameData(); });
	};
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
					<div className="select_kpi_model text_center"><br/>
						{/*IF NO DATA SAVED BEFORE ON THIS NAME ID*/}
						{!mainChart ? <h2>What kind of KPI's do you want?</h2> : <h2>Select One Option.</h2>}<br/>
						<div className="d_grid" style={{ gridTemplateColumns: '30% 20% 20% 30%', gridGap: '0%' }}>
							<div className="grid_item"></div>
							{
								!mainChart ?
								<>
									<div className="grid_item"><div className="input_m_div"><button className="btn_submit" onClick={()=>setMainChart('bar_chart')}>Bar Chart</button></div></div>
									<div className="grid_item"><div className="input_m_div"><button className="btn_submit" onClick={()=>setMainChart('pie_chart')}>Pie Chart</button></div></div>
								</>
								:
								<>
									{
										mainChart == 'bar_chart' ?
										<>
											<div className="grid_item"><div className="input_m_div"><button className="btn_submit" onClick={()=>selectDeepChart('verticle_bar_chart')}>Verticle Bar Chart</button></div></div>
											<div className="grid_item"><div className="input_m_div"><button className="btn_submit" onClick={()=>selectDeepChart('horizontal_bar_chart')}>Horizental Bar Chart</button></div></div>
										</>
										:
										<>
											<div className="grid_item"><div className="input_m_div"><button className="btn_submit" onClick={()=>selectDeepChart('2d_pie_chart')}>2D Pie Chart</button></div></div>
											<div className="grid_item"><div className="input_m_div"><button className="btn_submit" onClick={()=>selectDeepChart('donut_pie_chart')}>Donut Pie Chart</button></div></div>
										</>
									}
								</>
							}
							<div className="grid_item"></div>
						</div><br/>
					</div> : ''
				}
			</div>
		</>
	)
}