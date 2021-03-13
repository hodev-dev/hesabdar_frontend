import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { WaveSpinner } from "react-spinners-kit";
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const ListCosts = (props) => {
  const { state } = props.location;
  let history = useHistory();
  const [costs, setCosts] = useState([]);
  const [sum, setSum] = useState(0);
  const [finalSum, setFinalSum] = useState(0);
  const [section, setSection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_section(state);
  }, [])

  const request_section = () => {
    const { section } = state;
    Axios.post('/get_section_cost_with_id', { 'id': section.id }).then((response) => {
      setCosts(response.data.sections_with_costs.costs);
      setSection(response.data.sections_with_costs);
      setIsLoading(false);
      setSum(response.data.sum)
      setFinalSum(response.data.final_sum)
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

  const handleTashim = () => {
    setIsLoading(true);
    Axios.post('/tahsim', { 'id': section.id }).then((response) => {
      console.log({ response });
      setIsLoading(false);
      request_section();
    });
  }

  const handlePrint = () => {
    window.print();
  }

  let renderTable;

  if (isLoading) {
    renderTable = (
      <tr>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
        <td ><WaveSpinner size={50} color="#00007c" loading={isLoading} /></td>
      </tr>
    );
  } else {
    renderTable = costs.map((cost) => {
      return (
        <tr key={cost.id} className={"font-medium text-center hover:bg-gray-300"}>
          <td className={"p-5 font-mono"}>{cost.id}</td>
          <td className={"p-5 font-mono"}>{cost.label.code}</td>
          <td className={"p-5 font-mono"}>{cost.label.name}</td>
          <td className={"p-5 font-mono"}>{cost.group_id}</td>
          <td className={"p-5 font-mono"}>{Number(cost.prev_value).toLocaleString()}</td>
          <td className={"p-5 font-mono"}>{Number(cost.change).toLocaleString()}</td>
          <td className={"p-5 font-mono"}>{Number(cost.final).toLocaleString()}</td>
          {/* <td className={"flex flex-col no-print"}>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-yellow-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>ویرایش</button>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>حذف</button>
          </td> */}
        </tr >
      )
    });
  }

  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-12 bg-gray-200 no-print"}>
          <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن هزینه به مرکز هزینه </button>
          </Link>
          <button onClick={handleTashim} className={"w-auto h-auto p-3 text-center text-white bg-indigo-600 hover:bg-indigo-400"}>تسهیم هزینه ها</button>
          <button onClick={handlePrint} className={"w-auto h-auto p-3 text-center text-white bg-yellow-600 hover:bg-indigo-400"}>پرینت</button>
        </div>
        <div className={"flex justify-end w-full h-auto mt-2 bg-gray-300"}>
          <h1 dir={"rtl"} className={"mr-16 text-3xl text-gray-600"}>{'هزینه های' + ' ' + section.name}</h1>
        </div>
        <div className={"flex flex-col items-center justify-center w-full h-auto mt-4 bg-gray-300"}>
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold no-print"}>ردیف</th>
                <th className={"p-4 font-bold"}>کد شرح</th>
                <th className={"p-4 font-bold"}>شرح هزینه</th>
                <th className={"p-4 font-bold"}>گروه</th>
                <th className={"p-4 font-bold"}>هزینه به ریال</th>
                <th className={"p-4 font-bold"}>تغییرات نسهیم</th>
                <th className={"p-4 font-bold"}>مانده به ریال</th>
                {/* <th className={"p-4 font-bold no-print"}>عملیات</th> */}
              </tr>
              {renderTable}
            </tbody>
          </table>
          <div className={"flex flex-col items-center justify-center w-full h-auto mt-2 mb-2 bg-gray-300"}>
            <div className={"w-11/12 h-auto p-4 bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
              <h1 className={'font-mono text-base'}>{'جمع کل' + ' ' + Number(sum).toLocaleString() + ' ' + 'ریال'}</h1>
            </div>
            <div className={"w-11/12 h-auto p-4 mt-2 bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
              <h1 className={'font-mono text-base'}>{'جمع مانده' + ' ' + Number(finalSum).toLocaleString() + ' ' + 'ریال'}</h1>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default ListCosts
