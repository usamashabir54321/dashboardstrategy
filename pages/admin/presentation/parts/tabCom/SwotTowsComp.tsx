import {useState,useEffect} from 'react'
import axios from 'axios'
import SwotTowsSubPart from './subParts/SwotTowsSubPart.tsx'

export default function Comp ({tab,setTabComp,proId,props}) {
	const [dataArr,setDataArr] = useState([]);
	useEffect(() => {
		getData();
	},[]);
	const getData = () => {
		props.Swal.showLoading();
		var data = new FormData();
		data.append('project_id',proId);
		data.append('tab',tab);
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
				<br/><h2 style={{ color: 'white',fontWeight: '800',textAlign: 'center' }}>{ tab == 'swot' ? 'SWOT' : 'TWOS'}</h2><br/><br/>
				{
					dataArr.map(function (obj,indx) {
						return (
							<div key={indx}>
								<h3 className="text_center" style={{ color:'white',margin: '20px 0px 10px' }}>{obj.name}</h3>
								{
									obj.cat_with_names.map(function (obj2,indx2) {
										return (
											<div key={indx2}>
												<SwotTowsSubPart nameId={obj2.id} title={obj2.name} />
											</div>
										)
									})
								}
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
	background: 'url(/assets/img/presentation/project_bg.png) fixed rgb(48, 48, 48) center center no-repeat',
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