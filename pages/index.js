import Head from "next/head";
import { MongoClient } from "mongodb";
import React, { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>NextJs Meetups</title>
        <meta
          name="Description"
          content="Browse a huge list of highly active NextJs meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from API
//   return {
//     props: DUMMY_MEETUPS,
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://CharlieMurcia:ntu1Tt6YUo4J2oD0@cluster0.fg25b1z.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
