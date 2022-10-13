import { useContext } from "react"
import Web3Ctx from "../context/Web3Ctx"

export default function useWeb3Ctx() {
    const context = useContext(Web3Ctx);
    return context
}