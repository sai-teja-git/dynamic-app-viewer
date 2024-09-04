import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./Header.scss";


export default function Header() {
    const navigate = useNavigate();


    return (
        <nav className="app-header">
            <div className="title">
                App View
            </div>
            <div className="options">
                <div className="card flex justify-content-center">
                    <Button label="Logout" outlined onClick={() => navigate("/")} size="small" />
                </div>
            </div>
        </nav >
    )
}
