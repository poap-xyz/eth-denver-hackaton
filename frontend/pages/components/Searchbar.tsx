import type { NextComponentType } from "next";
import { useState } from 'react'
import classnames from "classnames"
import Image from "next/image";
import PoapLogo from "../../assets/poap-logo.svg";
import styles from "../../styles/Searchbar.module.scss";

const Header: NextComponentType = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={PoapLogo} width={90} />
      </div>
    </header>
  );
};

const SearchIcon = () => {
  return (
    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 1C8.62108 1 6.78435 1.55717 5.22209 2.60104C3.65982 3.64491 2.44218 5.12861 1.72315 6.86451C1.00412 8.6004 0.815985 10.5105 1.18254 12.3534C1.5491 14.1962 2.45389 15.8889 3.78249 17.2175C5.11109 18.5461 6.80383 19.4509 8.64665 19.8175C10.4895 20.184 12.3996 19.9959 14.1355 19.2769C15.8714 18.5578 17.3551 17.3402 18.399 15.7779C19.4428 14.2156 20 12.3789 20 10.5C19.9998 7.98049 18.9989 5.56422 17.2173 3.78266C15.4358 2.0011 13.0195 1.00016 10.5 1V1Z" strokeWidth="2" strokeMiterlimit="10"/>
      <path d="M18 17L26 24" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
    </svg>
  )
}

const Searchbar: NextComponentType = () => {

  const [ query, setQuery ] = useState('')

  return  (
    <form className={styles.searchbar} onSubmit={()=>{}}>
      <div className={styles.wrap}>
        <input
          type="text"
          placeholder="search by address or ENS"
          className={classnames(styles.input, { value: null })}
          value={query}
          onChange={e => setQuery(e.target.value)}
          pattern="^(0x[0-9a-f-A-F]{40})|([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?)$"
          required
        />
        <div className={styles.icon}>
          <SearchIcon />
        </div>
      </div>
      <div className={styles.cta}>
        <button type="submit" className={styles.submit}>
          <span>search</span>
        </button>
      </div>
    </form>
  )
}


export default Searchbar