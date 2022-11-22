import React, { useState }  from "react";
import './styles.css'

const Copa = () => {
    const userStorage = localStorage.getItem('user')
    const [user, setUser] = useState (null)
    if (userStorage) {
        setUser(JSON.parse(userStorage))
    }

    return (
        <div className="wcPage">
            
        </div>
    )
}

export default Copa