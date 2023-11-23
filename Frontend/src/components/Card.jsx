import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "../styles/card.css";

function CardContainer() {
  return (
    <>
    
    <div className="cardsContainer">
    <Row xs={1} md={3} className="g-4">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Col key={idx}>
          <Card className="custom-card">
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title className="card-title">Card title</Card.Title>
              <Card.Text className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                <p>jhgfrtyuiolkuytgfghjiuytrttfytyttrdrtrssr</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
   
    </>
  );
}

export default CardContainer;