import React, { useState } from 'react'
import { Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function Menubar() {
    const url = window.location.pathname
    console.log(url)
    const path = url ==='/'?'home': url.substr(1)
    const [activeItem,setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name)




    return (
        <Menu pointing secondary color = 'teal'>
          <Menu.Item
            name='Home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as = {Link}
            to = "/"
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='Register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as = {Link}
            to = "Register"
            />
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              as = {Link}
            to = "Login"
            />
          </Menu.Menu>
        </Menu>
    )
  }

export default Menubar