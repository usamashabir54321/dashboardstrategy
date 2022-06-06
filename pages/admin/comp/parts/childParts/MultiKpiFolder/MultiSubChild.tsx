import axios from 'axios'
import { useState,useEffect } from 'react'
import KpiDoughnutPart from './KpiDoughnutPart.tsx'
import Kpi2dPiePart from './Kpi2dPiePart.tsx'
import KpiVerticleBarPart from './KpiVerticleBarPart.tsx'
import KpiHorizontalBarPart from './KpiHorizontalBarPart.tsx'

export default function Child ({compObj,openModal}) {
	const [nameData,setNameData] = useState({});
	const [chartData,setChartData] = useState({});
	useEffect(() => {
		getNameData();
		getCharData();
	},[]);
	const getNameData = () => {
		axios.get('api/getById/get_name_byid/'+compObj.kpi_name_id).then(res => {
			setNameData(res.data);
		});
	};
	const getCharData = () => {
		axios.get('api/getById/get_chart_kpi_data/'+compObj.kpi_id).then(res => {
			setChartData(res.data);
		});
	};
	return (
		<>
			{/*IF THERE IS KPI ID*/}
			<div className="d_grid" style={{ gridTemplateColumns: '85% 15%' }} onClick={openModal}>
				<div className="grid_item"><h4 className="text_blue"><b>{nameData.name}</b></h4></div>
				<div className="grid_item">
					<div className="input_m_div text_right">
						<button className="edit_profile_icon">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15">
								<path d="M4.45437 14.1012L0 15L0.89875 10.545L4.45437 14.1012ZM5.33813 13.2175L12.3556 6.20188L8.79938 2.64437L1.7825 9.66125L5.33813 13.2175ZM11.4431 0L9.68312 1.76062L13.24 5.3175L15 3.55562L11.4431 0V0Z"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="text_center">
				<div>
					{
						chartData.deep_chart == 'donut_pie_chart' ? <KpiDoughnutPart chartData={chartData} /> :
						chartData.deep_chart == '2d_pie_chart' ? <Kpi2dPiePart chartData={chartData} /> :
						chartData.deep_chart == 'verticle_bar_chart' ? <KpiVerticleBarPart chartData={chartData} /> :
						chartData.deep_chart == 'horizontal_bar_chart' ? <KpiHorizontalBarPart chartData={chartData} /> : ''
					}
					<h4 className="text_blue"><b>{nameData.note_name}</b></h4>
				</div>
			</div>
		</>
	)
};