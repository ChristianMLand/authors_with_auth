import Layout from "@/components/layout";
import Form from "@/components/form";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Edit() {
    const router = useRouter();
    const [author, setAuthor] = useState();

    useEffect(() => {
        if (router.isReady) {  // need to check that the router has loaded the query params first
            axios.get(`/api/authors/${router.query.id}`)
                .then(res => setAuthor(res.data))
                .catch(console.error);
        }
    },[router.isReady]);

    if (!author) return <h1>Loading...</h1>;

    return (
        <Layout>
            <p>Edit this author:</p>
            <Form 
                name = "Edit"
                action = {`/api/authors/${router.query.id}`}
                method = "put"
                fields = {{ name : "text" }}
                defaults={ author }
                cancellable
            />
        </Layout>
    );
}