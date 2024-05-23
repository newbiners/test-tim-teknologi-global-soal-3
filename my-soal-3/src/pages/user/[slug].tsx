import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { useEffect, useState } from "react";
import { User } from "@/types/User";
import axios from "axios";
import { baseApi } from "@/constants/api/config";
import { RiPictureInPictureExitLine } from "react-icons/ri";
export default function UserById() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<User>({
    id: 1,
    name: "",
    gender: "",
  });

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const { data } = await axios.get(`${baseApi}/GetOne/${slug}`);
        setData(data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDataById();
  }, [slug]);
  return (
    <main className="m-28 bg-sky-200 p-12 rounded-2xl shadow-2xl">
        <RiPictureInPictureExitLine className="absolute top-5 left-5 text-5xl" onClick={() => router.back()}/>
      <div className="flex flex-col items-center w-full">
        <CgProfile className="text-9xl" />
        <span className="flex w-1/2 justify-between items-center">
        <span>
          <p>nama :</p>
          <p className="text-4xl">{data.name}</p>
        </span>
        <span>
          <p>Jenis kelamin: </p>
          <span className="flex items-center gap-2">
            {data.gender === "male" ? (
              <IoMdMale className="text-violet-600 text-3xl" />
            ) : (
              <IoMdFemale className="text-red-400 text-3xl" />
            )}
            <p className="text-4xl">{data.gender}</p>
          </span>
        </span>
        </span>
      </div>
    </main>
  );
}
