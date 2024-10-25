import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../components/Header/Header';
import EncounterCard from '../components/EncounterCard/EncounterCard';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Typography from "@mui/material/Typography";

type Encounter = {
  _id: string;
  name: string;
  location: string;
  close_encounter_level: string;
  extraterrestrial_type: string;
  image: string;
  url: string;
};

type IndexProps = {
  isConnected: boolean;
  encounters: Encounter[];
};

export const getServerSideProps: GetServerSideProps<
  IndexProps
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    const client = await clientPromise;
    const db = client.db("close-encounters");
    const encounters = await db
      .collection("encounters")
      .find({})
      .limit(30)
      .toArray();

    return {
      props: { isConnected: true, encounters: JSON.parse(JSON.stringify(encounters)) }
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, encounters: [] },
    };
  }

};

export default function Home({
  encounters
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useState("");
  console.log(search);

  const filterEncounters = (encounter: Encounter) => {
    return encounter.name.toLowerCase().includes(search.toLowerCase()) || encounter.location.toLowerCase().includes(search.toLowerCase());
  }

  const filteredEncounters = encounters.filter(filterEncounters);

  return (
    <>
      <Head>
        <title>UFO Encounters and Sightings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="lg">
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '5rem' }}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '50ch', fontWeight: 'bold' },
            height: '100vh',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField onChange={(e) => setSearch(e.target.value)} id="outlined-basic" label="Search for UFO Sightings" variant="outlined" />

          <Typography variant="body2" color="text.secondary">
            *This is a list of some sample data of UFO/UAPUSO abductions and sightings in the United States. Search for an encounter by name or location.
          </Typography>

        </Box >
        <main>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4}>
            <EncounterCard encounters={filteredEncounters} />
          </Box>

        </main>
      </Container >
      <footer>
        <a
          href="https://www.digitalocean.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/do-blue-h-logo.png" alt="DigitalOcean Logo" className="logo" />
        </a>
      </footer>
    </>
  );
}
