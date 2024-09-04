import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate()

    return (
        <div className="flex align-items-center justify-content-center h-screen">
            <Button label="Login" onClick={() => navigate("/pages/static")} />
        </div>
    )
}
