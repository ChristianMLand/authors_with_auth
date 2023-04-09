import Link from 'next/link';
import styles from '@/styles/base.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAppContext } from '@/utils/context';
import { useEffect } from 'react';

export default function Layout({ children, home }) {
    const { loggedUser, setLoggedUser } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        if (!loggedUser) {
            axios.get("/api/auth")
                .then(res => setLoggedUser(res.data))
                .catch(console.error);
        }
    }, []);

    const handleClick = () => {
        axios.delete("/api/auth")
        .then(_ => router.push("/"))
    }

    if (!loggedUser) return <h1>Loading...</h1>;

    return (
        <main className={styles.layout}>
            <h1>Favorite Authors</h1>
            <p>Welcome { loggedUser.username }</p>
            <div>
                { home ? <Link className={styles.button} href="/authors/new">Add an Author</Link> : <Link className={styles.button} href="/authors">Home</Link> }
                <button className={styles.button} onClick={handleClick}>Logout</button>
            </div>
            { children }
        </main>
    )
}