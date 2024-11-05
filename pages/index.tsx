import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "../components/Header/Header";
import EncounterCard from "../components/EncounterCard/EncounterCard";
import { useState } from "react";
import { IndexProps } from "../types";
import { Encounter } from "../types/encounter";
import { SearchBar } from "../components/SearchBar/SearchBar";

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
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
      props: {
        isConnected: true,
        encounters: JSON.parse(JSON.stringify(encounters)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false, encounters: [] },
    };
  }
};

export default function Home({
  encounters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [search, setSearch] = useState("");

  const filterEncounters = (encounter: Encounter) => {
    return (
      encounter.name.toLowerCase().includes(search.toLowerCase()) ||
      encounter.location.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredEncounters = encounters.filter(filterEncounters);

  return (
    <>
      <Head>
        <title>UFO Encounters and Sightings</title>
        <meta
          name="description"
          content="A collection of UFO, UAP, and USO sightings and encounters."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container maxWidth="lg">
        <SearchBar setSearch={setSearch} />
        <main>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4}>
            <EncounterCard encounters={filteredEncounters} />
          </Box>
        </main>
      </Container>
      <footer>
        <a
          href="https://www.digitalocean.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img
            src="/do-blue-h-logo.png"
            alt="DigitalOcean Logo"
            className="logo"
          />
        </a>
      </footer>

      <style jsx>{`
        .body {
          background-image: url("https://archivesfoundation.org/wp-content/uploads/2019/12/ufo-7-e1575496085887-1024x518.jpg");
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        header {
          margin-bottom: 4rem;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .subtitle {
          font-size: 2rem;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }
        .logo {
          height: 1em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
