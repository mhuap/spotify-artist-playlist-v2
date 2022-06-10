import Head from "next/head";
import { useSession, getProviders } from "next-auth/react";
import Login from "../components/login";
import Search from "../components/search";

export default function Index(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    if (!session && loading) {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <Login providers={props.providers}/>;
    }
    return (
        <>
            <Head>
                <title>Discograph</title>
                <meta
                    name="description"
                    content="Create a playlist of an artist's entire discography - with one click"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Search />
            
        </>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    };
}