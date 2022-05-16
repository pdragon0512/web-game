import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

// import  AppHeaderDropdown  from './AppHeaderDropdown'
import { logo } from '../assets/avatar/logo'

const AppHeader = () => {
//   const dispatch = useDispatch()
//   const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="bg-dark" style={{ borderStyle: 'none' }}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
        //   onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none bg-dark" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto" style={{ borderStyle: 'none' }}>
          <CNavItem>
          {/* component={NavLink}  */}
            <CNavLink to="/dashboard" style={{ color: 'yellow' }}>
              Dashboard
            </CNavLink>
          {/* </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href="#" style={{ color: 'yellow' }}>
              Users
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#" style={{ color: 'yellow' }}>
              Settings
            </CNavLink> */}
          </CNavItem>
        </CHeaderNav>
        {/* <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav> */}
      </CContainer>
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
