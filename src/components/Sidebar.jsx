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


import React from 'react';
import { ListGroup, Card } from 'react-bootstrap';
import '../index.css';

const Sidebar = ({ selectedNode }) => {
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
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
