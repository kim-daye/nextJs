import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [people, setPeople] = useState([]);
  const getPeople = async () => {
    const json = await (
      await fetch("https://billions-api.nomadcoders.workers.dev/")
    ).json();
    setPeople(json);
  };
  useEffect(() => {
    getPeople();
  }, []);
  const router = useRouter();
  const onPersonClick = (id) => {
    router.push(`/person/${id}`);
  };
  return (
    <section>
      {people.length === 0
        ? "Loading...."
        : people.map((person) => (
            <article key={person.id} onClick={() => onPersonClick(person.id)}>
              <img src={person.squareImage} />
              <div>
                <h2>{person.name}</h2>
                <h5>
                  {Math.round(person.netWorth / 1000)} Billion /{" "}
                  {person.industries.join(" ")}
                </h5>
              </div>
            </article>
          ))}
      <style jsx>{`
        section {
          padding: 50px 0px;
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        div {
          padding: 10px;
        }
        h2 {
          font-size: 20px;
          margin-bottom: 5px;
        }
        h5 {
          font-size: 14px;
        }
        img {
          width: 100%;
        }
        article {
          padding: 0;
          margin: 0;
          overflow: hidden;
          cursor: pointer;
          transition: transform linear 0.2s;
        }
        article:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
