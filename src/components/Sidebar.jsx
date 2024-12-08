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
import { ListGroup, Card, Button, Form, Modal } from 'react-bootstrap';
import '../index.css';

const Sidebar = ({ selectedNode, nodes, onAddNode, setModalActive }) => {
  const [showModal, setShowModal] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [parentId, setParentId] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
    setModalActive(true); // Notify the parent to dim the background
    document.body.style.overflow = 'hidden'; // Disable body scrolling and layout shifting
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
    setModalActive(false); // Notify the parent to restore the background
    document.body.style.overflow = ''; // Restore body scrolling
  };
  const handleAddNode = () => {
    if (newNodeLabel && parentId) {
      onAddNode(newNodeLabel, parentId);
      setNewNodeLabel('');
      setParentId('');
      handleCloseModal();
    }
  };

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

  return (
    <Card>
      <Card.Body>
        <h3>
          <b>{label}</b>
        </h3>
        <p>{citation}</p>
        <h4>
          <b>Next Options:</b>
        </h4>
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
          onClick={handleOpenModal}
          style={{ marginTop: '1rem' }}
        >
          + Add Node
        </Button>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Node</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  <option value="">Select the node</option>
                  {nodes.map((node) => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddNode}>
              Confirm Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
