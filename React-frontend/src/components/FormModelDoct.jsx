import { Button, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from "@chakra-ui/react"
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from '../utils/init-firebase';
import {useState} from "react"
function FormModalDoct({isOpen, onClose, docdet, setDocdet}) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [dob, setDob] = useState("")
  const [clinicName,setClinicName] = useState("")
  const [speciality, setSpeciality] = useState("")
  const [clinicAddress, setClinicAddress] = useState("")
  const [education, setEducation] = useState("")
  const [prevExperience, setPrevExperience] = useState("")
  const {currentUser} = useAuth()
 
    const onSubmit = async(e) => {
      e.preventDefault()
      await setDoc(doc(db, 'users', currentUser.email), { firstName, lastName, gender, age, phoneNumber, dob, clinicName, clinicAddress, education, prevExperience, speciality }, { merge: true });
      setDocdet(null)
      onClose()
    }
    return (
      <>
        <Modal closeOnOverlayClick={false} blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Doctor Details</ModalHeader>
            <form onSubmit={onSubmit}>
            <ModalBody>
            <Input placeholder='First Name' size='md' mb={2} value={firstName} onChange={e=>{
              const { value } = e.target;
           
              const re = /^[A-Za-z]+$/;
              if (value === "" || re.test(value)) {
                setFirstName(value);
              }
              }} />
            <Input placeholder='Last Name' size='md' mb={2} value={lastName} onChange={e=>{
              const { value } = e.target;
           
              const re = /^[A-Za-z]+$/;
              if (value === "" || re.test(value)) {
                setLastName(e.target.value)
              }
              }} />
            <Input placeholder='Gender' size='md' mb={2} value={gender} onChange={e=>{
              const { value } = e.target;
           
              const re = /^[A-Za-z]+$/;
              if (value === "" || re.test(value)) {
                setGender(e.target.value)
              }
              }}  />
            <Input type="number" placeholder='Age' size='md' mb={2} value={age} onChange={e=>setAge(e.target.value)} />
            <InputGroup mb={2}>
                <InputLeftAddon children='+91' />
                <Input type='tel' placeholder='Phone Number' value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} />
            </InputGroup>
            <Input mb={2} type="date" placeholder="Date" value={dob} onChange={e=>setDob(e.target.value)}/>
            <Input mb={2}  placeholder="Speciality" size = 'md' value={speciality} onChange={e=>setSpeciality(e.target.value)}/>
            <Input mb={2}  placeholder="Clinic Name" size = 'md' value={clinicName} onChange={e=>setClinicName(e.target.value)}/>
            <Input mb={2}  placeholder="Clinic Address" size = 'lg' value={clinicAddress} onChange={e=>setClinicAddress(e.target.value)}/>
            
            <Textarea
                value={education}
                onChange={e=>setEducation(e.target.value)}
                placeholder='Education and Degrees'
                size='lg'
                rows={7}
            />
            <Textarea
                value={prevExperience}
                onChange={e=>setPrevExperience(e.target.value)}
                placeholder='Previous Working Experience'
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
                setDocdet(null)
                onClose();
              }} variant='ghost'>Cancel</Button>
            </ModalFooter>
            </form>
  
          </ModalContent>
        </Modal>
      </>
    )
  }

export default FormModalDoct;
