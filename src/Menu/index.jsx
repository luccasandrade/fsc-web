import React from "react";
import './styles.css'

const Menu = () => {
    const handlerLogout = () => {
        localStorage.removeItem('user')
        location.reload()
    }

    return (
        <div className="menu">
            <a className="btn-logout" onClick={handlerLogout}><span>LOGOUT</span></a>
        </div>
    )
}

export default Menu