import Layout from "@/components/layout";
import Form from "@/components/form";

export default function New() {
    return (
        <Layout>
            <p>Create an Author:</p>
            <Form 
                name="Add"
                action="/api/authors"
                fields={{ name: "text" }}
                cancellable
            />
        </Layout>
    );
}