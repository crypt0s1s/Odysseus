'use client'

import Image from 'next/Image'
import { StoreContext, Profile } from '../api'
import React, { useContext } from 'react'
import sunIcon from '../../public/sun.svg'
import cartIcon from '../../public/cart.svg'
import { useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:overflow-hidden">
            <div className="flex flex-row w-full bg-red-400 justify-between gap-4 p-10">
                <Logo/>
                <NavBar/>
            </div>

            <div className="flex-grow md:overflow-y-auto">
                {children}
            </div>
        </div>
    );
}

const NavBar = observer(() => {
    const { profile } = useContext(StoreContext)
    if (profile.profile != null) {
        return SignedInNavBar({ profile: profile.profile })
    } else {
        return SignedOutNavbar()
    }
})

const Logo = () => {
    return (
        <div>
            <Image
                priority
                width={50}
                height={50}
                src={sunIcon}
                alt="Helios icon"
            />
        </div>
    )
}

const SignedOutNavbar = () => {
    const router = useRouter()

    return (
        <div className="flex flex-row w-full bg-red-400 justify-end gap-4 items-center">
            <HeliosButton text="Sign in" onClick={() => { router.push('login') }}/>
            <HeliosButton text="Cart" onClick={() => {console.log("cart clicked")}}/>
        </div>
    )
}

const SignedInNavBar = ({ profile }: { profile: Profile }) => {
    return (
        <div className="flex flex-row w-full bg-red-400 justify-end gap-4 items-center">
            <div>
                <h5>Good evening {profile.displayName}</h5>
            </div>
            <button onClick={() => console.log("icon clicked")}>
                <Image priority width={30} height={30} src={cartIcon} alt="Shopping Cart"/>
            </button>
            <HeliosButton text="Profile" onClick={() => {console.log("profile in clicked")}}/>
            <HeliosButton text="Cart" onClick={() => {console.log("cart clicked")}}/>
        </div>
    )
}

const HeliosButton = ({text, onClick}: HeliosButtonProps) => {
    return (
        <button className="flex rounded-lg bg-sky-400 p-3 w-20 justify-center" onClick={onClick}>
            {text}
        </button>
    )
}

interface HeliosButtonProps {
    text: string,
    onClick: () => void,
    // TODO: child props? Forget how this works lol
}
