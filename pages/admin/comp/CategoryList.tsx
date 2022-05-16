import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Comp ({tab,selectTabPage}) {
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
	useEffect(() => {
		getingTabCats();
	},[]);
	const getingTabCats = () => {
		axios.get('api/getById/get_pro_cats/'+tab).then(res => {
			setCatsArr(res.data);
		});
	};
	const handleSubmitCat = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append( 'catName', catName );
		data.append( 'type', tab );
		axios.post('api/only_post/add_tab_cat',data).then(res => {
			setCatName('');
			setAddCat(false);
			setCatsArr(res.data);
		});
	}
	const handDeleteCat = (e,catId) => {
		e.stopPropagation();
		axios.get('api/getById/del_pro_cats/'+catId).then(res => { setCatsArr(res.data);setCatNamesArr([]);setCatId(''); });
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
		axios.post('api/only_post/update_tab_cat',data).then(res => {
			setThisCatId('');
			setThisCatName('');
			setCatsArr(res.data);
		});
	}
	const selectCat = (e,id) => {
		e.stopPropagation();
		setCatId(id);
		if(tab == "strategy_house") selectTabPage(id,tab); else axios.get('api/getById/get_cat_names/'+id).then(res => { setCatNamesArr(res.data); });
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
		axios.post('api/only_post/add_cat_names',data).then(res => {
			setNameTitle('');
			setAddCatNames(false);
			setCatNamesArr(res.data);
		});
	}
	const handDeleteName = (e,nameId) => {
		e.stopPropagation();
		axios.get('api/getById/del_cat_name/'+nameId).then(res => { setCatNamesArr(res.data); });
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
		axios.post('api/only_post/update_cat_names',data).then(res => {
			setThisNameId('')
			setCatNamesArr(res.data);
		});
	}
	return (
		<>
			{/*MAPPING CATS*/}
			{
				catsArr.map(function(obj, idx){
			         return (
			         	<li className={`catlist ${obj.id == catId ? 'selected' : ''}`} key={idx} onClick={(e) => selectCat(e,obj.id)}>
			         		<span className="i_left edit_i" onClick={(e) => updateThisCat(e,idx)}></span>
			         		<span className="i_left delete_i" onClick={(e) => handDeleteCat(e,obj.id)}></span>
			         		<h5>{obj.name}</h5>
			         	</li>
			         )
			    })
			}
			{/*IF ANY CAT FOR UPDATION*/}
			{
				!thisCatId ? '' :
				<form onSubmit={ ( e ) => handleUpdateCat( e ) } action="" method="post">
					<div className="input_m_div">
						<input value={thisCatName} onChange={(e) => setThisCatName(e.target.value)} type="text" placeholder="Type Category Name" required minLength="3" maxLength="30" />
					</div>
					<div className="input_m_div text_right">
						<button className="btn_submit cursor_pointer" type="submit"><small>Update</small></button>&nbsp;
						<button className="btn_cancel cursor_pointer" onClick={() => setThisCatId('')}><small>Cancel</small></button>
					</div>
				</form>
			}
			{/*IF WANT ADDING CAT*/}
			{
				!addCat ? <li className="add_list"><button className="add_btn" title="Add Category" onClick={() => setAddCat(true)}>+</button></li> :
				<form onSubmit={ ( e ) => handleSubmitCat( e ) } action="" method="post">
					<div className="input_m_div">
						<input onChange={(e) => setCatName(e.target.value)} type="text" placeholder="Type Category Name" required minLength="3" maxLength="30" />
					</div>
					<div className="input_m_div text_right">
						<button className="btn_submit cursor_pointer" type="submit"><small>Save</small></button>&nbsp;
						<button className="btn_cancel cursor_pointer" onClick={() => setAddCat(false)}><small>Cancel</small></button>
					</div>
				</form>
			}
			{/*MAPPING CATS NAMES*/}
			{
				catNamesArr.map(function(obj, idx){
			         return (
			         	<>
				         	<li className={`sublist ${obj.id == nameId ? 'selected' : ''}`} key={idx} onClick={(e) => selectName(e,obj.id)}>
				         		<span className="i_left edit_i" onClick={(e) => updateThisName(e,idx)}></span>
				         		<span className="i_left delete_i" onClick={(e) => handDeleteName(e,obj.id)}></span>
				         		<h5>{obj.name}</h5>
				         	</li>
				        </>
			         )
			    })
			}
			{/*IF ANY CAT NAME FOR UPDATION*/}
			{
				!thisNameId ? '' :
				<form onSubmit={ ( e ) => handleUpdateName( e ) } action="" method="post">
					<div className="input_m_div">
						<input value={thisNameTitle} onChange={(e) => setThisNameTitle(e.target.value)} type="text" placeholder="Type Name Title" required minLength="3" maxLength="30" />
					</div>
					<div className="input_m_div text_right">
						<button className="btn_submit cursor_pointer" type="submit"><small>Update</small></button>&nbsp;
						<button className="btn_cancel cursor_pointer" onClick={() => setThisNameId('')}><small>Cancel</small></button>
					</div>
				</form>
			}
			{/*IF WANT ADDING CAT NAMES*/}
			{
				addCatNames ? 
				<form onSubmit={ ( e ) => handleSubmitCatNames( e ) } action="" method="post">
					<div className="input_m_div">
						<input onChange={(e) => setNameTitle(e.target.value)} type="text" placeholder="Type Name Title" required minLength="3" maxLength="30" />
					</div>
					<div className="input_m_div text_right">
						<button className="btn_submit cursor_pointer" type="submit"><small>Save</small></button>&nbsp;
						<button className="btn_cancel cursor_pointer" onClick={() => setAddCatNames(false)}><small>Cancel</small></button>
					</div>
				</form> : ''
			}
			{catId && !addCatNames ? <li className="add_list"><button className="add_btn" title="Add Names" onClick={() => setAddCatNames(true)}>+</button></li> : ''}
		</>
	)
}