import axios from "axios";
import Form from "@/components/form";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Edit() {
    const router = useRouter();
    const [author, setAuthor] = useState();

    useEffect(() => {
        // need to check that the router has loaded the query params first
        if (router.isReady) {
            axios.get(`/api/authors/${ router.query.id }`)
                .then(res => setAuthor(res.data))
        }
    },[router.isReady]);

    if (!author) return <Layout />;

    return (
        <Layout>
            <p>Edit this author:</p>
            <Form 
                name="Edit"
                action={ `/api/authors/${ router.query.id }` }
                method="put"
                fields={{ name : "text" }}
                values={ author }
                cancellable
            />
        </Layout>
    );
}