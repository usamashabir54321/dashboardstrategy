import Head from 'next/head'
import { useState } from 'react'
import Layout from './layout.tsx'
import AdminHeader from './comp/AdminHeader.tsx'
import CategoryList from './comp/CategoryList.tsx'
import FutureForseightComp from './comp/FutureForseightComp.tsx'
import StrategyHouseComp from './comp/StrategyHouseComp.tsx'
import OrganChartComp from './comp/OrganChartComp.tsx'
import SwotTowsComp from './comp/SwotTowsComp.tsx'
import StakeholderComp from './comp/StakeholderComp.tsx'
import KpisComp from './comp/KpisComp.tsx'

export default function Page () {
	const [pageTab,setPageTab] = useState('future_forseight');
	const [nameId,setNameId] = useState('');
	const [nameTabCom,setNameTabCom] = useState('');
	const selectTabPage = (id,tab) => {
		setNameId('');setNameTabCom('');
		setTimeout(() => { setNameId(id);setNameTabCom(tab); },300);
	}
	function project () {
		switch(nameTabCom) {
			case "future_forseight":   return <FutureForseightComp nameId={nameId} />;
			case "strategy_house":   return <StrategyHouseComp nameId={nameId} />;
			case "organization_chart":   return <OrganChartComp nameId={nameId} />;
			case "swot":   return <SwotTowsComp nameId={nameId} tab={nameTabCom} />;
			case "tows":   return <SwotTowsComp nameId={nameId} tab={nameTabCom} />;
			case "stakeholders":   return <StakeholderComp nameId={nameId} />;
			case "kpis":   return <KpisComp nameId={nameId} />;
			default: return <div className="card m_t_25"><h1>No Project Match</h1></div>
		}
	}
	return (
		<>
			<Head>
				<title>Create Project | Dashboard Strategy</title>
				<meta name="Create Project" content="Create Project,Dashboard Strategy" />
			</Head>
			{/*PAGE HEADER*/}
			<AdminHeader pageTitle="Create Project" />
			{/*PAGE BODY*/}
			<div className="d_content">
				<div className="d_grid gap_l_30 gap_s_20" style={{ gridTemplateColumns: '78% 20%' }}>
					<div className="grid_item">
						{ nameId ? project() : ''}
					</div>
					{/*SIDE BAR TAB LINKS*/}
					<div className="grid_item card m_t_25">
						<ul className="list">
							<li className={pageTab == 'future_forseight' ? 'active' : ''} onClick={() => setPageTab('future_forseight')}>
								<h4>
									Future Foreseight <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'future_forseight' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'strategy_house' ? 'active' : ''}  onClick={() => setPageTab('strategy_house')}>
								<h4>
									Strategy House <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'strategy_house' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'organization_chart' ? 'active' : ''}  onClick={() => setPageTab('organization_chart')}>
								<h4>
									Organization Chart <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'organization_chart' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'road_map' ? 'active' : ''}  onClick={() => setPageTab('road_map')}>
								<h4>
									Road Map <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'road_map' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'swot' ? 'active' : ''}  onClick={() => setPageTab('swot')}>
								<h4>
									SWOT <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'swot' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'tows' ? 'active' : ''}  onClick={() => setPageTab('tows')}>
								<h4>
									TOWS <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'tows' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'stakeholders' ? 'active' : ''}  onClick={() => setPageTab('stakeholders')}>
								<h4>
									Stakeholders <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'stakeholders' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'kpis' ? 'active' : ''}  onClick={() => setPageTab('kpis')}>
								<h4>
									KPI’s <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'kpis' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
							<li className={pageTab == 'dashboard' ? 'active' : ''}  onClick={() => setPageTab('dashboard')}>
								<h4>
									Dashboard <span className="i_right close">--</span><span className="i_right open">+</span>
								</h4>
							</li>
							{ pageTab == 'dashboard' ? <CategoryList tab={pageTab} selectTabPage={selectTabPage} /> : '' }
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}

Page.layout = Layout


