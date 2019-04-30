import React, { Component } from 'react';
import './app.css';
import {
  Row, Col,
  Table
} from 'reactstrap';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filters: [
        { field: "organization_id" }
      ]
    };
  }

  componentDidMount() {
    this.getAllContacts();
  }

  getAllContacts() {
    axios.get(`/contacts/`)
      .then(res => {
        console.log(res);
        this.setState({
          contacts: res.data.organizations
        })
      })
  }

  render() {
    return (
      <div>
        <Row align="center" className="header">Contacts List</Row>
        <Grid
          style={{ height: '100%', fontSize: "18px" }}
          data={filterBy(this.state.contacts, this.state.filter)}
          filterable
          filter={this.state.filter}
          onFilterChange={(e) => {
            this.setState({
              filter: e.filter
            });
          }}
        >
          <Column field="organization_id" title="Organization Id" />
          <Column field="name" title="Name" />
          <Column field="contact_name" title="Contact Name" />
          <Column field="email" title="Email" />
          <Column field="plan_name" title="Plan Name" />
        </Grid>
      </div>
    );
  }
}
