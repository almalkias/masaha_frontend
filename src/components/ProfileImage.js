import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { useLoading } from "./contexts/LoadingContext";
import logo from "../assets/images/logo-2.png";


function ProfileImage({ showText }) {
  const [userImage, setUserImage] = useState(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("accounts/profile/");
        setUserImage(response.data.image_url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsLoading(true);

    try {
      const response = await apiClient.put(
        "accounts/profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserImage(response.data.image_url);
      console.log("Image updated:", response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-image section">
      <div className="upload-image inp-container">
        <label htmlFor="image">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <img
            src={userImage || logo}
            alt="Profile"
            className="avatar"
          />

          {showText && <p>تعديل</p>}
        </label>
      </div>
    </div>
  );
}

export default ProfileImage;
