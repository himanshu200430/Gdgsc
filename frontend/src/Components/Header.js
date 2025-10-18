import React from 'react'
import "./Header.css"
import { Search } from 'lucide-react'

const Header = () => {
  return (
    
      <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search for games" />
        </div>
    
  )
}

export default Header
