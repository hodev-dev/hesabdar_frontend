import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const SectionTahsim = (props) => {
  const { state } = props.location;
  let history = useHistory();
  const [costs, setCosts] = useState([]);
  const [sum, setSum] = useState(0);
  const [section, setSection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_section_tahsim(state);
  }, [])

  const request_section_tahsim = () => {
    const { section } = state;
    Axios.post('/get_section_tashim', { 'id': section.id }).then((response) => {
      setCosts(response.data);
      // setSection(response.data.sections_with_costs);
      setIsLoading(false);
      // setSum(response.data.sum)
      // console.log('response', response.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRemove = ({ id }) => {
    Axios.post('/remove_section', { 'id': id }).then((response) => {
      console.log({ response });
      request_section_tahsim();
    });
  }

  const goToCosts = (section) => {
    history.push({
      pathname: '/updateSection',
      state: { section }
    });
  }

  const handleTashim = () => {
    Axios.post('/tahsim', { 'id': section.id }).then((response) => {
      console.log({ response });
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
        <tr key={cost.id} className={"font-medium text-center bg-gray-200 hover:bg-gray-300"}>
          <td className={"p-4 font-mono"}>{cost.id}</td>
          <td className={"p-4 font-mono"}>{cost.label.code}</td>
          <td className={"p-4 font-mono"}>{cost.label.name}</td>
          <td className={"p-4 font-mono"}>{cost.label.group_code}</td>
          <td className={"p-4 font-mono"}>{cost.prev_value}</td>
          <td className={"p-4 font-mono"}>{cost.receive}</td>
          <td className={"p-4 font-mono"}>{cost.final}</td>
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
        </div>
        <div className={"flex justify-end w-full h-auto mt-2 bg-gray-300"}>
          <h1 dir={"rtl"} className={"mr-16 text-3xl text-gray-600"}>{'گزارش تهسیم' + ' ' + state.section.name}</h1>
        </div>
        <div className={"flex flex-col items-center justify-center w-full h-auto mt-4 bg-gray-300"}>
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold no-print"}>ردیف</th>
                <th className={"p-4 font-bold"}>کد شرح</th>
                <th className={"p-4 font-bold"}>شرح هزینه</th>
                <th className={"p-4 font-bold"}>گروه</th>
                <th className={"p-4 font-bold"}>هزینه اولیه به ریال</th>
                <th className={"p-4 font-bold"}>دریافتی از تهسیم ریال</th>
                <th className={"p-4 font-bold"}>مانده به ریال</th>
              </tr>
              {renderTable}
            </tbody>
          </table>
          {/* <div className={"flex flex-col items-center justify-center w-full h-auto mt-2 mb-2 bg-gray-300"}>
            <div className={"w-11/12 h-auto p-4 bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
              <h1 className={'font-mono text-base'}>{'جمع کل' + ' ' + Number(sum).toLocaleString() + ' ' + 'ریال'}</h1>
            </div>
          </div> */}
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default SectionTahsim
