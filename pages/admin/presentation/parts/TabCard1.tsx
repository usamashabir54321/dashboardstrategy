import {useState} from 'react'
import FutureForseightComp from './tabCom/FutureForseightComp.tsx'
import StrategyHouseComp from './tabCom/StrategyHouseComp.tsx'
import OrganChartComp from './tabCom/OrganChartComp.tsx'
import SwotTowsComp from './tabCom/SwotTowsComp.tsx'
import StakeholderComp from './tabCom/StakeholderComp.tsx'
import KpisComp from './tabCom/KpisComp.tsx'
import MultiDashboard from './tabCom/MultiDashboard.tsx'

export default function Part ({nextComp,proId}) {
	const [tabCom,setTabComp] = useState('');
	function NowComp () {
		switch(tabCom) {
			case "future_forseight":   return <FutureForseightComp setTabComp={setThisTab} proId={proId} />;
			case "strategy_house":   return <StrategyHouseComp setTabComp={setThisTab} proId={proId} />;
			case "swot":   return <SwotTowsComp tab="swot" setTabComp={setThisTab} proId={proId} />;
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
							<div className="grid_item tab_card" onClick={() => setTabComp('future_forseight')}>
								<img src="/assets/img/presentation/tab_1.png" alt="image" />
								<div className="text_center text_div">
									<h4>FUTURE FORESEUGHT</h4>
									<h5>We will provide you with right tools for future</h5>
								</div>
							</div>
							<div className="grid_item tab_card" onClick={() => setTabComp('strategy_house')}>
								<img src="/assets/img/presentation/tab_2.png" alt="image" />
								<div className="text_center text_div">
									<h4>STRATEGY HOUSE</h4>
									<h5>Design your strategy house</h5>
								</div>
							</div>
							<div className="grid_item tab_card" onClick={() => setTabComp('swot')}>
								<img src="/assets/img/presentation/tab_5.png" alt="image" />
								<div className="text_center text_div">
									<h4>SWOT</h4>
									<h5>We will provide you with right tools for future</h5>
								</div>
							</div>
							<div className="grid_item tab_card">
								<img src="/assets/img/presentation/tab_4.png" alt="image" />
								<div className="text_center text_div">
									<h4>PROJECTS ROADMAP</h4>
									<h5>Update your projects milestone</h5>
								</div>
							</div>
						</div>
						<div className="text_center m_t_20"><button id="start_btn" onClick={() => nextComp('TabCard2')} style={start_btn}>Next</button></div>
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