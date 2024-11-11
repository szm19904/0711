import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import Nodes from '../components/Nodes';

import '../index.css';

const MindMap = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeSelect = (node) => {
    console.log(node);
    setSelectedNode(node);
  };

  return (
    <Container fluid className="mindmap-container">
      <Navigation />
      <Container className="inner-container">
        <Row>
          <Col sm={9} className="nodes-col">
            <Nodes onSelectNode={handleNodeSelect} />
          </Col>
          <Col sm={3} className="sidebar-col">
            <Sidebar selectedNode={selectedNode} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default MindMap;
