import React, { useEffect, useState } from "react";
import { API_URL } from "../data";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { RotatingLines } from 'react-loader-spinner'
import { Link } from "react-router-dom";

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newData = await response.json();
      setVendorData(newData);
      setLoading(false)
    } catch (error) {
      alert("Failed to fetch Data");
      console.error("failed to fetch data");
      setLoading(true)
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handleScroll = (direction)=>{
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;
    if(direction === "left"){
        gallery.scrollTo({
            left: gallery.scrollLeft - scrollAmount,
            behavior: "smooth"
        })
    }else if(direction === "right"){
        gallery.scrollTo({
            left: gallery.scrollLeft + scrollAmount,
            behavior: "smooth"
    })
  }
  }

  return (
    <div className='mediaChainSection'>

      <div className="loaderSection">
        {loading &&
          <>
            <div className="loader">
              Loading..
            </div>
            <RotatingLines
              visible={true}
              height="36"
              width="36"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </>
        }
      </div>

      <div className="chain-details">
      <h2 >Top restaurant chains in Warangal</h2>
      <div className="arrow">
        <button onClick={() => handleScroll("left")}>
          <FaArrowCircleLeft className="btnIcons" />
        </button>
        <button onClick={() => handleScroll("right")}>
          <FaArrowCircleRight className="btnIcons" />
        </button>
      </div>
      </div>

      <section className="scroll" id="chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollLeft)}>
        {vendorData.vendors &&

          vendorData.vendors.map((vendor, index) => {
            return (

              <div className="image-container" key={index}>
                  {vendor.firm.map((item, i) => {
                    return (
                      <div className="vendor-box" key={i}>
                        <Link to={`/products/${item._id}`} className="link" key={item._id}>
                            <img  src={`${API_URL}/uploads/${item.image}`} alt={item.firmName} />
                            <h5>{item.firmName}</h5>
                        </Link>
                      </div>
                    );
                  })}
                </div>

            );
          })}

      </section>

    </div>

  )
}

export default Chains
