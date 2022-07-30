import './ProfileEdit.css'
import TopBar from '../../components/TopBar'
import UserPreview from '../../assets/images/userimage.png'

import { uploads } from '../../utils/config'

//Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Redux
import {profile, resetMessage, updateProfile} from '../../slices/userSlice'

//Components
import Message from '../../components/Message'

const ProfileEdit = () => {
  const dispatch = useDispatch()

  const {user, message, error, loading} = useSelector((state) => state.user)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")
  const [imgerror, setImgError] = useState("")

  //Load user data
  useEffect(() => {
    dispatch(profile());
    setImgError("");
  }, [dispatch, profileImage.name]);

  //Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  },[user])

  const handleSubmit = async(e) => {
    e.preventDefault()

    //  const extProfileImage = profileImage.name.split(".").pop();
    //  const permitidos = /(\jpg|\jpeg|\png|\webp)$/i;
    //  if (!permitidos.exec(extProfileImage)) {
    //    setImgError("Extensões aceitas png, jpg ou webp!") 
    //    return;
    //  }

        
    //Gather user data from states
    const userData = {
      name
    }

    if (name) {
      userData.name = name
    }
    if (profileImage) {
      userData.profileImage = profileImage
    }
    
    if (password) {
      userData.password = password
    }

    //Build form data
    const formData = new FormData()

    const userFormData = Object.keys(userData).forEach((key) => formData.append(key, userData[key])
    );
    
    formData.append("user", userFormData)
    
    await dispatch(updateProfile(formData))

    
    setTimeout(() => {
      dispatch(resetMessage())
      setProfileImage("");
    }, 2000)
  }

  const handleFile = (e) => {

    //Image preview
    const image = e.target.files[0]
    
    setPreviewImage(image)

    //Update image state
    setProfileImage(image)
  }

  return (
    <div className="profile-edit">
      <TopBar title="Edite seu perfil" />
      <div className="profile-edit-content">
        <p>
          Nesta página você pode alterar seus dados e também sua foto de perfil.
        </p>
        {user.profileImage || previewImage ? (
          <div className="profile-image">
            <img
              src={
                previewImage
                  ? URL.createObjectURL(previewImage)
                  : `${uploads}/users/${user.profileImage}`
              }
              alt={user.name}
            />
          </div>
        ) : (
          <div className="profile-image"><img className="profile-image" src={UserPreview} alt={user.name} /></div>
        )}
        <div className="profile-form">
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome:</span>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
              />
            </label>
            <label>
              <span>E-mail:</span>
              <input type="email" disabled value={email || ""} />
            </label>
            <label>
              <span>Password:</span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password || ""}
              />
            </label>
            <div className="btn-upload">
              <label className="upload" htmlFor="upload">
                <span>Alterar foto de perfil</span>
                <input id="upload" type="file" onChange={handleFile} />
              </label>
            </div>
            {!loading && <input type="submit" value="Atualizar" />}
            {loading && <input type="submit" value="Aguarde" disabled />}
            {error && <Message msg={error} type="error" />}
            {imgerror && <Message msg={imgerror} type="error" />}
            {message && <Message msg={message} type="success" />}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit