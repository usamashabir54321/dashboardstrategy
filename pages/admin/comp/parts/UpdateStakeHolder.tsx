import {useState,useEffect} from 'react'
import $ from "jquery";
import axios from 'axios'

export default function Part ({dataSetArr,getStakeHolders}) {
	const [dataArr,setDataArr] = useState([]);
	useEffect(() => {
		setDataArr(dataSetArr);
		$('form').on('click','.btn_remover',function () {
			var numItems = $('form .inputs_grid_line').length;
			if (numItems > 1) $(this).parents('.inputs_grid_line').remove();
		});
		$('form').on('click','.btn_adder',function () {
			$(this).parents('.d_grid').addClass('in_action');
			$(this).parents('.inputs_grid_line').clone().insertAfter("form .d_grid.in_action");
			$('.d_grid').removeClass('in_action');
		});
	},[]);
	const handleDelete = (id) => {
		axios.get('api/getById/del_stake_holder/'+id).then(res => {
			getStakeHolders();
		});
	};
	const handleSubmit = (e,id) => {
		e.preventDefault();
		var form = e.target;
		var data = new FormData(form);
		data.append( 'id', id );
		axios.post('api/only_post/update_stakeholder',data).then(res => {
			getStakeHolders();
		});
	};
	return (
		<>
			{
				dataArr.map(function(obj,ind) {
					return (
						<div className="future_form">
							<h2>Update Lavel {ind + 1}</h2><br/>
							<form onSubmit={ ( e ) => handleSubmit( e,obj.id ) } action="" method="post">
								{
									obj.labels.map(function (obj2,ind2) {
										return (
						 		        	<div className="d_grid inputs_grid_line" style={{ gridTemplateColumns: '24% 24% 24% 22%' , gridGap: '4%' }}>
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
			}
		</>
	)
};