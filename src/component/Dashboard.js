import './css/Dashboard.css'
export default function Dashboard(){
    return(
       <header className='fixed-top'>        
        <nav className='navbar navbar-expand-sm bg-light'> 
            <a href="#" className='navbar-brand m-3'>Asset management</a>
            
            <div className='container-fluid me-0 header-menu'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0 ms-3'>
                <li className='nav-item'><a href="#" class="nav-link">Home</a></li>
                <li className='nav-item'><a href="#" class="nav-link">Add asset</a></li>
                <li className='nav-item'><a href="#" class="nav-link">Assign</a></li>
                <li className='nav-item'><a href="#" class="nav-link">Report</a></li>
            </ul>
            </div>
        </nav>
       </header>
    )
}