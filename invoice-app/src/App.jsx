import React, { useState,useRef } from 'react';
import look from "../src/assets/look.png";
import { IoMdCloseCircleOutline } from "react-icons/io";
import html2canvas from 'html2canvas';
import ReactToPrint from 'react-to-print';
import './App.css';

function App() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    mobile: '',
    address: '',
  });
  const [vehicleInfo, setVehicleInfo] = useState({
    vehicleNo: '',
    model: '',
    color: '',
  });
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const calculateAmount = (quantity, price) => {
    return quantity * price;
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + calculateAmount(item.quantity, item.price), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const total = subtotal - discount;
    return total < 0 ? 0 : total;
  };
 const componentRef=useRef()
  const handlePrint = () => {
    window.print();
  };



  const handleSave = () => {
    const element = document.getElementById('invoice-container');

    if (!element) {
      alert('Error: Could not find the invoice container.');
      return;
    }

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${customerInfo.name}-${vehicleInfo.vehicleNo || 'unknown'}.png`;
      link.click();
    });
  };

  const addItems = () => {
    const newItem = {
      description: '',
      quantity: 0,
      price: 0,
      amount: 0,
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo({ ...customerInfo, [field]: value });
  };

  const handleVehicleInfoChange = (field, value) => {
    setVehicleInfo({ ...vehicleInfo, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  return (
    <div className="main">
      <div className="top-header container">
      <ReactToPrint trigger={()=><button>Print</button>}
           content={()=>componentRef.current}
          />
                    <button onClick={handleSave}>Save</button>

      </div>
    <div ref={componentRef} className="invoice-app container" id="invoice-container">
      {/* Header Section */}
      <div className="header-main">
        <span className="d-flex justify-content-end">
        </span>
        <div className="header-invoice">
          <div className="logo"><img src={look} alt="" /></div>
          <div className="header-middle">
            <h1 className="header-title">M R S Automobile</h1>
            <h3 className="header-subtitle">Textile More, R K Road, Rangpur</h3>
            <button className="bil-pad">Invoice</button>
          </div>
          <div className="header-date">
            <input type="date" />
          </div>
        </div>
      </div>

      <div className="info-section ">
        {/* Customer Info */}
        <div className="customer_info col-md-6">
          <button className="bil-pad ">Customer_info</button>
          <div className="info-sub d-flex">
            <label htmlFor="">Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={customerInfo.name}
              onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
            />
          </div>
          <div className="info-sub d-flex">
            <label htmlFor="">Mobile:</label>
            <input
              type="text"
              placeholder="Mobile"
              value={customerInfo.mobile}
              onChange={(e) => handleCustomerInfoChange('mobile', e.target.value)}
            />
          </div>
          <div className="info-sub d-flex">
            <label htmlFor="">Address:</label>
            <input
              type="text"
              placeholder="Address"
              value={customerInfo.address}
              onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
            />
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="vehicle_info col-md-6">
          <button className="bil-pad ">Vehicle_info</button>
          <div className="info-sub d-flex">
            <label htmlFor="">Vehicle_No:</label>
            <input
              type="text"
              placeholder="Vehicle_No"
              value={vehicleInfo.vehicleNo}
              autoComplete='true'
              onChange={(e) => handleVehicleInfoChange('vehicleNo', e.target.value)}
            />
          </div>
          <div className="info-sub d-flex">
            <label htmlFor="">Model:</label>
            <input
              type="text"
              placeholder="Model"
              value={vehicleInfo.model}
              onChange={(e) => handleVehicleInfoChange('model', e.target.value)}
            />
          </div>
          <div className="info-sub d-flex">
            <label htmlFor="">Color:</label>
            <input
              type="text"
              placeholder="Color"
              value={vehicleInfo.color}
              onChange={(e) => handleVehicleInfoChange('color', e.target.value)}
            />
          </div>
        </div>
      </div>

      <hr />

      {/* Details Section */}
      <div className="details-section d-flex">
        <div className="serial-number col-md-5 table-header">Job Description</div>
        <div className="serial-number col-md-2 fdfd table-headers">Quantity</div>
        <div className="serial-number col-md-2 fdfd table-headers">Price</div>
        <div className="serial-number col-md-2 table-headers">Amount</div>
      </div>

      {/* Items Section */}
      {items.map((item, index) => (
        <div key={index} className="job-item">
          <input
            type="text"
            placeholder="Description"
            className="col-md-5 info-des"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="col-md-2 aswa"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="col-md-2 aswa"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
          />
          <div className="amount-section">
            <p className="col-md-2 amount-text">{calculateAmount(item.quantity, item.price)}</p>
            <IoMdCloseCircleOutline className="close-icon" onClick={() => deleteItem(index)} />
          </div>
        </div>
      ))}

      {/* Add Item Button */}
      <button onClick={addItems}>Add Item</button>

      {/* Subtotal and Discount Section */}
      <dinvoiceiv className="subtotal-section">
        <p>Subtotal: {calculateSubtotal()}</p>
        <div className="discount-section">
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        </div>
        <p>Total: {calculateTotal()}</p>
      </dinvoiceiv>
    </div>
    </div>
  );
}

export default App;
