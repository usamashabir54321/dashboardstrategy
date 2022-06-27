import { useState,useEffect } from 'react'
import Layout from './layout.tsx'
import AdminHeader from './comp/AdminHeader.tsx'
import CategoryList from './comp/CategoryList.tsx'
import FutureForseightComp from './comp/FutureForseightComp.tsx'
import StrategyHouseComp from './comp/StrategyHouseComp.tsx'
import OrganChartComp from './comp/OrganChartComp.tsx'
import SwotTowsComp from './comp/SwotTowsComp.tsx'
import StakeholderComp from './comp/StakeholderComp.tsx'
import KpisComp from './comp/KpisComp.tsx'
import MultiDashboard from './comp/MultiDashboard.tsx'
import Modal from 'react-modal';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {setPorject} from '../../store/actions/adminActions'
Modal.setAppElement('body');
const modalStyle = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: '#323232',
		boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
		borderRadius: '20px',
		border: 'none',
		width: '40%'
	}, overlay: {
			backgroundColor: 'rgba(71, 71, 71, 0.6)'
	},
};

export default function Page (props) {
	const adminReducerData = useSelector((state) => state.adminStore);
	const { thisProject } = adminReducerData;
	const [pageTab,setPageTab] = useState('');
	const [nameId,setNameId] = useState('');
	const [nameTabCom,setNameTabCom] = useState('');
	const [projectId,setProjectId] = useState(null);
	const [modalIsOpen, setIsOpen] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		if (thisProject.id) setProjectId(thisProject.id);
		return () => {
			dispatch(setPorject({}));
		}
	},[]);
	const selectTabPage = (id,tab) => {
		setNameId('');setNameTabCom('');
		setTimeout(() => { setNameId(id);setNameTabCom(tab); },300);
	}
	function project () {
		switch(nameTabCom) {
			case "future_forseight":   return <FutureForseightComp nameId={nameId} props={props} />;
			case "strategy_house":   return <StrategyHouseComp nameId={nameId} props={props} />;
			case "organization_chart":   return <OrganChartComp nameId={nameId} props={props} />;
			case "swot":   return <SwotTowsComp nameId={nameId} tab={nameTabCom} props={props} />;
			case "tows":   return <SwotTowsComp nameId={nameId} tab={nameTabCom} props={props} />;
			case "stakeholders":   return <StakeholderComp nameId={nameId} props={props} />;
			case "kpis":   return <KpisComp nameId={nameId} props={props} />;
			case "multiple_dashboard":   return <MultiDashboard nameId={nameId} props={props} />;
			default: return <div className="card m_t_25"><h1>No Project Match</h1></div>
		}
	}
	function openModal() { setIsOpen(true); }function closeModal() { setIsOpen(false); }
	const handleSubmit = (e) => {
		e.preventDefault();props.Swal.showLoading();
		var data = new FormData(e.target);
		if (projectId) data.append('id',projectId);
		axios.post('api/only_post/create_project',data).then(res => {
			setProjectId(res.data);props.Swal.close();closeModal();
		});
	};
	return (
		<>
			<props.Head>
				<title>Create Project | Dashboard Strategy</title>
				<meta name="Create Project" content="Create Project,Dashboard Strategy" />
			</props.Head>
			{/*PAGE HEADER*/}
			{thisProject.id ? <AdminHeader pageTitle="Update Project" props={props} /> : <AdminHeader pageTitle="Create Project" props={props} />}
			{/*PAGE BODY*/}
			{
				projectId ?
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
										Future Foreseight <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'future_forseight' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'strategy_house' ? 'active' : ''}  onClick={() => setPageTab('strategy_house')}>
									<h4>
										Strategy House <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'strategy_house' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'organization_chart' ? 'active' : ''}  onClick={() => setPageTab('organization_chart')}>
									<h4>
										Organization Chart <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'organization_chart' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'road_map' ? 'active' : ''}  onClick={() => setPageTab('road_map')}>
									<h4>
										Road Map <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'road_map' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'swot' ? 'active' : ''}  onClick={() => setPageTab('swot')}>
									<h4>
										SWOT <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'swot' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'tows' ? 'active' : ''}  onClick={() => setPageTab('tows')}>
									<h4>
										TOWS <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'tows' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'stakeholders' ? 'active' : ''}  onClick={() => setPageTab('stakeholders')}>
									<h4>
										Stakeholders <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'stakeholders' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'kpis' ? 'active' : ''}  onClick={() => setPageTab('kpis')}>
									<h4>
										KPI’s <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'kpis' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
								<li className={pageTab == 'multiple_dashboard' ? 'active' : ''}  onClick={() => setPageTab('multiple_dashboard')}>
									<h4>
										Dashboard <span className="iconites"><span className="i_right close">--</span><span className="i_right open">+</span></span>
									</h4>
								</li>
								{ pageTab == 'multiple_dashboard' ? <CategoryList projectId={projectId} tab={pageTab} selectTabPage={selectTabPage} props={props} /> : '' }
							</ul>
						</div>
					</div>
					<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} contentLabel="Select Kpi Modal" id="kpi_model_id">
						<button className="close_modal" onClick={closeModal}>x</button><br/><br/>
						<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post">
							<div className="select_kpi_model text_center"><br/>
								<div className="d_grid" style={{ gridTemplateColumns: '40% 40% 15%', gridGap: '2%' , padding: '0 20px' }}>
									<div className="grid_item">
										<div className="input_m_div">
											<input type="text" name="project_name" defaultValue={thisProject.name} required minLength="3" placeholder="Project Name" />
										</div>
									</div>
									<div className="grid_item">
										<div className="input_m_div">
											<select required name="project_cat" defaultValue={thisProject.cat_name}>
												<option value="">Select Category</option>
												<option value="Technology">Technology</option>
												<option value="Logistics">Logistics</option>
												<option value="Organization">Organization</option>
												<option value="Stats">Stats</option>
											</select>
										</div>
									</div>
									<div className="grid_item input_m_div"><button className="btn_submit cursor_pointer" type="submit">Update</button></div>
								</div><br/>
							</div>
						</form>
					</Modal>
				</div>
				:
				<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} contentLabel="Select Kpi Modal" id="kpi_model_id">
					<button className="close_modal" onClick={closeModal}>x</button><br/><br/>
					<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post">
						<div className="select_kpi_model text_center"><br/>
							<div className="d_grid" style={{ gridTemplateColumns: '40% 40% 15%', gridGap: '2%' , padding: '0 20px' }}>
								<div className="grid_item">
									<div className="input_m_div">
										<input type="text" name="project_name" required minLength="3" placeholder="Project Name" />
									</div>
								</div>
								<div className="grid_item">
									<div className="input_m_div">
										<select required name="project_cat">
											<option value="">Select Category</option>
											<option value="Technology">Technology</option>
											<option value="Logistics">Logistics</option>
											<option value="Organization">Organization</option>
											<option value="Stats">Stats</option>
										</select>
									</div>
								</div>
								<div className="grid_item input_m_div"><button className="btn_submit cursor_pointer" type="submit">Save</button></div>
							</div><br/>
						</div>
					</form>
				</Modal>
			}
		</>
	)
}

Page.layout = Layout


