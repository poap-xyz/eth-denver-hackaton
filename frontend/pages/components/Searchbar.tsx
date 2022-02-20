import { useState, useContext } from 'react'
import classnames from "classnames"
//import { NavigationContext } from 'context/navigation'
import styles from "../../styles/Searchbar.module.scss"

function Searchbar(){
  // const [ query, setQuery ] = useState('')
  // const { navigate } = useContext(NavigationContext)

  function handleSubmit(event:any){
    /*
    event.preventDefault()

    if( query ){
      navigate({
        to: `/${query}`
      })
    }
    */
  }

  return (
    <div className="search-div">
    <form className={classnames(styles.uiSearchbar,"search-form")} onSubmit={handleSubmit}>
      <div className={styles.uiSearchbarWrap}>
        <input
          type="text"
          placeholder="search by address or ENS"
          className={classnames(styles.uiSearchbarInput, { value: null })}
          //value={null}
          //onChange={e => setQuery(e.target.value)}
          pattern="^(0x[0-9a-f-A-F]{40})|([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?)$"
          required
        />
      </div>
      <div className={styles.uiSearchbarCta}>
        <button type="submit" className={styles.uiSearchbarButton}>
          <span>search</span>
        </button>
      </div>
    </form>
    </div>
  )
}

export default Searchbar