import { gql, useQuery } from "@apollo/client";
import { getSession } from "@auth0/nextjs-auth0";
import React from "react";
import { AwesomeLink } from "../components/AwesomeLink";
import prisma from "../lib/prisma";

const FavoritesQuery = gql`
  query {
    favorites {
      title
      id
      url
      imageUrl
      description
      category
    }
  }
`;

const Favorites = () => {
  const { data, loading, error } = useQuery(FavoritesQuery);
  if (error) return <p>Oops! SOmething went wrong {error}</p>;
  if (loading) return <p>loading...</p>;
  return (
    <div className="flex gap-2 p-6">
      {!loading &&
        data.favorites.length > 0 &&
        data.favorites.map((fav) => {
          return (
            <AwesomeLink
              id={fav.id}
              category={fav.category}
              description={fav.description}
              imageUrl={fav.imageUrl}
              title={fav.title}
              url={fav.url}
              key={fav.id}
              isFav={true}
            />
          );
        })}
    </div>
  );
};

export default Favorites;

export const getServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/login",
      },
      props: {},
    };
  }
  return { props: {} };
};
