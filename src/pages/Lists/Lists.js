import TopBar from '../../components/TopBar'
import './Lists.css'

//Icons
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

//Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import Data from "../../components/Data";

//Hooks
import { useEffect, useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Redux
import { profile } from "../../slices/userSlice";
import { publishList, getUserLists, resetMessage, deleteList} from "../../slices/listSlice";

const Lists = () => {
  const userStorage = localStorage.getItem("user");
  const usuario = JSON.parse(userStorage);
  const id = usuario._id;
  const userId = id;

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);

  const {
    lists,
    loading: loadingList,
    message: messageList,
    error: errorList,
  } = useSelector((state) => state.list);
  
  //Load user data
  useEffect(() => {
    dispatch(getUserLists(id));
  }, []);
  
  //Reset Message
  const messageReset = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const [title, setTitle] = useState("");

  const newListForm = useRef();

  //Insert new list
  const handleSubmit = (e) => {
    e.preventDefault();

    const listData = {
      title,
      userId: id,
      userName: user.name,
    };
    dispatch(publishList(listData));
    messageReset();
    setTitle("")
  };

  //Delete a foto
  const handleDelete = (id) => {
    dispatch(deleteList(id));
    messageReset();
  };

  return (
    <div>
      <TopBar title="Aqui você encontra todas suas listas" />
      {id && (
        <>
          <div className="new-list" ref={newListForm}>
            <h3>Crie sua nova lista</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome com mais de 4 caracteres"
                onChange={(e) => setTitle(e.target.value)}
                value={title || ""}
              />
              {!loadingList && <input type="submit" value="Criar nova lista" />}
              {loadingList && <input type="submit" disabled value="Aguarde" />}
            </form>
          </div>
          {errorList && <Message msg={errorList} type="error" />}
          {messageList && <Message msg={messageList} type="success" />}
        </>
      )}
      <div className="user-list">
        <h3>Listas criadas</h3>
        <div className="list-header">
          <div className="title-list">Título das listas</div>
          <div className="date-list-header">Data de Criação</div>
          <div className="action-list-header">Ações</div>
        </div>
        <div className="list-container">
          {lists && lists.length > 0 ? (
            lists.map((lis) => (
              <div className="name-list" key={lis._id}>
                <span>{lis.title}</span>
                <div className="date-list">
                  <Data date={lis.createdAt} />
                </div>
                <div className="actions">
                  <Link className="btn edit" to={`/listprod/${lis._id}`}>
                    <FaPencilAlt />
                  </Link>
                  <button className="btn delete">
                    <FaTrashAlt onClick={() => handleDelete(lis._id)} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma lista encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lists