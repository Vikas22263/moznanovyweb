import {Divider} from "@nextui-org/divider";
import Link from 'next/link'
import React from 'react'
import { FaInstagram, FaDiscord } from 'react-icons/fa'

const main = () => {
  return (
    <footer className='flex flex-col sm:flex-row justify-between items-center gap-5 px-5 py-2'>
        <div className='flex flex-col justify-center items-center'>
            <p className='lobsterfont text-xl'>Filmový ráj</p>
            <Divider className="my-4" />
            <Link href="/dmca">
            <p  className="text-blue-400">DMCA</p>
            </Link>
        </div>
        <div>
        <p>Made with ❤️ by <Link className='text-blue-400' href="https://www.instagram.com/raketodrak/">Adam</Link></p>
        </div>
        <div className='flex flex-row'>
            <Link href="https://www.instagram.com/filmovyraj/">
                <FaInstagram className='text-xl mx-2'/>
            </Link>
            <Link href="https://discord.gg/ZEGfUVXyWF">
                <FaDiscord className='text-xl mx-2'/>
            </Link>
        </div>
    </footer>
  )
}

export default main
