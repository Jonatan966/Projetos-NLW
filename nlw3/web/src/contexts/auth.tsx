import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../Services/api';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    logIn(data: any): Promise<boolean>;
    loading: boolean;
    logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = localStorage.getItem('@HPPAuth:user');
            const storagedToken = localStorage.getItem('@HPPAuth:token');    

            if (storagedToken && storagedUser) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
            }
        }
        loadStorageData();

        setLoading(false);
    }, []);

    async function logIn(data: any) {
        try {
            const results = await api.post('/login', data);

            if (results.status === 200) {
                setUser(results.data.user);
    
                api.defaults.headers['Authorization'] = `Bearer ${results.data.token}`;
        
                localStorage.setItem('@HPPAuth:user', JSON.stringify(results.data.user));
                localStorage.setItem('@HPPAuth:token', results.data.token);
                
                return true;
            }
            throw "Erro";  
        }
        catch {
            return false;
        }
    }

    async function logOut() {
        localStorage.clear();

        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, logIn, loading, logOut}}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}