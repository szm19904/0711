/*import React from 'react';
import {ListGroup, Card} from 'react-bootstrap';

const Sidebar = ({selectedNode}) => {
  return (
    <Card>
      <Card.Body>
        <i>Select a node to see details</i>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;*/

import React, { useState } from 'react';
import { ListGroup, Card, Button, Form } from 'react-bootstrap';
import '../index.css';

const Sidebar = ({ selectedNode, nodes, onAddNode }) => {
  const [showInputFields, setShowInputFields] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [parentId, setParentId] = useState('');

  if (!selectedNode) {
    return (
      <Card>
        <Card.Body>
          <i>Select a node to see details</i>
        </Card.Body>
      </Card>
    );
  }

  const { label, citation, children } = selectedNode;

  const handleAddNode = () => {
    if (newNodeLabel && parentId) {
      onAddNode(newNodeLabel, parentId); 
      setNewNodeLabel('');
      setParentId('');
      setShowInputFields(false);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h3><b>{label}</b></h3>
        <p>{citation}</p>
        <h4><b>Next Options:</b></h4>
        <ListGroup>
          {children && children.length > 0 ? (
            children.map((child) => (
              <ListGroup.Item key={child.id}>{child.label}</ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No further options</ListGroup.Item>
          )}
        </ListGroup>

        <Button
          id="add-node-btn"
          onClick={() => setShowInputFields(!showInputFields)}
          style={{ marginTop: '1rem' }}
        >
          {showInputFields ? "Cancel" : "+ Add Node"}
        </Button>

        {showInputFields && (
          <Form style={{ marginTop: '5px' }}>
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
                <option value="">Select the node</option>
                {nodes.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button
              id="conf-node-btn"
              size="sm"
              onClick={handleAddNode}
            >
              Confirm Add
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
