import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import TransportScreen from './screens/TransportScreen';
import RecentTripsScreen from './screens/RecentTripsScreen';
import ChooseCityScreen from './screens/ChooseCityScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UploadScreen from './screens/UploadScreen';
import PrivateRoute from './screens/PrivateRoute';
import ConfirmTripScreen from './screens/ConfirmTripScreen';
import TripScreen from './screens/TripScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoute from './screens/AdminRoute';
import TripListScreen from './screens/TripListScreen';
import TransportListScreen from './screens/TransportListScreen';
import TransportEditScreen from './screens/TransportEditScreen';
import UserListScreen from './screens/UserListScreen';
import AboutScreen from './screens/AboutScreen';

const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen/>}/>
        <Route path='/search/:keyword' element={<HomeScreen/>}/>
        <Route path='/transport/:id' element={<TransportScreen/>}/>
        <Route path='/trips' element={<RecentTripsScreen/>}/>
        <Route path='/cities' element={<ChooseCityScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/about' element={<AboutScreen/>}/>

        <Route path='' element={<PrivateRoute/>}>
          <Route path='/confirm-trip/:tripId' element={<ConfirmTripScreen/>}/>
          <Route path='/travelLog/:id/upload' element={<UploadScreen/>}/>
          <Route path='/travelLog/:id' element={<TripScreen/>}/>
          <Route path='/profile' element={<ProfileScreen/>}/>
        </Route>

        <Route path='' element={<AdminRoute/>}>
          <Route path='/admin/triplist' element={<TripListScreen/>}/>
          <Route path='/admin/transportlist' element={<TransportListScreen/>}/>
          <Route path='/admin/transport' element={<TransportListScreen/>}/>
          <Route path='/admin/transport/:id/edit' element={<TransportEditScreen/>}/>
          <Route path='/admin/userlist' element={<UserListScreen/>}/>
        </Route>
      </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
