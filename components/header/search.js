import { Input } from '@nextui-org/react'
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

const SearchBar = ({ isOpen, onOpenChange }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hledání filmů</ModalHeader>
              <ModalBody>
                <p className='opacity-80'> 
                  Zde napiš název filmu který hledáš, může se stát že najdeš film který nemáme v databázi ale potom si můžeš požádat o film.
                </p>
                <Input type="email" variant="underlined" label="Email" />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Zavřít
                </Button>
                <Button color="primary" onPress={onClose} className='bg-white text-black'>
                  Vyhledat
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SearchBar
