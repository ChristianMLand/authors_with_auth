import Form from "@/components/form";
import styles from "@/styles/base.module.css";

export default function LogReg() {
    return (
        <main className={ styles.main }>
            <Form 
                name="Register"
                action="/api/users"
                fields={{
                    username: "text",
                    email: "text",
                    password: "password",
                    confirmPassword: "password"
                }}
            />
            <Form 
                name="Login"
                action="/api/auth"
                fields={{
                    email: "text",
                    password: "password"
                }}
            />
        </main>
    );
}
