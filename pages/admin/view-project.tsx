import Head from 'next/head'
import Layout from './layout.tsx'
import AdminHeader from './comp/AdminHeader.tsx'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import {useDispatch} from 'react-redux'
import {setPorject} from '../../store/actions/adminActions'

export default function Page () {
	const [dataArr,setDataArr] = useState([]);
	const [reqPending,setReqPending] = useState(false);
	const [searchStr,setSearchStr] = useState('');
	const router = useRouter();
	const dispatch = useDispatch();
	useEffect(() => {
		getData();
	},[]);
	const getData = () => {
		axios.get('api/only_get/get_projects').then(res => {
			setDataArr(res.data);
		});
	};
	const handleUpdate = (obj) => {
		dispatch(setPorject(obj));
		router.push('/admin/create-project');
	};
	const handleDelete = (id) => {
		setReqPending(true);
		axios.get('api/getById/del_project/'+id).then(res => {
			setDataArr(res.data);setReqPending(false);
		});
	};
	const handleSearch = (str) => {
		setReqPending(true);
		if (str) {
			axios.get('api/getById/search_project/'+str).then(res => {
				setDataArr(res.data);setReqPending(false);
			});
		} else {getData();setReqPending(false);}
	};
	return (
		<>
			<Head>
				<title>Admin View Projects | Dashboard Strategy</title>
				<meta name="Admin View Project" content="Admin View Project,Dashboard Strategy" />
			</Head>
			{/*PAGE HEADER*/}
			<AdminHeader pageTitle="View Projects" />
			{reqPending ? <span className="react-loading-skeleton green" style={{position: 'fixed', top: '0px', left: '0px', height: '3px'}}></span> : ''}
			{/*PAGE BODY*/}
			<div className="d_content card m_t_20">
				<div className="table_search">
					<img src="/assets/img/i_search.png" alt="icon" />
					<input type="text" placeholder="Search" onKeyUp={(e) => handleSearch(e.target.value)}/>
				</div>
				<table className="table_board text_center">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Category</th>
							<th width="30%">Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							dataArr.map(function (obj,indx) {
								return (
									<tr key={indx}>
										<td>{ indx+1 }</td>
										<td>{ obj.name }</td>
										<td>{ obj.cat_name }</td>
										<td>
											<button className="table_btn" style={{ background: '#E39601' }}><img src="/assets/img/t_file.png" alt="image" /></button>
											<button className="table_btn" style={{ background: '#2AD300' }}><img src="/assets/img/t_play.png" alt="image" /></button>
											<button className="table_btn" onClick={() => handleUpdate(obj)} style={{ background: '#29ABE2' }}><img src="/assets/img/t_edit.png" alt="image" /></button>
											<button className="table_btn" onClick={() => handleDelete(obj.id)} style={{ background: '#E80000' }}><img src="/assets/img/t_del.png" alt="image" /></button>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		</>
	)
}

Page.layout = Layout