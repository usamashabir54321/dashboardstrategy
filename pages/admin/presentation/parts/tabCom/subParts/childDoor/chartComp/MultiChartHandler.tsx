import axios from 'axios'
import { useState,useEffect } from 'react'
import KpiDoughnutPart from './KpiDoughnutPart.tsx'
import Kpi2dPiePart from './Kpi2dPiePart.tsx'
import KpiVerticleBarPart from './KpiVerticleBarPart.tsx'
import KpiHorizontalBarPart from './KpiHorizontalBarPart.tsx'

export default function ChildDoor ({compObj}) {
	const [chartData,setChartData] = useState({});
	useEffect(() => {
		getCharData();
	},[]);
	const getCharData = () => {
		axios.get('api/getById/get_chart_kpi_data/'+compObj.kpi_id).then(res => {
			setChartData(res.data);
		});
	};
	return (
		<div className="text_center">
			<div className="multi_chart_cover">
				{
					chartData.deep_chart == 'donut_pie_chart' ? <KpiDoughnutPart chartData={chartData} /> :
					chartData.deep_chart == '2d_pie_chart' ? <Kpi2dPiePart chartData={chartData} /> :
					chartData.deep_chart == 'verticle_bar_chart' ? <KpiVerticleBarPart chartData={chartData} /> :
					chartData.deep_chart == 'horizontal_bar_chart' ? <KpiHorizontalBarPart chartData={chartData} /> : ''
				}
			</div>
		</div>
	)
};