import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react"
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../utils/init-firebase';
import {useState} from "react"
function FormModalAppointment({isOpen, onClose, appointmentdetails, setAppointmentDetails}) {
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [roc, setRoc] = useState("")
  const {currentUser} = useAuth()
 
    const onSubmit = async(e) => {
      e.preventDefault()
      await setDoc(doc(db, 'users', currentUser.email), { appointmentDate,appointmentTime, roc }, { merge: true });
      setAppointmentDetails(null)
      onClose()
    }

    
    return (
      <>
        <Modal closeOnOverlayClick={false} blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Appointment Details</ModalHeader>
            <form onSubmit={onSubmit}>
            <ModalBody>
            <Input type = 'time' placeholder='Appointment Time' size='md' mb={2} value={appointmentTime} onChange={e=>setAppointmentTime(e.target.value)} />
            
            <Input mb={2} type="date" placeholder="Appointment Date" value={appointmentDate} onChange={e=>setAppointmentDate(e.target.value)}/>
            <Textarea
                value={roc}
                onChange={e=>setRoc(e.target.value)}
                placeholder='Current Reason for consultation'
                size='lg'
                rows={7}
            />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Submit
              </Button>
              <Button 
              type="button"
              onClick={()=>{
                setAppointmentDetails(null)
                onClose();
              }} variant='ghost'>Cancel</Button>
            </ModalFooter>
            </form>
  
          </ModalContent>
        </Modal>
      </>
    )
  }

export default FormModalAppointment;
