import Link from 'next/link';
import styles from '@/styles/base.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Layout({ children, home }) {
    const router = useRouter();
    const handleClick = () => {
        axios.delete("/api/auth")
            .then(_ => router.push("/"))
    }
    return (
        <main className={styles.layout}>
            <h1>Favorite Authors</h1>
            <div>
                { home ? <Link className={styles.button} href="/authors/new">Add an Author</Link> : <Link className={styles.button} href="/authors">Home</Link> }
                <button className={styles.button} onClick={handleClick}>Logout</button>
            </div>
            { children }
        </main>
    )
}