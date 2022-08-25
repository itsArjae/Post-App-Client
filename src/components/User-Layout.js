import React from 'react'
import styles from '../../styles/styles/index.module.css'
function UserLayout() {
  return (
    <div className={styles.layout} >
      <nav className={styles.layout_btn__container} >
        <button className={styles.layout_btn__nav} >Home</button>
        <button className={styles.layout_btn__nav} >Login</button>
        <button className={styles.layout_btn__nav} >Register</button>
        <button className={styles.layout_btn__nav} >Logout</button>
      </nav>
     </div>
  )
}

export default UserLayout
