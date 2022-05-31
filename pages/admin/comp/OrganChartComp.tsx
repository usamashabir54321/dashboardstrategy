import TreeNode from './parts/TreeNode.tsx'
import {useState,useEffect} from 'react'
import axios from 'axios'

export default function Comp ({nameId}) {
	const [noEmploye,setNoEmploye] = useState('');
	const [orders,setOrders] = useState('');
	const [productivity,setProductivity] = useState('');
	const [training,setTraining] = useState('');
	const [selectBox,setSelectBox] = useState('');
	const [reqPending,setReqPending] = useState(false);
	useEffect(() => {
		getOrganChartData();
	},[]);
	function getOrganChartData () {
		axios.get('api/getById/get_organ_chart_data/'+nameId).then(res => {
			if(res.data.no_employe) setNoEmploye(res.data.no_employe); else setNoEmploye('48');
			if(res.data.orders) setOrders(res.data.orders); else setOrders('12');
			if(res.data.productivity) setProductivity(res.data.productivity+'%'); else setProductivity('89%');
			if(res.data.training) setTraining(res.data.training+'%'); else setTraining('65%');
		});
	};
	const handleUpdate = (e) => {
		e.preventDefault();
		var form = document.querySelector('#update_form');
		var data = new FormData(form);
		data.append( 'name_id', nameId );
		setReqPending(true);
		axios.post('api/only_post/update_organ_data',data).then(res => {
			setSelectBox('');
			getOrganChartData();
			setReqPending(false);
		});
	};
	return (
		<>
			{reqPending ? <span className="react-loading-skeleton green" style={{position: 'fixed', top: '0px', left: '0px', height: '3px'}}></span> : ''}
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">Organizational Chart</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA ARRAY MAPPING*/}
				<div className="d_grid m_t_30" style={{ gridTemplateColumns: '22% 22% 22% 22%' , gap: '8% 3.6%', marginBottom: '8%' }}>
		         	<div className="grid_item cursor_pointer">
			         	<div className={`future_forsight_card card text_center ${selectBox == 'change_employe' ? 'selected' : ''}`} onClick={() => setSelectBox('change_employe')}>
			         		<h1><b>{noEmploye}</b></h1>
			         		<h5 className="m_t_10">No of employees</h5>
			         		<img className="m_t_10" src="/assets/img/home/num_employe.png" alt="image" style={{ height: "50px",width: "50px" }} />
			         	</div>
			        </div>
			        <div className="grid_item cursor_pointer">
			         	<div className={`future_forsight_card card text_center ${selectBox == 'change_orders' ? 'selected' : ''}`} onClick={() => setSelectBox('change_orders')}>
			         		<h1><b>{orders}</b></h1>
			         		<h5 className="m_t_10">Orders</h5>
			         		<img className="m_t_10" src="/assets/img/home/num_order.png" alt="image" style={{ height: "50px",width: "50px" }} />
			         	</div>
			        </div>
			        <div className="grid_item cursor_pointer">
			         	<div className={`future_forsight_card card text_center ${selectBox == 'change_productivity' ? 'selected' : ''}`} onClick={() => setSelectBox('change_productivity')}>
			         		<h1><b>{productivity}</b></h1>
			         		<h5 className="m_t_10">Employee Productivity</h5>
			         		<img className="m_t_10" src="/assets/img/home/percent_product.png" alt="image" style={{ height: "50px",width: "50px" }} />
			         	</div>
			        </div>
			        <div className="grid_item cursor_pointer">
			         	<div className={`future_forsight_card card text_center ${selectBox == 'change_training' ? 'selected' : ''}`} onClick={() => setSelectBox('change_training')}>
			         		<h1><b>{training}</b></h1>
			         		<h5 className="m_t_10">% of Training</h5>
			         		<img className="m_t_10" src="/assets/img/home/training_calculate.png" alt="image" style={{ height: "50px",width: "50px",borderRadius: '0' }} />
			         	</div>
			        </div>
				</div>
				{/*ALLOW UPDATE THE BOX VALUE*/}
				{
					selectBox ?
					<div className="future_form">
						<form onSubmit={ ( e ) => handleUpdate( e ) } action="" method="post" id="update_form" className="m_t_30">
				         	<div className="d_grid" style={{ gridTemplateColumns: '10% 30% 30%' , gridGap: '10%' }}>
				         		<div className="grid_item"></div>
				         		<div className="grid_item">
			         				{selectBox == 'change_employe' ? <div className="input_m_div"><label><b>No of employees</b></label><input type="number" name="no_employe" defaultValue={noEmploye} required /></div> : ''}
			         				{selectBox == 'change_orders' ? <div className="input_m_div"><label><b>Orders</b></label><input type="number" name="orders" defaultValue={orders} required /></div> : ''}
			         				{selectBox == 'change_productivity' ? <div className="input_m_div"><label><b>Employee Productivity</b></label><input type="number" name="productivity" defaultValue={productivity} required min="0" max="100" /></div> : ''}
			         				{selectBox == 'change_training' ? <div className="input_m_div"><label><b>% of Training</b></label><input type="number" name="training" defaultValue={training} required min="0" max="100" /></div> : ''}
				         		</div>
				         		<div className="grid_item">
				         			<div className="input_m_div" style={{ paddingTop: '30px' }}>
				         				<button className="btn_cancel cursor_pointer" onClick={() => setSelectBox('')}><small>Cancel</small></button>&nbsp;&nbsp;&nbsp;
				         				<button className="btn_submit cursor_pointer" type="submit"><small>Update</small></button>
				         			</div>
				         		</div>
				         	</div>
						</form>
					</div> : ''
				}
				{/*CREATING TREE NODE*/}
				<div className="m_t_25"><TreeNode nameId={nameId} apiParam="organ_chart_tree"/></div>
		    </div>
		</>
	)
}