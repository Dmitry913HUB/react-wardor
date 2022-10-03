import {compact} from "lodash";
import React, {useEffect, useState} from "react";
import {UserService} from "../UserService";

export const Craft = () => {

    const atomicAccountCraft = 'blenderizerx';
    let bronze_asset = 0;
    let silver_asset = 0;
    let gold_asset = 0;
    let ch_asset = 0;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=" + UserService.authName + "&collection_name=wrdruniverse")
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

    const handler = (asset_id, mint) => {
        ch_asset = asset_id
        document.getElementById("dropdownMenuButton1").innerText = 'Mint #' + mint
    }

    const handlerBronzePromoWarpass = (asset_id, mint) => {
        bronze_asset = asset_id
        document.getElementById("dropdown_warpass_bronze").innerText = 'Mint #' + mint
    }

    const handlerSilverPromoWarpass = (asset_id, mint) => {
        silver_asset = asset_id
        document.getElementById("dropdown_warpass_silver").innerText = 'Mint #' + mint
    }

    const handlerGoldPromoWarpass = (asset_id, mint) => {
        gold_asset = asset_id
        document.getElementById("dropdown_warpass_gold").innerText = 'Mint #' + mint
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function craftWarPass() {

        if ((bronze_asset === 0) || (silver_asset === 0) || (gold_asset === 0)) {
            //console.log('Choose all mints to craft');
            return;
        }

        try {

            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: "atomicassets",
                                name: "transfer",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    from: UserService.authName,
                                    to: atomicAccountCraft,
                                    asset_ids: [bronze_asset, silver_asset, gold_asset],
                                    memo: 327406,
                                },
                            },
                        ],
                    },
                    {
                        blocksBehind: 3,
                        expireSeconds: 30,
                    }
                )
                .then((response) => {
                    //console.log("Im here")
                    if (response.status === "executed") {
                        UserService.getBalance();
                        //console.log('Im in if')
                    }
                });

            document.querySelector(`#craft_warpass_button`).style = 'margin-top: 10px; background-color: #147a1a; border-color: #147a1a;';
            document.querySelector('#craft_warpass_button').setAttribute('disabled', true);

            await sleep(2000);
            // await getCraftWarPass();

            document.querySelector('#craft_warpass_button').removeAttribute('disabled');

            bronze_asset = 0;
            silver_asset = 0;
            gold_asset = 0;

        } catch (e) {
            //console.log('ERROR: ', e.message);
            alert(e.message);
        }
    }

    async function craftBronze() {

        if (ch_asset === 0) {
            //console.log('Choose mints to craft');
            return;
        }

        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: "atomicassets",
                                name: "transfer",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    from: UserService.authName,
                                    to: atomicAccountCraft,
                                    asset_ids: [ch_asset],
                                    memo: 316349,
                                },
                            },
                        ],
                    },
                    {
                        blocksBehind: 3,
                        expireSeconds: 30,
                    }
                )
                .then((response) => {
                    //console.log('Я до ифа тут стою тебе чего надо')
                    if (response.status === "executed") {
                        UserService.getBalance();
                        //console.log('Зашел в иф')
                    }
                });

            document.querySelector(`#craft_button_bronze`).style = 'margin-top: 10px; background-color: #147a1a; border-color: #147a1a;';
            document.querySelector('#craft_button_bronze').setAttribute('disabled', true);
            await sleep(2000);
            // await getCraftBronze();
            document.querySelector('#craft_button_bronze').removeAttribute('disabled');
            ch_asset = 0;

        } catch (e) {
            //console.log('Error in craftBronze', e.message);
            alert(e.message);
        }
    }

    if (error) {
        return <h1 className="main-h top100">Error: {error.message}</h1>;
    } else if (!isLoaded) {
        return <h1 className="main-h top100">Loading...</h1>;
    } else {
        return (
            <div className="container-md">
                <h1 className="main-h top100">CRAFT WARPASS</h1>
                <h2 className="main-low-h">Use your promo cards to create it</h2>
                <div className="row_craft">
                    <div className="craft__wr__div justify-content-end">
                        <div className="text-center">
                            <p className="promo__text">Promo Bronze</p>
                            <img alt="desc" src={require("../img/collection_line.png").default} className="line-promo"/>
                        </div>
                        <div className="indent">
                            <video src={require("../img/promo_bronze.mp4").default} loop autoPlay muted
                                   className="craft__wr__img bronze_video js-tilt"/>
                        </div>
                        <div className="center">
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        id="dropdown_warpass_bronze" data-bs-toggle="dropdown"
                                        aria-expanded="false">Choose a mint
                                </button>
                                <ul id="warpass_bronze_mint_list" className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1">
                                    {items.map(item => (
                                        (item.template.template_id === "316349")
                                            ? (<li>
                                                <button
                                                    onClick={() => handlerBronzePromoWarpass(item.asset_id, item.template_mint)}
                                                    className="dropdown-item">
                                                    Mint #{item.template_mint}
                                                </button>
                                            </li>) : ("")
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sum"><p>+</p></div>
                    <div className="craft__wr__div justify-content-end">
                        <div className="text-center">
                            <p className="promo__text">Promo Silver</p>
                            <img alt="desc" src={require("../img/collection_line.png").default} className="line-promo"/>
                        </div>
                        <div className="indent">
                            <video src={require("../img/promo_silver.mp4").default} loop autoPlay muted
                                   className="craft__wr__img silver_video js-tilt"/>
                        </div>
                        <div className="center">
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        id="dropdown_warpass_silver" data-bs-toggle="dropdown"
                                        aria-expanded="false">Choose a mint
                                </button>
                                <ul id="warpass_silver_mint_list" className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1">
                                    {items.map(item => (
                                        (item.template.template_id === "299425")
                                            ? (<li>
                                                <button
                                                    onClick={() => handlerSilverPromoWarpass(item.asset_id, item.template_mint)}
                                                    className="dropdown-item">
                                                    Mint #{item.template_mint}
                                                </button>
                                            </li>) : ("")
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="sum"><p>+</p></div>
                    <div className="craft__wr__div justify-content-end">
                        <div className="text-center">
                            <p className="promo__text">Promo Gold</p>
                            <img alt="desc" src={require("../img/collection_line.png").default} className="line-promo"/>
                        </div>
                        <div className="indent">
                            <video src={require("../img/promo_gold.mp4").default} loop autoPlay muted
                                   className="craft__wr__img gold_video js-tilt"/>
                        </div>
                        <div className="center">
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        id="dropdown_warpass_gold" data-bs-toggle="dropdown"
                                        aria-expanded="false">Choose a mint
                                </button>
                                <ul id="warpass_gold_mint_list" className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1">
                                    {items.map(item => (
                                        (item.template.template_id === "315833")
                                            ? (<li>
                                                <button
                                                    onClick={() => handlerGoldPromoWarpass(item.asset_id, item.template_mint)}
                                                    className="dropdown-item">
                                                    Mint #{item.template_mint}
                                                </button>
                                            </li>) : ("")
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="craft__wr__arrow">
                        <div className="center rotate90">
                            <img alt="desc" src={require("../img/Arrow_Craft.png").default} className="img__craft"/>
                        </div>
                    </div>
                    <div className="craft__wr__div_fool">
                        <div className="text-center">
                            <p className="promo__text">WarPass</p>
                            <img alt="desc" src={require("../img/collection_line.png").default} className="line-promo"/>
                        </div>
                        <div className="indent">
                            <img alt="desc" src={require("../img/warpass.png").default}
                                 className="craft__wr__img__result"/>
                        </div>
                        <div className="center">
                            <a className="nav-link2">
                                <button onClick={craftWarPass} id="craft_warpass_button"
                                        className="btn btn-primary">CRAFT
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <h1 className="main-h ptop100">CRAFT NEW BRONZE PROMO</h1>
                <h2 className="main-low-h">Change the bug card to a nice one</h2>
                <div className="row_craft pbot350">
                    <div className="fool justify-content-end">
                        <div className="text-center">
                            <p className="promo__text">Wardor Promo Bronze</p>
                            <img alt="desc" src={require("../img/collection_line.png").default} className="line-promo"/>
                        </div>
                        <div className="indent">
                            <img alt="desc" id="img_bug" data-tilt src={require("../img/bugbronze.gif").default}
                                 className="new__promo_video js-tilt"/>
                        </div>
                        <div className="center">
                            <div className="dropdown">
                                <button className="btn btn-primary dropdown-toggle" type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    Choose a mint
                                </button>
                                <ul id="bronze_mint_list" className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1">
                                    {items.map(item => (
                                        (item.template.template_id === "286408")
                                            ? (<li>
                                                <button onClick={() => handler(item.asset_id, item.template_mint)}
                                                        className="dropdown-item">
                                                    Mint #{item.template_mint}
                                                </button>
                                            </li>) : ("")
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="craft__wr__arrow">
                        <div className="indent rotate90">
                            <img alt="desc" src={require("../img/Arrow_Craft.png").default} className="img__craft"/>
                        </div>
                    </div>
                    <div className="fool">
                        <div className="text-center">
                            <p className="promo__text">Wardor Promo Bronze</p>
                            <img alt="desc" src={require("../img/collection_line.png").default} className="line-promo"/>
                        </div>
                        <div className="indent">
                            <video src={require("../img/promo_bronze.mp4").default} loop autoPlay muted
                                   className="new__promo_video js-tilt"/>
                        </div>
                        <div className="center indent_on">
                            <a className="nav-link2">
                                <button onClick={craftBronze} id="craft_button_bronze" className="btn btn-primary"
                                >CRAFT
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
