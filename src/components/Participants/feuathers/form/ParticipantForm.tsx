import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import styles from "./ParticipantForm.module.css";

interface FormData {
  id: number;
  surname: string;
  name: string;
  middleName: string;
  city: string;
  birthday: string;
  email: string;
  phone: string;
  distance: number;
  hasPayment: boolean;
}

interface ParticipantFormProps {
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
  initialValues: FormData;
}

const distances = [3, 5, 10, 21, 42];

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  onSubmit,
  onClose,
  initialValues,
}) => {


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      surname: Yup.string().required("Фамилия обязательна для заполнения"),
      name: Yup.string().required("Имя обязательно для заполнения"),
      middleName: Yup.string(),
      city: Yup.string().required("Город обязателен для заполнения"),
      birthday: Yup.date()
        .required("Дата рождения обязательна для заполнения")
        .max(
          new Date(
            new Date().getFullYear() - 14,
            new Date().getMonth(),
            new Date().getDate()
          ),
          "Участник должен быть старше 14 лет"
        ),
      email: Yup.string()
        .email("Некорректный email адрес")
        .required("Email обязателен для заполнения"),
      phone: Yup.string()
        .matches(
          /^\+[0-9]{1,3}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
          "Некорректный формат номера телефона"
        )
        .required("Номер телефона обязателен для заполнения"),
      distance: Yup.number().required("Выберите дистанцию"),
      hasPayment: Yup.boolean(),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <label>Фамилия:</label>
          <input
            type="text"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.surname && formik.errors.surname ? (
            <div className={styles.error}>{formik.errors.surname}</div>
          ) : null}

          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : null}

          <label>Отчество:</label>
          <input
            type="text"
            name="middleName"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.middleName && formik.errors.middleName ? (
            <div className={styles.error}>{formik.errors.middleName}</div>
          ) : null}

          <label>Город:</label>
          <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className={styles.error}>{formik.errors.city}</div>
          ) : null}

          <label>Дата рождения:</label>
          <input
            type="date"
            name="birthday"
            value={formik.values.birthday}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.birthday && formik.errors.birthday ? (
            <div className={styles.error}>{formik.errors.birthday}</div>
          ) : null}

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}

          <label>Номер телефона:</label>
          <InputMask
            mask="+7-999-999-9999"
            maskChar="_"
            type="tel"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className={styles.error}>{formik.errors.phone}</div>
          ) : null}
          <small>Формат: +7-999-999-9999</small>

          <label>Дистанция:</label>
          <select
            name="distance"
            value={formik.values.distance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {distances.map((distance, index) => (
              <option key={index} value={distance}>
                {distance}
              </option>
            ))}
          </select>
          {formik.touched.distance && formik.errors.distance ? (
            <div className={styles.error}>{formik.errors.distance}</div>
          ) : null}
          <div className={styles.check}>
            <label>Оплата взноса за участие</label>
            <input
              type="checkbox"
              name="hasPayment"
              checked={formik.values.hasPayment}
              onChange={(e) =>
                formik.setFieldValue("hasPayment", e.target.checked)
              }
              onBlur={formik.handleBlur}
            />
          </div>
          <button className={styles.save} type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};
export default ParticipantForm;
