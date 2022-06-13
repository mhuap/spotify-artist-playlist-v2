import Head from "next/head";
import React from "react";

function HeadIcons({ title }) {
    return (
        <Head>
            <title>{title}</title>
            <meta
                name="description"
                content="Create a playlist of an artist's entire discography - with one click"
            />
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#D116A9" />
            <meta name="theme-color" content="#000000" />
        </Head>
    );
}

export default HeadIcons;
