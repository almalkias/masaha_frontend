import { useState, useEffect } from "react";
import PaintCard from "../PaintCard/PaintCard";
import arrow_left from '../../assets/images/arrow-square-left.svg';
import arrow_right from '../../assets/images/arrow-square-right.svg';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ShoppingPage.css";
import apiClient from "../../api/client";
import { useLoading } from '../contexts/LoadingContext';

function ShoppingPage() {
  const [paints, setPaints] = useState([])
  const { setIsLoading } = useLoading();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/products/?page=${page}`);
        setPaints(response.data.results);
        // Calculate the total number of pages
        setTotalPages(Math.ceil(response.data.count / 6));
      } catch (error) {
        console.error('There was an error fetching the paintings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className='shopping-page'>
      <ToastContainer rtl />
      <div className='container'>
        {/* <div className="sorting">
          <div className="text">عرض خاص 25 من 290</div>
          <button className="button active">فرز<img src={chevron} alt="" /></button>
          <button className="button">تصفيه<img src={filter} alt="" /></button>
        </div> */}
        <div className='paint-cards'>
          {paints.map((paint) => (
            <PaintCard key={paint.id} paint={paint} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="navgation">

            {/* Previous page */}
            <img
              src={arrow_left}
              alt=""
              onClick={() => page > 1 && setPage(page - 1)}
              style={{ cursor: "pointer", opacity: page === 1 ? 0.5 : 1 }}
            />

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  cursor: "pointer",
                  fontWeight: page === i + 1 ? "bold" : "normal"
                }}
              >
                {i + 1}
              </span>
            ))}

            {/* Next page */}
            <img
              src={arrow_right}
              alt=""
              onClick={() => page < totalPages && setPage(page + 1)}
              style={{ cursor: "pointer", opacity: page === totalPages ? 0.5 : 1 }}
            />

          </div>
        )}
      </div>
    </div>
  )
}

export default ShoppingPage;
