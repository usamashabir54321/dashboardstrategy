import {useEffect} from 'react'
import $ from "jquery";

export default function ChildPart ({handleSubmit}) {
	useEffect(() => {
		$('form').on('click','.btn_remover',function () {
			var numItems = $('form .insert_grid_line').length;
			if (numItems > 1) $(this).parents('.insert_grid_line').remove();
		});
		$('form').on('click','.btn_adder',function () {
			$(this).parents('.d_grid').addClass('in_action');
			$(this).parents('.insert_grid_line').clone().insertAfter("form .d_grid.in_action");
			$('.d_grid').removeClass('in_action');
		});
	},[]);
	return (
		<div className="future_form" id="insert_f_grid">
			<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post" className="m_t_30">
		        <div className="d_grid insert_grid_line" style={{ gridTemplateColumns: '6% 27% 27% 12% 0%' , gridGap: '5%' }}>
	        		<div className="grid_item"></div>
	         		<div className="grid_item">
	         			<div className="input_m_div"><input type="text" maxLength="35" name="label_inpt[]" required placeholder="Text" /></div>
	         		</div>
	         		<div className="grid_item">
	         			<div className="input_m_div"><input type="number" name="value_inpt[]" required placeholder="Percentage" /></div>
	         		</div>
	         		<div className="grid_item">
	         			<div className="input_m_div text_center">
	         				<button className="btn_submit cursor_pointer btn_remover" type="button">-</button> &nbsp;&nbsp;
	         				<button className="btn_submit cursor_pointer btn_adder" type="button">+</button>
	         			</div>
	         		</div>
	         		<div className="grid_item"></div>
	         	</div>
				<div className="input_m_div text_right m_t_20">
					<button className="btn_submit cursor_pointer" type="submit">Save</button>
				</div>
			</form>
		</div>
	)
};