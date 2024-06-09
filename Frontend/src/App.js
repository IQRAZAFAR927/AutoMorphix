import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminDashboard from './Screens/AdminDashboard';

import UserManagement from './Screens/UserManagement';
import Adduser from './Screens/Adduser';
import Userconfirm from './Screens/UserAddConfirm';
import Updateuser from './Screens/Updateuser';
import RemoveUser from './Screens/Removeuser';
import GetAllUser from './Screens/GetalluserInfo';

import CarManagement from './Screens/CarManagement';
import AddCar from './Screens/Addcar';
import AddCarimage from './Screens/Addcarimage';
import UpdateCar from './Screens/UpdateCar';
import RemoveCar from './Screens/Removecar';

import SigninPage from './Screens/login';
import SignUpPage from './Screens/Signuppage';

//import Carconfirm from './Screens/Confirmmessage';
import Deleteconfirm from './Screens/DeleteMessage';

function App() {
  return (
    // <div>
    //   <AddCarimage/>
    // </div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<SigninPage/>} />
      <Route path="/Signup" element={<SignUpPage/>} />


        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserManagement/>} />

              <Route path="/adduser" element={<Adduser/>}/>
                      <Route path="/userconfirm" element={<Userconfirm/>}/>
                      <Route path="/admindashboard" element={<AdminDashboard/>}/> 
              <Route path="/update/:userId" element={<Updateuser/>}/>
                       <Route path="admindashboard" element={<AdminDashboard/>}/>
              <Route path="/deleteuser/:userId" element={<GetAllUser/>}/>
                       <Route path="/Confirm_message" element={<Deleteconfirm/>}/>
              <Route path = "/getoneUser/:userId" element={<GetAllUser/>}/>
              <Route path="/getusers" element={<GetAllUser/>}/>


         <Route path="/car-management" element={<CarManagement/>} />

                 <Route path="/addcar" element={<AddCar/>}/>
                         {/* <Route path="/addimage" element={<AddCarimage/>}/> */}
                  <Route path="/updatecar" element={<UpdateCar/>}/>
                         <Route path="/addimage" element={<AddCarimage/>}/>
                  <Route path="/remove_car" element={<RemoveCar/>}/>
                       <Route path="/Confirm_message" element={<Deleteconfirm/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
