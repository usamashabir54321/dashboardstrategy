import {useState,useEffect} from 'react'
import $ from "jquery";

export default function ChildPart ({data,handleSubmit}) {
	const [labelsArr,setLabelsArr] = useState([]);
	useEffect(() => {
		setLabelsArr(data.labels);
		$('#update_f_grid').on('click','.btn_remover',function () {
			var numItems = $('form .update_grid_line').length;
			if (numItems > 1) $(this).parents('.update_grid_line').remove();
		});
		$('#update_f_grid').on('click','.btn_adder',function () {
			$(this).parents('.d_grid').addClass('in_action');
			$(this).parents('.update_grid_line').clone().insertAfter("form .d_grid.in_action");
			$('.d_grid').removeClass('in_action');
		});
	},[]);
	return (
		<div className="future_form" id="update_f_grid">
			<form onSubmit={ ( e ) => handleSubmit( e ) } action="" method="post" className="m_t_30">
        		{
        			labelsArr.map(function (obj2,ind2) {
        				return (
         		        	<div className="d_grid update_grid_line" style={{ gridTemplateColumns: '24% 24% 24% 22%' , gridGap: '4%' }} key={ind2}>
        		         		<div className="grid_item">
        		         			<div className="input_m_div"><input type="text" maxLength="35" defaultValue={obj2} name="l_t_inpt[]" required placeholder="Text" /></div>
        		         		</div>
        		         		<div className="grid_item">
        		         			<div className="input_m_div"><input type="number" defaultValue={data.data[ind2]} name="l_p_inpt[]" required placeholder="Percentage" /></div>
        		         		</div>
        		         		<div className="grid_item">
        		         			<div className="input_m_div">
        		         				<select name="l_b_inpt[]" required defaultValue={data.backgroundColor[ind2]}>
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
					<button className="btn_submit cursor_pointer" type="submit">Update</button>
				</div>
			</form>
		</div>
	)
};