import react from 'react'
import { gql, useQuery } from '@apollo/client';

function Home() {

    const { loading, error, data } = useQuery(GET_POST);
    if (data) {
        console.log(data)
    }
    return (
        <h1>home page</h1>
    )
}

const GET_POST = gql`
  {
      getuserpost {
    id 
    body 
    createdAt 
    username
    comments{
        id 
        body
        username
        createdAt
    }
    commentcount
    likes{
        id
        username
        createdAt
    }
    likescount
  }
  }
`;
export default Home