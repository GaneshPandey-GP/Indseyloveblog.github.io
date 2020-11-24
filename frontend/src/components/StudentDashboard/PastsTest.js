import React from "react";
import { Button } from "@material-ui/core";

export default function PastsTests() {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Test Name</th>
            <th scope="col">Subjects</th>
            <th scope="col">Ends On</th>
            <th scope="col">Check Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">CPP Basic</th>
            <td>CPP</td>
            <td>2021-12-17</td>
            <td>
              <Button variant="contained" color="primary">
                Summary
              </Button>
            </td>
          </tr>
          <tr>
            <th scope="row">CPP Basic</th>
            <td>CPP</td>
            <td>2021-12-17</td>
            <td>
              <Button variant="contained" color="primary">
                Summary
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
