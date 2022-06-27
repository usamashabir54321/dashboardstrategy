import {useState} from 'react'
import FutureForseightComp from './tabCom/FutureForseightComp.tsx'
import StrategyHouseComp from './tabCom/StrategyHouseComp.tsx'
import OrganChartComp from './tabCom/OrganChartComp.tsx'
import SwotTowsComp from './tabCom/SwotTowsComp.tsx'
import StakeholderComp from './tabCom/StakeholderComp.tsx'
import KpisComp from './tabCom/KpisComp.tsx'
import MultiDashboard from './tabCom/MultiDashboard.tsx'

export default function Part ({nextComp,proId,props}) {
	const [tabCom,setTabComp] = useState('');
	function NowComp () {
		switch(tabCom) {
			case "organization_chart":   return <OrganChartComp setTabComp={setThisTab} proId={proId} props={props} />;
			case "tows":   return <SwotTowsComp tab="tows" setTabComp={setThisTab} proId={proId} props={props} />;
			case "stakeholders":   return <StakeholderComp setTabComp={setThisTab} proId={proId} props={props} />;
			case "kpis":   return <KpisComp setTabComp={setThisTab} proId={proId} props={props} />;
			default: return '';
		}
	}
	const setThisTab = (payload) => {
		setTabComp(payload);
	};
	return (
		<>
			{
				tabCom ? NowComp() :
				<>
					<img src="/assets/img/logo.png" alt="logo" style={logo_stl}/>
					<div id="startup_pg" style={startup_pg_stl}>
						<br/><h2 style={{ color: 'white',fontWeight: '800',textAlign: 'center' }}>Project Name</h2><br/><br/>
						<div className="d_grid" style={{ gridTemplateColumns: '23.5% 23.5% 23.5% 23.5%', gridGap: '2% 2%', margin: '10px 0', }}>
							<div className="grid_item tab_card" onClick={() => setTabComp('organization_chart')}>
								<img src="/assets/img/presentation/tab_3.png" alt="image" />
								<div className="text_center text_div">
									<h4>ORGANIZATION CHARTS</h4>
									<h5>Design your organization charts</h5>
								</div>
							</div>
							<div className="grid_item tab_card" onClick={() => setTabComp('tows')}>
								<img src="/assets/img/presentation/tab_5.png" alt="image" />
								<div className="text_center text_div">
									<h4>TOWS</h4>
									<h5>We will provide you with right tools for future</h5>
								</div>
							</div>
							<div className="grid_item tab_card" onClick={() => setTabComp('stakeholders')}>
								<img src="/assets/img/presentation/tab_7.png" alt="image" />
								<div className="text_center text_div">
									<h4>STAKEHOLDERS FRAMEWORK</h4>
									<h5>Convert your data to visible charts</h5>
								</div>
							</div>
							<div className="grid_item tab_card" onClick={() => setTabComp('kpis')}>
								<img src="/assets/img/presentation/tab_8.png" alt="image" />
								<div className="text_center text_div">
									<h4>KPI’s</h4>
									<h5>Update your projects milestone</h5>
								</div>
							</div>
						</div>
						<div className="text_center m_t_20">
							<button id="start_btn" onClick={() => nextComp('TabCard1')} style={start_btn}>Back</button> &nbsp;&nbsp;&nbsp;
							<button id="start_btn" onClick={() => nextComp('TabCard3')} style={start_btn}>Next</button>
						</div>
					</div>
				</>
			}
		</>
	)
};


const startup_pg_stl = {
	background: 'url(/assets/img/presentation/tab_cats_bg.png)',
	backgroundColor: '#303030',
	padding: '5%',
	padding: '5%',
	backgroundAttachment: 'fixed',
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