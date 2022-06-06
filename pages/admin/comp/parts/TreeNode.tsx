import Validation from '../Validation.tsx'
import axios from 'axios'
import {useState,useEffect,useRef} from 'react'
import { ReactDiagram } from 'gojs-react';
import PageTabNote from './PageTabNote.tsx'

export default function Part ({nameId,apiParam}) {
	const [nodeDataArray, setNodeDataArray] = useState([]);
	const [linkDataArray, setLinkDataArray] = useState([]);
	const [isSavedId, setIsSavedId] = useState('');
	let [ alert, setAlert ] = useState('');
	const [reqPending,setReqPending] = useState(false);
	function initDiagram() {
		const $ = go.GraphObject.make;
		const diagram =
		$(go.Diagram,{
			'undoManager.isEnabled': true,
			'clickCreatingTool.archetypeNodeData': { text: 'new node', color: '#353535' },
			model: $(go.GraphLinksModel,{
				linkKeyProperty: 'key'
			})
		});
		diagram.nodeTemplate =
		$(go.Node, 'Auto',
			new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Shape, 'RoundedRectangle',{
				parameter1: 10,
				name: 'SHAPE',
				fill: '#353535',
				portId: "",
				strokeWidth: 0,
				fromLinkable: true,
				fromSpot: go.Spot.AllSides,
				toLinkable: true,
				toSpot: go.Spot.AllSides,
				cursor: "pointer"
			},
			new go.Binding('fill', 'color')),
			$(go.TextBlock,{
				margin: 8, font: "bold 16px sans-serif", stroke: "white", editable: true 
			},new go.Binding('text').makeTwoWay()
		));
		return diagram;
	}
	useEffect(() => {
		getCatStrategy();
	},[]);
	function getCatStrategy () {
		axios.get('api/getById/get_'+apiParam+'/'+nameId).then(res => {
			if (res.data) {
				setNodeDataArray(JSON.parse(res.data.text_nodes));
				setLinkDataArray(JSON.parse(res.data.text_links));
				setIsSavedId(res.data.id);
			} else setNodeDataArray([ { key: 0, text: 'Value 1' } ]);
		});
	};
	const diagramRef = useRef(null);
	const [skipsDiagramUpdate, setSkipsDiagramUpdate] = useState(false);
	const mapNodeKeyIdx = new Map();
	const mapLinkKeyIdx = new Map();
	refreshNodeIndex(nodeDataArray);
	refreshLinkIndex(linkDataArray);
	function refreshNodeIndex(nodeArr) {
		mapNodeKeyIdx.clear();
		nodeArr.forEach((n, idx) => {
			mapNodeKeyIdx.set(n.key, idx);
		});
	}
	function refreshLinkIndex(linkArr) {
		mapLinkKeyIdx.clear();
		linkArr.forEach((l, idx) => {
			mapLinkKeyIdx.set(l.key, idx);
		});
	}
	function handleModelChange(obj) {
		if (obj === null) return;
		const insertedNodeKeys = obj.insertedNodeKeys;
		const modifiedNodeData = obj.modifiedNodeData;
		const removedNodeKeys = obj.removedNodeKeys;
		const insertedLinkKeys = obj.insertedLinkKeys;
		const modifiedLinkData = obj.modifiedLinkData;
		const removedLinkKeys = obj.removedLinkKeys;
		let nodeArr = nodeDataArray.slice();
		let linkArr = linkDataArray.slice();
		const modifiedNodeMap = new Map();
		const modifiedLinkMap = new Map();
		let arrChanged = false;
		if (modifiedNodeData) {
			modifiedNodeData.forEach((nd) => {
				modifiedNodeMap.set(nd.key, nd);
				const idx = mapNodeKeyIdx.get(nd.key);
				if (idx !== undefined && idx >= 0) {
					nodeArr.splice(idx, 1, nd);
					arrChanged = true;
				}
			});
		}
		if (insertedNodeKeys) {
			insertedNodeKeys.forEach((key) => {
				const nd = modifiedNodeMap.get(key);
				const idx = mapNodeKeyIdx.get(key);
				if (nd && idx === undefined) {
					mapNodeKeyIdx.set(nd.key, nodeArr.length);
					nodeArr.push(nd);
					arrChanged = true;
				}
			});
		}
		if (removedNodeKeys) {
			nodeArr = nodeArr.filter((nd) => {
				if (removedNodeKeys.includes(nd.key)) {
					arrChanged = true;
					return false;
				}
				return true;
			});
			refreshNodeIndex(nodeArr);
		}
		if (modifiedLinkData) {
			modifiedLinkData.forEach((ld) => {
				modifiedLinkMap.set(ld.key, ld);
				const idx = mapLinkKeyIdx.get(ld.key);
				if (idx !== undefined && idx >= 0) {
					linkArr.splice(idx, 1, ld);
					arrChanged = true;
				}
			});
		}
		if (insertedLinkKeys) {
			insertedLinkKeys.forEach((key) => {
				const ld = modifiedLinkMap.get(key);
				const idx = mapLinkKeyIdx.get(key);
				if (ld && idx === undefined) {
					mapLinkKeyIdx.set(ld.key, linkArr.length);
					linkArr.push(ld);
					arrChanged = true;
				}
			});
		}
		if (removedLinkKeys) {
			linkArr = linkArr.filter((ld) => {
				if (removedLinkKeys.includes(ld.key)) {
					arrChanged = true;
					return false;
				}
				return true;
			});
			refreshLinkIndex(linkArr);
		}
		if (arrChanged) {
			setNodeDataArray(nodeArr);
			setLinkDataArray(linkArr);
			setSkipsDiagramUpdate(true);
		}
	}
	function saveModule () {
		let data = new FormData();
		data.append( 'node_data', JSON.stringify(diagramRef.current.props.nodeDataArray) );
		data.append( 'link_data', JSON.stringify(diagramRef.current.props.linkDataArray) );
		data.append( 'cat_id', nameId );
		if (isSavedId) data.append( 'id', isSavedId );
		setReqPending(true);
		axios.post('api/only_post/save_'+apiParam,data).then(res => { getCatStrategy();setAlert('form_saved');setTimeout(() => {setAlert('');setReqPending(false);},1000); });
	}
	return (
		<>
			<Validation alert={alert} />
			{reqPending ? <span className="react-loading-skeleton green" style={{position: 'fixed', top: '0px', left: '0px', height: '3px'}}></span> : ''}
			<ReactDiagram
				ref={diagramRef}
				initDiagram={initDiagram}
				divClassName='diagram-component'
				nodeDataArray = {nodeDataArray}
				onModelChange = {handleModelChange}
				linkDataArray = {linkDataArray}
		        style={{ width: '100%', height: '600px' }}
	        />
	        <br/>
	        <div className="input_m_div text_center m_t_10">
	        	{apiParam == 'cat_strategy' ? <PageTabNote nameId={nameId} tab="cat_note" /> : <PageTabNote nameId={nameId} tab="name_note" />}
	        </div>
	        <br/>
	        <ul style={{ marginLeft: '30px' }}>
	        	<li><small><b>Double click on node to edit text.</b></small></li>
	        	<li><small><b>Double click on frame for creating new node.</b></small></li>
	        	<li><small><b>Ctrl + Z for (Undo)</b></small></li>
	        	<li><small><b>Ctrl + Y for (Redo)</b></small></li>
	        	<li><small><b>For deleting link path / node select path / node and press delete.</b></small></li>
	        	<li><small><b>For zoom in / zoom out press Ctrl + Move Mouse Scroller</b></small></li>
	        </ul><br/>
	        <div className="input_m_div text_right">
	        	<button className="btn_submit cursor_pointer" type="button" onClick={saveModule}>{ isSavedId ? 'Update' : 'Save' }</button>
	        </div>
		</>
	)
};