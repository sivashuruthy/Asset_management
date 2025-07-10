import './css/Dashboard.css'
import Image1 from './Image/DashboardImg1.jpg'
import Image2 from './Image/Image1.jpg'
export default function Dashboard() {
    return (
        <div className='dashboard-layout '> 
            <header>
                <nav className='navbar navbar-expand-sm header-bg-primary fixed-top'>
                    <a href="#" className='navbar-brand m-3'>Asset management</a>

                    <div className='container-fluid me-0 header-menu'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0 ms-3'>
                            <li className='nav-item'><a href="#" class="nav-link">Employee</a></li>
                            <li className='nav-item'><a href="#" class="nav-link">Add asset</a></li>
                            <li className='nav-item'><a href="#" class="nav-link">Assign</a></li>
                            <li className='nav-item'><a href="#" class="nav-link">Report</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className='app-section '>
                <div className='d-flex col-md-12'>
                    
                    <div className='bg-secondary col-md-6 '>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-3 col-sm-6 mb-3">
                                    One of three columns
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6' ><img src={Image1} className='' /></div>

                </div>
            </section>

            <footer>
                <div className="fixed-bottom app-footer">&copy; shuruthy 2025</div>
            </footer>

        </div>


    )
}