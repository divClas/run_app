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

function ParticipantsMobile() {
  const participants = useSelector((state: RootState) =>
    selectParticipants(state)
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const sortedParticipants = [...participants].sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1;

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

  const filteredParticipants = sortedParticipants.filter((participant) => {
    const { surname, name, middleName, city, distance } = participant;
    const searchRegex = new RegExp(searchQuery, "i");
    return (
      searchRegex.test(surname) ||
      searchRegex.test(name) ||
      searchRegex.test(middleName) ||
      searchRegex.test(city)
    );
  });

  return (
    <div className={styles.body_participants_mobile}>
      <div className={styles.participants_head_mobile}>
        <h1 className={styles.title_mobile}>Список участников</h1>
        <div className={styles.search_input_mobile}>
          <input
            className={styles.search_mobile}
            type="text"
            placeholder="Поиск участника"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className={styles.btn_add_mobile}>
          <button onClick={toggleModal}>Добавить</button>
        </div>
      </div>
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

      <div className={styles.participantsTable_mobile}>
        <div className={styles.main_body_head_mobile}></div>
        <div className={styles.main_body_mobile}>
          {filteredParticipants.map((participant, index) => (
            <div className={styles.mobile_card}>
              <div className={styles.centr}>
                <ul className={styles.ul_participant} key={index}>
                  <li>
                    <span>Фамилия:</span>
                    <NavLink to={`/participants/${participant.id}`}>
                      {participant.surname}
                    </NavLink>
                  </li>

                  <li>
                    <span>Имя:</span>
                    {participant.name}
                  </li>
                  <li>
                    <span>Отчество:</span>
                    {participant.middleName}
                  </li>
                  <li>
                    <span>Дата Рождения:</span>
                    {participant.birthday}
                  </li>
                  <li>
                    <span>Город:</span>
                    {participant.city}
                  </li>
                  <li>
                    <span>Дистанция:</span>
                    {participant.distance} км
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParticipantsMobile;
