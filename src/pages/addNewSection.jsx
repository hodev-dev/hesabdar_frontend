import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Axios } from '../helper/Axios';

const AddNewSection = () => {
  let history = useHistory();
  const [name, setName] = useState('');
  const [tashimLabel, setTashimLabel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState(1);
  const [code, setCode] = useState(0);
  const [workers, setWorkers] = useState(0);
  const [produce, setProduce] = useState(0);
  const [sharable, setSharable] = useState(0);
  const [tahsimLableSelect, setTahsimLableSelect] = useState(1);

  useEffect(() => {
    requestTashimLabel();
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
  const onSubmit = async () => {
    console.log({ name, group, workers, produce, sharable, tahsimLableSelect, code });
    const response = await Axios.post('/add_section', { name, code, group, workers, produce, sharable, tahsimLableSelect });
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
        <div className={"w-full h-auto bg-gray-200 "}>
          <button className={"w-auto h-auto p-3 text-center text-white bg-blue-600 hover:bg-blue-400"}>بازگشت</button>
        </div>
        <div className={"flex flex-col items-center justify-center w-full h-screen mt-0.5 bg-gray-300"}>
          <div className={'flex flex-col items-center justify-center w-6/12 mx-auto '}>
            <input onChange={handleName} type="text" className={"w-8/12 h-10 p-4 mt-2"} placeholder={"نام مرکز هزینه"} dir={'rtl'} />
            <input onChange={handleCode} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"کد"} dir={'rtl'} />
            <select onChange={handleGroup} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
              <option value="1">تولید</option>
              <option value="2">خدمات</option>
              <option value="3">اداری</option>
            </select>
            <select onChange={handleSharable} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
              <option value="1">قابل تهسیم</option>
              <option value="0">غیره قابل تهسیم</option>
            </select>
            <select onChange={handleTahsimSelect} name="sellect" className={"w-8/12 h-10 p-1 mt-4 bg-gray-100"} id="" dir={'rtl'}>
              {renderTahsimLabel()}
            </select>
            <input onChange={handleWorkers} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"تعداد پرسنل"} dir={'rtl'} />
            <input onChange={handleProduce} type="text" className={"w-8/12 h-10 p-4 mt-4"} placeholder={"میزان تولید"} dir={'rtl'} />
            <button onClick={onSubmit} className={"w-8/12 p-2 mt-4 mb-4 text-xl text-white bg-blue-500"}>ثبت</button>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default AddNewSection
