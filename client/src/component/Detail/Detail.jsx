import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { searchById, deleteBreed } from "../../redux/actions/breedsActions.js";
import Loading from "../Loading/Loading.jsx";
import "./Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { breedDetail } = useSelector((state) => state.breeds);
  const { display } = useSelector((state) => state.loader);
  const history = useHistory();

  useEffect(() => {
    dispatch(searchById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteBreed(id));
    history.push("/home");
  };
  useEffect(() => {
    if (!breedDetail) {
      history.push("/home");
    }
  }, [breedDetail, history]);

  const temperaments = breedDetail[0]?.temperaments || [];
  const uniqueTemperaments = [...new Set(temperaments)];

  return (
    <div className="detailContainer">
      <Link to={"/home"} className="backDetail">
        Volver
      </Link>
      {display ? <Loading></Loading> : null}
      {breedDetail.length ? (
        <div className="details">
          <div className="detailsImg">
            <img src={breedDetail[0].image} alt="" />
          </div>
          <div className="detailBreed">
            <h1>{breedDetail[0].name}</h1>
            <div className="caracteristBreed">
              <div className="caracterist">
                <h2>Life span:</h2>
                <h3>{breedDetail[0].life_span.join(" - ")} Years.</h3>
              </div>
              <div className="caracterist">
                <h2>Weight:</h2>
                <h3>{breedDetail[0].weight.join(" - ")} Kg.</h3>
              </div>
              <div className="caracterist">
                <h2>Height:</h2>
                <h3>{breedDetail[0].height.join(" - ")} Cm.</h3>
              </div>
            </div>
            <div className="temperamentsDetail">
              <h2>Temperaments:</h2>
              <div className="temperamentsInfo">
                {uniqueTemperaments.map((temperament, index) => (
                  <h2 key={index}>{temperament}</h2>
                ))}
              </div>
            </div>
            <div className="backDetail">
              {id?.length > 4 && (
                <button onClick={handleDelete}>Eliminar</button>
              )}
              {id?.length <= 4 && (
                <p>No se puede eliminar una raza generada por la API.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Chau</div>
      )}
    </div>
  );
}
