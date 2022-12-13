import "./CarList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import CarCard from "../carCard/CarCard";
import SelectYear from "../selectYear/SelectYear";
import SelectMake from "../selectMake/SelectMake";
import SelectModel from "../selectModel/SelectModel";

import React from "react";
const BACK_END = process.env.REACT_APP_BACKEND_URL;

function CarList() {
    const [dataset, setDataset] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedCar, setSelectedCar] = useState({})

    useEffect(() => {
      const fetchStudents = async () => {
        const { data } = await axios.get(`${BACK_END}/api/data`);
        setDataset(data);
      };

      fetchStudents();
    }, []);
    console.log(selectedYear);
    console.log(selectedCar);

  return (
    <div className="App">
      <h2>Hello traveler, find specs of your car:</h2>
      <div>
        <SelectYear setSelectedYear={setSelectedYear} />
        <SelectMake
          setSelectedMake={setSelectedMake}
          selectedYear={selectedYear}
          data={dataset}
        />
        <SelectModel
          setSelectedModel={setSelectedModel}
          selectedYear={selectedYear}
          selectedMake={selectedMake}
          data={dataset}
        />
      </div>
      <br />
      {/* EPA FE Label Dataset ID changed to car_id */}
      {dataset
        .filter((el) =>
          el.model_year === selectedYear 
          // && el.mfr_name === selectedMake? selectedMake: ""
           && el.Carline === selectedModel
        )
        .map((el, index) => (
          <li className="App__listItem" key={index}>
            {/* <hr />
          {el.mfr_name} - {el.Carline} <br />
          <br />
          {"Mpg"} - {el.city_mpg} + {el.hwy_mpg} / 2 ={" "}
          {Math.floor(+el.city_mpg + +el.hwy_mpg) / 2} <br />
          <p className="carCard__label">Fuel consumption per 100km: {Math.floor(100*3.785411784/(1.609344*(+el.city_mpg + +el.hwy_mpg) / 2))}</p>
          <br />
          {"Co2"} : {el.city_co2_rounded} + {el.hwy_co2_rounded} ={" "}
          {Math.floor(+el.city_co2_rounded + +el.hwy_co2_rounded) / 2}
          <br />
         MPG_calculated: {el.mpg_calculated} <br />
          CO2: {el.comb_co2} <br />
          Oil type : {el.oil_type}
          <br /> */}
            {
              <CarCard
                mfr_name={el.mfr_name}
                Carline={el.Carline}
                model_year={el.model_year}
                car_desc={el.car_desc}
                city_mpg={el.city_mpg}
                hwy_mpg={el.hwy_mpg}
                city_co2_rounded={el.city_co2_rounded}
                hwy_co2_rounded={el.hwy_co2_rounded}
                oil_type={el.oil_type}
                setSelectedCar={setSelectedCar}
              />
            }
          </li>
        ))}
    </div>
  );
}

export default CarList;
