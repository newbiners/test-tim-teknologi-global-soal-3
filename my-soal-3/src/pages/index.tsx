import Image from "next/image";
import { Inter } from "next/font/google";
import UserBox from "@/components/UserBox";
import { useState } from "react";
import { User } from "@/types/User";
import UserCreateContainer from "@/components/CreateUserContainer";
import ActionButton from "@/components/ActionButton";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [dataUser, setDataUser] = useState<User>({
    gender: "female",
    name: "Gufron",
  });
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
    } catch (error) {
      console.log(error);
    }
  };

  const btnCreateUserHendler = async () => {
    const token = localStorage.getItem("token");
    setAct(!act);
    // try {
    //   if (!dataUser.id) {
    //     const response = await axios.post("/api/users/create", {
    //       data: dataUser,
    //       token: token
    //     });
    //   } else {
    //     const response = await axios.patch(
    //       `/api/users/edite?id=${dataUser.id}`,
    //       { data: dataUser, token: token }
    //     );
    //   }
    //   fetchData();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <main className={` ${inter.className}`}>
      <ActionButton
        variant="violet"
        className="text-sm xl:text-xl text-white w-28 xl:w-52 font-semibold xl:mt-0 mt-3 m-5"
        onClick={handleBtnAct}
      >
        Create User
      </ActionButton>
      <div className="mx-5 mt-6">
        <UserBox
          data={dataUser}
          btnHendler={btnDeleteUserHendler}
          setEditeUser={setDataUser}
          btnEditeHendler={handleBtnAct}
        />
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
