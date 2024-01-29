import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectParticipants,
  addParticipant,
} from "../../redux/slice/participantsSlice";
import { RootState } from "@reduxjs/toolkit/query";
import styles from "./Participants.module.css";
import ParticipantForm from "./feuathers/form/ParticipantForm";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";

function Participants() {
  const participants = useSelector((state: RootState) =>
    selectParticipants(state)
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const generateId = (): number => {
    return Math.floor(Math.random() * 10001);
  };
  const handleAddParticipant = (formData) => {
    const newParticipant = {
      ...formData,
      id: generateId(),
    };
    dispatch(addParticipant(newParticipant));
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedParticipants = [...participants].sort((a, b) => {
    // Определяем направление сортировки
    const direction = sortDirection === "asc" ? 1 : -1;

    // Сравниваем значения в соответствии с выбранным полем
    if (
      sortField === "surname" ||
      sortField === "name" ||
      sortField === "middleName" ||
      sortField === "city"
    ) {
      return direction * a[sortField].localeCompare(b[sortField]);
    } else if (sortField === "birthday") {
      return (
        direction *
        (new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime())
      );
    } else if (sortField === "distance") {
      return direction * (a[sortField] - b[sortField]);
    }

    return 0;
  });

  return (
    <div className={styles.body_participants}>
      <h1 className={styles.title}>Список участников</h1>
      <button onClick={toggleModal}>Добавить</button>

      {showModal && (
        <ParticipantForm
          onSubmit={handleAddParticipant}
          onClose={toggleModal}
          initialValues={{
            id: 0,
            surname: "",
            name: "",
            middleName: "",
            city: "",
            birthday: "",
            email: "",
            phone: "",
            distance: 3,
            hasPayment: false,
          }}
        />
      )}
      <div className={styles.participantsTable}>
        <div className={styles.main_body_head}>
          <ul className={styles.ul_participant_head}>
            <li>
              Фамилия
              <span
                className={styles.line}
                onClick={() => handleSortChange("surname")}
              >
                &#8595;
              </span>
            </li>
            <li>
              Имя{" "}
              <span
                className={styles.line}
                onClick={() => handleSortChange("name")}
              >
                &#8595;
              </span>{" "}
            </li>
            <li>
              Отчество{" "}
              <span
                className={styles.line}
                onClick={() => handleSortChange("middleName")}
              >
                &#8595;
              </span>
            </li>
            <li>
              Дата Рождения{" "}
              <span
                className={styles.line}
                onClick={() => handleSortChange("birthday")}
              >
                {" "}
                &#8595;
              </span>{" "}
            </li>
            <li>
              Город{" "}
              <span
                className={styles.line}
                onClick={() => handleSortChange("city")}
              >
                &#8595;
              </span>{" "}
            </li>
            <li>
              Дистанция забега{" "}
              <span
                className={styles.line}
                onClick={() => handleSortChange("distance")}
              >
                &#8595;
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.main_body}>
          {sortedParticipants.map((participant, index) => (
            <ul className={styles.ul_participant} key={index}>
              <li>
                <NavLink to={`/participants/${participant.id}`}>
                  {participant.surname}
                </NavLink>
              </li>

              <li>{participant.name}</li>
              <li>{participant.middleName}</li>
              <li>{participant.birthday}</li>
              <li>{participant.city}</li>
              <li>{participant.distance} км</li>
            </ul>
          ))}
        </div>
      </div>
      {/* <Login/> */}
    </div>
  );
}

export default Participants;
