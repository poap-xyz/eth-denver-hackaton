import Link from 'next/link'
import React from 'react'
import WalletDisplay from './WalletDisplay'

export const Navbar = () => {

    function handleWalletClick(){
        window.scrollTo(0, 0)
      }

  return (
    <div className="navbar">
        <div>
            <a href='/'>Logo</a>
        </div>
        <div>
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden"></span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search events"
                name="s" 
            />
            <button type="submit">Search</button>
            </form>
        </div>
        <div className="ui-wallet-header-wallet">
            <WalletDisplay/>
        </div>

    </div>
  )
}
