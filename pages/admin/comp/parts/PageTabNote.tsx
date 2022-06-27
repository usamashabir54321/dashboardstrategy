import { useState,useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Part ({nameId,tab}) {
	const [pageTabNote,setPageTabNote] = useState('');
	const [updateTabNote,setUpdateTabNote] = useState(false);
	useEffect(() => {
		gettingTabNote();
	},[]);
	const gettingTabNote = () => {
		var data = new FormData();
		data.append( 'tab', tab );
		data.append( 'name_id', nameId );
		axios.post('api/only_post/get_tab_note',data).then(res => {
			setPageTabNote(res.data.note_name);
		});
	};
	const handleUpdate = (e) => {
		e.preventDefault();
		var data = new FormData(e.target);
		data.append( 'tab', tab );
		data.append( 'name_id', nameId );
		Swal.showLoading();
		axios.post('api/only_post/update_tab_note',data).then(res => {
			Swal.close();
			setUpdateTabNote(false);
			setPageTabNote(res.data);
		});
	};
	return (
		<>
			{
				updateTabNote ?
				<form onSubmit={ ( e ) => handleUpdate( e ) } action="" method="post">
		         	<div className="d_grid" style={{ gridTemplateColumns: '25% 25% 25% 10%' , gridGap: '0%' }}>
		         		<div className="grid_item"></div>
		         		<div className="grid_item">
		         			<div className="input_m_div">
		         				<input type="text" name="tab_note_txt" className="box_name" defaultValue={pageTabNote} required minLength="3" placeholder="Update Note Text" />
		         			</div>
		         		</div>
		         		<div className="grid_item">
		         			<div className="input_m_div text_center">
		         				<button className="btn_cancel cursor_pointer" onClick={() => setUpdateTabNote(false)}><small>Cancel</small></button>&nbsp;&nbsp;&nbsp;
		         				<button className="btn_submit cursor_pointer"><small>Update</small></button>
		         			</div>
		         		</div>
		         		<div className="grid_item"></div>
		         	</div>
				</form>
				:
				<label className="text_blue">
					{pageTabNote} &nbsp; 
					<button className="edit_profile_icon" onClick={() => setUpdateTabNote(true)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 15 15">
							<path d="M4.45437 14.1012L0 15L0.89875 10.545L4.45437 14.1012ZM5.33813 13.2175L12.3556 6.20188L8.79938 2.64437L1.7825 9.66125L5.33813 13.2175ZM11.4431 0L9.68312 1.76062L13.24 5.3175L15 3.55562L11.4431 0V0Z"></path>
						</svg>
					</button>
				</label>
			}
		</>
	)
};