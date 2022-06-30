import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const [face, setFace] = useState([]);
  const getData = async () => {
    const json = await (
      await fetch("https://billions-api.nomadcoders.workers.dev/")
    ).json();
    setFace(json);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(face);
  return (
    <div>
      {face
        .filter((item) => item.netWorth < 40000) // 가치가 4000이 낮은 데이터만 통과
        .map(
          (
            face //통과된 데이터를 가지고
          ) => (
            <img key={face.index} src={face.squareImage} /> //jsx를 이용해 img태그 렌더링
          )
        )}
    </div>
  );
}
