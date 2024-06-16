import { Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { useRouter } from 'next/router';

const SearchBar = ({ isOpen, onOpenChange }) => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/search/${searchText}`);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Hledání filmů</ModalHeader>
              <ModalBody>
                
                <Input 
                  type="text" 
                  variant="underlined" 
                  label="Název filmu" 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Zavřít
                </Button>
                <Button color="primary" onPress={() => { handleSearch(); onClose(); }} className='bg-white text-black'>
                  Vyhledat
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SearchBar;
