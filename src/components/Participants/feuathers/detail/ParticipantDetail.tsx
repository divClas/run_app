// ParticipantDetail.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectParticipants,
  deleteParticipant,
  updateParticipant,
} from "../../../../redux/slice/participantsSlice";
import ParticipantForm from "../form/ParticipantForm";
import { useNavigate } from "react-router-dom";
import style from "./ParticipantDetail.module.css";

const ParticipantDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const participants = useSelector(selectParticipants);
  const [editMode, setEditMode] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const navigate = useNavigate();

  const participant = participants.find(
    (participant) => participant.id == parseInt(id)
  );

  const handleEdit = (participant) => {
    setSelectedParticipant(participant);
    setEditMode(true);
  };

  const handleDelete = (participantId) => {
    dispatch(deleteParticipant(participantId));
    navigate("/participants");
  };

  const handleCloseForm = () => {
    setEditMode(false);
    setSelectedParticipant(null);
    navigate(`/participants/${participantId}`);
  };
  const handleReverse = () => {
    navigate("/participants");
  };

  if (!participant) {
    return <div>Участник не найден</div>;
  }

  return (
    <div className={style.participant_wrapper}>
      <div className={style.participant_body}>
        {editMode ? (
          <ParticipantForm
            initialValues={selectedParticipant}
            onSubmit={(updatedParticipant) => {
              dispatch(updateParticipant(updatedParticipant));
              handleCloseForm();
            }}
            onClose={handleCloseForm}
          />
        ) : (
          <div className={style.info}>
            <div className={style.info_body}>
              <h1>Информация об участнике</h1>
              <li>
                <span>Фамилия: </span>
                {participant.surname}
              </li>
              <li>
                <span>Имя: </span> {participant.name}
              </li>
              <li>
                <span>Отчество: </span> {participant.middleName}
              </li>
              <li>
                <span>Город:</span> {participant.city}
              </li>
              <li>
                <span>Дата Рождения:</span> {participant.birthday}
              </li>
              <li>
                <span>Email:</span> {participant.email}
              </li>
              <li>
                <span>Номер телефона:</span> {participant.phone}
              </li>
              <li>
                <span>Дистанция:</span> {participant.distance} км
              </li>
              <li>
                <span> Статус оплаты:</span>

                {participant.hasPayment ? "Оплачено" : "Не оплачено"}
              </li>
              <div className={style.buttons}>
                <button onClick={() => handleEdit(participant)}>
                  Редактировать
                </button>
                <button onClick={() => handleDelete(participant.id)}>
                  Удалить
                </button>
                <button onClick={() => handleReverse()}>Закрыть</button>
              </div>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantDetail;
