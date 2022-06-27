import {useState,useEffect} from 'react'
import $ from "jquery";
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Part ({dataSetArr,getStakeHolders}) {
	const [dataArr,setDataArr] = useState([]);
	const [nowSet,setNowSet] = useState(false);
	const [isValError,setIsValError]= useState(false);
	const [maxThan100,setMaxThan100]= useState('');
	useEffect(() => {
		setDataArr(dataSetArr);
		$('#stake_update_comp').on('click','.update_grid_line .btn_remover',function (e) {
			e.stopPropagation();
			var numItems = $('form .update_grid_line').length;
			if (numItems > 1) $(this).parents('.update_grid_line').remove();
		});
		$('#stake_update_comp').on('click','.update_grid_line .btn_adder',function (e) {
			e.stopPropagation();
			$(this).parents('.d_grid').addClass('in_action');
			$(this).parents('.update_grid_line').clone().insertAfter("form .d_grid.in_action");
			$('.d_grid').removeClass('in_action');
		});
		setTimeout(() => { setNowSet(true); },700);
	},[]);
	const handleDelete = (id) => {
		Swal.fire({
			title: 'Do you want to delete this item?',
			confirmButtonText: 'Delete',
			showCancelButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				axios.get('api/getById/del_stake_holder/'+id).then(res => {
					getStakeHolders('update');
					Swal.fire('Your item is deleted successfully.', '', 'success')
				});
			}
			else Swal.fire('Your item is confirmly saved.', '', 'success')
		})
	};
	const handleSubmit = (e,id) => {
		e.preventDefault();
		var form = e.target;
		var data = new FormData(form);
		data.append( 'id', id );
		const labelValues = form.querySelectorAll("input[name='l_p_inpt[]']");
		var totalVal = 0;
		for (var a=0; a<labelValues.length; a++) {
			var thisVal = labelValues[a].value;
			totalVal = totalVal + parseInt(thisVal);
		}
		if (totalVal > 100) {
			setMaxThan100(totalVal-100+'%');
			setIsValError(true);setTimeout(() => { setIsValError(false) },2000);
			return false;
		}
		else if (totalVal < 100) {
			var emptyVal = 100-totalVal;
			data.append( 'l_t_inpt[]', '' );
			data.append( 'l_p_inpt[]', emptyVal );
			data.append( 'l_b_inpt[]', 'black' );
		}
		axios.post('api/only_post/update_stakeholder',data).then(res => {
			getStakeHolders('update');
		});
	};
	return (
		<div id="stake_update_comp">
			{isValError ? <div className="toast toast-error"><div className="toast-title">Error</div><div className="toast-message">Your percentage value is <b>{maxThan100}</b> than <b>100</b>.</div></div> : ''}
			{nowSet ?
				dataArr.map(function(obj,ind) {
					return (
						<div className="future_form" key={ind}>
							<h2>Update Lavel {ind + 1}</h2><br/>
							<form onSubmit={ ( e ) => handleSubmit( e,obj.id ) } action="" method="post">
								{
									obj.labels.map(function (obj2,ind2) {
										return (
						 		        	<div className="d_grid update_grid_line" style={{ gridTemplateColumns: '24% 24% 24% 22%' , gridGap: '4%' }} key={ind2}>
								         		<div className="grid_item">
								         			<div className="input_m_div"><input type="text" maxLength="35" defaultValue={obj2} name="l_t_inpt[]" required placeholder="Text" /></div>
								         		</div>
								         		<div className="grid_item">
								         			<div className="input_m_div"><input type="number" defaultValue={obj.data[ind2]} name="l_p_inpt[]" required placeholder="Percentage" /></div>
								         		</div>
								         		<div className="grid_item">
								         			<div className="input_m_div">
								         				<select name="l_b_inpt[]" required defaultValue={obj.backgroundColor[ind2]}>
									         				<option value="#565049">Dark</option>
									         				<option value="#274e94">Navy Blue</option>
									         				<option value="#bf9000">Dark Yellow</option>
								         				</select>
								         			</div>
								         		</div>
								         		<div className="grid_item">
								         			<div className="input_m_div text_center">
								         				<button className="btn_submit cursor_pointer btn_remover" type="button">-</button> &nbsp;&nbsp;
								         				<button className="btn_submit cursor_pointer btn_adder" type="button">+</button>
								         			</div>
								         		</div>
								         	</div>
										)
									})
								}
								<div className="input_m_div text_right m_t_20">
									<button className="btn_cancel cursor_pointer" onClick={() => handleDelete(obj.id)} type="button">Delete Lavel {ind + 1}</button> &nbsp;&nbsp;&nbsp;&nbsp;
									<button className="btn_submit cursor_pointer" type="submit">Update</button>
								</div>
							</form>
						</div>
					)
				})
			: ''}
		</div>
	)
};