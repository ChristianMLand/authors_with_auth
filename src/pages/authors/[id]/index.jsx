import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function View() {
    const router = useRouter();
    const [author, setAuthor] = useState();

    useEffect(() => {
        // need to check that the router has loaded the query params first
        if (router.isReady) { 
            axios.get(`/api/authors/${ router.query.id }`)
                .then(res => setAuthor(res.data));
        }
    },[router.isReady]); 

    if (!author) return <Layout />;

    return (
        <Layout>
            <h1>{ author.name }</h1>
            <p>Posted by: { author.user.username }</p>
        </Layout>
    );
}