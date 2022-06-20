import {useState,useEffect} from 'react'
import axios from 'axios'
import KpiDoughnutPart from './childDoor/chartComp/KpiDoughnutPart.tsx'
import Kpi2dPiePart from './childDoor/chartComp/Kpi2dPiePart.tsx'
import KpiVerticleBarPart from './childDoor/chartComp/KpiVerticleBarPart.tsx'
import KpiHorizontalBarPart from './childDoor/chartComp/KpiHorizontalBarPart.tsx'

export default function SubPart ({nameId}) {
	const [nameKpis,setNameKpis] = useState({});
	useEffect(() => {
		gettingNameData();
	},[]);
	const gettingNameData = () => {
		axios.get('api/getById/get_donut_kpi/'+nameId).then(res => {
			setNameKpis(res.data);
		});
	};
	return (
		<>
			{
				nameKpis.deep_chart ?
				<div className="d_grid" style={{ gridTemplateColumns: '15% 70% 15%' }}>
					<div className="grid_item"></div>
					<div className="grid_item" style={chart_box_style}>
						<div className="text_center">
							<div className="multi_chart_cover">
								{
									nameKpis.deep_chart == 'donut_pie_chart' ? <KpiDoughnutPart chartData={nameKpis} /> :
									nameKpis.deep_chart == '2d_pie_chart' ? <Kpi2dPiePart chartData={nameKpis} /> :
									nameKpis.deep_chart == 'verticle_bar_chart' ? <KpiVerticleBarPart chartData={nameKpis} /> :
									nameKpis.deep_chart == 'horizontal_bar_chart' ? <KpiHorizontalBarPart chartData={nameKpis} /> : ''
								}
							</div>
						</div>
					</div>
					<div className="grid_item"></div>
				</div>
				: ""
			}
		</>
	)
};

const chart_box_style = {
	background: 'linear-gradient(rgb(181 196 196 / 10%) 0%, rgb(196 196 196 / 18%) 100%)',
	borderRadius: '30px',
};