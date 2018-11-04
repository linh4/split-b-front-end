import React, { Component } from 'react';
import Form from '../components/Form'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchBill} from '../actions/billAction'
import { deleteItem } from '../actions/itemAction'

class FormContainer extends Component {

  componentDidMount() {
    let billId = this.props.match.params.id
    this.props.fetchBill(billId)
  }

  handleItemEdit = (e) => {
  }

  handleItemDelete = (id) => {
    this.props.deleteItem(id)
  }

  render() {
    if (this.props.items.length < 0) {
      return <div>Loading...</div>
    }
    const renderItems = this.props.items.map(item => {
      return (
        <div key={item.id}>
        {item.title} - ${item.price}
        <button onClick={this.handleItemEdit}>Edit</button>
        <button onClick={() => this.handleItemDelete(item.id)}>Delete</button>
      </div>
      )
    })
    return (
      <div>
        {renderItems}
        <button onClick={this.props.history.goBack}>Done</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside form container", state)
  return {
    bill: state.text.bill,
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, deleteItem})(FormContainer))