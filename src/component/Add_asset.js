import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './css/Add_asset.css'

export default function Add_asset() {
  const navigate = useNavigate();

  // State to store all assets
  const [assets, setAsset] = useState([])

  // State to store selected filter category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // State to store unique categories
  const [categories, setCategories] = useState([]);

  // Controls Add Asset popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // Controls Edit Asset popup visibility
  const [showEdit, setShowEdit] = useState(false);

  // Stores edited asset details entered in form
  const [selectedAsset, setSelectedAsset] = useState(null)


  // Stores new asset details entered in form
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: '',
    status: '',
    purchase_date: '',
    assigned_to: ''
  });


  // Fetch all assets and extract categories on component mount
  useEffect(() => {
    fetch("http://localhost:5000/asset")
      .then((res) => res.json())
      .then((data) => {
        setAsset(data);

        // Extract unique categories including "All"
        const uniqueCategories = ["All", ...new Set(data.map((a) => a.category))];
        setCategories(uniqueCategories);
      });
  }, []);


  // Filter assets based on selected category
  const filteredAssets = selectedCategory === "All"
    ? assets
    : assets.filter((a) => a.category === selectedCategory);


  // Function to fetch assets from server
  const fetchAssets = () => {
    fetch("http://localhost:5000/asset")
      .then((res) => res.json())
      .then((data) => setAsset(data))
      .catch((err) => console.error(err));
  };

  // Handles changes in the add asset form inputs
  const handleChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  // Handles changes in the edit asset form inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedAsset((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles form submission to Edit asset
  const handleEditAsset = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/update_asset/${selectedAsset.asset_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedAsset)
    })
      .then((res) => res.json())
      .then(() => {
        alert("Asset updated successfully!");
        setShowEdit(false); // Close popup        
        fetchAssets();  // Refresh the asset list
      })
      .catch((err) => console.error(err));
  };


  // Handles form submission to add new asset
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
        fetchAssets();  // Refresh the asset list
        setShowPopup(false); // Close popup        
        // Reset form
        setNewAsset({ name: '', category: '', status: '', purchase_date: '', assigned_to: '' });
      })
      .catch((err) => console.error(err));
  };


  // Navigate back to dashboard
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
          <div className="d-flex col-md-12 position-sticky">
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
              {/* <input
                type="text"
                placeholder="Search by name or city"
                className="mb-4 p-2 border border-gray-300 rounded col-md-5"
              /> */}
              <button
                className="mb-4 p-2 border border-0 rounded col-md-2 add_btn text-white" onClick={() => setShowPopup(true)}> Add Asset </button>

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
                <th>Purchase Date</th>
                <th>Edit</th>
                <th>Delete</th>
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
                  <td>{asset.purchase_date}</td>
                  <td><button className="mb-4 p-2 border border-0 rounded add_btn text-white d-flex justify-content-between"
                    onClick={() => { setSelectedAsset(asset); setShowEdit(true); }}>Edit</button></td>

                  <td><button>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Edit popup  */}
          {showEdit && (<div>
            <div className="popup">
              <div className="popup-inner">
                <h3>Edit the asset</h3>
                <form onSubmit={handleEditAsset}>
                  <input name="name" placeholder="Asset Name" value={selectedAsset.name} onChange={handleEditChange} required />
                  <select name="category" value={selectedAsset.category} onChange={handleEditChange} required>
                    <option value="">-- Select Category --</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Network">Network</option>
                    <option value="Power">Power</option>
                    <option value="Peripheral">Peripheral</option>
                    <option value="Furniture">Furniture</option>
                  </select>

                  <select name="status" value={selectedAsset.status} onChange={handleEditChange} required>
                    <option value="">-- Select Status --</option>
                    <option value="assigned">Assigned</option>
                    <option value="unassigned">Unassigned</option>
                    <option value="faulty">Faulty</option>
                    <option value="expired">Expired</option>
                  </select>
                  <input name="purchase_date" placeholder="YYYY-MM-DD" value={selectedAsset.purchase_date} onChange={handleEditChange} required />
                  <input name="assigned_to" placeholder="assigned_to" value={selectedAsset.assigned_to} onChange={handleEditChange} disabled={newAsset.status === "unassigned"}
                    required={newAsset.status !== "unassigned"}
                  />
                  <button type="submit">Edit</button>
                  <button type="button" onClick={() => setShowEdit(false)}>Cancel</button>
                </form>
              </div>
            </div>
          </div>)}

          {/* Add asset popup */}

          {showPopup && (<div>
            <div className="popup">
              <div className="popup-inner">
                <h3>Add New Asset</h3>
                <form onSubmit={handleAddAsset}>
                  <input name="name" placeholder="Asset Name" value={newAsset.name} onChange={handleChange} required />
                  <select name="category" value={newAsset.category} onChange={handleChange} required>
                    <option value="">-- Select Category --</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Network">Network</option>
                    <option value="Power">Power</option>
                    <option value="Peripheral">Peripheral</option>
                    <option value="Furniture">Furniture</option>
                  </select>

                  <select name="status" value={newAsset.status} onChange={handleChange} required>
                    <option value="">-- Select Status --</option>
                    <option value="assigned">Assigned</option>
                    <option value="unassigned">Unassigned</option>
                    <option value="faulty">Faulty</option>
                    <option value="expired">Expired</option>
                  </select>
                  <input name="purchase_date" placeholder="YYYY-MM-DD" value={newAsset.purchase_date} onChange={handleChange} required />
                  <input name="assigned_to" placeholder="assigned_to" value={newAsset.assigned_to} onChange={handleChange} disabled={newAsset.status === "unassigned"}
                    required={newAsset.status !== "unassigned"} />
                  <button type="submit">Add</button>
                  <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
                </form>
              </div>
            </div>
          </div>)}
        </div>
      </section>

      <footer>
        <div className="fixed-bottom app-footer">&copy; shuruthy 2025</div>
      </footer>


    </div>
  )
}