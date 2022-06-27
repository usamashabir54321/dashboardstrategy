import {useSelector} from 'react-redux'
import TreeNode from './parts/TreeNode.tsx'

export default function Comp ({nameId,props}) {
	const adminReducerData = useSelector((state) => state.adminStore);
	const { auth_u } = adminReducerData;
	return (
		<>
			<div className="card m_t_25">
				<h2 className="text_blue">Mission</h2><br />
				{
					auth_u.mission ? <h4>{auth_u.mission}</h4> :
					<div className="input_m_div m_t_20">
						<props.Link href="profile"><button className="btn_submit cursor_pointer">Save Your Mission</button></props.Link>
					</div>
				}<br />
			</div>
			<div className="card m_t_25">
				<h2 className="text_blue">Vision</h2><br />
				{
					auth_u.vision ? <h4>{auth_u.vision}</h4> :
					<div className="input_m_div m_t_20">
						<props.Link href="profile"><button className="btn_submit cursor_pointer">Save Your Vision</button></props.Link>
					</div>
				}<br />
			</div>
			{/*CREATING TREE NODE*/}
			<div className="card m_t_25">
				<h2 className="text_blue">Strategy House</h2><br/>
				<TreeNode nameId={nameId} apiParam="cat_strategy" props={props} />
		    </div>
		</>
	)
}