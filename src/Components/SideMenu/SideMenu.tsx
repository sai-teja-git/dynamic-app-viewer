import { useEffect, useState } from "react"
import "./SideMenu.scss"
import { getMenuScreens } from "../../Pages/MenuScreen/menu-screen-mapping.service"
import { useLocation, useNavigate } from "react-router-dom";

export default function SideMenu() {

    const navigate = useNavigate();
    const location = useLocation();
    const [menus, setMenus] = useState<any[]>([]);
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        getMenus()
    }, [])

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [location])

    const getMenus = () => {
        getMenuScreens().then(res => {
            const data = res.data?.data ?? []
            setMenus(data)
        }).catch(() => {
            setMenus([])
        })
    }

    const redirectTo = (menu: any) => {
        navigate(menu.path, { state: menu })
    }

    return (
        <div className="menu-list">
            <ul className="menu-content">
                {menus.map(menu => (
                    <li className={`${(menu.path === currentPath && 'active')}`} key={menu._id} onClick={() => redirectTo(menu)}>
                        <a>
                            <div className="menu-icon">
                                <i className="pi pi-compass"></i>
                            </div>
                            <div className="menu-name">
                                {menu.name}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
