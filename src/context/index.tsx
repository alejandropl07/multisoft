'use client';
import React, { createContext, useState, useContext, useEffect, type Dispatch } from 'react';
import { User } from 'firebase/auth';
import { auth, getUserOwnPublic, saveUserPublic, uploadAvatar } from '@/src/firebase/firebase';
import { UserPublicData } from "@/src/types/UserPublicData";

interface UserContextProps {
    user: User | null;
    userPublicData: UserPublicData | null;
    loading: boolean;
    setLoading: Dispatch<boolean>;
    loadingPublicData: boolean;
    fetchUserPublicDataAsync: () => Promise<void>;
    uploadAvatarAsync: (uri: File) => Promise<void>;
    saveUserPublicDataAsync: (data: { [k: string]: FormDataEntryValue }) => Promise<void>;
}

export const UserContext = createContext<UserContextProps | undefined>({
    user: auth.currentUser,
    userPublicData: null,
    loading: true,
    setLoading: () => { },
    loadingPublicData: false,
    fetchUserPublicDataAsync: async () => { },
    uploadAvatarAsync: async (uri: File) => { },
    saveUserPublicDataAsync: async (data: { [k: string]: FormDataEntryValue }) => { },
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(auth.currentUser);
    const [userPublicData, setUserPublicData] = useState<UserPublicData | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingPublicData, setLoadingPublicData] = useState(false);

    const fetchUserPublicDataAsync = async () => {
        if (user) {
            setLoadingPublicData(true);

            try {
                const userPublicData = await getUserOwnPublic();
                setUserPublicData(userPublicData);
            } catch (error) {
                console.log(error)
                throw new Error(error)
            } finally {
                setLoadingPublicData(false);
            }

            console.log("fetchUserData", userPublicData)
        } else {
            setUserPublicData(null);
        }
    };
    const saveUserPublicDataAsync = async (data: { [k: string]: FormDataEntryValue }) => {
        setLoadingPublicData(true);

        try {
            await saveUserPublic({ ...data });
            setUserPublicData({ ...userPublicData, ...data })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        } finally {
            setLoadingPublicData(false);
        }
    }

    const uploadAvatarAsync = async (uri: File) => {
        try {
            const downloadURL = await uploadAvatar(uri)
            await saveUserPublic({ avatar: downloadURL })
            setUserPublicData({ ...userPublicData, avatar: downloadURL })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    useEffect(() => {
        const authUnsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log("onAuthStateChanged", user)
            setUser(user)
            // Same as fetchUserData
            if (user) {
                setLoadingPublicData(true);
                try {
                    const userPublicData = await getUserOwnPublic();
                    // @ts-ignore
                    Intercom('update', {
                        email: user?.email,
                        user_id: user?.uid,
                        name: user?.email,
                    });
                    setUserPublicData(userPublicData);
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoadingPublicData(false);
                }
            }
            setLoading(false);
        });
        return authUnsubscribe
    }, [])

    return (
        <UserContext.Provider value={{ user, userPublicData, loading, setLoading, loadingPublicData, fetchUserPublicDataAsync, saveUserPublicDataAsync, uploadAvatarAsync }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};