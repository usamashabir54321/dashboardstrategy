import { useState,useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios'
import MultiSubChild from './childParts/MultiKpiFolder/MultiSubChild.tsx'
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

export default function Part ({obj}) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [catArr,setCatArr] = useState([]);
	const [nameArr,setNameArr] = useState([]);
	const [compObj,setCompObj] = useState({});
	const [reqPending,setReqPending] = useState(false);
	const [alert,setAlert] = useState('');
	useEffect(() => {
		setCompObj(obj);
		getAllKpisCats();
	},[]);
	function openModal() { setIsOpen(true); }
	function closeModal() { setIsOpen(false); }
	const getAllKpisCats = () => {
		axios.get('api/only_get/all_kpi_cats').then(res => {
			setCatArr(res.data);
		});
	};
	const handleChangeCat = (e) => {
		var catId = e.target.value;
		setNameArr([]);
		axios.get('api/getById/get_kpi_cat_names/'+catId).then(res => {
			setNameArr(res.data);
		});
	};
	const handleChangeName = (e) => {
		var nameId = e.target.value;
		var data = new FormData();
		data.append('name_id',nameId);
		data.append('multi_comp_id',compObj.id);
		setIsOpen(false);setReqPending(true);
		axios.post('api/only_post/make_multi_kpi_data',data).then(res => {
			if (res.data != 0) {
				setCompObj({});
				setTimeout(() => {setCompObj(res.data);},500);
			}
			else setAlert('no_kpi_data');
			setReqPending(false);
			setTimeout(() => { setAlert(''); },2000);
		});
	};
	return (
		<>
			{reqPending ? <span className="react-loading-skeleton green" style={{position: 'fixed', top: '0px', left: '0px', height: '3px'}}></span> : ''}
			{ alert == 'no_kpi_data' ? <div className="toast toast-warning"><div className="toast-title">Warning</div><div className="toast-message">This kpi has no data. Please try another kpi.</div></div> : '' }
			<div className="grid_item">
				<div className="card m_t_25">
					{
						compObj.kpi_id ? <MultiSubChild compObj={compObj} openModal={openModal} /> :
						<>
							{/*IF THERE IS NOT KPI ID*/}
							<div className="d_grid" style={{ gridTemplateColumns: '45% 45%' , gridGap: '5%' }} onClick={openModal}>
								<div className="grid_item"><h4 className="text_blue"><b>lorem ipsum</b></h4></div>
								<div className="grid_item">
									<div className="input_m_div text_right">
										<button className="edit_profile_icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15">
												<path d="M4.45437 14.1012L0 15L0.89875 10.545L4.45437 14.1012ZM5.33813 13.2175L12.3556 6.20188L8.79938 2.64437L1.7825 9.66125L5.33813 13.2175ZM11.4431 0L9.68312 1.76062L13.24 5.3175L15 3.55562L11.4431 0V0Z"></path>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div className="text_center" className="multi_dummy_box">
								{compObj.image_type ?<div className="dummy_mulit_txt"><h4>There is no any KPI Choose. Please Choose KPI</h4></div> : ''}
							</div>
							<h4 className="text_blue text_center"><b>lorem ipsum</b></h4>
						</>
					}
				</div>
			</div>
			{/*MODAL FOR UPDATING KPI DATA*/}
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle} contentLabel="Select Kpi Modal" id="kpi_model_id">
				<button className="close_modal" onClick={closeModal}>x</button><br/><br/>
				<div className="select_kpi_model text_center"><br/>
					<div className="d_grid" style={{ gridTemplateColumns: '13% 30% 30% 12%', gridGap: '5%' }}>
						<div className="grid_item"></div>
						<div className="grid_item">
							<div className="input_m_div">
								<label>Select Kpi Category</label>
								<select onChange={(e) => handleChangeCat(e)}>
									<option value="">Select Category</option>
									{
										catArr.map(function (obj,indx) {
											return (
												<option value={obj.id} key={indx}>{obj.name}</option>
											)
										})
									}
								</select>
							</div>
						</div>
						<div className="grid_item">
							<div className="input_m_div">
								<label>Select Kpi</label>
								<select onChange={(e) => handleChangeName(e)}>
									{nameArr.length > 0 ? <option value="">Select Kpi</option> : ''}
									{
										nameArr.map(function (obj,indx) {
											return (
												<option value={obj.id} key={indx}>{obj.name}</option>
											)
										})
									}
								</select>
							</div>
						</div>
						<div className="grid_item"></div>
					</div><br/>
				</div>
			</Modal>
		</>
	)
};