import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';
const ListCosts = (props) => {
  const { state } = props.location;
  let history = useHistory();
  const [costs, setCosts] = useState([]);
  const [section, setSection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_section(state);
  }, [])

  const request_section = () => {
    const { section } = state;
    Axios.post('/get_section_cost_with_id', section).then((response) => {
      setCosts(response.data.costs);
      setSection(response.data);
      setIsLoading(false);
      console.log('response', response);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRemove = ({ id }) => {
    Axios.post('/remove_section', { 'id': id }).then((response) => {
      console.log({ response });
      request_section();
    });
  }

  const goToCosts = (section) => {
    history.push({
      pathname: '/updateSection',
      state: { section }
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
    renderTable = costs.map((cost) => {
      return (
        <tr key={cost.id} className={"font-medium text-center"}>
          <td>{cost.id}</td>
          <td>{cost.cost_label}</td>
          <td>{cost.value}</td>
          <td className={"flex flex-col"}>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-yellow-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>ویرایش</button>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>حذف</button>
          </td>
        </tr >
      )
    });
  }

  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-12 bg-gray-200 "}>
          <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن هزینه به مرکز هزینه </button>
          </Link>
        </div>
        <div className={"flex justify-end w-full h-auto mt-2 bg-gray-300"}>
          <h1 dir={"rtl"} className={"mr-16 text-3xl text-gray-600"}>{'هزینه های' + ' ' + section.name}</h1>
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-4 bg-gray-300"}>
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold"}>ردیف</th>
                <th className={"p-4 font-bold"}>شرح هزینه</th>
                <th className={"p-4 font-bold"}>مقدار</th>
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

export default ListCosts
