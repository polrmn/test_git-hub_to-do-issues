import { useEffect } from "react"
import { useAppSelector } from "./reduxHooks";



const useLS = () =>{
    const repo = useAppSelector(state=>state.repo.repo)
    const issues = useAppSelector((state) => state.issues.issues);
    useEffect(()=>{
        if(repo.url !== null) {
            localStorage.setItem(repo.url, JSON.stringify({issues: issues, repo: repo}))
        }
// eslint-disable-next-line
},[issues])
}

export default useLS

