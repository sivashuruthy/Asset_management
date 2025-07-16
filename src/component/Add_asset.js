import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './css/Add_asset.css'

export default function Add_asset() {
  const navigate = useNavigate();

  const [assets, setAsset] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: '',
    description: ''
  });


  useEffect(() => {
    fetch("http://localhost:5000/asset")
      .then((res) => res.json())
      .then((data) => {
        setAsset(data);

        // Get unique categories
        const uniqueCategories = ["All", ...new Set(data.map((a) => a.category))];
        setCategories(uniqueCategories);
      });
  }, []);


  // Filtered data for the table
  const filteredAssets = selectedCategory === "All"
    ? assets
    : assets.filter((a) => a.category === selectedCategory);


  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = () => {
    fetch("http://localhost:5000/asset")
      .then((res) => res.json())
      .then((data) => setAsset(data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/add_asset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAsset)
    })
      .then((res) => res.json())
      .then(() => {
        fetchAssets();  // refresh table
        setShowPopup(false);
        setNewAsset({ name: '', category: '', description: '' });
      })
      .catch((err) => console.error(err));
  };


  const handleBack = () => {
    navigate("/dashboard", { replace: true }); // goes back in history
  };
  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-sm header-bg-primary fixed-top'>
          <a href="/Dashboard" className='navbar-brand m-3' onClick={handleBack}> Back to Dashboard</a>
        </nav>
      </header>

      <section className="app-section section-bg dashboard-layout">

        <div className="container mt-4  ">
          <div className="d-flex col-md-12">
            <div className="col-md-3">

              <select
                className="form-select mb-4 ms-2 "
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >

                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <h4 style={{ marginTop: "10px" }}>
                Showing: {selectedCategory === "All" ? "All Categories" : selectedCategory}
              </h4>
            </div>
            <div className="col-md-6 search_bar">
              <input
                type="text"
                placeholder="Search by name or city"
                className="mb-4 p-2 border border-gray-300 rounded col-md-5"
              />
              <button
                className="mb-4 p-2 border border-0 rounded col-md-2 add_btn" onClick={() => setShowPopup(true)}> Add Asset </button>
              {showPopup && (<div>
            <div className="popup">
          <div className="popup-inner">
            <h3>Add New Asset</h3>
            <form onSubmit={handleAddAsset}>
              <input name="name" placeholder="Asset Name" value={newAsset.name} onChange={handleChange} required />
              <input name="category" placeholder="Category" value={newAsset.category} onChange={handleChange} required />
              <input name="description" placeholder="Description" value={newAsset.description} onChange={handleChange} />
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
        </div>)}
            </div>
          </div>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.asset_id}</td>
                  <td>{asset.name}</td>
                  <td>{asset.category}</td>
                  <td>{asset.status}</td>
                  <td>{asset.assigned_to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        <div className="fixed-bottom app-footer">&copy; shuruthy 2025</div>
      </footer>


    </div>
  )
}