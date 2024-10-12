import clientPromise from "../lib/mongodb";
import { GetServerSideProps } from 'next';


type Encounter = {
  _id: string;
  name: string;
  location: string;
  close_encounter_level: string;
  extraterrestrial_type: string;
  image: string;
  url: string;
};


interface EncounterProps {
  encounters: Encounter[];
}


const EncounterCard: React.FC<EncounterProps> = ({ encounters }) => {
  return (
    <div>
      <h1>US Aquariums</h1>
      <ul>
        {encounters.map((encounter) => (
          <li key={encounter._id}>
            <img src={encounter.image}></img>
            <h2>{encounter.name}</h2>
            <h3>{encounter.location}</h3>
            <h4>{encounter.close_encounter_level}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default EncounterCard;


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("close-encounters");
    const aquariums = await db
      .collection("encounters")
      .find({})
      .limit(30)
      .toArray();
    return {
      props: { encounters: JSON.parse(JSON.stringify(encounters)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { aquariums: [] } };
  }
};