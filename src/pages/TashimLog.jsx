import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const TashimLog = () => {
  let history = useHistory();
  const importExelRef = useRef(null);

  const [tashimLogs, setTashimLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request_tashim_log();
  }, [])

  const request_tashim_log = () => {
    Axios.get('/get_tashim_log').then((response) => {
      console.log({ response });
      setTashimLog(response.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleRemove = ({ id }) => {
    Axios.post('/remove_section', { 'id': id }).then((response) => {
      console.log({ response });
      request_tashim_log();
    });
  }

  const handelExelImport = (event) => {
    const file = importExelRef.current.files[0];
    console.log({ file });
    var formData = new FormData();
    formData.append("exel", file);
    Axios.post('/import_cost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      request_tashim_log();
    }).catch(({ err }) => {
      console.log({ err });
    });
  }

  const handleClickOnImportExel = () => {
    importExelRef.current.click();
  }

  const goToCosts = (section) => {
    history.push({
      pathname: '/listCosts',
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
    renderTable = tashimLogs.map((tashimLog) => {
      return (
        <tr key={tashimLog.id} className={`font-medium text-center ${(tashimLog.type === 0) ? "bg-red-200" : 'bg-green-200'}`}>
          <td>{tashimLog.id}</td>
          <td>{tashimLog.label_id}</td>
          <td>{tashimLog.from_section_id}</td>
          <td>{tashimLog.to_section_id}</td>
          <td>{tashimLog.prev_value}</td>
          <td>{tashimLog.receive}</td>
          <td>{tashimLog.send}</td>
          <td>{tashimLog.final}</td>
        </tr >
      )
    });
  }

  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        <div className={"w-full h-12 bg-gray-200 "}>
          <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن مرکز هزینه </button>
          </Link>
          <button onClick={handleClickOnImportExel} className={"w-auto h-auto p-3 text-center text-white bg-green-600 hover:bg-green-500"}>Exel ورودی</button>
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <input onChange={handelExelImport} ref={importExelRef} type="file" name="exel" id="" className={"hidden"} multiple />
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold"}>ردیف</th>
                <th className={"p-4 font-bold"}>شرح هزینه</th>
                <th className={"p-4 font-bold"}>از مرکز</th>
                <th className={"p-4 font-bold"}>به مرکز</th>
                <th className={"p-4 font-bold"}>مقدار اولیه</th>
                <th className={"p-4 font-bold"}>دریافتی</th>
                <th className={"p-4 font-bold"}>ارسالی</th>
                <th className={"p-4 font-bold"}>مانده</th>
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

export default TashimLog
