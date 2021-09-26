import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FileUploadComponent } from "./components/FileUploadComponent";

interface NoRosterPageComponentProps {}

export const NoRosterPageComponent: React.FC<NoRosterPageComponentProps> = (
  props,
) => {
  return (
    <Container>
      <Row
        className="align-items-center justify-content-md-center"
        style={{ height: "100%" }}
      >
        <Col md={6}>
          <Row>
            <Col md={12}>
              <h1 className={"no-roster-page-header"}>Betterscribe</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={"no-roster-page-header"}>
                Upload a .rosz file to get started
              </div>
              <FileUploadComponent />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
