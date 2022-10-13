import useWeb3Ctx from './useWeb3Ctx';
import { useMemo } from 'react';
import { getContract } from '../utils/contract';

import { abi as ZOOM2_ABI } from '../utils/Zoom2.json';

import {
    ZOOM_2_ADDRESSES
} from '../utils/abi/constants/addresses';

// returns null on errors
export function useContract(
    addressOrAddressMap,
    ABI,
    withSignerIfPossible = true) {
    const { defaultProvider: deployedLibrary, ethersProvider: library, address: account, chainId, isCorrectNetwork, defaultChainId } = useWeb3Ctx();

    return useMemo(() => {
        if (!isCorrectNetwork && (!deployedLibrary || !defaultChainId)) return null
        if (isCorrectNetwork && (!addressOrAddressMap || !ABI || !library || !chainId)) return null
        let address
        if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
        else address = addressOrAddressMap[isCorrectNetwork ? chainId : defaultChainId]
        if (!address) return null
        let provider
        if (isCorrectNetwork) provider = library
        else provider = deployedLibrary
        try {
            return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account, deployedLibrary, isCorrectNetwork])
}


export function useZoom2Contract() {
    return useContract(ZOOM_2_ADDRESSES, ZOOM2_ABI, false)
}
/* export function useEcContract() {
    return useContract(EC_ADDRESSES, EC_ABI, false)
}
export function useGeneticatContract() {
    return useContract(GENETICATS_ADDRESSES, GENETICATS_ABI, true)
} */