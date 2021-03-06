import Layout from './layout.tsx'
import AdminHeader from './comp/AdminHeader.tsx'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect, useRef} from 'react'
import {setAuthUser} from '../../store/actions/adminActions'
import axios from 'axios'

export default function Page (props) {
	const adminReducerData = useSelector((state) => state.adminStore);
	const [personalTab,setPersonalTab] = useState(false);
	const [mission,setMission] = useState('');
	const [vision,setVision] = useState('');
	const [company,setCompany] = useState('');
	const [name,setName] = useState('');
	const [email,setEmail] = useState('');
	const [contact,setContact] = useState('');
	const { auth_u } = adminReducerData;
	const dispatch = useDispatch();
	const userImgRef = useRef(null);
	const [selectedImage, setSelectedImage] = useState();
	useEffect(() => {
		setMission(auth_u.mission);
		setVision(auth_u.vision);
		setCompany(auth_u.company);
		setName(auth_u.name);
		setEmail(auth_u.email);
		setContact(auth_u.contact);
	},[]);
	const handleSubmit = (e) => {
		e.preventDefault();props.Swal.showLoading();
		let data = new FormData();
		if(mission == null) data.append( 'mission', '' );else data.append( 'mission', mission );
		if(vision == null) data.append( 'vision', '' ); else data.append( 'vision', vision );
		if(company == null) data.append( 'company', '' ); else data.append( 'company', company );
		axios.post('api/only_post/edit_comp_profile',data).then(res => {
			dispatch(setAuthUser(res.data.data.new_user));
			props.Swal.close();
			if( res.data.message == 'form_saved' ) props.Toast.fire({icon: 'success',title: 'Changes are saved successfully.'});
		});
	}
	const handleSubmitTwo = (e) => {
		e.preventDefault();props.Swal.showLoading();
		let data = new FormData();
		data.append( 'name', name );
		data.append( 'contact', contact );
		axios.post('api/only_post/edit_personal_profile',data).then(res => {
			dispatch(setAuthUser(res.data.data.new_user));
			props.Swal.close();
			if( res.data.message == 'form_saved' ) props.Toast.fire({icon: 'success',title: 'Changes are saved successfully.'});
			setTimeout(() => {setPersonalTab(!personalTab);},1000);
		});
	}
	const imageChangeEvent = (e) => {
		if (userImgRef.current.files && userImgRef.current.files.length > 0) setSelectedImage(userImgRef.current.files[0]);
	};
	const submitImageChange = (e) => {
		e.preventDefault();props.Swal.showLoading();
		let data = new FormData();
		data.append( 'u_profile_img', userImgRef.current.files[0] );
		data.append( 'prev_profile_img', auth_u.img_path );
		axios.post('api/only_post/edit_profile_img',data).then(res => {
			dispatch(setAuthUser(res.data.data.new_user));
			props.Swal.close();
			if( res.data.message == 'form_saved' ) props.Toast.fire({icon: 'success',title: 'Changes are saved successfully.'});
			setTimeout(() => {setSelectedImage();},1000);
		});
	}
	const allowPersonalProfile = () => {
		setPersonalTab(!personalTab);
		setSelectedImage();
	};
	return (
		<>
			<props.Head>
				<title>Admin Edit Profile | Dashboard Strategy</title>
				<meta name="Admin Home" content="Admin Home,Dashboard Strategy" />
			</props.Head>
			{/*PAGE HEADER*/}
			<AdminHeader pageTitle="Edit Profile" props={props} />
			{/*PAGE BODY*/}
			<div className="d_content">
				<div className="d_grid gap_l_30 gap_s_20" id="profile_pg" style={{ gridTemplateColumns: 'auto auto' }}>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue">
							Company Profile &nbsp; 
							<button className="edit_profile_icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15">
									<path d="M4.45437 14.1012L0 15L0.89875 10.545L4.45437 14.1012ZM5.33813 13.2175L12.3556 6.20188L8.79938 2.64437L1.7825 9.66125L5.33813 13.2175ZM11.4431 0L9.68312 1.76062L13.24 5.3175L15 3.55562L11.4431 0V0Z"></path>
								</svg>
							</button>
						</h2><br />
						<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post">
							<div className="input_m_div">
								<label><b>Mission Statement</b></label>
								<textarea value={mission} onChange={(e) => setMission(e.target.value)} rows="4" placeholder="Text"></textarea>
							</div>
							<div className="input_m_div">
								<label><b>Vision Statement</b></label>
								<textarea value={vision} onChange={(e) => setVision(e.target.value)} rows="4" placeholder="Text"></textarea>
							</div>
							<div className="input_m_div">
								<label><b>About Company</b></label>
								<textarea value={company} onChange={(e) => setCompany(e.target.value)} rows="4" placeholder="Text"></textarea>
							</div>
							<div className="input_m_div text_right">
								<button className="btn_submit cursor_pointer" type="submit">Save</button>
							</div>
						</form>
					</div>
					<div className="grid_item card m_t_25">
						<h2 className="text_blue cursor_pointer" onClick={allowPersonalProfile}>
							Personal Profile &nbsp; 
							<button className="edit_profile_icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15">
									<path d="M4.45437 14.1012L0 15L0.89875 10.545L4.45437 14.1012ZM5.33813 13.2175L12.3556 6.20188L8.79938 2.64437L1.7825 9.66125L5.33813 13.2175ZM11.4431 0L9.68312 1.76062L13.24 5.3175L15 3.55562L11.4431 0V0Z"></path>
								</svg>
							</button>
						</h2><br />
						{
							personalTab ?
							<form onSubmit={ ( e ) => handleSubmitTwo( e ) } action="" method="post">
								<div className="input_m_div">
									<label><b>Name</b></label>
									<input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" required minLength="3" maxLength="30" />
								</div>
								<div className="input_m_div">
									<label><b>Contact</b></label>
									<input value={contact} onChange={(e) => setContact(e.target.value)} type="tel" name="name" required minLength="5" maxLength="20" />
								</div>
								<div className="input_m_div text_right">
									<button className="btn_submit cursor_pointer" type="submit">Save</button>
								</div>
							</form>
							:
							<div id="user_detials">
								<div className="text_center m_t_10 cursor_pointer" id="u_h_img" onClick={() => userImgRef.current.click()}>
									{
										selectedImage ? <img src={URL.createObjectURL(selectedImage)} alt="image" /> :
										auth_u.img_path != undefined ? <img src={axios.defaults.baseURL+auth_u.img_path} alt="image" /> :
										<img src="/assets/img/admin_avatar.png" alt="image" />
									}
								</div>
								<input type="file" accept="image/*" ref={userImgRef} style={{display: "none"}} onChange={imageChangeEvent}/>
								<ul className="u_info_ul">
									<li>
										<div className="d_grid" style={{ gridTemplateColumns: '20% 40% 40%' , gridGap: '20px' }}>
											<div className="grid_item"></div>
											<div className="grid_item info_type">Name:</div>
											<div className="grid_item type_text">{auth_u.name}</div>
										</div>
									</li>
									<li>
										<div className="d_grid" style={{ gridTemplateColumns: '20% 40% 40%' , gridGap: '20px' }}>
											<div className="grid_item"></div>
											<div className="grid_item info_type">Type:</div>
											<div className="grid_item type_text">{auth_u.role}</div>
										</div>
									</li>
									<li>
										<div className="d_grid" style={{ gridTemplateColumns: '20% 40% 40%' , gridGap: '20px' }}>
											<div className="grid_item"></div>
											<div className="grid_item info_type">Contact:</div>
											<div className="grid_item type_text">{auth_u.contact}</div>
										</div>
									</li>
									<li>
										<div className="d_grid" style={{ gridTemplateColumns: '20% 40% 40%' , gridGap: '20px' }}>
											<div className="grid_item"></div>
											<div className="grid_item info_type">Email:</div>
											<div className="grid_item type_text">{auth_u.email}</div>
										</div>
									</li>
								</ul>
								{
									selectedImage ? 
									<div className="input_m_div text_right m_t_10">
										<button className="btn_submit cursor_pointer" type="button" onClick={ ( e ) => submitImageChange( e ) }>Save</button>
									</div> : ''
								}
							</div>
						}

					</div>
				</div>
			</div>
		</>
	)
}

Page.layout = Layout