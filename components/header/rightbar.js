import { Button, Tooltip } from '@nextui-org/react'
import { Bell, Search } from 'lucide-react'
import React from 'react'
import SearchBar from './search'
import { useDisclosure } from "@nextui-org/react";

const RightBar = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className='flex flex-row items-center gap-2'>
      <SearchBar isOpen={isOpen} onOpenChange={onOpenChange}/>
      <Button 
        isIconOnly 
        color="warning" 
        variant="light" 
        aria-label="Hledání filmů" 
        className='border-0' 
        onPress={onOpen}
      >
        <Search/>
      </Button>
      <Tooltip content="Již brzy!" placement='bottom'>
        <Button isDisabled isIconOnly color="warning" variant="light" aria-label="Hledání filmů" className='border-0'>
          <Bell/>
        </Button>
      </Tooltip>
    </div>
  )
}

export default RightBar
