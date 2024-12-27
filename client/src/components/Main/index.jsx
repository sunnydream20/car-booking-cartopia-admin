import styles from "./styles.module.css";
import './custom.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { Select, Space } from "antd";

import Header from "./header";

const prefix = "http://127.0.0.1:8080/api";

const Main = () => {
  const [modalText, setModalText] = useState("CREATE");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const [initialArr, setInitialArr] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions();
  }, [])

  const getOptions = async () => {
    const optionsData = await axios.get('http://127.0.0.1:8080/api/detail');
    let result = [];
    optionsData.data.details[0].details.map((data, key) => {
        let temp = {
            label: data,
            value: data,
            key: key
        };
        result.push(temp);
    }) 
    setOptions(result);
    
  }  

  useEffect(() => {
    if (status === 'idle') {
        dispatch(fetchCategories());
    }
}, [status, dispatch]);

  const [category, setCategory] = useState({
    type: "",
    typeDes: "",
    seats: 0,
    doors: 0,
    bags: 0,
    snow: "",
    imgUrl: "",
    nowDayPrice: 0,
    details: [],
  });

  const handleChangeOptions = (value) => {
    setCategory({
        ...category,
        details: value
      })
  
      setInitialArr(value);
}


  const handleChange = ({ currentTarget: input }) => {
    setCategory({ ...category, [input.name]: input.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalText === "CREATE") {
      try {
        await axios.post(`${prefix}/category`, category);
        setError("");
        dispatch(fetchCategories());
        alert("Created Category Successfully!")
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    } else {
      const result = await axios.put(`${prefix}/category/${category._id}`, {category});
      dispatch(fetchCategories());
    }
  };

  const handleEditClick = async (categoryId) => {
    setModalText("UPDATE");
    const selectedCategory = await axios.get(`${prefix}/category/${categoryId}`);
    if (selectedCategory?.data) {
      const result = selectedCategory?.data;
      setInitialArr(selectedCategory.data.details);
      setCategory({...result});
    }
  }

  const handleDeleteClick = async (categoryId) => {
    await axios.delete(`${prefix}/category/${categoryId}`);
    dispatch(fetchCategories());
  }
  

  const formatData = () => {
    setCategory({
      type: "",
      typeDes: "",
      seats: 0,
      doors: 0,
      bags: 0,
      snow: "",
      imgUrl: "",
      nowDayPrice: 0,
      details: []
    });
    setInitialArr([]);
    setError('');
    setModalText("CREATE");
  }

  return (
    <div className={styles.main_container}>
      <Header />
      <div className="admin-panel">
        <div className="container text-center">
          <div className="category-part flex align-center justify-center gap-n">
            <h1 className="color-primary">Category</h1>
            <div>
              <a className="create-btn" onClick={formatData} href="#create-category">Create Category</a>
            </div>
          </div>
          <div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Seats</th>
                    <th>Doors</th>
                    <th>Bags</th>
                    <th>Daily Price(Rp)</th>
                    <th>Snow</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.categories?.map((category) => (
                      <tr key={category._id} id={category._id}>
                        <td><img className="table-img" src={category?.imgUrl} alt="...loading"/></td>
                        <td>{category?.type}</td>
                        <td>{category?.typeDes}</td>
                        <td>{category?.seats}</td>
                        <td>{category?.doors}</td>
                        <td>{category?.bags}</td>
                        <td>{category?.nowDayPrice}</td>
                        <td>{category?.snow}</td>
                        <td className="flex flex-wrap">{ category.details.map((detail, key) =>(
                            <span key={key} className="tag-span">{detail}</span>
                        ))}</td>
                        <td><a 
                          onClick={() => handleEditClick(category?._id)} 
                          className="create-btn" 
                          href="#create-category">Edit</a></td>
                        <td><div className="create-btn delete-btn tooltip">
                          Delete<span className="tooltiptext">
                            <button onClick={() => handleDeleteClick(category?._id)} className="create-btn danger-btn">Really?!?</button>
                          </span>
                        </div></td>
                      </tr>
                  ))}  
                </tbody>
              </table>
            </div>
        </div>  
      </div>
      <div id="create-category" className="modal modal1">
        <div className="modal__content">
            <h1><span>{modalText}</span> a Category</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-s">
                <div className="m-b-s align-center">
                  <label>Type: </label>
                  <input 
                    className="form-control"
                    placeholder="Category Type"
                    name="type"
                    value={category.type}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="m-b-s align-center flex">
                  <label>Type Description: </label>
                  <textarea 
                    style={{
                      minWidth: "300px",
                      minHeight: "100px",
                    }}
                    className="form-control"
                    placeholder="Category Type Description"
                    name="typeDes"
                    value={category.typeDes}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="m-b-s align-center">
                  <label>Daily Price: </label>
                  <input 
                    className="form-control"
                    placeholder="Daily rent Price"
                    name="nowDayPrice"
                    value={category.nowDayPrice}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s align-center">
                  <label>Seats: </label>
                  <input 
                    className="form-control"
                    placeholder="Seats number"
                    name="seats"
                    value={category.seats}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s align-center">
                  <label>Doors: </label>
                  <input 
                    className="form-control"
                    placeholder="Doors Number"
                    name="doors"
                    value={category.doors}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s align-center">
                  <label>Bags: </label>
                  <input 
                    className="form-control"
                    placeholder="Bags Number"
                    name="bags"
                    value={category.bags}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s align-center">
                  <label>Snow: </label>
                  <input 
                    className="form-control"
                    placeholder="A/C or D/C"
                    name="snow"
                    value={category.snow}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="m-b-s align-center flex">
                  <label>Iamge Link: </label>
                  <textarea
                    style={{
                      minHeight: "70px",
                      minWidth: "300px"
                    }} 
                    className="form-control"
                    placeholder="Image Url"
                    name="imgUrl"
                    value={category.imgUrl}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="m-b-s flex">
                    <label>Details</label>
                    <Select
                        mode="tags"
                        style={{
                        width: '500px',
                        }}
                        placeholder="select one country"
                        value={initialArr}
                        onChange={handleChangeOptions}
                        options={options}
                        optionRender={(option) => (
                        <Space>
                            <span key={option.data.label} role="img" aria-label={option.data.label}>
                                {option.data.label}
                            </span>
                        </Space>
                        )}
                    />
                </div>
              </div>
              <p style={{
                color: "red"
              }}>{error?error:""}</p>
              <button type="submit" className="create-btn">
                {modalText}
              </button>
              <a href = "#" className="modal__close">&times;</a>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
