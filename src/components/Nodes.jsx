import React, { useState, useEffect } from 'react';
import nodesData from '../data/nodes.json';
import edgesData from '../data/edges.json';
import { Button, Card, Row, Col, Container, Form } from 'react-bootstrap';
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

const Node = ({ nodeData, selectNode }) => {
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
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          {`${nodeData.label}`}
        </Button>
      </center>
      {showChildren && nodeData.children && nodeData.children.length > 0 && (
        <Row className="col-node">
          {nodeData.children.map((child) => (
            <div key={child.id} style={{ marginBottom: '1rem', flex: '1 1 0' }}>
              <Node nodeData={child} selectNode={selectNode} />
            </div>
          ))}
        </Row>
      )}
    </Row>
  );
};

const Nodes = ({ onSelectNode }) => {
  const [treeData, setTreeData] = useState(null);
  const [nodes, setNodes] = useState(nodesData);
  const [edges, setEdges] = useState(edgesData);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [parentId, setParentId] = useState('');
  const [showInputFields, setShowInputFields] = useState(false);

  useEffect(() => {
    const tree = buildTree(nodes, edges);
    setTreeData(tree);
  }, [nodes, edges]);

  const handleAddNode = () => {
    if (newNodeLabel && parentId) {
      const newId = nodes.length + 1;
      const newNode = {
        id: newId,
        label: newNodeLabel,
        shape: "circle",
        font: { size: 12 },
        children: []
      };

      const newEdge = { from: parseInt(parentId), to: newId };

      console.log('New Node Added:', newNode);
      console.log('New Edge:', newEdge); 
      console.log('Parent Node ID:', parentId);

      setNodes([...nodes, newNode]);
      setEdges([...edges, newEdge]);
      setNewNodeLabel(''); 
      setParentId('');
      setShowInputFields(false); 
    }
  };

  return (
    <Card>
      <Card.Body>
        <Container>
          <Button 
            id="add-node-btn"  
            onClick={() => setShowInputFields(!showInputFields)} 
            style={{ marginBottom: '1rem' }}
          >
            {showInputFields ? "Cancel" : "+ Add Node"}
          </Button>
          
          {showInputFields && (
            <Form>
              <Form.Group controlId="newNodeLabel">
                <Form.Label>Node Label</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter node label"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="parentId">
                <Form.Label>Select Parent Node</Form.Label>
                <Form.Control
                  as="select"
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                >
                  <option value="" >Select the node</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {`${node.label} `}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button id="add-node-btn" size="sm" onClick={handleAddNode}>
                Confirm Add
              </Button>
            </Form>
          )}
          
          <Row className="row-nodes">
            {treeData ? (
              <Node nodeData={treeData} selectNode={onSelectNode} />
            ) : (
              <p>Loading tree data...</p>
            )}
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Nodes;