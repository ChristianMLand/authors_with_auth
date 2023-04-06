import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/base.module.css";
import axios from "axios";

export default function Form({ name, action, fields, defaults, method="post", cancellable=false }) {
    const router = useRouter();
    const initialValues = defaults || Object.keys(fields).reduce((prev, field) => ({ ...prev, [field]: "" }), {});
    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        axios[method](action, formData)
            .then(_ => router.push("/authors")) // redirect to /authors route after succeeding
            .catch(err => setFormErrors(err.response.data.errors));
    }

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    }

    return (
        <form onSubmit={ handleSubmit } className={styles.form}>
            { Object.entries(fields).map(([name, type], i) => ( // iterate over fields and generate inputs/errors for each
                <div key={i}>
                    <input placeholder={name} type={type} name={name} value={formData[name]} onChange={handleChange}/>
                    { formErrors && formErrors[name] && <p className={styles.error}>{formErrors[name].message}</p> }
                </div>
            ))}
            <div>
                { cancellable && <Link href="/authors" className={styles.button}>Cancel</Link>}
                <button className={styles.button}>{name}</button>
            </div>
        </form>
    )
}