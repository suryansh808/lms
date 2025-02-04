import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../API';
import toast ,{Toaster} from 'react-hot-toast';

const AddTransactionId = () => {
  // const [fullname, setFullname] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  // const [getTransactionId, setGetTransactionId] = useState([]);
  // const getTransactionIdList = async () => {
  //   const bdaName = localStorage.getItem('bdaName');
  //   try {
  //       const response = await axios.get(`${API}/gettransactionid`);
  //       setGetTransactionId(response.data);
  //       }
  //   catch (error) {
  //       console.error(error);
  //   }
  //   };

  //  useEffect(() => {
  //   getTransactionIdList();
  //   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {transactionId };
    try {
      const response = await axios.post(`${API}/addtransactionid`, data);
      toast.success('Transaction ID added successfully:');
        // setFullname('');
        setTransactionId('');
        // getTransactionIdList();
    } catch (error) {
        toast.error('Error adding transaction ID or already exsists');
    }
  };




  return (
    <div id="AdminAddCourse">
         <Toaster position="top-center" reverseOrder={false}/>
        <div id='form'>
      <h2>Add Transaction ID</h2>

      <form onSubmit={handleSubmit}>
        {/* <div>
          <input
            type="text"
            id="fullname"
            value={fullname}
            placeholder='Enter Full Name'
            onChange={handleFullnameChange}
            required
          />
        </div> */}
        <div>
          <input
            type="text"
            id="transactionId"
            value={transactionId}
            placeholder='Enter Transaction ID'
            onChange={handleTransactionIdChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
        </div>
     
 
        {/* <div className='coursetable'>
        <h1>Transaction ID List</h1>
        <table>
            <thead>
                <tr>
                    <th>Sl.No</th>
                <th>Full Name</th>
                <th>Transaction ID</th>
                </tr>
            </thead>
            <tbody>
                {getTransactionId.map((transactionId , index) => (
                <tr key={transactionId._id}>
                    <td>{index + 1}</td>
                    <td>{transactionId.fullname}</td>
                    <td>{transactionId.transactionId}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div> */}
        
     
    </div>
  );
};

export default AddTransactionId;
