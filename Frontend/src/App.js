
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import HomePage from './Screens/Home';
import AdminDashboard from './Screens/AdminDashboard';

import UserManagement from './Screens/UserManagement';
import Adduser from './Screens/Adduser';
import Userconfirm from './Screens/UserAddConfirm';
import Updateuser from './Screens/Updateuser';
import userProfile from './Screens/Myprofile_Admin';
//import RemoveUser from './Screens/Removeuser';
import GetAllUser from './Screens/GetalluserInfo';

import CarManagement from './Screens/CarManagement';
import AddCar from './Screens/Addcar';
import AddCarimage from './Screens/Addcarimage';
import UpdateCar from './Screens/UpdateCar';
import RemoveCar from './Screens/Removecar';

import SigninPage from './Screens/login';
import SignUpPage from './Screens/Signuppage';

import GetAllModifier from './Screens/getallmodifierinfo';
import AddModifier from './Screens/AddModifier';
import UpdateModifier from './Screens/UpdateModifier';
import Myprofile_Admin from './Screens/Myprofile_Admin';
import Myprofile_Modifier from './Screens/MyProfile_Modifier';


import HomePage_modifier from './Screens/Modifier_Home';
import ModifierDashboard from './Screens/ModifierDashboard';
import AllCarModels from './Screens/latest_model';
import Accept_CarModels from './Screens/Accept_model';
import Reject_CarModels from './Screens/Reject_model';

import AboutUs from './components/Aboutus';
import ContactUs from './components/Contactus';
import Modals_Contact from './components/Contact_modal';
import Admin_Contact from './components/Contact_admin';
import About_Modifier from './components/About_modifier';
import About_Modals from './components/About_Model';

function App() {
  return (
    // <div>
    //   <AddCarimage/>
    // </div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<SigninPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/myprofile" element={<Myprofile_Admin/>} />
        <Route path="/myprofile_modifier" element={<Myprofile_Modifier/>} />

        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/about_Admin" element={<About_Modifier/>} />
        <Route path="/about_modals" element={<About_Modals/>} />

        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/admin_contact" element={<Admin_Contact/>} />
        <Route path="/Modals_contact" element={<Modals_Contact/>} />


             
        <Route path="/user" element={<UserManagement/>} />
        <Route path="/adduser" element={<Adduser/>}/>
            <Route path="/getusers" element={<GetAllUser/>}/>        
        <Route path="/update/:userId" element={<Updateuser/>}/>
            <Route path="/getusers" element={<GetAllUser/>}/>
        <Route path="/deleteuser/:userId" element={<GetAllUser/>}/>
            <Route path="/getusers" element={<GetAllUser/>}/>
        {/* <Route path="/myprofile" component={userProfile} /> */}
         <Route path = "/getoneUser/:userId" element={<GetAllUser/>}/>
              


         <Route path="/car-management" element={<CarManagement/>} />
        <Route path="/addcar" element={<AddCar/>}/>
              <Route path="/car-management" element={<CarManagement/>} /> 
        <Route path="/updatecar/:Register_num" element={<UpdateCar/>}/>
               <Route path="/car-management" element={<CarManagement/>} />
        <Route path="/getallcars" element ={<CarManagement/>}/>
        <Route path="getonecar/:Register_num" element={<UpdateCar/>}/>                
        <Route path="/deletecar/:Register_num" element={<CarManagement/>}/>

        
        <Route path="/getallmodifier" element={<GetAllModifier/>} /> 
        <Route path="/addmodifier" element={<AddModifier/>}/> 
        <Route path="/deletemodifier/:modifierId" element={<GetAllModifier/>}/>     
    / 
        <Route path="/updatemodifier/:modifierId" element={<UpdateModifier/>}/>  


        <Route path="/modifier_Home" element={<HomePage_modifier/>} />
        <Route path="/modifier" element={<ModifierDashboard />} />

         <Route path="/getallmodels" element={<AllCarModels />} />

         <Route path="/getacceptmodels" element={<Accept_CarModels/>} />
         <Route path="/getrejectmodels" element={<Reject_CarModels/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
