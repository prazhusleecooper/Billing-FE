import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../Resources/Styling/Billing.css';

const GLOBAL = require('../global');

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerCheckPhone: '',
            customerCheckEmail: '',
            currentCustomer: {
                id: 0,
                name: '',
                email: '',
                phone: '',
                code: '',
                address: ''
            },
            allCustomers: [],
            customerExpand: false,
            productsList: [],
            searchNameList: [],
            searchCodeList: [],
            selectedItemName: '',
            selectedItemCode: '',
            billList: [],
            searchedKeyword: '',
            notAvailable: 0,
            billGrandTotal: 0,
        };
    }

    // ?NON-RENDERING METHODS
    // * Toggle the Customer section expansion
    toggleCustomerExpansion = () => {
        this.setState({
            customerExpand: !this.state.customerExpand,
        });
    } // * End of toggleCustomerExpansion method

    // * Increase the product Quantity in the bill table
    increaseQty = (productId) => {
        let billList = this.state.billList;
        billList.map((product) => {
            if(product.productId === productId) {
                product.quantity += 1;
                product.totalPrice = (product.quantity * product.productPrice) + (product.quantity + product.productTax);
            }
            return null;
        });
        this.setState({
            billList: billList,
        });
        localStorage.setItem('billList', JSON.stringify(billList));
    } // * End of increaseQty method

    // * Decrease the product Quantity in the bill table
    decreaseQty = (productId) => {
        let billList = this.state.billList;
        let oneQtyIndex = -1;
        billList.map((product, index) => {
            if(product.productId === productId) {
               if(product.quantity > 1) {
                product.quantity -= 1;
                product.totalPrice = (product.quantity * product.productPrice) + (product.quantity + product.productTax);
               } else if(product.quantity === 1) {
                    oneQtyIndex = index;
               }
            }
            return null;
        });
        if(oneQtyIndex > -1) {
            billList.splice(oneQtyIndex, 1);
        }
        this.setState({
            billList: billList,
        });
        localStorage.setItem('billList', JSON.stringify(billList));
    } // * End of decreaseQty method

    // * Delete bill product 
    deleteBillProduct = (productId) => {
        let billList = this.state.billList;
        let deletionIndex = -1;
        billList.map((product, index) => {
            if(product.productId === productId) {
                deletionIndex = index;
            }
            return null;
        });
        if(deletionIndex > -1) {
            billList.splice(deletionIndex, 1);
        }
        this.setState({
            billList: billList,
        });
        localStorage.setItem('billList', JSON.stringify(billList));
    } // * End of deleteBillProduct method
    
    // * Clear all the bill product
    clearAll = () => {
        this.setState({
            billList: [],
        });
        localStorage.setItem('billList', []);
    } // * End of clearAll Method
    
    // * Check the Customer Existance
    checkCustomerExistance = () => {
        console.log('CUSTOMER EXISTANCE HIT');
        let customerExists = false;
        let wrongInfo = false;
        if(this.state.customerCheckPhone !== '' && this.state.customerCheckEmail === '') {
            let allCustomers = this.state.allCustomers;
            allCustomers.map((customer) => {
                if(this.state.customerCheckPhone === customer.phone) {
                    this.setState({
                        customerCheckPhone: '',
                        customerCheckEmail: '',
                        currentCustomer: customer
                    });
                    customerExists = true;
                    toast.success('Customer Exists')
                    console.log('CUSTOMER EXISTS')
                }
                return '';
            });
        } else if(this.state.customerCheckEmail !== '' && this.state.customerCheckPhone === '') {
            let allCustomers = this.state.allCustomers;
            allCustomers.map((customer) => {
                if(this.state.customerCheckEmail === customer.email) {
                    this.setState({
                        customerCheckPhone: '',
                        customerCheckEmail: '',
                        currentCustomer: customer
                    });
                    customerExists = true;
                        toast.success('Customer Exists');
                }
                return '';
            });
        } else {
            wrongInfo = true;
            toast.warning('Please enter only one of the details');
        }
        if(customerExists === false && wrongInfo === false) {
            toast.error('The Customer Does not exist!');
        } 

    } // * End of checkCustomerExistance

    // * Add or update Customer
    addOrUpdateCustomer = () => {
        alert('ADD OR UPPDATE CUSTOmER');
    } // * End of addOrUpdateCustomer Method

    // * Confirm and Generate the Bill
    generateBill = () => {
        if(this.state.currentCustomer.name === '' || this.state.currentCustomer.id === 0) {
            toast.error('Please choose the customer before generating the bill!');
        } else if(this.state.billList === []) {
            toast.error('Please add atleast one product to generate bill');
        } else {
            let grandTotal = 0;
            this.state.billList.map((product) => {
                grandTotal += product.totalPrice
                return '';
            });
            console.log('THE GRAND TOTAL:', grandTotal);
            let requestBody = {
                customer: JSON.stringify(this.state.currentCustomer),
                productsList: JSON.stringify(this.state.billList),
                grandTotal: parseFloat(grandTotal),
                timeOfPurchase: parseInt((new Date().getTime() / 1000).toFixed(0)),
            };

            axios.post(GLOBAL.GENERATE_BILL, requestBody)
                .then((response) => {
                    if(response.data.status === 201) {
                        toast.success('Bill Generated Successfully');
                        localStorage.setItem('billList', JSON.stringify([]));
                        this.setState({
                            currentCustomer: {
                                id: 0,
                                name: '',
                                email: '',
                                phone: '',
                                code: '',
                                address: ''
                            },
                            billList: [],
                        });
                        this.componentDidMount();
                    }
                })
                .catch((error) => {
                    console.log('ERROR IN BILL GEN:', error);
                }); 

            
        }
    }

    // ? RENDERING METHODS
    // * Render the Customer Section
    renderCustomerSection = () => {
        if(this.state.customerExpand) {
            return(
                <div className="billing-customer-section">
                    <div className="billing-customer-inputs-section">
                        <div className="billing-customer-inputs-banner">
                             Check Customer
                        </div>
                        <label className="billing-customer-check-label  billing-customer-check-number-label">
                            Customer Phone Number: <br />
                            <input
                                type='text'
                                className="billing-customer-check-input"
                                value={ this.state.customerCheckPhone }
                                onChange={ (event) => this.setState({ customerCheckPhone: event.target.value }) }
                            />
                        </label>
    
                        <span class="billing-or-text">Or</span>
    
                        <label className="billing-customer-check-label">
                            Customer Email: <br />
                            <input
                                type='text'
                                className="billing-customer-check-input"
                                value={ this.state.customerCheckEmail }
                                onChange={ (event) => this.setState({ customerCheckEmail: event.target.value }) }
                           />
                        </label>
    
                        <button 
                            onClick={ () => this.checkCustomerExistance() }
                            className="billing-customer-check-btn"    
                        >
                            Check
                        </button>
                    </div>
                    <div class='billing-customer-info-section'>
                        <div className='billing-customer-info-banner'>
                            Customer Information
                        </div>
                        <div className='billing-customer-info-inner'>
                            <div class='billing-customer-info-inner-left'>
                                <span>Name: { this.state.currentCustomer.name }</span>
                                <span>Email: { this.state.currentCustomer.email }</span>
                                <span>Phone: { this.state.currentCustomer.phone }</span>
                            </div>
                            <div class='billing-customer-info-inner-right'>
                                <span>Code: { this.state.currentCustomer.code }</span>
                                <span>Address: { this.state.currentCustomer.address }</span>
                            </div>
                        </div>
                        <div class='billing-customer-info-update-section'>
                            <button 
                                className='billing-customer-info-update-btn'
                                onClick = { () => this.addOrUpdateCustomer() }
                            >
                                { this.state.currentCustomer.name === '' ? 'Add Customer' : 'Update Customer' }
                            </button>

                            <button 
                                    className='billing-customer-info-close-btn'
                                    onClick={ () => this.toggleCustomerExpansion() }
                            >
                                    Close
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if(!this.state.customerExpand) {
            return(
                <div className='billing-customer-section-short'>
                    <div className='billing-customer-section-short-inner'>
                        <div className='billing-customer-section-short-infos'>
                            <span className='billing-customer-short-info'><b>Customer Phone:</b> { this.state.currentCustomer.phone === 'Please Choose a Customer' ? '' : this.state.currentCustomer.phone }</span>
                            <span className='billing-customer-short-info'><b>Customer Code:</b> { this.state.currentCustomer.code === 'Please Choose a Customer' ? '' : this.state.currentCustomer.code } </span>   
                        </div> 

                        <div className='billing-customer-section-short-button-section'>
                            <button
                                className='billing-select-customer-btn'
                                onClick={ () => this.toggleCustomerExpansion() }
                            >
                                { this.state.currentCustomer === '' ? 'Choose Customer' : 'Change Customer'}
                            </button>
                        </div>

                    </div>
                </div>
            );
        }
    } // * End of renderCustomerSection method

    // * Rendering the Search drop down
    renderSearchInput = () => {
        return(
            <div className='billing-searchBar-section'>
                <div className='billing-searchBar-inner'>    
                Search Products: &nbsp;&nbsp;&nbsp;
                <TextField
                    id="outlined-secondary"
                    label="Search Products"
                    variant="outlined"
                    color="primary"
                    className='billing-search-bar'
                    value={ this.state.searchedKeyword }
                    onChange={ (event) => this.setState({ searchedKeyword: event.target.value }) }
                />
                </div>
                {
                    this.state.searchedKeyword === '' ? '' : 
                        <div className='billing-search-suggestion-section'>
                            { this.renderSuggestions() !== '' ? this.renderSuggestions() : 'Please modify search'}
                        </div>
                }
            </div>
        )
    } // * End of renderSearchInput method

    // * Render Search Suggestions
    renderSuggestions = () => {
        let searchedKeyword = this.state.searchedKeyword;
        let productsList = this.state.productsList;
        let searchResults =  productsList.filter((product) => {
            if(product.productName
                    .toLowerCase()
                    .replace(/ /g, "")
                    .includes(searchedKeyword.toLowerCase().replace(/ /g, "")) || 
                    
                product.productCode
                    .toLowerCase()
                    .replace(/ /g, "")
                    .includes(searchedKeyword.toLowerCase().replace(/ /g, ""))) {
                return product;
            }
            return '';
        });

        console.log('THE SEARCH RESULTS ::', searchResults);
        if(searchResults === [] || searchResults.length === 0) {
            return(
                <span>
                    No Items Found. Please modify you search!
                </span>
            )
        }else {
            return searchResults.map((product, index) => {
                return(
                    <div key={ index }>
                        <div 
                            className='billing-search-suggestion'
                            onClick={ () => this.selectSuggestion(product) }
                            >
                            { product.productName }
                        </div>
                        <hr 
                            className='billing-search-suggestion-hr'
                            onClick={ () => this.selectSuggestion(product) }
                            />
                    </div>
                );
            });
        } 

    } // * End of renderSuggestions Method

    // * Add the selected Product from search to the list
    selectSuggestion = (product) => {
        this.setState({
            searchedKeyword: '',
        })
        let billList = this.state.billList;
        let itemExists = false;
        if(billList === [] || billList === null) {
            billList = [];
            product.quantity = 1;
            product.totalPrice = (product.quantity * product.productPrice) + (product.quantity * product.productTax);
            billList.push(product);
            itemExists = true;
        } else if(billList !== [] || billList !== null) {
            billList.map((billProduct) => {
                if(billProduct.productId === product.productId) {
                    billProduct.quantity +=1;
                    billProduct.totalPrice = (billProduct.quantity * billProduct.productPrice) + (billProduct.productTax * billProduct.productTax);
                    itemExists = true;
                }
                return '';
            });
        }
        if(!itemExists) {
            product.quantity = 1;
            product.totalPrice = (product.quantity * product.productPrice) + (product.quantity * product.productTax);
            billList.push(product);
        }
        this.setState({
            billList: billList,
        });
        localStorage.setItem('billList', JSON.stringify(billList));
    } // * End of selectSuggestion method

    // * Render the BillList table
    renderBillTable = () => {
        if(this.state.billList !== [] || this.state.billList !== null) {
            return(
                <div class='billing-bill-table-section'>
                    <table className='billing-bill-table'>
                        <tr className='billing-bill-table-heading-row'>
                            <td className='billing-bill-table-heading-cell sno'>Sno</td>
                            <td className='billing-bill-table-heading-cell name'>Name</td>
                            <td className='billing-bill-table-heading-cell qty'>Quantity</td>
                            <td className='billing-bill-table-heading-cell price'>Price</td>
                            <td className='billing-bill-table-heading-cell tax'>Tax</td>
                            <td className='billing-bill-table-heading-cell total'>Total Price</td>
                            <td className='billing-bill-table-heading-cell del'>Delete</td>
                        </tr>

                        {
                            this.renderBillItems()
                        }
                    </table>
                </div>
            )
        }
        
    } // * End of the renderBillTable method

    // * Render the billList items into the table
    renderBillItems = () => {
        let billList = this.state.billList;
        if(billList !== null || billList !== []) {
            return billList.map((billProduct, index) => {
                return(
                    <tr className='billing-bill-table-data-row'>
                        <td className='billing-bill-table-cell sno'>{ index + 1 }</td>
                        <td className='billing-bill-table-cell name'>{ billProduct.productName }</td>
                        <td className='billing-bill-table-cell qty'>
                            <div className='billing-bill-table-qty-section'>
                                <button
                                    class='billing-bill-table-dec-btn'
                                    onClick={ () => this.decreaseQty(billProduct.productId) }
                                >
                                    -
                                </button>
                                <span className='billing-bill-table-qty-text'>{ billProduct.quantity }</span>
                                <button
                                    class='billing-bill-table-inc-btn'
                                    onClick={ () => this.increaseQty(billProduct.productId) }
                                >
                                    +
                                </button>
                            </div>
                        </td>
                        <td className='billing-bill-table-cell price'>₹ { billProduct.productPrice }</td>
                        <td className='billing-bill-table-cell tax'>₹ { billProduct.productTax }</td>
                        <td className='billing-bill-table-cell total'>₹ { billProduct.totalPrice }</td>
                        <td className='billing-bill-table-cell del'>
                            <button 
                                className='billing-table-delete-btn'
                                onClick={ () => this.deleteBillProduct(billProduct.productId) }    
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            });
        } else {
            return(
                <div className='billing-no-bill-products'>
                    <span className='billing-no-bill-products-text'>
                        Please add products to proceed!
                    </span>
                </div>        
            );
        }
    }

    // * Render Grand Total
    renderGrandTotal = () => {
        if(this.state.billList !== [] && this.state.billList !== null) {
            let billList = this.state.billList;
            let grandTotal = 0;
            billList.map((product) => {
                grandTotal += product.totalPrice;
                return null;
            });
            return(
                <div className='billing-grand-total-section'>
                    <div className='billing-grand-total-section-inner'>
                        <span className='billing-grand-total-text'>Grand total: &nbsp;&nbsp;</span>
                        <span className='billing-grand-total-price'>
                            ₹ { grandTotal }
                        </span>
                    </div>
                </div>
            )
        }
    } // * End of renderGrandTotal method

    // * Rendering the Bottom buttons sections
    renderBottomButtons = () => {
        if(this.state.billList !== [] || this.state.billList !== null) {
            return(
                <div className='billing-bottom-btns-section'>
                        <button 
                            className='billing-clear-all-btn'
                            onClick={ () => this.clearAll() }
                        >
                            Clear All
                        </button>
                        <button 
                            className='billing-confirm-bill-btn'
                            onClick = { () => this.generateBill() }
                        >
                            Confirm
                        </button>
                </div>
            );
        } 
        return '';
    }

    // ? COMPONENT LIFE CYCLE METHODS
    // * COMPONENT DID MOUNT Method
    componentDidMount = () => {
        let allCustomersReq = axios.get(GLOBAL.ALL_CUSTOMERS);
        let allProductsReq = axios.get(GLOBAL.ALL_PRODUCTS);
        axios.all([allCustomersReq, allProductsReq])
            .then(axios.spread(
                (...responses) => {
                    this.setState(
                        {
                            allCustomers: responses[0].data.data,
                            productsList: responses[1].data.data,
                        });
                }
            ))
            .catch((errors) => {
                console.log('ERRORS:', errors);
            });
        let lsBillList = JSON.parse(localStorage.getItem('billList'));
        if(lsBillList === undefined || lsBillList === null ) {
            this.setState({
                billList: [],
            });
        } else {
            this.setState({
                billList: lsBillList,
            });
        }
    }

    render() {
        return(
            <div>
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                { this.renderCustomerSection() }

                <hr className='billing-hr' />

                { this.renderSearchInput() }

                { this.renderBillTable() }
                
                { this.renderGrandTotal() }

                { this.renderBottomButtons() }

                
            </div>
            
        )
    }
}

export default Billing;