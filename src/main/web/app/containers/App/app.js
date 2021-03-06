import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import defaultLogo from 'assets/dont-know-icon.png'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      appLogo: defaultLogo
    }
    this.styles = {
      forceNavDown: {
        top: '64px'
      },
      imgDiv: {
        height: '60px',
        width: 'auto',
        marginTop: '2px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center'
      }
    }
  }

  handleRequestChange = () => {
    this.setState({ open: false })
  }

  handleHamburgerToggle = () => {
    this.setState({ open: !this.state.open })
  }

  getLogoStyle = () => {
    let imgStyling = {
      ...this.styles.imgDiv,
      backgroundImage: `url(${this.state.appLogo})`,
      backgroundSize: 'contain'
    }
    return imgStyling
  }

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar
            id='app-bar'
            title={<div style={this.getLogoStyle()} />}
            onLeftIconButtonTouchTap={this.handleHamburgerToggle}
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon id='app-moreButton' /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText='Sign Out' />
              </IconMenu>
            }
          />
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={this.handleRequestChange}
            containerStyle={this.styles.forceNavDown}
          >
            <Menu>
              <MenuItem
                onTouchTap={this.handleRequestChange}
                containerElement={<Link to='/pageOne' />}>Page One</MenuItem>
              <Divider />
              <MenuItem
                onTouchTap={this.handleRequestChange}
                containerElement={<Link to='/' />}>Home</MenuItem>
              <MenuItem
                onTouchTap={this.handleRequestChange}
                containerElement={<Link to='/about' />}>About</MenuItem>
            </Menu>
          </Drawer>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default withRouter(App)
