import { createContext, useContext, useEffect, useState } from "react";
import { getAuth} from 'firebase/auth';


const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userAuth =  getAuth().onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => {
            if(userAuth){
                userAuth();
            }
        }
    },[]);

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    );

    
}

export const useAuth = () => {
    return  useContext(AuthContext)
}