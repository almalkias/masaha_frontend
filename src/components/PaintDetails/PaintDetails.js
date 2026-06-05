import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import apiClient from '../../api/client';
import shipment from '../../assets/images/Group.svg';
import map from '../../assets/images/black.svg';
import "./PaintDetails.css";
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from "../contexts/AuthContext";
import { useLoading } from '../contexts/LoadingContext';


function PaintDetails() {
    const { id } = useParams();
    const [paintingDetails, setPaintingDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { addToCart } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsLoading } = useLoading();


    const handleAddToCartClick = (item) => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true, state: { from: location.pathname } });
        } else {
            addToCart(item);
        }
    };

    useEffect(() => {
        const fetchPaintingDetails = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get(`api/paints/${id}`);
                const data = response.data;

                // Map the images to an array
                const paintThumbnails = [data.image1, data.image2, data.image3, data.image4, data.image5].filter(Boolean);

                setPaintingDetails({
                    ...data,
                    paint_thumbnail: paintThumbnails
                });

                setSelectedImage(paintThumbnails[0]); // Set initial selected image
            } catch (error) {
                console.error('There was an error fetching the paint data!', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaintingDetails();
    }, [id, setIsLoading]);

    return (
        <>
            {paintingDetails && (
                <div className='paint-details'>
                    <div className='paint-thumbnail'>
                        {paintingDetails.paint_thumbnail.map((img, index) => (
                            <img key={index} src={img} alt='' onClick={() => setSelectedImage(img)} />
                        ))}
                    </div>
                    <div className='paint-image'>
                        <img src={selectedImage} alt='' />
                    </div>
                    <div className='painting-info'>
                        <h2>{paintingDetails.title}</h2>
                        <h3>الرسام / {paintingDetails.artist}</h3>
                        <p style={{ direction: 'ltr' }}>{paintingDetails.width} X {paintingDetails.height} : الأبعاد</p>
                        <div className='painting-description'>
                            <p>{paintingDetails.description}</p>
                        </div>
                        <p>{paintingDetails.summary}</p>
                        <hr />
                        <div className='purchase-details'>
                            <div id='painting-price'><span>{paintingDetails.price}</span> ر.س</div>
                            <div className='ship-info'>
                                <img src={map} alt="" />
                                <span>يتم شحنها من المملكة العربية السعودية، الخبر </span>
                            </div>
                            <div className='ship-info'>
                                <img src={shipment} alt="" />
                                <span>متوقع شحنها في خلال 3 - 7 أيام </span>
                            </div>
                            <button onClick={() => handleAddToCartClick(id)}>اضف الى السلة</button>
                            <p>سيتم تطبيق الضرائب ورسوم الشحن عند إتمام عملية الدفع</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PaintDetails;