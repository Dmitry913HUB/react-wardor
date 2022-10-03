import React, {useEffect, useState} from "react";
import {UserService} from "../UserService";

export const Inventory = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=" + UserService.authName+'&collection_name=wrdruniverse')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <h1 className="main-h top100">Error: {error.message}</h1>;
    } else if (!isLoaded) {
        return <h1 className="main-h top100">Loading...</h1>;
    } else {
        return (
            <div className="container-md">
                <h1 className="main-h top100">INVENTORY</h1>
                <h2 className="main-low-h">Your items in inventory</h2>
                <div id="itemsList" className="row justify-content-center">
                    {items.map(item => (
                        <div key={item.asset_id} id={`pack-${item.asset_id}`}
                             className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
                            <div className="text-center">
                                <div className="nft-name">{item.name}</div>
                                <div className="nft-mint-number">#{item.template_mint}</div>
                                {(typeof item.data.img == 'undefined')
                                    ? (<React.Fragment>
                                        <video data-tilt
                                               src={`https://wardorinventory.mypinata.cloud/ipfs/${item.data.video}`}
                                               className="js-tilt img-nft" autoPlay loop muted></video>
                                    </React.Fragment>)
                                    : (<React.Fragment><img alt="desc"
                                                            src={`https://wardorinventory.mypinata.cloud/ipfs/${item.data.img}`}
                                                            className="img-nft"></img></React.Fragment>)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row justify-content-center packResultModal"/>
            </div>
        );
    }
};
