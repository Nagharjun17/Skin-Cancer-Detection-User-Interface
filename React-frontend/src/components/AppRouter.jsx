import React,{useState,useEffect} from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getDocs,collection } from 'firebase/firestore'
import { db } from '../utils/init-firebase'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import PatientPage from '../pages/Patientpage'
import DoctorPage from '../pages/DoctorPage'
import Registerpage from '../pages/Registerpage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import TestPage from '../pages/TestPage'
import ProfilePage from '../pages/ProfilePage'
import DiagnosisPage from '../pages/DiagnosisPage'

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute exact path='/login' component={Loginpage} />
          <ProtectedRoute exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/doctor' component={DoctorPage}/>
          <ProtectedRoute exact path='/diagnosis' component={DiagnosisPage}/>
          <ProtectedRoute exact path='/profile' component={ProfilePage}/>
          <ProtectedRoute exact path='/patient' component={PatientPage} />
          <ProtectedRoute exact path='/test' component={TestPage} />
          <ProtectedRoute exact path='/forgot-password' component={ForgotPasswordPage}/>
          <ProtectedRoute exact path='/reset-password' component={ResetPasswordPage}/>
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth()
  const { path } = props
  console.log('path', path)
  const location = useLocation()
  console.log('location state', location.state)

  const [isDoctor,setIsDoctor]=useState('')
  
  useEffect(() => {
    if (currentUser && currentUser !== "not found") {
      getDocs(collection(db, "users")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().email === currentUser.providerData[0].email) {
            setIsDoctor(doc.data().userType);
          }
        });
      });
    }
  }, [currentUser]);
  if (
    path === '/login' ||
    path === '/register' 
  ) {
    return currentUser ? 
      isDoctor==='Doctor'?<Redirect to={location.state?.from ?? '/doctor'} />:<Redirect to={location.state?.from ?? '/patient'} />
     : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  )
}
