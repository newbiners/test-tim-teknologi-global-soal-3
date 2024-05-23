import UserBox from "@/components/UserBox";
import { useState, useEffect } from "react";
import { User } from "@/types/User";
import UserCreateContainer from "@/components/CreateUserContainer";
import ActionButton from "@/components/ActionButton";
import axios from "axios";
import { baseApi } from "@/constants/api/config";

export default function Home() {
  const [dataUser, setDataUser] = useState<User>({
    gender: "female",
    name: "",
  });
  const [dataArrUsers, setDataArrUsers] = useState<User[]>([]);
  const [act, setAct] = useState<boolean>(false);

  const handleBtnAct = () => {
    setAct(!act);
    if (act == true) {
      setDataUser({
        gender: "",
        name: "",
      });
    }
  };

  const btnDeleteUserHendler = async (id?: number) => {
    try {
      const response = await axios.delete(`${baseApi}/Delete/${id}`);
      const {data} = await axios.get(`${baseApi}/GetAll`);
      setDataArrUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const btnCreateUserHendler = async () => {
    setAct(!act);
    try {
      if (!dataUser.id) {
        const response = await axios.post(`${baseApi}/Create`,dataUser);
      } else {
        const response = await axios.put(
          `${baseApi}/Update/${dataUser.id}`, dataUser
        );
      }
      const {data} = await axios.get(`${baseApi}/GetAll`);
      setDataArrUsers(data);
      setDataUser({
        gender: "female",
        name: "",
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
const getData = async () => {
  try{
    const {data} = await axios.get(`${baseApi}/GetAll`);
    setDataArrUsers(data);
  }catch(error){
    console.log(error);
  }
};
getData()
  }, [dataUser]);
  return (
    <main>
      <ActionButton
        variant="violet"
        className="text-sm xl:text-xl text-white w-28 xl:w-52 font-semibold xl:mt-5 mt-3 m-5"
        onClick={handleBtnAct}
      >
        Create User
      </ActionButton>
      <div className="mx-5 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {dataArrUsers.length !== 0 && dataArrUsers.map((data) => (
        <UserBox
          key={data.id}
          data={data}
          btnHendler={btnDeleteUserHendler}
          setEditeUser={setDataUser}
          btnEditeHendler={handleBtnAct}
        />
      ))
      }
      </div>
      {act && (
        <UserCreateContainer
          data={dataUser}
          setDataHendler={setDataUser}
          btnHendle={handleBtnAct}
          btnHeandleCreate={btnCreateUserHendler}
        />
      )}
    </main>
  );
}
