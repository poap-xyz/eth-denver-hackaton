import { useState, useContext } from 'react'
import classnames from 'classnames'
import { NavigationContext } from 'context/navigation'
import SearchIcon from 'component/Layout/Icon/Search'

function Searchbar(){
  const [ query, setQuery ] = useState('')
  const { navigate } = useContext(NavigationContext)

  function handleSubmit(event){
    event.preventDefault()

    if( query ){
      navigate({
        to: `/${query}`
      })
    }
  }

  return (
    <form className="ui-searchbar" onSubmit={handleSubmit}>
      <div className="ui-searchbar-wrap">
        <input
          type="text"
          placeholder="search by address or ENS"
          className={classnames('ui-searchbar-input', { value: query })}
          value={query}
          onChange={e => setQuery(e.target.value)}
          pattern="^(0x[0-9a-f-A-F]{40})|([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?)$"
          required
        />
        <div className="ui-searchbar-icon">
          <SearchIcon />
        </div>
      </div>
      <div className="ui-searchbar-cta">
        <button type="submit" className="ui-searchbar-button">
          <span>search</span>
        </button>
      </div>
    </form>
  )
}

export default Searchbar