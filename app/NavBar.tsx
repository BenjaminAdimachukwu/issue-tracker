'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname()
    console.log(currentPath)
    const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Issues', href: '/issues'},
]
  return (
    <nav className='flex space-x-6 border-b  px-5 items-center h-14'> 
        <Link href='/'><FaBug /></Link>
        <ul className='flex space-x-6'>
           {links.map(link =>
            ( <li key={link.href} className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500' : link.href != currentPath,
                'hover:text-zinc-800 transition-colors' : true
            })}><Link href={link.href}>{link.label}</Link>
            
            </li>)
            )}
           
        </ul>
    </nav>
  )
}

export default NavBar