import {useState,useEffect} from 'react';
import axios from 'axios';
import ChildStrategyPart from './parts/ChildStrategyPart.tsx';

export default function Comp ({nameId}) {
	const [dataArr,setDataArr] = useState([]);
	const [txtInpt,setTxtInpt] = useState('');
	const [parent,setParent] = useState({});
	const [updateText,setUpdateText] = useState('');
	useEffect(() => {
		const getingData = () => {
			axios.get('api/getById/get_strategy_house/'+nameId).then(res => {
				setDataArr(res.data);
			});
		};
		getingData();
	},[]);
	const handleSubmit = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append( 'cat_id', nameId );
		data.append( 'text', txtInpt );
		data.append( 'parent_id', parent.id );
		axios.post('api/only_post/create_strategy_house',data).then(res => {
			setTxtInpt('');
			document.getElementById("insert_form").reset();
			setDataArr([]);
			getingData();
		});
	}
	const handleSubmitUpdate = (e) => {
		e.preventDefault();
		var data = new FormData();
		data.append( 'cat_id', nameId );
		data.append( 'text', updateText );
		data.append( 'id', parent.id );
		axios.post('api/only_post/update_strategy_house',data).then(res => {
			setParent({});
			setDataArr([]);
			getingData();
		});
	}
	const handDelete = () => {
		axios.get('api/getById/delete_strategy_house/'+parent.id).then(res => {
			setParent({});
			setDataArr([]);
			getingData();
		});
	}
	const selectParent = (obj) => {
		if(obj.id == parent.id) setParent({}); else setParent(obj);
		setUpdateText(obj.text);
	}
	return (
		<>
			<h2 className="text_blue">Strategy House</h2><br/>
			{/*SHOW MY STRATEGY HOUSE HIERARCHY*/}
			<div id="strategy_tree" className="m_t_30">
				<ul>
					{
						dataArr.map(function(obj, idx){
					         return (
					         	<>
						         	<li key={obj.id}>
						         		<div className={`box_btn ${obj.id == parent.id ? 'selected' : ''}`} onClick={() => selectParent(obj)}>{obj.text}</div>
						         		<ChildStrategyPart id={obj.id} />
						         	</li>
						        </>
					         )
					    })
					}
				</ul>
			</div><br/>
			{/*FORM INSERTION*/}
			<div className="future_form">
				<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post" id="insert_form" className="m_t_30">
		         	<div className="d_grid" style={{ gridTemplateColumns: '20% 30% 30% 10%' , gridGap: '6%' }}>
		         		<div className="grid_item"></div>
		         		<div className="grid_item">
		         			<div className="input_m_div">
		         				<label><b>Box Text</b></label>
		         				<input onChange={(e) => setTxtInpt(e.target.value)} type="text" placeholder="Type Text" required />
		         			</div>
		         		</div>
		         		<div className="grid_item">
		         			<div className="input_m_div m_t_20" style={{ paddingTop : '10px' }}>
		         				<button className="btn_submit cursor_pointer" type="submit">Save</button>
		         			</div>
		         		</div>
		         		<div className="grid_item"></div>
		         	</div>
				</form>
			</div>
			{/*FORM UPDATION*/}
			{
				parent.id ?
					<div className="future_form">
						<form onSubmit={ ( e ) => handleSubmitUpdate( e ) } action="" method="post" id="update_form" className="m_t_30">
				         	<div className="d_grid" style={{ gridTemplateColumns: '20% 30% 30% 10%' , gridGap: '6%' }}>
				         		<div className="grid_item"></div>
				         		<div className="grid_item">
				         			<div className="input_m_div">
				         				<label><b>Update Text</b></label>
				         				<input onChange={(e) => setUpdateText(e.target.value)} value={updateText} type="text" name="text" placeholder="Type Text" required />
				         			</div>
				         		</div>
				         		<div className="grid_item">
				         			<div className="input_m_div m_t_20" style={{ paddingTop : '10px' }}>
				         				<button className="btn_submit cursor_pointer" type="submit">Update</button>&nbsp;&nbsp;&nbsp;
				         				<button className="btn_cancel cursor_pointer" type="button" onClick={handDelete}>Delete</button>
				         			</div>
				         		</div>
				         		<div className="grid_item"></div>
				         	</div>
						</form>
					</div>
				: ''
			}
		</>
	)
}