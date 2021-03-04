import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const TahsimLable = () => {
  let history = useHistory();
  const [tashimLabel, setTashimLabel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestTashimLabel();
  }, [])

  const requestTashimLabel = () => {
    Axios.get('/get_tahsimlabel').then((response) => {
      setTashimLabel(response.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRemove = ({ id }) => {
    Axios.post('/remove_tashimlabel', { 'id': id }).then((response) => {
      console.log({ response });
      requestTashimLabel();
    });
  }

  let renderTable;

  if (isLoading) {
    renderTable = (
      <tr>
        <td>loading</td>
      </tr>
    );
  } else {
    renderTable = tashimLabel.map((label) => {
      return (
        <tr key={label.id} className={"font-medium text-center"}>
          <td>{label.id}</td>
          <td>{label.name}</td>
          <td className={"flex flex-col"}>
            <button onClick={() => handleRemove(label)} className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-red-500"}>حذف</button>
          </td>
        </tr >
      )
    });
  }

  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-auto bg-gray-200 "}>
          <Link to={'addTahsimlable'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن شرح هزینه </button>
          </Link>
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold"}>ردیف</th>
                <th className={"p-4 font-bold"}>شرح تهسیم</th>
                <th className={"p-4 font-bold"}>عملیات</th>
              </tr>
              {renderTable}
            </tbody>
          </table>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default TahsimLable
