import PN from "persian-number";
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const LabelCost = (props) => {
  const { state } = props.location;
  const { id, group_code, code, name } = useParams();
  let history = useHistory();
  const [costs, setCosts] = useState([]);
  const [sum, setSum] = useState(0);
  const [rangeSum, setRangeSum] = useState(0);
  const [section, setSection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_costs();
  }, [])

  const request_costs = () => {
    Axios.post('/get_label_cost', { 'label_id': id, 'group_code': group_code, 'code': code }).then((response) => {
      setCosts(response.data.costs);
      setSum(response.data.sum);
      setRangeSum(response.data.range_sum);
      setIsLoading(false);
      console.log('response', response);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRemove = ({ id }) => {
    Axios.post('/remove_section', { 'id': id }).then((response) => {
      console.log({ response });
      request_costs();
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
    renderTable = costs.map((cost, index) => {
      return (
        <tr key={cost.id} className={"font-medium text-center hover:bg-gray-300 print:border print:border-gray-600"}>
          <td className={"p-4 font-mono print:text-base print:hidden"}>{PN.convertEnToPe(Number(cost.id).toLocaleString())}</td>
          <td className={"p-4 font-mono print:text-base"}>{PN.convertEnToPe(Number(cost.label.code).toLocaleString())}</td>
          <td className={"p-4 font-mono print:text-base"}>{cost.section.name}</td>
          <td className={"p-4 font-mono print:text-base"}>{PN.convertEnToPe(Number(cost.group_id)).toLocaleString()}</td>
          <td className={"p-4 font-mono print:text-base"}>{PN.convertEnToPe(Number(cost.prev_value).toLocaleString())}</td>
          <td className={"p-4 font-mono print:text-base"}>{PN.convertEnToPe(Number(cost.change).toLocaleString())}</td>
          <td className={"p-4 font-mono print:text-base"}>{PN.convertEnToPe(Number(cost.final).toLocaleString())}</td>
          {/* <td className={"flex flex-col"}>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-yellow-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>ویرایش</button>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>حذف</button>
          </td> */}
        </tr >
      )
    });
  }
  const handlePrint = () => {
    window.print();
  }
  return (
    <div className={"flex flex-col w-full"}>
      <div className={"flex flex-row w-full h-auto"}>
        <div className={"flex flex-col w-10/12 h-screen bg-gray-300 print:w-full"}>
          <div className={"flex flex-row items-center w-full h-auto bg-gray-200"}>
            <Link to={'addNewSection'}>
              <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400 no-print"}>افزودن هزینه به مرکز هزینه </button>
            </Link>
            <button onClick={handlePrint} className={"w-auto h-auto p-3 text-center text-white bg-yellow-600 no-print hover:bg-indigo-400"}>پرینت</button>
          </div>
          <div className={"flex-row justify-center hidden w-full h-auto text-2xl print:flex"}>
            <h1 className={"w-6/12 text-center bg-white"}>شرکت نورد و لوله ی سپنتا اهواز - سهامی خاص</h1>
          </div>
          <div className={"flex justify-end w-full h-auto mt-2 bg-gray-300"}>
            <h1 dir={"rtl"} className={"mr-16 text-3xl text-gray-600 print:mr-1 print:text-lg"}>{"0" + code + ' ' + '-' + ' ' + name}</h1>
          </div>
          <div className={"flex items-center justify-center w-full h-auto mt-4 bg-gray-300"}>
            <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm print:w-full"} dir={"rtl"}>
              <tbody>
                <tr className={"text-gray-700 border border-gray-300 print:border print:border-black"}>
                  <th className={"p-4 font-bold print:text-base print:hidden"}>ردیف</th>
                  <th className={"p-4 font-bold print:text-base"}>کد شرح</th>
                  <th className={"p-4 font-bold print:text-base"}>شرح هزینه</th>
                  <th className={"p-4 font-bold print:text-base"}>گروه</th>
                  <th className={"p-4 font-bold print:text-base"}>هزینه به ریال</th>
                  <th className={"p-4 font-bold print:text-base"}>تغییرات تسهیم</th>
                  <th className={"p-4 font-bold print:text-base"}>مانده به ریال</th>
                  {/* <th className={"p-4 font-bold no-print"}>عملیات</th> */}
                </tr>
                {renderTable}
              </tbody>
            </table>
          </div>
          <div className={"flex flex-col items-center justify-center w-full h-auto mt-2 bg-gray-300 print:justify-start"}>
            <div className={"w-11/12 h-auto p-4 bg-gray-200 rounded-lg shadow-sm print:w-full print:border print:border-gray-600"} dir={"rtl"}>
              <h1 className={'font-mono text-base'}>{'جمع معین' + ' ' + PN.convertEnToPe(Number(sum).toLocaleString()) + ' ' + 'ریال'}</h1>
            </div>
            <div className={"w-11/12 h-auto p-4 mt-2 bg-gray-200 rounded-lg shadow-sm print:w-full print:border print:border-gray-600"} dir={"rtl"}>
              <h1 className={'font-mono text-base'}>{'جمع کل' + ' ' + PN.convertEnToPe(Number(rangeSum).toLocaleString()) + ' ' + 'ریال'}</h1>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}

export default LabelCost
