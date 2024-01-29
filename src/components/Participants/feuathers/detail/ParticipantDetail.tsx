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
    navigate("/participants");
  };
  const handleReverse = () => {
    navigate("/participants");

  }

  if (!participant) {
    return <div>Участник не найден</div>;
  }

  return (
    <div>
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
        <div>
          <h1>Информация об участнике</h1>
          <li>Фамилия: {participant.surname}</li>
          <li>Имя: {participant.name}</li>
          <li>Отчество: {participant.middleName}</li>
          <li>Город: {participant.city}</li>
          <li>Дата Рождения: {participant.birthday}</li>
          <li>Email: {participant.email}</li>
          <li>Номер телефона: {participant.phone}</li>
          <li>Дистанция: {participant.distance} км</li>
          <li>
            Статус оплаты: {participant.hasPayment ? "Оплачено" : "Не оплачено"}
          </li>
          <li>ID: {participant.id}</li>
          <div className="buttons">
            <button onClick={() => handleEdit(participant)}>
              Редактировать
            </button>
            <button onClick={() => handleDelete(participant.id)}>
              Удалить
            </button>
            <button onClick={() => handleReverse()}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantDetail;
