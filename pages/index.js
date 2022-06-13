import Head from "next/head";
import { useSession, getProviders } from "next-auth/react";
import Search from "../components/search";
import HeadIcons from "../components/headIcons";

export default function Index(props) {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return (
        <>
            <HeadIcons title="Discograph" />
            {(!session && loading) ? <p>Loading...</p> : <Search />}    
        </>
    );
}
