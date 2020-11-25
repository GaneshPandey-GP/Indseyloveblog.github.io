import React from "react";
import { Button } from "@material-ui/core";

export default function ActiveTest() {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Test Name</th>
            <th scope="col">Subjects</th>
            <th scope="col">Ends On</th>
            <th scope="col">Start Test</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">CPP Basic</th>
            <td>CPP</td>
            <td>2021-12-17</td>
            <td>
              <Button variant="contained" color="primary">
                Start
              </Button>
            </td>
          </tr>
          <tr>
            <th scope="row">CPP Basic</th>
            <td>CPP</td>
            <td>2021-12-17</td>
            <td>
              <Button variant="contained" color="primary">
                Start
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
