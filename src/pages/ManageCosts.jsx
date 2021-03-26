import PN from 'persian-number';
import React, { useEffect, useRef, useState } from 'react';
import { store } from 'react-notifications-component';
import { Link, useHistory } from 'react-router-dom';
import { WaveSpinner } from "react-spinners-kit";
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const ManageCosts = () => {
  let history = useHistory();
  const importExelRef = useRef(null);

  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    request_section();
  }, [])

  const request_section = () => {
    Axios.get('/get_section_cost').then((response) => {
      setSections(response.data);
      setIsLoading(false);
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

  const handelExelImport = (event) => {
    console.log("tes");
    const file = importExelRef.current.files[0];
    var formData = new FormData();
    formData.append("exel", file);
    setIsLoading(true);
    Axios.post('/import_cost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      store.addNotification({
        title: "عملیات موفق",
        message: "دریافت فایل با موفقیت انجام شد",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", 'animate__pulse'],
        animationOut: ["animate__animated animate__fadeInBottomLeft"],
        showIcon: true,
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
      request_section();
      setErrors(response.data.errors);
      if (response.data.errors && response.data.errors.length > 0) {
        setShowModal(true);
      }
      importExelRef.current.file = [];
    }).catch(({ err }) => {
      console.log({ err });
      store.addNotification({
        title: "عملیات نا موفق",
        message: "خطا",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", 'animate__pulse'],
        animationOut: ["animate__animated animate__fadeInBottomLeft"],
        showIcon: true,
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
    });
  }

  const handleClickOnImportExel = () => {
    importExelRef.current.files = null;;
    importExelRef.current.click();
  }

  const goToCosts = (section) => {
    history.push({
      pathname: '/listCosts/' + section.id,
      state: { section }
    });
  }

  const goToSectionTahsim = (section) => {
    history.push({
      pathname: '/sectionTahsim',
      state: { section }
    });
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
      </tr>
    );
  } else {
    renderTable = sections.map((section, index) => {
      return (
        <tr key={section.id} className={"font-medium text-center hover:bg-gray-300"}>
          <td>{PN.convertEnToPe(Number(index + 1))}</td>
          <td>{section.name}</td>
          <td>{PN.convertEnToPe(Number(section.group_id))}</td>
          <td>{PN.convertEnToPe(Number(section.sharable))}</td>
          <td className={"flex flex-col"}>
            <button onClick={() => goToCosts(section)} className={"w-full h-auto p-2 text-white bg-blue-800 border border-gray-200 border-none font-small hover:bg-blue-500"}>مدریت هزینه</button>
            <button onClick={() => goToSectionTahsim(section)} className={"w-full h-auto p-2 text-white border border-gray-200 border-none bg-violet-800 font-small hover:bg-violet-500"}>گزارش تسهیم</button>
          </td>
        </tr >
      )
    });
  }

  const hideModal = () => {
    setShowModal(false);
  }

  return (
    <div className={"flex flex-row w-full h-auto overflow-hidden"}>

      <div className={(showModal) ? "absolute  w-full min-h-screen overflow-hidden bg-white half-faded" : "absolute hidden w-full min-h-screen overflow-hidden bg-white half-faded"}>
        <div className={"flex flex-row"}>
          <div className={"flex flex-col items-center w-full h-screen overflow-y-auto"}>
            <div className={"w-10/12 h-auto bg-gray-200"}>
              <div onClick={hideModal} className={"w-full h-12 p-1 text-lg text-white bg-black shadow-sm"}>
                <div className={"flex flex-row"} dir={"rtl"}>
                  <h1 className={"flex-1 m-2 text-center"}>{'نوع خطا'}</h1>
                  <h1 className={"flex-1 m-2 text-center"}>{"سطر در اکسل"}</h1>
                  <h1 className={"flex-1 m-2 text-center"}>{'بخش'}</h1>
                  <h1 className={"flex-1 m-2 text-center"}>{'گروه'}</h1>
                  <h1 className={"flex-1 m-2 text-center"}>{'کد شرح'}</h1>
                  <h1 className={"flex-1 m-2 text-center"}>{'کد مرکز هزینه'}</h1>
                  <h1 className={"flex-1 m-2 text-center"}>{'هزینه به ریال'}</h1>
                </div>
              </div>
              {errors.length > 0 && errors.map((error) => {
                return (
                  <div key={error.id} className={"flex flex-row bg-red-200"} dir={"rtl"}>
                    <h1 className={"flex-1 m-2 text-center"}>{error.name}</h1>
                    <h1 className={"flex-1 m-2 text-center"}>{error.index}</h1>
                    <h1 className={"flex-1 m-2 text-center"}>{error.label}</h1>
                    <h1 className={"flex-1 m-2 text-center"}>{error.group}</h1>
                    <h1 className={"flex-1 m-2 text-center"}>{error.code}</h1>
                    <h1 className={"flex-1 m-2 text-center"}>{error.id}</h1>
                    <h1 className={"flex-1 m-2 text-center"}>{error.value}</h1>
                  </div>
                )
              })}
            </div>
          </div>
          <button onClick={hideModal} className={"w-48 h-12 p-1 text-lg text-white bg-black shadow-sm"}>خروج</button>
        </div>
      </div>

      <div className={"flex flex-col w-10/12 h-screen overflow-y-auto bg-gray-300"}>
        <div className={"w-full h-12 bg-gray-200 "}>
          <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن مرکز هزینه </button>
          </Link>
          <button onClick={handleClickOnImportExel} className={"w-auto h-auto p-3 text-center text-white bg-green-600 hover:bg-green-500"}>Exel ورودی</button>
        </div>
        <div className={"flex items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <input onClick={(event) => { event.target.value = null }} onChange={handelExelImport} ref={importExelRef} type="file" name="exel" id="" className={"hidden"} multiple />
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm"} dir={"rtl"}>
            <tbody>
              <tr className={"text-gray-700 border border-gray-300"}>
                <th className={"p-4 font-bold"}>ردیف</th>
                <th className={"p-4 font-bold"}>نام مرکز</th>
                <th className={"p-4 font-bold"}>گروه</th>
                <th className={"p-4 font-bold"}>وضعیت تسهیم</th>
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

export default ManageCosts
