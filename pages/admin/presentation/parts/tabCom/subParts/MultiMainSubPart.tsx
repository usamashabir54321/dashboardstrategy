import {useState,useEffect} from 'react'
import axios from 'axios'
import MultiChartHandler from './childDoor/chartComp/MultiChartHandler.tsx'

export default function SubPart ({nameId}) {
	const [multiArr,setMultiArr] = useState([]);
	useEffect(() => {
		getCompKpis();
	},[]);
	const getCompKpis = () => {
		axios.get('api/getById/get_multi_kpis/'+nameId).then(res => {
			setMultiArr(res.data);
		});
	};
	return (
		<div className="d_grid" style={{ gridTemplateColumns: '48% 48%' , gridGap: '0% 4%' ,  }}>
			{
				multiArr.map(function (obj,indx) {
					return (
						<div className="grid_item" key={indx}>
							<div className="card m_t_25" style={{ background: 'linear-gradient(rgb(181 196 196 / 10%) 0%, rgb(196 196 196 / 18%) 100%)', }}>
								{
									obj.kpi_id ? <MultiChartHandler compObj={obj} /> :
									<div className="text_center" className="multi_dummy_box">
										{obj.image_type ?<div className="dummy_mulit_txt" style={{ color:'white' }}><h4>There is no any KPI Choose. Please Choose KPI</h4></div> : ''}
									</div>
								}
							</div>
						</div>
					)
				})
			}
		</div>
	)
};