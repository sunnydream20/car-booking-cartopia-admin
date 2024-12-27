import styles from "./styles.module.css";
import './custom.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/categorySlice';

import Header from "./header";

const prefix = "http://127.0.0.1:8080/api";

const Article = () => {

    const dispatch = useDispatch();
    const articles = useSelector(state => state.categories.articles);
    const [modalText, setModalText] = useState("CREATE");
    const [currentArticle, setCurrentArticle] = useState({
        _id: "",
        url: "",
        title: "",
        des: ""
    });

    useEffect(() => {
        dispatch(fetchArticles());
    }, [])

    // select current Image
    const handleEditClick = async (id) => {
        setModalText("UPDATE");
        const data = await axios.get(prefix + '/articles/' + id);
        setCurrentArticle({...data.data});
    }

    // select handlesubmit
    const handleSubmit = async () => {
        if (modalText === "CREATE") {
            await axios.post(prefix + '/articles', {currentArticle});
        }
        else {
            await axios.put(prefix + '/articles/' + currentArticle._id, {currentArticle});
        }
        dispatch(fetchArticles());
    }

    // format Data 
    const formatData = () => {
        setCurrentArticle({
            _id: "",
            title: "",
            des: "",
            url: ""
        });
        setModalText("CREATE");
    }


    // delete Img
    const handleDeleteClick = async (id) => {
        await axios.delete(prefix + '/articles/' + id);
        dispatch(fetchArticles());
    }

    // handle change
    const handleChange = ({ currentTarget: input }) => {
        setCurrentArticle({ ...currentArticle, [input.name]: input.value });
      };

  return (
    <div className={styles.main_container}>
      <Header />
      <div className="admin-panel">
        <div className="container text-center">
          <div className="category-part flex align-center justify-center gap-n">
            <h1 className="color-primary">Article</h1>
            <div>
              <a onClick={() => formatData()} className="create-btn" href="#create-img">Create Article</a>
            </div>
          </div>
          <div>
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.articles?.map((url, key) => (
                      <tr key={key} id={url._id}>
                        <td><img className="table-img" src={url?.url} alt="...loading"/></td>
                        <td>{url.title}</td>
                        <td>{url.des}</td>
                        <td><a 
                          onClick={() => handleEditClick(url?._id)} 
                          className="create-btn" 
                          href="#create-img">Edit</a></td>
                        <td><div className="create-btn delete-btn tooltip">
                          Delete<span className="tooltiptext">
                            <button 
                                onClick={() => handleDeleteClick(url?._id)} 
                                className="create-btn danger-btn">Really?!?</button>
                          </span>
                        </div></td>
                      </tr>
                  ))}  
                </tbody>
              </table>



              <div id="create-img" className="modal">
                <div className="modal__content modal__content1">
                    <h1><span>{modalText}</span> a Article</h1>
                    <div onSubmit={handleSubmit}>
                        <div className="">
                            <div className="m-b-s">
                                <label>ImageUrl: </label>
                                <input 
                                    className="form-control"
                                    placeholder="Article Image"
                                    name="url"
                                    value={currentArticle.url}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="m-b-s">
                                <label>Title: </label>
                                <input 
                                    className="form-control"
                                    placeholder="Article Title"
                                    name="title"
                                    value={currentArticle.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="m-b-s">
                                <label>Description: </label>
                                <textarea
                                    className="form-control textarea"
                                    placeholder="Article Description"
                                    name="des"
                                    value={currentArticle.des}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" onClick={() => {handleSubmit()}} className="create-btn">
                            {modalText}
                        </button>
                        <a href = "#" className="modal__close">&times;</a>
                    </div>
                </div>
            </div>

            </div>
        </div>  
      </div>
 
    </div>
  );
};

export default Article;