import MultiMainComp from './parts/MultiMainComp.tsx'
import axios from 'axios'
import {useState,useEffect} from 'react'

export default function Comp ({nameId}) {
	const [multiArr,setMultiArr] = useState([]);
	const [kpiCatsArr,setKpiCatsArr] = useState([]);
	useEffect(() => {
		getCompKpis();
	},[]);
	const getCompKpis = () => {
		axios.get('api/getById/get_multi_kpis/'+nameId).then(res => {
			setMultiArr(res.data);
			getAllKpisCats();
		});
	};
	const getAllKpisCats = () => {
		axios.get('api/only_get/all_kpi_cats').then(res => {
			setKpiCatsArr(res.data);
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
							<button className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
			</div>
			<div className="d_grid" style={{ gridTemplateColumns: '48% 48%' , gridGap: '1% 4%' }}>
				{
					multiArr.map(function (obj,indx) {
						return (
							<MultiMainComp obj={obj} kpiCatsArr={kpiCatsArr} key={indx}/>
						)
					})
				}
			</div><br/><br/>
		</div>
	)
}