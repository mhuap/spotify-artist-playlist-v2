import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import spotifyApi from '../lib/spotify';

function useSpotify() {
    const { data: session, status } = useSession()
    
    useEffect(() => {
        if (session) {
            if (session.error === "RefreshAccessTokenError"){
                signIn();
            }

            spotifyApi.setAccessToken(session.accessToken);
            spotifyApi.setRefreshToken(session.refreshToken);
        }
        
    }, [session])

    return spotifyApi
}

export default useSpotify