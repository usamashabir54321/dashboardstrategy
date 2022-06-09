import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Comp ({projectId,tab,selectTabPage}) {
	const [addCat,setAddCat] = useState(false);
	const [catsArr,setCatsArr] = useState([]);
	const [catName,setCatName] = useState('');
	const [thisCatId,setThisCatId] = useState('');
	const [thisCatName,setThisCatName] = useState('');
	const [catId,setCatId] = useState('');
	const [catNamesArr,setCatNamesArr] = useState([]);
	const [addCatNames,setAddCatNames] = useState(false);
	const [nameTitle,setNameTitle] = useState('');
	const [thisNameId,setThisNameId] = useState('');
	const [thisNameTitle,setThisNameTitle] = useState('');
	const [nameId,setNameId] = useState('');
	const [reqPending,setReqPending] = useState(false);
	useEffect(() => {
		getingTabCats();
	},[]);
	const getingTabCats = () => {
		setReqPending(true);
		let data = new FormData();
		data.append( 'tab', tab );
		data.append( 'project_id', projectId );
		axios.post('api/only_post/get_pro_cats',data).then(res => {
			setCatsArr(res.data);setReqPending(false);
		});
	};
	const handleSubmitCat = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append( 'catName', catName );
		data.append( 'type', tab );
		data.append( 'project_id', projectId );
		setReqPending(true);
		axios.post('api/only_post/add_tab_cat',data).then(res => {
			setCatName('');
			setAddCat(false);
			setCatsArr(res.data);
			setReqPending(false);
		});
	}
	const handDeleteCat = (e,delCatId) => {
		e.stopPropagation();setReqPending(true);
		axios.get('api/getById/del_pro_cats/'+delCatId).then(res => {
			setCatsArr(res.data);setReqPending(false);
			if (delCatId == catId) {
				selectTabPage(null,'');setCatNamesArr([]);setCatId('');
			}
		});
	}
	const updateThisCat = (e,idx) => {
		e.stopPropagation();
		setThisCatId(catsArr[idx].id);
		setThisCatName(catsArr[idx].name);
	};
	const handleUpdateCat = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append( 'id', thisCatId );
		data.append( 'name', thisCatName );
		data.append( 'project_id', projectId );
		setReqPending(true);
		axios.post('api/only_post/update_tab_cat',data).then(res => {
			setThisCatId('');
			setThisCatName('');
			setCatsArr(res.data);
			setReqPending(false);
		});
	}
	const selectCat = (e,id) => {
		e.stopPropagation();
		if (id == catId) {
			setCatId('');
			setCatNamesArr([]);
		}
		else {
			setCatId(id);
			if(tab == "strategy_house") selectTabPage(id,tab); else axios.get('api/getById/get_cat_names/'+id).then(res => { setCatNamesArr(res.data); });
		}
		setAddCatNames(false);
	}
	const selectName = (e,id) => {
		e.stopPropagation();
		setNameId(id);
		selectTabPage(id,tab);
	}
	const handleSubmitCatNames = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append( 'name', nameTitle );
		data.append( 'cat_id', catId );
		setReqPending(true);
		axios.post('api/only_post/add_cat_names',data).then(res => {
			setNameTitle('');
			setAddCatNames(false);
			setCatNamesArr(res.data);
			setReqPending(false);
		});
	}
	const handDeleteName = (e,delNameId) => {
		e.stopPropagation();setReqPending(true);
		axios.get('api/getById/del_cat_name/'+delNameId).then(res => {
			setCatNamesArr(res.data);setReqPending(false);
			if (delNameId == nameId) selectTabPage(null,'');
		});
	}
	const updateThisName = (e,idx) => {
		e.stopPropagation();
		setThisNameId(catNamesArr[idx].id);
		setThisNameTitle(catNamesArr[idx].name);
	};
	const handleUpdateName = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append( 'id', thisNameId );
		data.append( 'name', thisNameTitle );
		setReqPending(true);
		axios.post('api/only_post/update_cat_names',data).then(res => {
			setThisNameId('')
			setCatNamesArr(res.data);
			setReqPending(false);
		});
	}
	return (
		<>
			{/*MAPPING CATS*/}
			{reqPending ? <span className="react-loading-skeleton green" style={{position: 'fixed', top: '0px', left: '0px', height: '3px'}}></span> : ''}
			{
				catsArr.map(function(obj1, idx1){
			         return (
			         	<div key={obj1.name}>
				         	<li className={`catlist ${obj1.id == catId ? 'selected' : ''}`} onClick={(e) => selectCat(e,obj1.id)}>
				         		<span className="i_left edit_i" onClick={(e) => updateThisCat(e,idx1)}></span>
				         		<span className="i_left delete_i" onClick={(e) => handDeleteCat(e,obj1.id)}></span>
				         		<h5>{obj1.name}</h5>
				         	</li>
				         	{
				         		obj1.id == thisCatId ?
				         		<ul>
				         			<form onSubmit={ ( e ) => handleUpdateCat( e ) } action="" method="post">
				         				<div className="input_m_div">
				         					<input value={thisCatName} onChange={(e) => setThisCatName(e.target.value)} type="text" placeholder="Type Category Name" required minLength="3" maxLength="70" />
				         				</div>
				         				<div className="input_m_div text_right">
				         					<button className="btn_submit cursor_pointer" type="submit"><small>Update</small></button>&nbsp;
				         					<button className="btn_cancel cursor_pointer" onClick={() => setThisCatId('')}><small>Cancel</small></button>
				         				</div>
				         			</form>
				         		</ul> : ''
				         	}
				        </div>
			         )
			    })
			}
			{/*MAPPING CATS NAMES*/}
			{
				catNamesArr.map(function(obj2, idx2){
			         return (
			         	<div key={obj2.name}>
				         	<li className={`sublist ${obj2.id == nameId ? 'selected' : ''}`} onClick={(e) => selectName(e,obj2.id)}>
				         		{
				         			tab == "swot" || tab == "tows" || tab == "multiple_dashboard" ? '' :
				         			<>
				         				<span className="i_left edit_i" onClick={(e) => updateThisName(e,idx2)}>
				         				</span><span className="i_left delete_i" onClick={(e) => handDeleteName(e,obj2.id)}></span>
				         			</>
				         		}
				         		<h5>{obj2.name}</h5>
				         	</li>
				         	{
				         		obj2.id == thisNameId ?
				         		<ul>
				         			<form onSubmit={ ( e ) => handleUpdateName( e ) } action="" method="post">
										<div className="input_m_div">
											<input value={thisNameTitle} onChange={(e) => setThisNameTitle(e.target.value)} type="text" placeholder="Type Name Title" required minLength="3" maxLength="70" />
										</div>
										<div className="input_m_div text_right">
											<button className="btn_submit cursor_pointer" type="submit"><small>Update</small></button>&nbsp;
											<button className="btn_cancel cursor_pointer" onClick={() => setThisNameId('')}><small>Cancel</small></button>
										</div>
									</form>
				         		</ul> : ''
				         	}
				        </div>
			         )
			    })
			}
			{/*IF WANT ADDING CAT NAMES*/}
			{
				addCatNames ? 
				<form onSubmit={ ( e ) => handleSubmitCatNames( e ) } action="" method="post">
					<div className="input_m_div">
						<input onChange={(e) => setNameTitle(e.target.value)} type="text" placeholder="Type Name Title" required minLength="3" maxLength="70" />
					</div>
					<div className="input_m_div text_right">
						<button className="btn_submit cursor_pointer" type="submit"><small>Save</small></button>&nbsp;
						<button className="btn_cancel cursor_pointer" onClick={() => setAddCatNames(false)}><small>Cancel</small></button>
					</div>
				</form> : ''
			}
			{
				tab == "strategy_house" || tab == "swot" || tab == "tows" || tab == "multiple_dashboard" ? '' :
				catId && !addCatNames ? <li className="add_list" onClick={() => setAddCatNames(true)} style={{ width:'65%',marginLeft:'35%' }}><h4>Add Name +</h4></li> : ''
			}
			{/*IF WANT ADDING CAT*/}
			{
				!addCat ? <li className="add_list" onClick={() => setAddCat(true)}><h4>Add Category +</h4></li> :
				<form onSubmit={ ( e ) => handleSubmitCat( e ) } action="" method="post">
					<div className="input_m_div">
						<input onChange={(e) => setCatName(e.target.value)} type="text" placeholder="Type Category Name" required minLength="3" maxLength="70" />
					</div>
					<div className="input_m_div text_right">
						<button className="btn_submit cursor_pointer" type="submit"><small>Save</small></button>&nbsp;
						<button className="btn_cancel cursor_pointer" onClick={() => setAddCat(false)}><small>Cancel</small></button>
					</div>
				</form>
			}
		</>
	)
}