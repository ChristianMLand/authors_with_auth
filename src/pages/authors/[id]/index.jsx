import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function View() {
    const router = useRouter();
    const [author, setAuthor] = useState();

    useEffect(() => {
        if (router.isReady) { // need to check that the router has loaded the query params first
            axios.get(`/api/authors/${router.query.id}`)
                .then(res => setAuthor(res.data))
                .catch(console.error);
        }
    },[router.isReady]); 

    if (!author) return <h1>Loading...</h1>;

    return (
        <Layout>
            <h1>{author.name}</h1>
            <p>Posted by: {author.user.username}</p>
        </Layout>
    );
}