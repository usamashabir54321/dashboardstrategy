import {useState,useEffect} from 'react'
import axios from 'axios'
import ReactTooltip from 'react-tooltip';

export default function SubPart ({nameId,title}) {
	const [mySTId,setMySTId] = useState('');
	const [leftTopData,setLeftTopData] = useState([]);
	const [leftBottomData,setLeftBottomData] = useState([]);
	const [rightTopData,setRightTopData] = useState([]);
	const [rightBottomData,setRightBottomData] = useState([]);
	const [nowRectTool,setNowRectTool] = useState(false);
	useEffect(() => {
			getSwotTows();
	},[]);
	function getSwotTows () {
		setNowRectTool(false);
		axios.get('api/getById/get_swot_tows/'+nameId).then(res => {
			if(res.data.id) {
				setMySTId(res.data.id);
				setLeftTopData(res.data.l_t_data.split('|'));
				setLeftBottomData(res.data.l_b_data.split('|'));
				setRightTopData(res.data.r_t_data.split('|'));
				setRightBottomData(res.data.r_b_data.split('|'));
			}
			setNowRectTool(true);
		});
	};
	return (
		<>
			{nowRectTool ? <ReactTooltip /> : ''}
			{
				mySTId ?
				<div className="d_grid" style={{ gridTemplateColumns: '15% 70% 15%' }}>
					<div></div>
					<div id="swottowsdiv" className="m_t_20">
						<div className="d_grid" style={{ gridTemplateColumns: '38% 21% 36%', gridGap: '2%' }}>
							<div className="grid_item left">
								<ul className="top" style={{ color:'white' }}>{ leftTopData.map(function(obj, idx){return <li key={idx}>{obj ? <p data-tip={obj}>{obj}</p> : <b >&nbsp;</b> }</li> }) }</ul>
								<ul className="bottom"  style={{ color:'white' }}>{ leftBottomData.map(function(obj, idx){return <li key={idx}>{obj ? <p data-tip={obj}>{obj}</p> : <b>&nbsp;</b> }</li> }) }</ul>
							</div>
							<div className="grid_item" style={{ display: 'table',padding: '2px' }}><h2 id="swottowscat">{title}</h2></div>
							<div className="grid_item right text_right">
								<ul className="top">{ rightTopData.map(function(obj, idx){return <li key={idx}>{obj ? <p data-tip={obj}>{obj}</p> : <b>&nbsp;</b> }</li> }) }</ul>
								<ul className="bottom">{ rightBottomData.map(function(obj, idx){return <li key={idx}>{obj ? <p data-tip={obj}>{obj}</p> : <b>&nbsp;</b> }</li> }) }</ul>
							</div>
						</div>
					</div>
					<div></div>
				</div> : ''
			}
		</>
	)
};