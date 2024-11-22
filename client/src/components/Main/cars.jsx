import styles from "./styles.module.css";
import './custom.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { fetchCar } from '../../store/carSlice';
import { Select, Space } from "antd";

import { Link } from "react-router-dom";
import Header from "./header";

const prefix = "http://127.0.0.1:8080/api";

const Car = () => {
  const [modalText, setModalText] = useState("CREATE");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const cars = useSelector((state) => state.cars.cars);
  const status = useSelector((state) => state.cars.status);
  const [currentCat, setCurrentCat] = useState("all");
  const [options, setOptions] = useState([]);
  const [initialArr, setInitialArr] = useState([]);

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
          dispatch(fetchCar("all"));
          dispatch(fetchCategories());
        }
    }, [status, dispatch]);
    
    const [car, setCar] = useState({
        catId: "",
        type: "",
        typeDes: "",
        seats: 0,
        doors: 0,
        bags: 0,
        snow: "",
        imgUrl: "",
        details: [],
        nowDayPrice: 0,
        laterDayPrice: 0,
        promo: "false",
        popular: "false",
    });

    useEffect(() => {
        if (car.catId === "") {
            const newCatId = categories.categories && categories.categories.length > 0 
                ? categories.categories[0]._id 
                : "";
                
            setCar(prevState => ({
                ...prevState,
                catId: newCatId
            }));
        }
    }, [car.catId, categories]);


  const handleChangeOptions = (value) => {
      setCar({
          ...car,
          details: value
        })
    
        setInitialArr(value);
  }

  const handleChange = ({ currentTarget: input }) => {
    setCar({ ...car, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalText === "CREATE") {
      try {
        await axios.post(`${prefix}/car`, car);
        setError("");
        dispatch(fetchCar(currentCat));
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
      const result = await axios.put(`${prefix}/car/${car._id}`, {car});
      dispatch(fetchCategories());
      dispatch(fetchCar(currentCat));
    }
  };

  const handleEditClick = async (carId) => {
    setModalText("UPDATE");
    const selectedCar = await axios.get(`${prefix}/car/${carId}`);
    if (selectedCar?.data) {
      const result = selectedCar?.data;
      setInitialArr(selectedCar.data.details);
      setCar({...result});
    }
  }

  const handleDeleteClick = async (carId) => {
    await axios.delete(`${prefix}/car/${carId}`);
    dispatch(fetchCategories());
    dispatch(fetchCar(currentCat));
  }
  
  const formatData = () => {
    setCar({
      type: "",
      typeDes: "",
      seats: 0,
      doors: 0,
      bags: 0,
      snow: "",
      imgUrl: "",
      nowDayPrice: 0,
      laterDayPrice: 0,
      catId: "",
      details: [],
      promo: "false",
      popular: "false",
    });
    setInitialArr([]);
    setError('');
    setModalText("CREATE");
  }

  useEffect(() => {
    dispatch(fetchCar(currentCat))
  }, [currentCat])

  const handleCheckPopular = (event) => {
    if(event.target.checked) {
      setCar({
        ...car,
        popular: "true",
      })
    } else {
      setCar({
        ...car,
        popular: "false",
      })
    }
  }

  const handleCheckPromo = (event) => {
    if(event.target.checked) {
      setCar({
        ...car,
        promo: "true",
      })
    } else {
      setCar({
        ...car,
        promo: "false",
      })
    }
  }

  return (
    <div className={styles.main_container}>
      <Header />
      <div className="admin-panel">
        <div className="container text-center">
          <div className="category-part flex align-center justify-center gap-n">
            <h1 className="color-primary">Car</h1>
            <div>
              <a className="create-btn" onClick={formatData} href="#create-car">Create Car</a>
            </div>
            <div>
            <label>Category: </label>
                <select
                    value={currentCat}
                    onChange={(e) => {setCurrentCat(e.target.value)}}
                    className="form-control">
                    <option value="all">All</option>   
                    {categories.categories?.map((category, key) => (
                        <option key={key} value={category._id}>{category.type}</option>   
                    ))}
                </select>
            </div>
          </div>
          <div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Seats</th>
                    <th>Doors</th>
                    <th>Bags</th>
                    <th>Now Daily Price(Rp)</th>
                    <th>Later Daily Price(Rp)</th>
                    <th>Snow</th>
                    <th>Promo</th>
                    <th>Popular</th>
                    <th>Details</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cars?.map((car) => (
                      <tr key={car._id} id={car._id}>
                        <td><img className="table-img" src={car?.imgUrl} alt="...loading"/></td>
                        <td>{car?.catId.type}</td>
                        <td>{car?.type}</td>
                        <td>{car?.typeDes}</td>
                        <td>{car?.seats}</td>
                        <td>{car?.doors}</td>
                        <td>{car?.bags}</td>
                        <td>{car?.nowDayPrice}</td>
                        <td>{car?.laterDayPrice}</td>
                        <td>{car?.snow}</td>
                        <td>{car?.promo}</td>
                        <td>{car?.popular}</td>
                        <td className="flex flex-wrap">{ car.details.map((detail, key) =>(
                            <span className="tag-span" key={key}>{detail}</span>
                        ))}</td>
                        <td><a 
                          onClick={() => handleEditClick(car?._id)} 
                          className="create-btn" 
                          href="#create-car">Edit</a></td>
                        <td><div className="create-btn delete-btn tooltip">
                          Delete<span className="tooltiptext">
                            <button onClick={() => handleDeleteClick(car?._id)} className="create-btn danger-btn">Really?!?</button>
                          </span>
                        </div></td>
                      </tr>
                  ))}  
                </tbody>
              </table>
            </div>
        </div>  
      </div>
      <div id="create-car" className="modal modal1">
        <div className="modal__content modal__content1">
            <h1><span>{modalText}</span> a Car</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-s">
                <div className="m-b-s">
                    <label>Category: </label>
                    <select
                        name="catId"
                        value={car.catId}
                        onChange={handleChange}
                        className="form-control">
                        {categories.categories?.map((category, key) => (
                            <option key={key} value={category._id}>{category.type}</option>   
                        ))}
                    </select>
                    </div>
                <div className="m-b-s">
                  <label>Type: </label>
                  <input 
                    className="form-control"
                    placeholder="Car Type"
                    name="type"
                    value={car.type}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="m-b-s flex">
                  <label>Type Description: </label>
                  <textarea 
                    style={{
                      minWidth: "300px",
                      minHeight: "100px",
                    }}
                    className="form-control"
                    placeholder="Car Type Description"
                    name="typeDes"
                    value={car.typeDes}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="m-b-s">
                  <label>Pay Now Price: ( Rp )</label>
                  <input 
                    className="form-control"
                    placeholder="Daily rent Price"
                    name="nowDayPrice"
                    value={car.nowDayPrice}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s">
                  <label>Pay Later Price: ( $ )</label>
                  <input 
                    className="form-control"
                    placeholder="Daily rent Price"
                    name="laterDayPrice"
                    value={car.laterDayPrice}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s">
                  <label>Seats: </label>
                  <input 
                    className="form-control"
                    placeholder="Seats number"
                    name="seats"
                    value={car.seats}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s">
                  <label>Doors: </label>
                  <input 
                    className="form-control"
                    placeholder="Doors Number"
                    name="doors"
                    value={car.doors}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s">
                  <label>Bags: </label>
                  <input 
                    className="form-control"
                    placeholder="Bags Number"
                    name="bags"
                    value={car.bags}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>
                <div className="m-b-s">
                  <label>Snow: </label>
                  <input 
                    className="form-control"
                    placeholder="A/C or D/C"
                    name="snow"
                    value={car.snow}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="m-b-s flex">
                  <label>Iamge Link: </label>
                  <textarea
                    style={{
                      minHeight: "70px",
                      minWidth: "300px"
                    }} 
                    className="form-control"
                    placeholder="Image Url"
                    name="imgUrl"
                    value={car.imgUrl}
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
                <div className="m-b-s flex">
                  <label>Promo: </label>
                  <input
                    style={{
                      height: "30px",
                      minWidth: "30px"
                    }} 
                    type="checkbox"
                    className="form-control"
                    name="promo"
                    checked={car.promo == "true" ? true : false}
                    onChange={handleCheckPromo}
                  />
                </div>
                <div className="m-b-s flex">
                  <label>Popular: </label>
                  <input
                    style={{
                      height: "30px",
                      minWidth: "30px"
                    }} 
                    type="checkbox"
                    className="form-control"
                    name="popular"
                    checked={car.popular == "true" ? true : false}
                    onChange={handleCheckPopular}
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

export default Car;
