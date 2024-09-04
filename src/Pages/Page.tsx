import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header';
import "./Pages.scss";
import SideMenu from '../Components/SideMenu/SideMenu';

export default function Page() {
    return (
        <>
            <Header />
            <SideMenu />
            <div className="page-container">
                <Outlet />
            </div>
        </>
    )
}
