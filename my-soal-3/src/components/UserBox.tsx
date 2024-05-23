import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { User } from "@/types/User";
import { Dispatch } from "react";
const UserBox:React.FC<{
data: User;
btnHendler: (idx?: number) => void;
setEditeUser: Dispatch<React.SetStateAction<User>>;
btnEditeHendler: () => void
}> = ({data, btnHendler, setEditeUser, btnEditeHendler}) => {
    const btnEdite = () => {
        setEditeUser(data)
        btnEditeHendler()
    }
    console.log(data, "data")
    return(
        <div className="h-56 bg-sky-50 flex justify-center items-center rounded-2xl relative overflow-hidden">
            <section className="flex absolute left-7 top-7 flex-col items-center p-3">
                {data.gender === "male" ?
                 <IoMdMale className="text-violet-600 text-3xl"/>
                :
                <IoMdFemale className="text-red-400 text-3xl"/>
                }
                <p>{data.gender}</p>
            </section>
            <section className="flex flex-col items-center">
                <IoPersonCircleOutline className="text-6xl"/>
                <h2 className="text-xl">{data.name}</h2>
                <section className="flex items-center gap-3 mt-4">
                    <button className="flex items-center" onClick={btnEdite}>
                        <MdEdit/>
                        <p>Edit</p>
                    </button>
                    <button className="flex items-center" onClick={() => btnHendler(data.id)}>
                        <MdDeleteOutline/>
                        <p>Delete</p>
                    </button>
                </section>
            </section>
        </div>
    )
}

export default UserBox;