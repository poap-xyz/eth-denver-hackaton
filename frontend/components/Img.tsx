import { useState } from 'react'
import classnames from 'classnames'
import styles from "../styles/Img.module.scss"

function Img({ name, src, alt, className, ...props }:any){
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  function handleLoad(){
    setLoaded(true)
  }

  function handleError(){
    setError(true)
  }

  const isServer = typeof window === 'undefined'

  return (
    <img
      {...props}
      key={name || src}
      src={src}
      alt={alt || ''}
      className={classnames(styles.uiImg, className, { client: !isServer, loaded, error })}
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}

export default Img
