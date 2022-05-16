import {useState,useEffect} from 'react';
import axios from 'axios';
import ChildStrategyPart from './ChildStrategyPart.tsx';

export default function Part ({id}) {
	const [dataArr,setDataArr] = useState([]);
	useEffect(() => {
		getingData();
	},[]);
	const getingData = () => {
		axios.get('api/getById/get_strategy_childs/'+id).then(res => {
			setDataArr(res.data);
		});
	};
	return (
		<>
			<ul>
				{
					dataArr.map(function(obj, idx){
				         return (
				         	<>
					         	<li key={obj.id}>
					         		<div className="box_btn">{obj.text}</div>
					         		<ChildStrategyPart id={obj.id} />
					         	</li>
					        </>
				         )
				    })
				}
			</ul>
		</>
	)
};