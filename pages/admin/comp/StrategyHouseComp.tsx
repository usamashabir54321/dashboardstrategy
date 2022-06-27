import {useSelector} from 'react-redux'
import TreeNode from './parts/TreeNode.tsx'
import Link from 'next/link'

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
						<Link href="profile"><button className="btn_submit cursor_pointer">Save Your Mission</button></Link>
					</div>
				}<br />
			</div>
			<div className="card m_t_25">
				<h2 className="text_blue">Vision</h2><br />
				{
					auth_u.vision ? <h4>{auth_u.vision}</h4> :
					<div className="input_m_div m_t_20">
						<Link href="profile"><button className="btn_submit cursor_pointer">Save Your Vision</button></Link>
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