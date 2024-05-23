import React, { Dispatch, useState } from "react";
import { IoMale, IoFemale } from "react-icons/io5";
import { User } from "@/types/User";
import ActionButton from "./ActionButton";
import UserInput from "./UserInput";

const UserCreateContainer: React.FC<{
  btnHendle: () => void;
  setDataHendler: Dispatch<React.SetStateAction<User>>;
  data: User;
  btnHeandleCreate: () => void;
}> = ({ btnHendle, setDataHendler, data, btnHeandleCreate }) => {

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataHendler((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataHendler((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataHendler((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };
  const btnGenderHendler = (
    gender: "male" | "female",
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setDataHendler((prevState) => ({
      ...prevState,
      gender: gender,
    }));
  };
  return (
    <main className="h-screen w-full fixed top-0 flex items-center justify-center z-20">
      <div className="h-full w-full absolute bg-slate-600 opacity-25" />
      <section className="absolute z-30 bg-white p-14 rounded-2xl flex flex-col mx-12">
        <section className="flex flex-row gap-6 md:w-[40rem]">
          <UserInput
            label="Name"
            value={data.name}
            onChange={handleNameChange}
          />
          <div className="flex items-center gap-4">
            <ActionButton
              variant={data.gender === "female" ? "violet" : "grey"}
              className="text-white flex justify-center"
              onClick={(e) => btnGenderHendler("female", e)}
            >
              <IoFemale />
            </ActionButton>
            <ActionButton
              variant={data.gender === "male" ? "blue" : "grey"}
              className="text-white flex justify-center"
              onClick={(e) => btnGenderHendler("male", e)}
            >
              <IoMale />
            </ActionButton>
          </div>
        </section>
        <section className="flex mt-12 w-full gap-7">
          <ActionButton variant="grey" className="w-full md:w-72" onClick={btnHendle}>
            Cancel
          </ActionButton>
          <ActionButton
            variant="violet"
            className="text-white w-full"
            onClick={btnHeandleCreate}
          >
            {!data.id ? <p>Create User</p> : <p>Edite User</p>}
          </ActionButton>
        </section>
      </section>
    </main>
  );
};

export default UserCreateContainer;