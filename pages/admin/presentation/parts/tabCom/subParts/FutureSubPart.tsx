import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SubPart ({nameId}) {
	const [dataArr,setDataArr] = useState([]);
	useEffect(() => {
		getingData();
	},[]);
	const getingData = () => {
		axios.get('api/getById/get_future_sights/'+nameId).then(res => {
			setDataArr(res.data);
		});
	};
	return (
		<>
			<div className="d_grid" style={{ gridTemplateColumns: '23.5% 23.5% 23.5% 23.5%', gridGap: '2% 2%', margin: '10px 0', }}>
				{
					dataArr.map(function(obj, idx){
				         return (
				         	<div className="grid_item tab_card" key={idx}>
				         		<img src={axios.defaults.baseURL+obj.img_path} alt="image" />
				         		<div className="text_center text_div">
				         			<h5 className="text_center">{obj.name}</h5>
				         		</div>
				         	</div>
				         )
				    })
				}
			</div>
		</>
	)
};