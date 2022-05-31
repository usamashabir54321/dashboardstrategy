import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Comp ({nameId}) {
	const [dataArr,setDataArr] = useState([]);
	const [insertFormArr,setInsertFormArr] = useState([1]);
	const [itemIndx,setItemIndx] = useState(null);
	const [allowEdit,setAllowEdit] = useState(false);
	const [reqPending,setReqPending] = useState(false);
	useEffect(() => {
		getingData();
	},[nameId]);
	const getingData = () => {
		setReqPending(true);
		axios.get('api/getById/get_future_sights/'+nameId).then(res => {
			setDataArr(res.data);setReqPending(false);
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		var form = document.querySelector('#insert_form');
		var data = new FormData(form);
		data.append( 'cat_name_id', nameId );
		setReqPending(true);
		axios.post('api/only_post/create_name_forsight',data).then(res => {
			setDataArr(res.data);
			document.getElementById("insert_form").reset();
			setInsertFormArr(([1]));setReqPending(false);
		});
	}
	const handDelete = () => {
		setReqPending(true);
		axios.get('api/getById/del_foreseights/'+dataArr[itemIndx].id).then(res => {
			setDataArr(res.data);setItemIndx(null);setReqPending(false);
		});
	}
	const handleUpdate = (e) => {
		e.preventDefault();
		var form = document.querySelector('#update_form');
		var data = new FormData(form);
		data.append( 'id', dataArr[itemIndx].id );
		data.append( 'prev_img_path', dataArr[itemIndx].img_path );
		data.append( 'cat_name_id', dataArr[itemIndx].cat_name_id );
		setReqPending(true);
		axios.post('api/only_post/update_name_forsight',data).then(res => {
			setDataArr(res.data);
			document.getElementById("update_form").reset();
			setAllowEdit(false);setItemIndx(null);setReqPending(false);
		});
	};
	return (
		<>
			{reqPending ? <span className="react-loading-skeleton green" style={{position: 'fixed', top: '0px', left: '0px', height: '3px'}}></span> : ''}
			<div className="card m_t_25">
				{/*HEADER*/}
				<div className="d_grid" style={{ gridTemplateColumns: '40% 60%' }}>
					<div className="grid_item"><h2 className="text_blue">Future  Forseight</h2></div>
					<div className="grid_item">
						<div className="input_m_div text_right">
							<button className="btn_submit cursor_pointer"><span className="download_i"></span> <small>Download Template File</small></button> &nbsp;&nbsp;&nbsp;
							<button className="btn_submit cursor_pointer"><span className="file_i"></span> <small>Export</small></button>
						</div>
					</div>
				</div>
				{/*DATA ARRAY MAPPING*/}
				<div className="d_grid m_t_30" style={{ gridTemplateColumns: '30% 30% 30%' , gap: '8% 4%', marginBottom: '8%' }}>
					{
						dataArr.map(function(obj, idx){
					         return (
					         	<div className="grid_item cursor_pointer" key={idx} onClick={() => setItemIndx(idx)}>
						         	<div className={`future_forsight_card card ${idx === itemIndx ? 'selected' : ''}`}>
						         		<img src={axios.defaults.baseURL+obj.img_path} alt="image" />
						         		<br/><br/>
						         		<h5 className="text_center">{obj.name}</h5>
						         	</div>
						        </div>
					         )
					    })
					}
				</div>
				{
					itemIndx === null ? '' :
					<div className="input_m_div text_right m_t_30">
						<button className="btn_cancel cursor_pointer" onClick={handDelete}><small>Delete Project</small></button>&nbsp;&nbsp;&nbsp;
						<button className="btn_submit cursor_pointer" onClick={() => setAllowEdit(true)}><small>Edit Project</small></button>
					</div>
				}
				{/*UPDATION MY PROJECT*/}
				{
					allowEdit ?
					<div className="future_form">
						<form onSubmit={ ( e ) => handleUpdate( e ) } action="" method="post" id="update_form" className="m_t_30">
				         	<div className="d_grid" style={{ gridTemplateColumns: '45% 45%' , gridGap: '10%' }}>
				         		<div className="grid_item">
				         			<div className="input_m_div">
				         				<label><b>Box Name</b></label>
				         				<input type="text" name="box_name" className="box_name" required defaultValue={dataArr[itemIndx].name} minLength="3" placeholder="Text" />
				         			</div>
				         		</div>
				         		<div className="grid_item">
				         			<div className="input_m_div">
				         				<label><b>Select New Image</b></label>
				         				<input type="file" name="box_img" className="box_img" />
				         			</div>
				         		</div>
				         	</div>
							<div className="input_m_div text_right m_t_20">
								<button className="btn_cancel cursor_pointer" onClick={() => setAllowEdit(false)}><small>Cancel</small></button>&nbsp;&nbsp;&nbsp;
								<button className="btn_submit cursor_pointer"><small>Update</small></button>
							</div>
						</form>
					</div> : ''
				}
				{/*FORM INSERTION*/}
				<div className="future_form">
					<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post" id="insert_form" className="m_t_30">
						{
							insertFormArr.map(function(obj, idx){
						         return (
						         	<div className="d_grid" key={idx} style={{ gridTemplateColumns: '45% 45%' , gridGap: '10%' }}>
						         		<div className="grid_item">
						         			<div className="input_m_div">
						         				<label><b>Box {idx+1}</b></label>
						         				<input type="text" name="box_name[]" className="box_name" required minLength="3" placeholder="Text" />
						         			</div>
						         		</div>
						         		<div className="grid_item">
						         			<div className="input_m_div">
						         				<label><b>Image {idx+1}</b></label>
						         				<input type="file" name="box_img[]" className="box_img" required />
						         			</div>
						         		</div>
						         	</div>
						         )
						    })
						}
						<div className="input_m_div text_right m_t_20">
							{ insertFormArr.length > 1 ? <button className="btn_submit cursor_pointer" onClick={() =>setInsertFormArr((oldVals) => oldVals.filter((_, i) => i !== oldVals.length - 1))} type="button"><span className="minus_i">-</span></button> : '' }&nbsp;&nbsp;&nbsp;
							<button className="btn_submit cursor_pointer" onClick={() => setInsertFormArr(oldVals => [ ...oldVals, 1 ])} type="button"><span className="plus_i">+</span></button>&nbsp;&nbsp;&nbsp;
							<button className="btn_submit cursor_pointer" type="submit">Save</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}