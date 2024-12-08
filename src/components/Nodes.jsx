import React, { useState, useEffect } from 'react';
import nodesData from '../data/nodes.json';
import edgesData from '../data/edges.json';
import { Button, Card, Row, Container, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../index.css';

const buildTree = (nodes, edges) => {
  const nodesDict = nodes.reduce((acc, node) => {
    acc[node.id] = { ...node, children: [] };
    return acc;
  }, {});

  edges.forEach((edge) => {
    if (nodesDict[edge.from] && nodesDict[edge.to]) {
      nodesDict[edge.from].children.push(nodesDict[edge.to]);
    }
  });

  return nodesDict[1];
};

const Nodes = () => {
  const [treeData, setTreeData] = useState(null);
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);
  const [nodeHistory, setNodeHistory] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);  // State for hovered node
  const [modalActive, setModalActive] = useState(false);  // State to control modal backdrop effect

  useEffect(() => {
    const tree = buildTree(nodes, edges);
    setTreeData(tree);
  }, [nodes, edges]);

  const selectNode = (node) => {
    setNodeHistory((prevHistory) => [...prevHistory, node]);
    setTreeData(node);
    setSelectedNode(node);
  };

  const goBack = () => {
    if (nodeHistory.length > 1) {
      const previousNode = nodeHistory[nodeHistory.length - 2];
      setTreeData(previousNode);
      setNodeHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  };

  const handleAddNode = (newNodeLabel, parentId) => {
    const newId = nodes.length + 1;
    const newNode = {
      id: newId,
      label: newNodeLabel,
      shape: "circle",
      font: { size: 12 },
      children: []
    };

    const newEdge = { from: parseInt(parentId), to: newId };

    setNodes([...nodes, newNode]);
    setEdges([...edges, newEdge]);
    setModalActive(true);  // Activate modal when a new node is added
  };

  return (
    <Container className={modalActive ? 'modal-active' : ''}>
      <Row>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Row className="row-nodes">
                {treeData ? (
                  <Node nodeData={treeData} selectNode={selectNode} setHoveredNode={setHoveredNode} />
                ) : (
                  <p>Loading tree data...</p>
                )}
              </Row>

              {nodeHistory.length > 1 && (
                <Button
                  id='back-btn'
                  variant="secondary"
                  onClick={goBack}
                  style={{
                    marginTop: '1rem',
                    borderRadius: '8px',
                    padding: '6px 12px',
                  }}
                >
                  Back
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Sidebar
            selectedNode={hoveredNode || selectedNode}
            nodes={nodes}
            onAddNode={handleAddNode}
            setModalActive={setModalActive}  // Pass the setModalActive to Sidebar
          />
        </Col>
      </Row>
    </Container>
  );
};

const Node = ({ nodeData, selectNode, setHoveredNode }) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <Row>
      <center>
        <Button
          variant={showChildren ? 'primary' : 'light'}
          onClick={() => {
            setShowChildren(!showChildren);
            selectNode(nodeData);
          }}
          onMouseEnter={() => setHoveredNode(nodeData)}  // Trigger hover change
          onMouseLeave={() => setHoveredNode(null)}      // Reset when mouse leaves
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          {`${nodeData.label}`}
        </Button>
      </center>
      {showChildren && nodeData.children && nodeData.children.length > 0 && (
        <Row className="col-node">
          {nodeData.children.map((child) => (
            <div key={child.id} style={{ marginBottom: '1rem', flex: '1 1 0' }}>
              <Node nodeData={child} selectNode={selectNode} setHoveredNode={setHoveredNode} />
            </div>
          ))}
        </Row>
      )}
    </Row>
  );
};

export default Nodes;
