import React,{ PropTypes, Component } from 'react'
import classnames from 'classnames'
import styles from './NavigatorTable.css'

class NavigatorTable extends Component {

  render() {
    const { children }= this.props
    return (
      <div className={styles.nav}>
          <div className={styles.navwp} >
              {children}
          </div>
      </div>
    )
  }
}


export default NavigatorTable
