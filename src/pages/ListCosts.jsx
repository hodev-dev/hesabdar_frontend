import PN from 'persian-number';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { store } from 'react-notifications-component';
import { useHistory, useParams } from 'react-router-dom';
import { WaveSpinner } from "react-spinners-kit";
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const ListCosts = (props) => {
  const { state } = props.location;
  const { id } = useParams();
  let history = useHistory();
  const [costs, setCosts] = useState([]);
  const [sum, setSum] = useState(0);
  const [finalSum, setFinalSum] = useState(0);
  const [section, setSection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [prevVlaueWageSum, setPrevVlaueWageSum] = useState(0);
  const [changeWageSum, setChangeWageSum] = useState(0);
  const [finalWageSum, setFinalWageSum] = useState(0);
  const [finalBime, setFinalBime] = useState(0);
  const [changeBime, setChangeBime] = useState(0);
  const [prevBime, setPrevBime] = useState(0);
  const [prevSanavat, setPrevSanavat] = useState(0);
  const [changeSanavat, setChangeSanavat] = useState(0);
  const [finalSanavat, setFinalSanavat] = useState(0);
  const [prevTamir, setPrevTamir] = useState(0);
  const [finalTamir, setFinalTamir] = useState(0);
  const [prevEstelak, setPrevEstelak] = useState(0);
  const [finalEstelak, setFinalEstelak] = useState(0);

  useEffect(() => {
    request_section();
  }, [])

  const request_section = () => {
    Axios.post('/get_section_cost_with_id', { 'id': id }).then((response) => {
      setCosts(response.data.sections_with_costs.costs);
      setSection(response.data.sections_with_costs);
      setIsLoading(false);
      setSum(response.data.sum);
      setFinalSum(response.data.final_sum);
      setPrevVlaueWageSum(response.data.prev_vlaue_wage_sum);
      setChangeWageSum(response.data.change_wage_sum);
      setFinalWageSum(response.data.final_wage_sum);

      setPrevBime(response.data.prev_value_bime);
      setChangeBime(response.data.change_bime);
      setFinalBime(response.data.final_bime);
      setPrevSanavat(response.data.prev_value_sanavat);
      setChangeSanavat(response.data.change_sanavat);
      setFinalSanavat(response.data.final_sanavat);
      setPrevTamir(response.data.prev_value_tamir);
      setFinalTamir(response.data.final_tamir);
      setPrevEstelak(response.data.prev_vlaue_estelak);
      setFinalEstelak(response.data.final_estelak);
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

  const startTashim = (onClose) => {
    setIsLoading(true);
    onClose();
    Axios.post('/tahsim', { 'id': section.id }).then((response) => {
      console.log({ response });
      setIsLoading(false);
      store.addNotification({
        title: "عملیات موفق",
        message: "تسهیم با موفقیت انجام شد",
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
    }).catch((err) => {
    });
  }

  const startTashimProduce = () => {
    setIsLoading(true);
    Axios.post('/tahsim_produce', { 'id': section.id }).then((response) => {
      console.log({ response });
      setIsLoading(false);
      store.addNotification({
        title: "عملیات موفق",
        message: "تسهیم با موفقیت انجام شد",
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
    }).catch((err) => {
    });
  }

  const handleTashim = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='flex flex-col items-center justify-center w-screen h-screen bg-transparent'>
            <div className={"flex flex-row items-center justify-center w-6/12 h-96"}>
              <button onClick={onClose} className={"w-4/12 p-5 text-2xl text-white bg-red-400 border rounded-lg"}>لغو</button>
              <button onClick={() => startTashim(onClose)} className={"w-4/12 p-5 ml-5 text-2xl text-white bg-green-500 border rounded-lg"}>تسهیم هزینه</button>
            </div>
          </div>
        );
      }
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
      </tr>
    );
  } else {
    renderTable = costs.map((cost, index) => {
      return (
        <tr key={cost.id} className={"font-medium text-center hover:bg-gray-300 print:border print:border-gray-500"}>
          <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(index + 1))}</td>
          <td className={"p-4 font-mono print:p-0 print:text-sm print:hidden"}>{PN.convertEnToPe(Number(cost.label.code))}</td>
          <td className={"p-4 font-mono print:p-0 print:text-sm"}>{cost.label.name}</td>
          <td className={"p-4 font-mono print:p-0 print:text-sm print:hidden"}>{PN.convertEnToPe(Number(cost.group_id))}</td>
          <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(cost.prev_value).toLocaleString())}</td>
          <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(cost.change).toLocaleString())}</td>
          <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(cost.final).toLocaleString())}</td>
          {/* <td className={"flex flex-col no-print"}>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-yellow-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>ویرایش</button>
            <button onClick={() => 0} className={"w-full h-auto p-2 bg-red-300 border border-gray-200 border-none font-small hover:bg-yellow-500"}>حذف</button>
          </td> */}
        </tr >
      )
    });
  }

  return (
    <div className={"flex flex-row w-full min-h-screen"}>
      <div className={"flex flex-col w-10/12 bg-gray-300 print:w-full"}>
        <div className={"w-full h-12 bg-gray-200 print:hidden"}>
          {/* <Link to={'addNewSection'}>
            <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>افزودن هزینه به مرکز هزینه </button>
          </Link> */}
          <button onClick={handleTashim} className={"w-auto h-auto p-3 text-center text-white bg-indigo-600 hover:bg-indigo-400"}>تهسیم هزینه ها بر اساس پرسنل</button>
          <button onClick={startTashimProduce} className={"w-auto h-auto p-3 text-center text-white bg-pink-600 hover:bg-indigo-400"}>تسهیم هزینه ها بر اساس تولید</button>
          <button onClick={handlePrint} className={"w-auto h-auto p-3 text-center text-white bg-yellow-600 hover:bg-indigo-400"}>پرینت</button>
        </div>
        <div className={"flex-row justify-center hidden w-full h-auto text-2xl print:flex"}>
          <h1 className={"w-6/12 text-center bg-white"}>شرکت نورد و لوله ی سپنتا اهواز - سهامی خاص</h1>
        </div>
        <div className={"flex justify-end w-full h-auto mt-2 bg-gray-300"}>
          <h1 dir={"rtl"} className={"mr-16 text-3xl text-gray-600 print:mr-0 print:text-lg"}>{'هزینه های' + ' ' + section.name}</h1>
        </div>
        <div className={"flex flex-col items-center justify-center w-full h-auto mt-4 bg-gray-300"}>
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm print:w-full"} dir={"rtl"}>
            <tbody>
              <tr className={"font-medium text-center text-gray-700 border border-gray-300 print:text-base print:border-black"}>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>ردیف</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1 print:hidden"}>کد شرح</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>شرح هزینه</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1 print:hidden"}>گروه</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>هزینه به ریال</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>تغییرات نسهیم</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>مانده به ریال</th>
                {/* <th className={"p-4 font-bold no-print"}>عملیات</th> */}
              </tr>
              {renderTable}
            </tbody>
          </table>
          <div className={"flex flex-col items-center justify-center w-full h-auto mt-4 mb-4 bg-gray-300"}>
            <div className={"w-11/12 h-auto p-4 bg-gray-200 rounded-lg shadow-sm print:p-1 print:w-full print:border print:border-gray-500 print:text-sm"} dir={"rtl"}>
              <h1 className={'font-mono text-lg print:text-sm'}>{'جمع هزینه اولیه' + ' ' + PN.convertEnToPe(Number(sum).toLocaleString()) + ' ' + 'ریال'}</h1>
            </div>
            <div className={"w-11/12 h-auto p-4 mt-2 bg-gray-200 rounded-lg shadow-sm print:p-1 print:w-full print:border print:border-gray-500 print:text-sm"} dir={"rtl"}>
              <h1 className={'font-mono text-lg print:text-sm'}>{'جمع مانده' + ' ' + PN.convertEnToPe(Number(finalSum).toLocaleString()) + ' ' + 'ریال'}</h1>
            </div>
          </div>
        </div>
        <div className={"flex flex-col items-center justify-center w-full h-auto mt-2 bg-gray-300"}>
          <table className={"w-11/12 h-auto bg-gray-200 rounded-lg shadow-sm print:w-full"} dir={"rtl"}>
            <tbody>
              <tr className={"font-medium text-center text-gray-700 border border-gray-300 print:text-base print:border-black"}>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>شرح هزینه</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>مستقیم</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>غیره مستقیم</th>
                <th className={"p-4 text-lg font-bold print:text-sm print:p-1"}>مانده</th>
              </tr>
              <tr className={"font-medium text-center hover:bg-gray-300 print:border print:border-gray-500"}>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{'حقوق و دستمزد'}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(prevVlaueWageSum).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(changeWageSum).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(finalWageSum).toLocaleString())}</td>
              </tr>
              <tr className={"font-medium text-center hover:bg-gray-300 print:border print:border-gray-500"}>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{'بیمه سهم کارفرما'}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(prevBime).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(changeBime).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(finalBime).toLocaleString())}</td>
              </tr>
              <tr className={"font-medium text-center hover:bg-gray-300 print:border print:border-gray-500"}>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{'سنوات و خدمات'}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(prevSanavat).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(changeSanavat).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(finalSanavat).toLocaleString())}</td>
              </tr>
              {/* <tr className={"hidden font-medium text-center hover:bg-gray-300 print:border print:border-gray-500"}>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{'هزینه تعمیر و نگهداری'}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(prevTamir).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(finalTamir).toLocaleString())}</td>
              </tr>
              <tr className={"hidden font-medium text-center hover:bg-gray-300 print:border print:border-gray-500"}>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{'استهلاک'}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(prevEstelak).toLocaleString())}</td>
                <td className={"p-4 font-mono print:p-0 print:text-sm"}>{PN.convertEnToPe(Number(finalEstelak).toLocaleString())}</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default ListCosts
