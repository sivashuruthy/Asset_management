import { useState, useEffect } from 'react'
import './css/Dashboard.css'
import Image3 from './Image/Image3.png'

export default function Dashboard() {

    // State to hold asset counts fetched from backend
    const [counts, setCounts] = useState({
        total: 0,
        assigned: 0,
        unassigned: 0,
        faulty: 0,
    });

     // Fetch dashboard data once on component mount
    useEffect(() => {
        fetch("http://localhost:5000/dashboard")
            .then((res) => res.json())
            .then((data) => setCounts(data)
            )
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    // Data for the dashboard cards
    const cardData = [
        { title: "Total", count: counts.total, bgColor: "bg-primary" },
        { title: "Assigned", count: counts.assigned, bgColor: "bg-success" },
        { title: "Unassigned", count: counts.unassigned, bgColor: "bg-warning" },
        { title: "Faulty/Expired", count: counts.faulty, bgColor: "bg-danger" },
    ];

    return (
        <div className='dashboard-layout '>
            <header>
                <nav className='navbar navbar-expand-sm header-bg-primary fixed-top'>
                    <a href="#" className='navbar-brand m-3'>Asset management</a>

                    <div className='container-fluid me-0 header-menu'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0 ms-3'>
                            <li className='nav-item'><a href="#" className="nav-link">Employee</a></li>
                            <li className='nav-item'><a href="/Add_asset" className="nav-link">Add asset</a></li>
                            <li className='nav-item'><a href="#" className="nav-link">Assign</a></li>
                            <li className='nav-item'><a href="#" className="nav-link">Report</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className='app-section '>
                <div className='d-flex col-md-12 section-bg'>

                    <div className=' col-md-6 '>

                        <div className="container">
                            <div className="row">

                                 {/* Loop through card data to render cards */}
                                {cardData.map((card, index) => (
                                    <div key={index} className="col-md-3 col-sm-6 mb-3 count-card">
                                        <div className={`card text-white bg-transparent`}>
                                            <div className="card-body text-center">
                                                <h1 className="card-text text-color-1">{card.count}</h1>
                                                <p className="card-title text-color-2">{card.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                <h1 className='d-flex justify-content-center text-color-2'>Asset Management</h1>

                            </div>
                        </div>
                    </div>

                    <div className='col-md-6' ><img src={Image3} className='Img' /></div>

                </div>
            </section>

            <footer>
                <div className="fixed-bottom app-footer">&copy; shuruthy 2025</div>
            </footer>

        </div>


    )
}