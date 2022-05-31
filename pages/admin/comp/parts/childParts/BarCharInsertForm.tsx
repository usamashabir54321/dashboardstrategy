import {useEffect} from 'react'
import $ from "jquery";

export default function ChildPart ({handleSubmit}) {
	useEffect(() => {
		$('#insert_f_grid').on('click','.btn_remover',function () {
			var numItems = $('form .insert_grid_line').length;
			if (numItems > 1) $(this).parents('.insert_grid_line').remove();
		});
		$('#insert_f_grid').on('click','.btn_adder',function () {
			$(this).parents('.d_grid').addClass('in_action');
			$(this).parents('.insert_grid_line').clone().insertAfter("form .d_grid.in_action");
			$('.d_grid').removeClass('in_action');
		});
	},[]);
	return (
		<div className="future_form" id="insert_f_grid">
			<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post" className="m_t_30">
				<div className="d_grid text_center" style={{ gridTemplateColumns: '25% 25% 25% 19%' , gridGap: '2%' }}>
					<div className="grid_item">
						<div className="input_m_div">
							<label>Axis Labels</label>
						</div>
					</div>
					<div className="grid_item">
						<div className="input_m_div">
							<label>Achieved Value</label>
						</div>
					</div>
					<div className="grid_item">
						<div className="input_m_div">
							<label>Project Value</label>
						</div>
					</div>
					<div className="grid_item">
						<div className="input_m_div">
							<label>Actions</label>
						</div>
					</div>
				</div>
				<br/>
		        <div className="d_grid insert_grid_line text_center" style={{ gridTemplateColumns: '25% 25% 25% 19%' , gridGap: '2%' }}>
	        		<div className="grid_item">
	        			<div className="input_m_div"><input type="text" maxLength="35" name="axis_labels[]" required placeholder="Text" /></div>
	        		</div>
	         		<div className="grid_item">
	         			<div className="input_m_div"><input type="number" name="achieved_val[]" required placeholder="Percentage" max="100" /></div>
	         		</div>
	         		<div className="grid_item">
	         			<div className="input_m_div"><input type="number" name="project_val[]" required placeholder="Percentage" max="100" /></div>
	         		</div>
	         		<div className="grid_item">
	         			<div className="input_m_div">
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