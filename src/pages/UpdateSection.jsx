import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const UpdateSection = (props) => {
  const { section } = props.location.state;

  let history = useHistory();
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [tashimLabel, setTashimLabel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState(1);
  const [code, setCode] = useState(0);
  const [workers, setWorkers] = useState(0);
  const [produce, setProduce] = useState(0);
  const [sharable, setSharable] = useState(0);
  const [tahsimLableSelect, setTahsimLableSelect] = useState(1);
  const [shareOrder, setShareOrder] = useState(0);

  useEffect(() => {
    requestTashimLabel();
  }, [])

  useEffect(() => {
    setId(section.id);
    setName(section.name);
    setGroup(section.group_id);
    setWorkers(section.users);
    setProduce(section.produce);
    setCode(section.code);
    setSharable(section.sharable);
    setTahsimLableSelect(section.tahsimlable_id);
    setShareOrder(section.share_order);
  }, [])

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleCode = (event) => {
    setCode(event.target.value);
  }

  const handleGroup = (event) => {
    setGroup(event.target.value);
  }

  const handleWorkers = (event) => {
    setWorkers(event.target.value);
  }
  const handleProduce = (event) => {
    setProduce(event.target.value);
  }

  const requestTashimLabel = () => {
    Axios.get('/get_tahsimlabel').then((response) => {
      setTashimLabel(response.data);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }
  const handleTahsimSelect = (event) => {
    setTahsimLableSelect(event.target.value);
  }

  const handleSharable = (event) => {
    setSharable(event.target.value);
  }
  const handleOrder = (event) => {
    setShareOrder(event.target.value);
  }
  const onSubmit = async () => {
    console.log({ name, group, workers, produce, sharable, tahsimLableSelect, code, shareOrder });
    const response = await Axios.post('/update_section', { id, name, code, group, workers, produce, sharable, tahsimLableSelect, shareOrder });
    console.log({ response });
    history.push('/');
  }

  const renderTahsimLabel = () => {
    if (isLoading) {
      return <option value="3">اداری</option>
    } else {
      return tashimLabel.map((label) => {
        return <option key={label.name} value={label.id}>{label.name}</option>
      });
    }
  }

  return (
    <div className={"flex flex-row w-full h-auto"}>
      <div className={"flex flex-col w-10/12 h-screen bg-gray-300"}>
        {/* <div className={"w-full h-auto bg-gray-200 "}>
          <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>بازگشت</button>
        </div> */}
        <div className={"flex flex-col items-center justify-center w-full h-screen mt-0.5 bg-gray-300"}>
          <div className={'flex flex-col items-center justify-center w-6/12 mx-auto '}>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <input className={"w-10/12"} onChange={handleName} value={name} type="text" className={"w-8/12 h-10 p-4 mt-2"} placeholder={"نام مرکز هزینه"} dir={'rtl'} />
              <label className={"w-2/12 ml-5"} htmlFor="">نام مرکز هزینه</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <input className={"w-10/12 ml-5"} onChange={handleCode} value={code} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"کد"} dir={'rtl'} />
              <label className={"w-2/12 ml-5"} htmlFor="">کد مرکز هزینه</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <select className={"w-10/12 ml-5"} onChange={handleGroup} value={group} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
                <option value="1">تولید</option>
                <option value="2">خدمات</option>
                <option value="3">اداری</option>
              </select>
              <label className={"w-2/12 ml-5"} htmlFor="">گروه مرکز هزینه</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <select className={"w-10/12 ml-5"} onChange={handleSharable} value={sharable} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
                <option value="1">تسهیم شده</option>
                <option value="0">تسهیم نشده</option>
              </select>
              <label className={"w-2/12 ml-5"} htmlFor="">وضعیت تسهیم</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <select className={"w-10/12 ml-5"} onChange={handleTahsimSelect} value={tahsimLableSelect} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
                {renderTahsimLabel()}
              </select>
              <label className={"w-2/12 ml-5"} htmlFor="">نحوه تسهیم</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <input className={"w-10/12 ml-5"} onChange={handleOrder} value={shareOrder} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"میزان تولید"} dir={'rtl'} />
              <label className={"w-2/12 ml-5"} htmlFor="">ترتیب تسهیم</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <input className={"w-10/12 ml-5"} onChange={handleWorkers} value={workers} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"تعداد پرسنل"} dir={'rtl'} />
              <label className={"w-2/12 ml-5"} htmlFor="">تعداد پرسنل</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <input className={"w-10/12 ml-5"} onChange={handleProduce} value={produce} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"میزان تولید"} dir={'rtl'} />
              <label className={"w-2/12 ml-5"} htmlFor="">میزان تولید</label>
            </div>
            <div className={"flex flex-row items-center justify-center w-full"}>
              <button onClick={onSubmit} className={"w-8/12 p-2 mt-4 mb-4 text-xl text-white bg-blue-500"}>ثبت</button>
              <label className={"w-2/12 ml-5"} htmlFor="">عملیات</label>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default UpdateSection
