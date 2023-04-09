import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "@/components/layout";
import styles from "@/styles/base.module.css";
import { useAppContext } from "@/utils/context";

export default function Dashboard() {
    const [authors, setAuthors] = useState([]);
    const { loggedUser } = useAppContext();

    useEffect(() => {
        axios.get("/api/authors")
            .then(res => setAuthors(res.data));
    }, []);

    const handleDelete = id => {
        axios.delete(`/api/authors/${ id }`)
            .then(_ => setAuthors(prev => prev.filter(author => author._id !== id)));
    };

    if (!authors) return <Layout home />

    return (
        <Layout home>
            <table className={ styles.table }>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>User who posted</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    { authors.map((author, i) => (
                        <tr key={ i }>
                            <td>{ author.name }</td>
                            <td>{ author.user.username }</td>
                            <td>
                            {
                                loggedUser._id === author.user._id ?
                                <>
                                    <Link className={ styles.button } href={ `/authors/${ author._id }/edit` }>Edit</Link>
                                    <button className={ styles.button } onClick={ () => handleDelete(author._id) }>Delete</button>
                                </> 
                                : 
                                <Link className={ styles.button } href={ `/authors/${ author._id }` }>View</Link>
                            }
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </Layout>
    );
}
