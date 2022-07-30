import './Profile.css'
import Logo from "../assets/images/logo.png";
import UserPreview from "../assets/images/userimage.png";
import { uploads } from "../utils/config";

//Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//Redux
import { profile } from "../slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <div className="profile">
      <div className="profile-content">
        <img src={Logo} alt="Market List logo" />
        <div className="profileImage">
          {user.profileImage || previewImage ? (
            <img
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${uploads}/users/${user.profileImage}`
              }
              alt={user.name}
            />
          ) : (
            <img className="profile-image" src={UserPreview} alt={user.name} />
          )}
        </div>
        <p>
          <small>Bem vindo(a)</small>
        </p>
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default Profile