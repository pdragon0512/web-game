import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand} from '@coreui/react'
import CIcon from '@coreui/icons-react'


import { logoNegative } from '../assets/avatar/logo-negative'
import { sygnet } from '../assets/avatar/sygnet'

// import 'simplebar/dist/simplebar.min.css'


const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      style={{ backgroundColor: `'rgb(36,37,47)'` }}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
