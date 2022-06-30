import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Person() {
  const router = useRouter();
  const [person, setPerson] = useState();

  const getPerson = async () => {
    if (router?.query?.id && !person) {
      const json = await (
        await fetch(
          `https://billions-api.nomadcoders.workers.dev/person/${router.query.id}`
        )
      ).json();
      setPerson(json);
    }
  };
  useEffect(() => {
    getPerson();
  }, [router]);
  return (
    <section>
      {!person ? (
        "Loading..."
      ) : (
        <>
          <article>
            <img src={person.squareImage} />
            <h2>{person.name}</h2>
            <h6>Networth: {Math.round(person.netWorth / 1000)} Billion</h6>
            <h6>Country: {person.country}</h6>
            <h6>Industry: {person.industries.join(", ")}</h6>
            <p>{person.bio}</p>
          </article>
          <article>
            <h2>Financial Assets</h2>
            <div className="financial">
              {person.financialAssets.map((asset, index) => (
                <div key={index}>
                  <h6>
                    <span>Ticker:</span> {asset.ticker}
                  </h6>
                  <h6>
                    <span>Shares:</span>{" "}
                    {asset.numberOfShares.toLocaleString("kr-KO")}
                  </h6>
                  {asset.exerciseOptionPrice ? (
                    <h6>
                      <span>Excersie Price:</span> ${asset.exerciseOptionPrice}
                    </h6>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </>
      )}
      <style jsx>{`
        img {
          margin-bottom: 20px;
        }
        h2 {
          margin-bottom: 20px;
        }
        h6 {
          margin-bottom: 10px;
        }
        .financial {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
        .financial div {
          padding: 10px;
          border-radius: 15px;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
}
