import axios from "axios";
import Link from "next/link";
import styles from "@/styles/base.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Form({ name, action, fields, values, method="post", cancellable=false }) {
    const router = useRouter();
    const initialValues = values || Object.keys(fields).reduce((prev, field) => ({ ...prev, [field]: "" }), {});
    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        // clear previous errors
        setFormErrors({}); 
        axios[method](action, formData)
            .then(_ => router.push("/authors"))
            .catch(err => setFormErrors(err.response.data.errors));
        // clear form inputs
        setFormData(initialValues); 
    };

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={ handleSubmit } className={ styles.form }>
            { Object.entries(fields).map(([name, type], i) => ( // iterate over fields and generate inputs/errors for each
                <div key={ i }>
                    <input placeholder={ name } type={ type } name={ name } value={ formData[name] } onChange={ handleChange }/>
                    { formErrors && formErrors[name] && <p className={ styles.error }>{ formErrors[name].message }</p> }
                </div>
            ))}
            <div>
                { cancellable && <Link href="/authors" className={ styles.button }>Cancel</Link> }
                <button className={ styles.button }>{ name }</button>
            </div>
        </form>
    );
}