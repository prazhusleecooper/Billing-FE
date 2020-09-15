import React, { Component } from 'react';
import {
    MDBContainer,
    MDBModal,
    MDBModalBody,
} from 'mdbreact';
import axios from 'axios';

import '../Resources/Styling/Bills.css';

const GLOBAL = require('../global');

class Bills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [
                {
                    id: 15997557501,
                    timeOfPurchase: 1599755750,
                    productsList: [
                        {
                            "productId": 1,
                            "productName": "ITEM 1",
                            "productPrice": 450.0,
                            "productTax": 2.0,
                            "productCode": 'PCD001',
                            "quantity": 2,
                            "totalPrice": 904.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                    ],
                    "grandTotal": 1465.0,
                    customer: {
                        "name": 'Prashanth',
                        email: 'prashanth5454@gmail.com',
                        phone: '9944411899',
                        code: 'CUS001',
                        address: '101, Ramachandra rd., R.S.Puram, Coimbatore - 2'
                    },
                },
                {
                    id: 15997557502,
                    timeOfPurchase: 1599755750,
                    productsList: [
                        {
                            "productId": 1,
                            "productName": "ITEM 1",
                            "productPrice": 450.0,
                            "productTax": 2.0,
                            "productCode": 'PCD001',
                            "quantity": 2,
                            "totalPrice": 904.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                    ],
                    "grandTotal": 1465.0,
                    customer: {
                        name: 'Prashanth',
                        email: 'prashanth5454@gmail.com',
                        phone: '9944411899',
                        code: 'CUS001',
                        address: '101, Ramachandra rd., R.S.Puram, Coimbatore - 2'
                    },
                },
                {
                    id: 15997557503,
                    timeOfPurchase: 1599755750,
                    productsList: [
                        {
                            "productId": 1,
                            "productName": "ITEM 1",
                            "productPrice": 450.0,
                            "productTax": 2.0,
                            "productCode": 'PCD001',
                            "quantity": 2,
                            "totalPrice": 904.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                          {
                            "productId": 2,
                            "productName": "ITEM 2",
                            "productPrice": 550.0,
                            "productTax": 2.0,
                            "productCode": 'PCD002',
                            "quantity": 1,
                            "totalPrice": 552.0,
                          },
                    ],
                    "grandTotal": 1465.0,
                    customer: {
                        name: 'Prashanth',
                        email: 'prashanth5454@gmail.com',
                        phone: '9944411899',
                        code: 'CUS001',
                        address: '101, Ramachandra rd., R.S.Puram, Coimbatore - 2'
                    },
                }
            ],
            selectedBill: '',
            billModal: false,
        };
    }

    // ? NON-RENDERING METHODS
    // * Select a Bill
    selectBill = (selectedBill) => {
        this.setState({
            selectedBill: selectedBill,
            billModal: !this.state.billModal,
        });
    } // * End of selectBill Method

    toggleBillInfoModal = () => {
        this.setState({
          billModal: !this.state.billModal,
          selectedBill: '',
        });
      }
    
    // ? RENDERING METHODS
    // * Render the Bills Table
    renderBillsTable = () => {
       if(this.state.bills === []) {
           return(
               <div>
                   No bills yet. Please select a different date.
               </div>
           )
       } else {
           return (
            <div className='bills-table-section'>
                <table className='bills-table'>
                    <tr className='bills-table-heading-row'>
                        <td className='bills-table-heading-cell sno'>Sno</td>
                        <td className='bills-table-heading-cell billId'>Bill ID</td>
                        <td className='bills-table-heading-cell TOP'>Time of Purchase</td>
                        <td className='bills-table-heading-cell grandTotal'>Grand Total</td>
                    </tr>

                    {
                        this.renderBillTableItems()
                    }
                </table>
            </div>
           );
       }
    } // * End of renderBillsTable
    
    // * Render the Bill Table Items
    renderBillTableItems = () => {
       let bills = this.state.bills;
       if(bills !== []) {
        return bills.map((bill, index) => {
            return(
                <tr 
                    className='bills-table-data-row'
                    onClick={ () => this.selectBill(bill) }    
                >
                    <td className='bills-table-cell sno'>{ index + 1 }</td>
                    <td className='bills-table-cell billId'>{ bill.id }</td>
                    <td className='bills-table-cell TOP'> { bill.timeOfPurchase }</td>
                    <td className='billing-bill-table-cell grandtotal'>{ bill.grandTotal }</td>
                </tr>
            )
        });
       }
    } // * End of renderBillTableItems

    // * Rendering the Bill info Modal
    renderBillInfoModal = () => {
        return(
            <MDBContainer>
                <MDBModal 
                    isOpen={ this.state.billModal } 
                    toggle={ this.toggleBillInfoModal }
                >
                    <MDBModalBody>
                        <div className='bills-modal-head-section'>
                            <span className='bills-modal-head-section-text'>
                                Bill Details:
                            </span>
                            <button 
                                className='bills-modal-head-section-close-btn'
                                onClick={ () => this.toggleBillInfoModal() }
                            >
                                x
                            </button>
                        </div>
                        <hr className='bills-modal-hr' />
                        { this.renderModalContents() }
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    } // * End of renderBillInfoModal
    
    // * Render the modal contents
    renderModalContents = () => {
        if(this.state.selectedBill !== '') {
            return(
                <div className='bills-modal-details-section'>
                    <span><b>Customer Name:</b>{ this.state.selectedBill.customer.name }</span>
                    <span><b>Customer Phone:</b> { this.state.selectedBill.customer.phone }</span>
                    <span><b>Customer Email:</b> { this.state.selectedBill.customer.email }</span>
                    <span><b>Time of Purchase:</b> { this.state.selectedBill.timeOfPurchase }</span>
                    <span><b>Products:</b></span>
                    <div className='bills-modal-table-section'>
                        <table className='bills-modal-table'>
                            <tr className='bills-modal-table-heading-row'>
                                <td className='bills-modal-table-heading-cell prod-sno'>Sno</td>
                                <td className='bills-modal-table-heading-cell prod-name'>Name</td>
                                <td className='bills-modal-table-heading-cell prod-qty'>Qty</td>
                                <td className='bills-modal-table-heading-cell prod-total'>Total</td>
                            </tr>

                            {
                                this.state.selectedBill.productsList.map((product, index) => {
                                    return(
                                        <tr 
                                            className='bills-modal-table-data-row'
                                        >
                                            <td className='bills-modal-table-cell prod-sno'>{ index + 1 }</td>
                                            <td className='bills-modal-table-cell prod-name'>{ product.productName }</td>
                                            <td className='bills-modal-table-cell prod-qty'> { product.quantity }</td>
                                            <td className='bills-modal-table-cell prod-total'>₹ { product.totalPrice }</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className='bills-modal-grand-total-section'>
                        <span><b>Grand Total:</b> ₹ { this.state.selectedBill.grandTotal }</span>
                    </div>
                </div>
            );
        }
    }

    // ? COMPONENT LIFE-CYCLE METHODS
    componentDidMount = () => {
        let allBillsReq = axios.get(GLOBAL.ALL_BILLS);
        axios.all([allBillsReq])
            .then(axios.spread(
                (...responses) => {
                    console.log('THE RESPONSE IS:', responses[0]);
                }
            ));
    }


    render() {
        return(
            <div>
                { this.renderBillInfoModal() }
                
                { this.renderBillsTable() }
            </div>
        );
    }
}

export default Bills;