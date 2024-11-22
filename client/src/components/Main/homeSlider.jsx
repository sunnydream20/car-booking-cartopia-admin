import styles from "./styles.module.css";
import './custom.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeSliders } from '../../store/categorySlice';

import { Link } from "react-router-dom";
import Header from "./header";

const prefix = "http://127.0.0.1:8080/api";

const HomeSlider = () => {

    const dispatch = useDispatch();
    const homeSliderImages = useSelector(state => state.categories.sliderImgs);
    const [currentImg, setCurrentImg] = useState("");
    const [currentImgId, setCurrentImgId] = useState("");
    const [modalText, setModalText] = useState("CREATE");

    useEffect(() => {
        dispatch(fetchHomeSliders());
    }, [])

    // select current Image
    const handleEditClick = async (id) => {
        setModalText("UPDATE");
        setCurrentImgId(id);
        const data = await axios.get(prefix + '/homesliders/' + id);
        setCurrentImg(data.data.url);
    }

    // select handlesubmit
    const handleSubmit = async () => {
        if (modalText === "CREATE") {
            console.log("id", currentImgId);
            console.log("img", currentImg);
            await axios.post(prefix + '/homesliders', {currentImg});
        }
        else {
            await axios.put(prefix + '/homesliders/' + currentImgId, {currentImg});
        }
        dispatch(fetchHomeSliders());
    }

    // format Data 
    const formatData = () => {
        setCurrentImg("");
        setCurrentImgId("");
        setModalText("CREATE");
    }


    // delete Img
    const handleDeleteClick = async (id) => {
        await axios.delete(prefix + '/homesliders/' + id);
        dispatch(fetchHomeSliders());
    }

  return (
    <div className={styles.main_container}>
      <Header />
      <div className="admin-panel">
        <div className="container text-center">
          <div className="category-part flex align-center justify-center gap-n">
            <h1 className="color-primary">Home Slider Images</h1>
            <div>
              <a onClick={() => formatData()} className="create-btn" href="#create-img">Create Image</a>
            </div>
          </div>
          <div>
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {homeSliderImages.urls?.map((url) => (
                      <tr key={url._id} id={url._id}>
                        <td><img className="table-img" src={url?.url} alt="...loading"/></td>
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
                    <h1><span>{modalText}</span> a Slider Image</h1>
                    <div onSubmit={handleSubmit}>
                        <div className="">
                            <div className="m-b-s">
                                <label>Type: </label>
                                <input 
                                    className="form-control"
                                    placeholder="Slider Image Url"
                                    name="type"
                                    value={currentImg}
                                    onChange={(e) => {setCurrentImg(e.target.value)}}
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

export default HomeSlider;
