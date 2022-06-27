import {useState,useEffect} from 'react'
import axios from 'axios'
import StakeHolderSubPart from './subParts/StakeHolderSubPart.tsx'

export default function Comp ({setTabComp,proId,props}) {
	const [dataArr,setDataArr] = useState([]);
	useEffect(() => {
		getData();
	},[]);
	const getData = () => {
		props.Swal.showLoading();
		var data = new FormData();
		data.append('project_id',proId);
		data.append('tab','stakeholders');
		axios.post('/api/only_post/get_present_pro_data',data).then(res => {
			setDataArr(res.data);
			props.Swal.close();
			if (res.data.length < 1) props.Toast.fire({ icon: 'info', title: 'Empty Data.' }); 
		});
	};
	return (
		<>
			<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
			<div id="startup_pg" style={startup_pg_stl}>
				<br/><h2 style={{ color: 'white',fontWeight: '800',textAlign: 'center' }}>Stakeholders Framework</h2><br/><br/>
				{
					dataArr.map(function (obj,indx) {
						return (
							obj.cat_with_names.map(function (obj2,indx2) {
								return (
									<div className="d_grid" style={{ gridTemplateColumns: '45% 50%',gridGap: '5%',marginBottom: '20px' }} key={indx2}>
										<div className="grid_item" style={left_box_grid}>
											<ul style={left_box_stl}>
												<li style={list_style}><h5>Our Talented team can help you to develop ECO system</h5></li>
												<li style={list_style}><h5>Understand the requirement and needs in relation between your entity and your Stakeholders. ASSES, MOU, SLA, AND MORE</h5></li>
											</ul>
										</div>
										<div className="grid_item text_center">
											<h3 style={{ color:'white',margin: '30px 0px 10px' }}>{obj2.name}</h3>
											<StakeHolderSubPart nameId={obj2.id} />
										</div>
									</div>
								)
							})
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
	background: 'url(/assets/img/presentation/stakeholder_bg.png) fixed rgb(48, 48, 48) center center no-repeat',
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
const left_box_grid = {
	display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
const left_box_stl = {
	background: 'linear-gradient(180deg, rgba(196, 196, 196, 0.1) 0%, rgba(196, 196, 196, 0) 100%)',
	borderRadius: '30px',
    color: 'white',
    padding: '30px 45px',
};
const list_style = {
	listStyle: 'disc',
    marginBottom: '10px',
    lineHeight: '25px',
};