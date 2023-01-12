import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from '../utils/init-firebase';
function ImgModal({isOpen, onClose, selectedImage, setSelectedImage}) {
  const {currentUser} = useAuth()
  const getImageURL = async (image, user) => {
    if (!(image && user)) return;
    const storageRef = ref(storage, `input/${user}`);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef).then((url) => url);
  };
    const submitImgHandler = async() => {
      const imageURL = await getImageURL(selectedImage,currentUser.uid)
      await setDoc(doc(db, 'users', currentUser.email), { skinImgURL: imageURL }, { merge: true });
      setSelectedImage(null)
      onClose()
    }

    console.log(selectedImage)

    return (
      <>
        <Modal closeOnOverlayClick={false} blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Image</ModalHeader>
            <ModalBody>
              <img src={URL.createObjectURL(selectedImage)} alt="" />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={submitImgHandler}>
                Submit
              </Button>
              <Button onClick={()=>{
                setSelectedImage(null)
                onClose();
              }} variant='ghost'>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default ImgModal;
