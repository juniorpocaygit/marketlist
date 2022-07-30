import './Listprod.css'


//Icons
import { FaSave, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { ImUndo2 } from "react-icons/im";

//Components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import Data from "../../components/Data";
import SumTotal from '../../components/SumTotal';


//Hooks
import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//Redux
import { getListProducts, updateList, resetMessage} from "../../slices/listSlice";
import { publishProduct, deleteProduct, updateProduct, getProductByListId, rstMessage} from "../../slices/productSlice"



const Listprod = () => {
  const userStorage = localStorage.getItem("user");
  const usuario = JSON.parse(userStorage);

  const { id } = useParams();

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [qtd, setQtd] = useState("");
  const [unity, setUnity] = useState("un");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState("");
  const [editQtd, setEditQtd] = useState("");
  const [editUnity, setEditUnity] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editValue, setEditValue] = useState("");

  const {
    list,
    loading: loadingList,
    message: messageList,
    error: errorList,
  } = useSelector((state) => state.list);

  const {
    products,
    loading: loadingProduct,
    message: messageProduct,
    error: errorProduct,
  } = useSelector((state) => state.product);

  //Load list and products
  useEffect(() => {
    dispatch(getListProducts(id));
    dispatch(getProductByListId(id))
  }, []);

  const newProductForm = useRef();
  const editProductForm = useRef();

  const messageReset = () => {
    setTimeout(() => {
      dispatch(resetMessage());
      dispatch(rstMessage());
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => {
      setTitle(list.list.title);
    }, 0);
  }, [list]);

  useEffect(() => {
    dispatch(getListProducts(id));
  }, [errorProduct]);

  //Functions ----------------------------------------------------------

  //Show or hide forms
  const hideOrShowForms = () => {
    newProductForm.current.classList.toggle("hide");
    editProductForm.current.classList.toggle("hide");
  };

  //Cancel edit
  const handleCancel = (e) => {
    e.preventDefault();
    hideOrShowForms();
  };

  //Active form edit and load variabels
  const handleEdit = (produto) => {
    if (editProductForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }
    setEditId(produto._id);
    setEditQtd(produto.qtd);
    setEditUnity(produto.unity);
    setEditDescription(produto.description);
    setEditValue(produto.value);
  };

  //Add product
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const productData = {
      id: editId,
      qtd: editQtd,
      unity: editUnity,
      description: editDescription,
      value: editValue,
    };
    dispatch(updateProduct(productData));
    messageReset();
    setEditId("");
    setEditQtd("");
    setEditUnity("");
    setEditDescription("");
    setEditValue("");
    hideOrShowForms();
  };

  //Update title list
  const handleTitle = (id) => {
    const listData = {
      id,
      title,
    };
    dispatch(updateList(listData));
    messageReset();
  };

  //Delete a product
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    messageReset();
  };

  //Insert new product
  const handleAddProduct = (e) => {
    e.preventDefault();

    const productData = {
      id,
      qtd,
      unity,
      description,
      value,
    };
    if (Object.keys(value).length === 0) {
      productData.value = 0;
    }
    dispatch(publishProduct(productData));
    setTitle("");
    setQtd("");
    setUnity("un");
    setDescription("");
    setValue("");
    messageReset();
  }
  //End functions ----------------------------------------

  return (
    <div>
      <div className="top-product">
        <div className="top-product-content">
          {list.list ? (
            <div className="list-data">
              <h3>
                <Data date={list.list.createdAt} />
              </h3>
              <h3>
                <form onSubmit={() => handleTitle(list.list._id)}>
                  <button className="btn save" type="submit">
                    <FaSave />
                  </button>
                  <input
                    className="input-title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title || ""}
                  />
                </form>
              </h3>
            </div>
          ) : (
            <p>Carregando...</p>
          )}
          <div className="display-value">
            {products.products ? (
              <h2>
                <span>R$</span>
                <SumTotal produtos={products.products} />
              </h2>
            ) : (
              <h2>
                <span>R$</span> 0,00
              </h2>
            )}
            <Link className="btn cancel" to="/">
              <ImUndo2 />
            </Link>
          </div>
        </div>
      </div>
      {id && (
        <>
          <div className="products" ref={newProductForm}>
            <h3>Adicionar produto</h3>
            <form onSubmit={handleAddProduct}>
              <input
                className="qtd"
                type="number"
                placeholder="qtd"
                onChange={(e) => setQtd(e.target.value)}
                value={qtd || ""}
              />
              <div className="select-wrapper">
                <select
                  value={unity}
                  name="unity"
                  onChange={(e) => setUnity(e.target.value)}
                >
                  <option value="un">un</option>
                  <option value="g">g</option>
                </select>
              </div>
              <input
                className="description"
                type="text"
                placeholder="Descrição"
                onChange={(e) => setDescription(e.target.value)}
                value={description || ""}
              />
              <input
                className="value"
                type="number"
                placeholder="valor"
                onChange={(e) => setValue(e.target.value)}
                value={value || ""}
              />
              {!loadingList && <input type="submit" value="Incluir" />}
              {loadingList && <input type="submit" disabled value="Aguarde" />}
            </form>
          </div>
          <div className="products hide" ref={editProductForm}>
            <h3>Editar produto</h3>
            <form onSubmit={handleUpdateProduct}>
              <input
                className="qtd"
                type="number"
                placeholder="qtd"
                onChange={(e) => setEditQtd(e.target.value)}
                value={editQtd || ""}
              />
              <div className="select-wrapper">
                <select
                  value={editUnity}
                  name="unity"
                  onChange={(e) => setEditUnity(e.target.value)}
                >
                  <option value="un">un</option>
                  <option value="g">g</option>
                </select>
              </div>
              <input
                className="description"
                type="text"
                placeholder="Descrição"
                onChange={(e) => setEditDescription(e.target.value)}
                value={editDescription || ""}
              />
              <input
                className="value"
                type="number"
                placeholder="valor"
                onChange={(e) => setEditValue(e.target.value)}
                value={editValue || ""}
              />
              <div className="btnactions">
                <button type="submit" className="btn save">
                  <FaSave />
                </button>
                <button className="btn cancel" onClick={handleCancel}>
                  <ImUndo2 />
                </button>
              </div>
            </form>
          </div>
          {errorList && <Message msg={errorList} type="error" />}
          {errorProduct && <Message msg={errorProduct} type="error" />}
          {messageList && <Message msg={messageList} type="success" />}
          {messageProduct && <Message msg={messageProduct} type="success" />}
        </>
      )}
      <div className="products-bar"></div>
      <div className="products-list">
        {products.products && products.products.length > 0 ? (
          products.products.map((produto) => (
            <div className="products-map" key={produto._id}>
              <div className="product-qtd">{produto.qtd}</div>
              <div className="product-unity">{produto.unity}</div>
              <div className="product-description">{produto.description}</div>
              <div className="product-value">
                {produto.value.toFixed(2).toString().replace(".", ",")}
              </div>
              <div className="product-actions">
                <button
                  className="btn edit"
                  onClick={() => handleEdit(produto)}
                >
                  <FaPencilAlt />
                </button>
                <button className="btn delete">
                  <FaTrashAlt onClick={() => handleDelete(produto._id)} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não cadastrou nenhum produto nesta lista.</p>
        )}
      </div>
    </div>
  );
}
  

export default Listprod