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

const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<HomeScreen/>}/>
        <Route path='/transport/:id' element={<TransportScreen/>}/>
        <Route path='/trips' element={<RecentTripsScreen/>}/>
        <Route path='/cities' element={<ChooseCityScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>

        <Route path='' element={<PrivateRoute/>}>
          <Route path='/confirm-trip/:tripId' element={<ConfirmTripScreen/>}/>
          <Route path='/upload-proof/:tripId' element={<UploadScreen/>}/>
          <Route path='/travelLog/:id' element={<TripScreen/>}/>
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
