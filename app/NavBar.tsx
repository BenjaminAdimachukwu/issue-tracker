'use client'
import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname()
    const {status,data:session } = useSession()
    const links = [
    {label: 'Dashboard', href: '/'},
    {label: 'Issues', href: '/issues/list'},
]
  return (
    <nav className=' border-b  py-3 px-5'> 
    <Container>

    <Flex justify='between'>
    <Flex gap='3' align='center'>
    <Link href='/'><FaBug /></Link>
        <ul className='flex space-x-6'>
           {links.map(link =>
           <li key={link.href}>
             <Link  className={classNames({
               'text-zinc-900': link.href === currentPath,
              'text-zinc-500' : link.href != currentPath,
              'hover:text-zinc-800 transition-colors' : true
            })} href={link.href}>
              {link.label} 
              </Link>
              </li>
           )}
           
        </ul>
    </Flex>
    <Box>
    <Box>
          {status === 'authenticated' && (<Link href='/api/auth/signout'>log out</Link>)}
          {status === 'unauthenticated' && (<Link href='/api/auth/signin'>log in</Link>)}
        </Box>
    </Box>
    </Flex> 
              </Container>
    </nav>
  )
}

export default NavBar