import { useState, useEffect, lazy } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Table from '../components/Table/Table';
import SortSelector from '../components/SortSelector/SortSelector';

const initialState = [
  { id: 1, value: 100 },
  { id: 2, value: 400 },
  { id: 3, value: 200 },
  { id: 4, value: 500 },
  { id: 5, value: 300 },
];

const sortOptions = [
  { value: 'ascending', label: 'По возрастанию' },
  { value: 'descending', label: 'По убыванию' },
];

export default function TableView() {
  const history = useHistory();
  const location = useLocation();
  const [expenses, setExpenses] = useState(initialState);

  //console.log(location.search); // ?sortBy=descending
  //Нужно пользоватся URLSearchParams
  const sortOrder =
    new URLSearchParams(location.search).get('sortBy') ?? 'ascending'; // поскольку при первой загрузке там null

  const onSortOrderChange = order => {
    // console.log('history', history);
    // console.log('location', location);
    // location.search - параметры адресной строки
    history.push({
      ...location,
      search: `sortBy=${order}`,
    });
  };

  useEffect(() => {
    if (location.search !== '') {
      return;
    }
    history.push({
      ...location,
      search: `sortBy=ascending`,
    });
  }, [history, location]);

  useEffect(() => {
    setExpenses(prevExpenses =>
      [...prevExpenses].sort((a, b) => {
        return sortOrder === 'ascending'
          ? a.value - b.value
          : b.value - a.value;
      }),
    );
  }, [sortOrder]);

  return (
    <>
      <SortSelector
        options={sortOptions}
        onChange={onSortOrderChange}
        value={sortOrder}
      />
      <Table items={expenses} />
    </>
  );
}
