import { Button } from '@nextui-org/react'
import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <Button 
        isIconOnly 
        color="primary" 
        variant="light" 
        aria-label="Menu" 
        className='border-0' 
        onClick={toggleMenu}
      >
        <Menu />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-[#101014] border-r border-black shadow-lg z-50"
          >
            <div className="p-4">
              <div className='flex flex-row justify-between items-center'>
                <h2 className="text-lg font-bold lobsterfont">Filmový Ráj</h2>
                <Button isIconOnly onClick={toggleMenu}><X /></Button>
              </div>
              <ul>
                <li className="my-2">Zatím zde nic není potřeba, přijde v nové aktualizaci</li>
                
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MenuComponent
