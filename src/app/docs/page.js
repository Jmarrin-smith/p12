import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerSpec from "../api/swagger/route";
export default function ApiDocs() {
  return <SwaggerUI spec={swaggerSpec} />;
}
