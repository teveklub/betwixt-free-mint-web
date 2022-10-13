export { getContract } from "./contract"
// export { zoomFetchTokenUris } from "./zoom2"

export const getTokenUri = async (tokenId, tokenUri) => {
    //console.log(tokenUri)
    const metadata = await fetch(tokenUri)// await fetch(`https://toddlerpillars-metadata-server.herokuapp.com/api/metadata/${tokenId % 100}/${tokenId}`)
        .then((res) => res.json())
        .catch((err) => console.error(err));
    if (metadata) {
        if (!metadata.tokenId) {
            metadata.tokenId = tokenId;
        }
        if (!metadata.id) {
            metadata.id = tokenId;
        }
        return metadata;
    } else
        // Fetching metadata fail, return an object anyway
        return {
            tokenId: tokenId,
            id: tokenId
        }
};
