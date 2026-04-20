import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from "../contexts/AuthContext";
import { FavouritePaintContext } from "../contexts/FavouritePaintContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solid_heart } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PaintCard.css";

function PaintCard({ paint }) {
  const { favouritePaints, addFavouritePaint, removeFavouritePaint } = useContext(FavouritePaintContext);
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const paintDescription = paint.description || "لا يوجد وصف متاح لهذه اللوحة حالياً.";
  const paintSize =
    paint.width && paint.height
      ? `${paint.width}*${paint.height} انش`
      : "غير محدد";

  // Compute this directly
  const isFavourite = favouritePaints.some(p => p.id === paint.id);

  const handleAddToCartClick = async (item, buyNow) => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true, state: { from: location.pathname } });
    } else {
      const result = await addToCart(item, buyNow);

      if (result?.status === "added" && !buyNow) {
        toast.success("تمت اضافة اللوحة الى السلة", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }

      if (result?.status === "exists" && !buyNow) {
        toast.info("اللوحة موجودة بالفعل في السلة", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    }
  };

  // Toggle the favorite item
  const toggleHeart = () => {
    if (isFavourite) {
      removeFavouritePaint(paint.id);
    } else {
      addFavouritePaint(paint); // Send the full object
    }
  };

  return (
    <div className='paint-card-container'>
      <div className="paint-image-container">
        {/* <Link to={`/paint-details/${paint.id}`} > */}
        <img id="paint-photo" src={paint.image} alt="" />
        {/* </Link> */}

        <FontAwesomeIcon
          icon={isFavourite ? solid_heart : faHeart}
          className={`heart-icon${isFavourite ? " solid-heart" : ""}`}
          onClick={toggleHeart}
        />
      </div>

      <div className="paint-info">
        <div>
          <h3>{paint.name}</h3> {/* Use name instead of title */}
        </div>
        <div className="price">{paint.price} ريال</div>
      </div>

      <div className="paint-description">
        <div className="description">
          <p>{paintDescription}</p>
        </div>

        <div className="size">
          <p>حجم اللوحة</p>
          {paintSize}
        </div>
      </div>

      <div className="btns">
        <button onClick={() => handleAddToCartClick(paint.id, true)}>
          اشترِ الآن
        </button>
        <button onClick={() => handleAddToCartClick(paint.id, false)}>
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}

export default PaintCard;
