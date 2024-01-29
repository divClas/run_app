const generateId = (): number => {
  return Math.floor(Math.random() * 10001); // Генерация случайного числа от 0 до 10000
};
export const participantsData = [
  {
    id: generateId(),
    surname: "Иванов",
    name: "Петр",
    middleName: "Иванович",
    city: "Пермь",
    birthday: "1990-01-01",
    email: "ivan@gmail.com",
    phone: "+7-999-555-3535",
    distance: 5,
    hasPayment: true,
  },
  {
    id:generateId(),
    surname: "Константинопольский",
    name: "Константин",
    middleName: "Константинович",
    city: "Александровск-Сахалинский",
    birthday: "1985-02-15",
    email: "konstantinopolskiy@gmail.com",
    phone: "+7-912-345-6789",
    distance: 10,
    hasPayment: true,
  },
  {
    id: generateId(),
    surname: "Чернова",
    name: "Анастасия",
    middleName: "Витальевна",
    city: "Санкт-Петербург",
    birthday: "1999-10-22",
    email: "nastya123@ya.ru",
    phone: "+7-937-465-7033",
    distance: 3,
    hasPayment: false,
  },
];
