import {useSelector} from 'react-redux'
import {useState,useEffect} from 'react'
import axios from 'axios'
import TreeNodeSubPart from './subParts/TreeNodeSubPart.tsx'

export default function Comp ({setTabComp,proId}) {
	const adminReducerData = useSelector((state) => state.adminStore);
	const { auth_u } = adminReducerData;
	const [dataArr,setDataArr] = useState([]);
	useEffect(() => {
		getData();
	},[]);
	const getData = () => {
		var data = new FormData();
		data.append('project_id',proId);
		data.append('tab','strategy_house');
		axios.post('/api/only_post/get_present_pro_data',data).then(res => {
			setDataArr(res.data);
		});
	};
	return (
		<>
			<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
			<div id="startup_pg" style={startup_pg_stl}>
				<br/><h2 style={{ color: 'white',fontWeight: '800',textAlign: 'center' }}>Strategy House</h2><br/><br/>
				<div className="d_grid" style={{ gridTemplateColumns: '48% 48%',gridGap: '4%' }}>
					<div className="card" style={card_stl}>
						<h3 className="text_blue" style={{ marginBottom: '20px' }}>Vision:</h3>
						{ auth_u.mission ? <p>{auth_u.mission}</p> : '' }
					</div>
					<div className="card" style={card_stl}>
						<h3 className="text_blue" style={{ marginBottom: '20px' }}>Mission:</h3>
						{ auth_u.vision ? <p>{auth_u.vision}</p> : '' }
					</div>
				</div>
				{
					dataArr.map(function (obj,indx) {
						return (
							<div key={indx}>
								<h3 style={{ color:'white',margin: '30px 0px 10px' }}>{obj.name}</h3>
								<TreeNodeSubPart relateId={obj.id} apiParam="cat_strategy" />
							</div>
						)
					})
				}
				<div className="text_center"><button id="start_btn" onClick={() => setTabComp('')} style={start_btn}>Back</button></div>
			</div>
		</>
	)
};


const startup_pg_stl = {
	backgroundColor: '#303030',
	padding: '5%',
	backgroundAttachment: 'fixed',
	background: 'url(/assets/img/presentation/strategy_bg.png) fixed rgb(48, 48, 48) center center no-repeat',
};
const logo_stl = {
	position: 'absolute',
    width: '120px',
    height: 'auto',
    left: '72px',
    top: '62px',
};
const start_btn = {
	background: 'linear-gradient(180deg, #29ABE2 0%, rgba(17, 127, 169, 0.81) 100%)',
    boxShadow: '0px 0px 30px rgb(0 0 0 / 20%)',
    borderRadius: '10px',
    border: 'none',
    padding: '15px 30px',
    margin: '20px 0px',
    color: 'white',
    fontSize: '20px',
    width: '275px',
};
const card_stl = {
	background: 'linear-gradient(180deg, rgb(196 196 196 / 18%) 0%, rgb(196 196 196 / 9%) 100%)',
    borderRadius: '45px',
    padding: '40px',
    margin: '0px 0px 25px',
    color: 'white',
};