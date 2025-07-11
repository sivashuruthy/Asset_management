import { useNavigate } from "react-router-dom";

export default function Add_asset(){
    const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard", { replace: true }); // goes back in history
  };
    return(
        <nav className='navbar navbar-expand-sm header-bg-primary fixed-top'>
                    <a href="/Dashboard" className='navbar-brand m-3'onClick={handleBack}>Asset management</a>                    
                </nav>
    )
}