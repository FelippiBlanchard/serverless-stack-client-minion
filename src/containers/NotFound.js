import React from "react";
import "./NotFound.css";
import { Button } from '@material-ui/core';

export default function NotFound() {
  return (
    <div className="NotFound text-center">
      <h3>Lamento, esta página não existe !</h3>
      <div className="Home">
      <div className="py-3">
        <div class="d-flex justify-content-center">
          <Button component={Link} to="/" variant="contained" color="primary">Inicio</Button>
        </div>
      </div>
    </div>
    </div>
  );
}