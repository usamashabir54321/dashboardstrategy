import axios from 'axios'
import {useState,useEffect,useRef} from 'react'
import { ReactDiagram } from 'gojs-react';

export default function SubPart ({relateId,apiParam}) {
	const [nodeDataArray, setNodeDataArray] = useState([]);
	const [linkDataArray, setLinkDataArray] = useState([]);
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
				strokeWidth: 2,
				stroke: "white",
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
		getTreeData();
	},[]);
	function getTreeData () {
		axios.get('api/getById/get_'+apiParam+'/'+relateId).then(res => {
			if (res.data) {
				setNodeDataArray(JSON.parse(res.data.text_nodes));
				setLinkDataArray(JSON.parse(res.data.text_links));
			}
		});
	};
	return (
		<>
			<ReactDiagram
				initDiagram={initDiagram}
				divClassName='diagram-component'
				nodeDataArray = {nodeDataArray}
				linkDataArray = {linkDataArray}
		        style={{ width: '100%', height: '600px' }}
	        />
		</>
	)
};