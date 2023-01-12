import { Button } from '@chakra-ui/react';
import { openSpotlight, SpotlightProvider } from '@mantine/spotlight';
import React, { useEffect, useState } from 'react'

const SearchSpotlight = ({patientData}) => {
    const [searchParams, setSearchParams] = useState([])
    useEffect(() => {
      setSearchParams(patientData?.docs?.map((patient, idx)=>
      ({    
      title: `${patient.data()?.firstName} ${patient.data().lastName}`,
      description: `PC: ${patient.data().predictedClass} Severity: ${patient.data().doctorSevere}`,
      icon: <p>{patient.data().doctorSevere}</p>,
      onTrigger: () => document.getElementsByClassName(`test${idx}`)[0].click(),       
      })))
    }, [])
    
    const actions = 
    searchParams
        
      
  return (
    <div>
        <SpotlightProvider
      actions={actions}
      searchPlaceholder="Search..."
      shortcut="mod + shift + 1"
      nothingFoundMessage="Nothing found..."
    >
        <Button variant = 'outline'  colorScheme = 'pink' mb={2} onClick={openSpotlight} >Search Patients</Button>
    </SpotlightProvider>
    </div>
  )
}

export default SearchSpotlight
