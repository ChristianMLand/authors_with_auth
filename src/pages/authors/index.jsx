import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '@/components/layout';
import styles from '@/styles/base.module.css';

export default function Dashboard() {
    const [authors, setAuthors] = useState([]);
    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
        axios.get('/api/authors')
            .then(res => setAuthors(res.data));
        axios.get('/api/auth') // get logged in user from session
            .then(res => setLoggedUser(res.data))
    }, []);

    const handleDelete = id => {
        axios.delete(`/api/authors/${id}`)
            .then(_ => setAuthors(prev => prev.filter(author => author._id !== id)))
    }

    if (!loggedUser || !authors) return <h1>Loading...</h1>;

    return (
        <Layout home>
            <p>Welcome {loggedUser.username}!</p>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>User who posted</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, i) => (
                        <tr key={i}>
                            <td>{author.name}</td>
                            <td>{author.user.username}</td>
                            <td>
                            {
                                loggedUser._id === author.user._id ? // only show links to edit/delete if logged-in user created the author
                                <>
                                    <Link className={styles.button} href={`/authors/${author._id}/edit`}>Edit</Link>
                                    <button className={styles.button} onClick={() => handleDelete(author._id)}>Delete</button>
                                </> : <Link className={styles.button} href={`/authors/${author._id}`}>View</Link> // show view link otherwise
                            }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}
