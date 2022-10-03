import React, {useEffect, useState} from "react";
import {UserService} from "../UserService";

const contract_address = "wrdrstake.gm";
const token_contract_address = "newtokencode";
const claim = "claim";
const warpool = "warpoolll";
const freepool = "freeepooll";
const warpoollwl = "freeepoollwl";
let pool_name = warpool;
let amount_claim = 0;
let amount_claim_freepool = 0;
let amount_claim_warpool = 0;

// TESTNET
// const warpass_temp = ["279145"];
// const common_temp = ["279153"];
// const uncommon_temp = ["279152"];
// const rare_temp = ["279151"];
// const mythic_temp = ["279150"];
// const legendary_temp = ["279149"];
// const ticket_temp = ["279148", "279146", "279147"];
// const first_ticket_temp = ["279148"];
// const second_ticket_temp = ["279146"];
// const third_ticket_temp = ["279147"];
// const all = ["279145", "279148", "279146", "279147", "279153", "279152", "279151", "279150", "279149"];
// let all_temp = ["279145", "279148", "279146", "279147", "279153", "279152", "279151", "279150", "279149"];
// let little = ["279145"];

//MAINNET
const warpass_temp = ["327406"];
const common_temp = ["279153"];
const uncommon_temp = ["279152"];
const rare_temp = ["279151"];
const mythic_temp = ["279150"];
const legendary_temp = ["279149"];
const ticket_temp = ["326604", "279146", "279147"];
const first_ticket_temp = ["279148"];
const second_ticket_temp = ["279146"];
const third_ticket_temp = ["279147"];
const all = ["327406", "326604"];
let all_temp = ["327406", "326604"];
let little = ["279145"];


//real templait (v, h, d, k)
const legendary_temp_all = ["344984", "344989", "344983", "344988"];
const mythic_temp_all = ["344969", "344967", "344979", "344978", "344973", "344971", "344977", "344975"];
const rare_temp_all = ["344923", "344921", "344919", "344960", "344959", "344958", "344936", "344933", "344930", "344956", "344954", "344951"];
const uncommon_temp_all = ["344861", "344864", "344865", "344867", "344885", "344888", "344889", "344890", "344869", "344872", "344873", "344874", "344879", "344881", "344882", "344883"];
const common_temp_all = ["344758", "344767", "344771", "344774", "344775", "344828", "344829", "344830", "344832", "344834", "344776", "344817", "344819", "344820", "344818", "344821", "344822", "344823", "344824", "344826"];
const ticket_temp_all = ["326604", "326605", "326606"];
const warpass_temp_main = ["327406"];
const Vampires_temp = [];
const Humans_temp = [];
const Demons_temp = [];
const Cyborgs_temp = [];

let weightTicketOne = 0;
let weightTicketTwo = 0;
let weightTicketThree = 0;

const ItemFromInventory = () => {
    const [conditionInventory, setConditionInventory] = useState(0);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemsStake, setItemsStake] = useState([]);

    useEffect(() => {
        fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=" + UserService.authName + "&schema_name=testtest&schema_name=heroes")
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    setItemsStake(result.data);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
    }, [conditionInventory])

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function removeAssetId(asset_id) {
        var res = []
        for (let i of itemsStake) {
            if (i.asset_id != asset_id) {
                res.push(i)
            }
        }
        setItemsStake(res)
        console.log()
    }

    async function update() {

        fetch("https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=" + UserService.authName + "&schema_name=testtest&schema_name=heroes")
            .then(res => {
                return res.json()
            })
            .then(
                (result) => {
                    console.log(result.data)
                    setItemsStake(result.data);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
    }

    async function SendActionTransfer(asset_id) {

        console.log("asset id: " + asset_id)
        console.log("pool name: " + pool_name)

        if ((asset_id === 0) || (pool_name === "")) {
            console.log('Error in SendActionTransfer');
            return;
        }

        //try {
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
                                to: contract_address,
                                asset_ids: [asset_id],
                                memo: pool_name,
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
                if (response.status === "executed") {
                    removeAssetId(asset_id)
                    setTimeout(() => {
                        // setConditionInventory(conditionInventory + Math.random())
                        update();
                    }, 15000);
                }
            })

        // } catch (e) {
        //     console.log('ERROR: ', e.message);
        //     alert(e.message);
        // }
    }

    return {itemsStake}["itemsStake"].map((itemStake) => {
        for (let i = 0; i < all_temp.length; i++) {
            if (itemStake['template'] != null) {
                if (itemStake['template']['template_id'] === all_temp[i]) {
                    return (
                        <div key={itemStake['asset_id']} id={`pack-${itemStake['asset_id']}`}
                             className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 ptop50">
                            <div className="text-center">
                                <div className="nft-name">{itemStake['name']}</div>
                                <div className="nft-mint-number">#{itemStake["template_mint"]}</div>
                                {(typeof itemStake["data"]["img"] == 'undefined')
                                    ? (<React.Fragment>
                                        <video data-tilt
                                               src={`https://wardorinventory.mypinata.cloud/ipfs/${itemStake['data']['video']}`}
                                               className="js-tilt img-nft" autoPlay loop muted></video>
                                    </React.Fragment>)
                                    : (<React.Fragment><img alt="desc"
                                                            src={`https://wardorinventory.mypinata.cloud/ipfs/${itemStake['data']['img']}`}
                                                            className="img-nft"></img></React.Fragment>)}
                            </div>
                            <div className="center top10">
                                <button onClick={() => SendActionTransfer(itemStake['asset_id'])}
                                        className="btn btn-primary btn__claim">STAKE
                                </button>
                            </div>
                        </div>
                    )
                }
            }
        }
    })
}

export const Staking = () => {

    const [balance, setBalance] = useState([]);
    const [errorBalance, setErrorBalance] = useState(null);
    const [isLoadedBalance, setIsLoadedBalance] = useState(false);

    const [table, setTable] = useState([]);
    const [errorTable, setErrorTable] = useState(null);
    const [isLoadedTable, setIsLoadedTable] = useState(false);

    const [tableStaked, setTableStaked] = useState([]);
    const [errorTableStaked, setErrorTableStaked] = useState(null);
    const [isLoadedTableStaked, setIsLoadedTableStaked] = useState(false);

    const [condition, setCondition] = useState(0);
    const [conditionUnstake, setConditionUnstake] = useState(0);
    const [conditionAll, setConditionAll] = useState(0);
    const [conditionWeight, setConditionWeight] = useState(0);

    const [conditionWlFree, setConditionWlFree] = useState(0);

    const [conditionClaim, setConditionClaim] = useState(0);

    const [test, setTest] = useState(0);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    // async function reloadBalance () {
    //
    // }
    let oks = true;
    useEffect(() => {
        fetch("https://wax.blokcrafters.io/v2/state/get_tokens?account=" + UserService.authName,)
            .then(res => {
                if (res.ok === false)
                    oks = false
                return res.json()
            })
            .then(
                (result) => {
                    setBalance(result);
                    setIsLoadedBalance(true);
                    if (oks) {
                        if (document.querySelector("#wax_balance")) {
                            for (let i = 0; i < result.tokens.length; i++) {
                                if (result.tokens[i].symbol === "WAX") {
                                    document.querySelector("#wax_balance").innerText = result.tokens[i].amount + " " + result.tokens[i].symbol;
                                }
                                if (result.tokens[i].symbol === "NWTKN") {
                                    document.querySelector("#token_balance").innerText = result.tokens[i].amount + " " + result.tokens[i].symbol;
                                }
                            }
                        }
                    }
                },
                (error) => {
                    setErrorBalance(error);
                    setIsLoadedBalance(true);
                }
            )
    }, [conditionClaim])

    async function Refresh() {
        reloadWeight()
        reloadStakedWarpass()
    }

    async function SendActionUnstake(asset_id) {
        if ((asset_id === 0)) {
            console.log('Error in SendActionUnstake');
            return;
        }

        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: contract_address,
                                name: "unstake",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    authorized_account: UserService.authName,
                                    from: UserService.authName,
                                    assetId: asset_id,
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
                    console.log("Im here")

                    if (response.status === "executed") {
                        // UserService.getBalance();
                        console.log('Im in if')
                    }
                })

            await sleep(20000);
            setConditionUnstake(conditionUnstake + Math.random())
            console.log("Unstake: " + conditionUnstake)
            setConditionAll(conditionAll + Math.random())
            console.log("All: " + conditionAll)

        } catch (e) {
            console.log('ERROR: ', e.message);
            alert(e.message);
        }

    }

    async function ClaimAction(pool) {
        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: contract_address,
                                name: "claim",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    authorized_account: UserService.authName,
                                    from: UserService.authName,
                                    amount: amount_claim,
                                    pool: pool,
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
                    if (response.status === "executed") {
                        setTimeout(() => {
                            setConditionClaim(conditionClaim + Math.random())
                        }, 3000);
                    }
                });

        } catch (e) {
            console.log('ERROR: ', e.message);
            alert(e.message);
        }
        amount_claim = 0;
    }

    async function SendActionTransferToken(amount) {
        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: token_contract_address,
                                name: "transfer",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    from: UserService.authName,
                                    to: contract_address,
                                    quantity: amount + ".00000000 NWTKN",
                                    memo: ""
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
                    if (response.status === "executed") {
                        setTimeout(() => {
                            setConditionClaim(conditionClaim + Math.random())
                        }, 3000);
                    }
                });

        } catch (e) {
            console.log('ERROR: ', e.message);
            alert(e.message);
        }
    }

    async function reloadWeight() {
        console.log("reloadWeight")
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/plain;charset=UTF-8',
                'Host': 'wax.greymass.com',
                'Referer': 'http://wardortest.com/',
                'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5'
            },
            cache: 'no-cache',
            body: JSON.stringify({
                json: true,
                code: contract_address,
                scope: contract_address,
                table: "allpooll",
                limit: "3",
                index_position: 1,
            })
        };
        let ok = true;
        fetch("https://wax.greymass.com/v1/chain/get_table_rows", requestOptions)
            .then(ress => {
                if (ress.ok === false)
                    ok = false
                return ress.json()
            })
            .then(
                (result) => {
                    setIsLoadedTable(true);
                    setTable(result.rows);
                    console.log(result)
                    if (ok) {
                        for (let i = 0; i < result.rows.length; i++) {
                            if (result.rows[i].poolNameInallpooll == warpool) {
                                //document.getElementById("ind1").innerText = `Warpool balance: ${result.rows[i].poolBalance} WDCoins`;

                                for (let k = 0; k < result.rows[i].rarities.length; k++) {
                                    if (result.rows[i].rarities[k].rarity === "common") {
                                        document.getElementById("common_weight").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "uncommon") {
                                        document.getElementById("uncommon_weight").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "rare") {
                                        document.getElementById("rare_weight").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "mythic") {
                                        document.getElementById("mythical_weight").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "legendary") {
                                        document.getElementById("legendary_weight").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "ticketone") {
                                        weightTicketOne = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "tickettwo") {
                                        weightTicketTwo = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "ticketthree") {
                                        weightTicketThree = result.rows[i].rarities[k].weight;
                                    }
                                }
                            }
                            if (result.rows[i].poolNameInallpooll == freepool) {
                                //document.getElementById("ind2").innerText = `FreePool balance: ${result.rows[i].poolBalance} WDCoins`;

                                for (let k = 0; k < result.rows[i].rarities.length; k++) {
                                    if (result.rows[i].rarities[k].rarity === "common") {
                                        document.getElementById("common_weight_f").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "uncommon") {
                                        document.getElementById("uncommon_weight_f").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "rare") {
                                        document.getElementById("rare_weight_f").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "mythic") {
                                        document.getElementById("mythical_weight_f").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "legendary") {
                                        document.getElementById("legendary_weight_f").innerText = result.rows[i].rarities[k].weight;
                                    }
                                    if (result.rows[i].rarities[k].rarity === "ticketone" || result.rows[i].rarities[k].rarity === "tickettwo" || result.rows[i].rarities[k].rarity === "ticketthree") {
                                        document.getElementById("ticket_weight_f").innerText = 0;
                                    }
                                }
                            }
                        }
                    }
                },
                (error) => {
                    setIsLoadedTable(true);
                    setErrorTable(error);
                }
            )
    }

    // useEffect(() => {
    //
    // }, [conditionWeight])

    useEffect(() => {
        const requestOptionsStakedFree = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/plain;charset=UTF-8',
                'Host': 'wax.greymass.com',
                'Referer': 'http://wardortest.com/',
                'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5'
            },
            cache: 'no-cache',
            body: JSON.stringify({
                json: true,
                code: contract_address,
                scope: contract_address,
                table: freepool,
                lower_bound: UserService.authName,
                index_position: 1,
                limit: "1",
            })
        };
        let ok = true;
        fetch("https://wax.greymass.com/v1/chain/get_table_rows", requestOptionsStakedFree)
            .then(res => {
                if (ress.ok === false)
                    ok = false
                return res.json()
            })
            .then(
                (result) => {
                    setIsLoadedTableStaked(true);
                    setTableStaked(result.rows);
                    console.log(result.rows);
                    if (ok) {
                        if (result.rows.length > 0) {

                            amount_claim_freepool = result.rows[0].tokenstoclaim;

                            for (let i = 0; i < result.rows[0].assetscount.length; i++) {
                                if (result.rows[0].assetscount[i].rarity === "common") {
                                    if (result.rows[0].assetscount[i].count === 0) {
                                        document.getElementById("common_staked_free").setAttribute("style", "-webkit-filter: grayscale(100%); filter: grayscale(100%);");
                                    }
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("common_staked_free").setAttribute("style", "-webkit-filter: grayscale(0%); filter: grayscale(0%);");
                                        document.getElementById("common_staked_free_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "uncommon") {
                                    if (result.rows[0].assetscount[i].count === 0) {
                                        document.getElementById("uncommon_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                                    }
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("uncommon_staked_free_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "rare") {
                                    if (result.rows[0].assetscount[i].count === 0) {
                                        document.getElementById("rare_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                                    }
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("rare_staked_free_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "mythical") {
                                    if (result.rows[0].assetscount[i].count === 0) {
                                        document.getElementById("mythical_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                                    }
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("mythical_staked_free_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "legendary") {
                                    if (result.rows[0].assetscount[i].count === 0) {
                                        document.getElementById("legendary_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                                    }
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("legendary_staked_free_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                            }
                        }
                        // if (result.rows.length === 0) {
                        //     document.getElementById("common_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                        //     document.getElementById("uncommon_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                        //     document.getElementById("rare_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                        //     document.getElementById("mythical_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                        //     document.getElementById("legendary_staked_free").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                        // }
                    }
                },
                (error) => {
                    setIsLoadedTableStaked(true);
                    setErrorTableStaked(error);
                }
            )
    }, [])

    async function reloadStakedWarpass() {
        console.log("reloadStakedWarpass")
        const requestOptionsStakedWarpass = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/plain;charset=UTF-8',
                'Host': 'wax.greymass.com',
                'Referer': 'http://wardortest.com/',
                'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5'
            },
            cache: 'no-cache',
            body: JSON.stringify({
                json: true,
                code: contract_address,
                scope: contract_address,
                table: warpool,
                lower_bound: UserService.authName,
                index_position: 1,
                limit: 1,
            })
        };
        let ok = true
        fetch("https://wax.greymass.com/v1/chain/get_table_rows", requestOptionsStakedWarpass)
            .then(res => {
                if (res.ok === false)
                    ok = false
                return res.json()
            })
            .then(
                (result) => {
                    setIsLoadedTableStaked(true);
                    setTableStaked(result.rows);

                    document.getElementById("warpass_staked_warpass").setAttribute("style", "-webkit-filter: grayscale(100%); filter: grayscale(100%);");
                    document.getElementById("common_staked_warpass").setAttribute("style", "-webkit-filter: grayscale(100%); filter: grayscale(100%);");
                    document.getElementById("uncommon_staked_warpass").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                    document.getElementById("rare_staked_warpass").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                    document.getElementById("mythical_staked_warpass").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                    document.getElementById("legendary_staked_warpass").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                    document.getElementById("ticket_staked_warpass").style = "-webkit-filter: grayscale(100%); filter: grayscale(100%);";
                    console.log(ok + " wat")
                    if (ok) {
                        if (result.rows.length > 0) {

                            amount_claim_warpool = result.rows[0].tokenstoclaim;
                            amount_claim = amount_claim_warpool;


                            for (let i = 0; i < result.rows[0].assetscount.length; i++) {
                                if (result.rows[0].assetscount[i].rarity === "warpass") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("warpass_staked_warpass").setAttribute("style", "-webkit-filter: grayscale(0%); filter: grayscale(0%);");
                                        document.getElementById("warpass_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "common") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("common_staked_warpass").setAttribute("style", "-webkit-filter: grayscale(0%); filter: grayscale(0%);");
                                        document.getElementById("common_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "uncommon") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("uncommon_staked_warpass").style = "-webkit-filter: grayscale(0%); filter: grayscale(0%);";
                                        document.getElementById("uncommon_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "rare") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("rare_staked_warpass").style = "-webkit-filter: grayscale(0%); filter: grayscale(0%);";
                                        document.getElementById("rare_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)

                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "mythical") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("mythical_staked_warpass").style = "-webkit-filter: grayscale(0%); filter: grayscale(0%);";
                                        document.getElementById("mythical_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "legendary") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("legendary_staked_warpass").style = "-webkit-filter: grayscale(0%); filter: grayscale(0%);";
                                        document.getElementById("legendary_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "ticketone") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("ticket_staked_warpass").style = "-webkit-filter: grayscale(0%); filter: grayscale(0%);";
                                        document.getElementById("ticket_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                        document.getElementById("ticket_staked_warpass").src = require("../img/png-1-ticket.png").default;
                                        document.getElementById("ticket_weight").innerText = weightTicketOne;
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "tickettwo") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("ticket_staked_warpass").style = "-webkit-filter: grayscale(0%); filter: grayscale(0%);";
                                        document.getElementById("ticket_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                        document.getElementById("ticket_staked_warpass").src = require("../img/png-2-ticket.png").default;
                                        document.getElementById("ticket_weight").innerText = weightTicketTwo;
                                    }
                                }
                                if (result.rows[0].assetscount[i].rarity === "ticketthree") {
                                    if (result.rows[0].assetscount[i].count === 1) {
                                        document.getElementById("ticket_staked_warpass").style = "-webkit-filter: grayscale(0%); filter: grayscale(0%);";
                                        document.getElementById("ticket_staked_warpass_button").addEventListener("click", function () {
                                            SendActionUnstake(result.rows[0].assetscount[i].assetId)
                                        });
                                        document.getElementById("ticket_staked_warpass").src = require("../img/png-3-ticket.png").default;
                                        document.getElementById("ticket_weight").innerText = weightTicketThree;
                                    }
                                }
                            }
                        }
                    }
                },
                (error) => {
                    setIsLoadedTableStaked(true);
                    setErrorTableStaked(error);
                }
            )
    }

    // useEffect(() => {
    //
    // }, [conditionUnstake])


    useEffect(() => {
        const requestOptionsUserWhiteListFree = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/plain;charset=UTF-8',
                'Host': 'wax.greymass.com',
                'Referer': 'http://wardortest.com/',
                'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5'
            },
            cache: 'no-cache',
            body: JSON.stringify({
                json: true,
                code: contract_address,
                scope: contract_address,
                table: warpoollwl,
                lower_bound: UserService.authName,
                upper_bound: null,
                index_position: 1,
                key_type: "",
                limit: "1",
                reverse: false,
                show_payer: false
            })
        };
        let ok = true
        fetch("https://wax.greymass.com/v1/chain/get_table_rows", requestOptionsUserWhiteListFree)
            .then(res => {
                if (ress.ok === false)
                    ok = false
                return res.json()
            })
            .then(
                (result) => {
                    setIsLoadedTableStaked(true);
                    setTableStaked(result.rows);
                    if (ok) {
                        if (result.rows.length > 0) {
                            document.querySelector(`.block_purchase`).setAttribute("style", "display:none;");
                        }
                        if (result.rows.length === 0) {
                            document.querySelector(`.block_purchase`).setAttribute("style", "display:flex;");
                        }
                    }
                },
                (error) => {
                    setIsLoadedTableStaked(true);
                    setErrorTableStaked(error);
                }
            )
    }, [conditionWlFree])

    async function RarityAll() {
        all_temp = all;
        setCondition(condition + Math.random())
    }

    async function RarityWarpass() {
        all_temp = warpass_temp;
        setCondition(condition + Math.random())
    }

    async function RarityTicket() {
        all_temp = ticket_temp;
        setCondition(condition + Math.random())
    }

    async function RarityLegendary() {
        all_temp = legendary_temp;
        setCondition(condition + Math.random())
    }

    async function RarityMythical() {
        all_temp = mythic_temp;
        setCondition(condition + Math.random())
    }

    async function RarityRare() {
        all_temp = rare_temp;
        setCondition(condition + Math.random())
    }

    async function RarityUncommon() {
        all_temp = uncommon_temp;
        setCondition(condition + Math.random())
    }

    async function RarityCommon() {
        all_temp = common_temp;
        setCondition(condition + Math.random())
    }

    async function RaceVampires() {
        all_temp = common_temp;
        setCondition(condition + Math.random())
    }

    async function RaceHumans() {
        all_temp = common_temp;
        setCondition(condition + Math.random())
    }

    async function RaceDemons() {
        all_temp = common_temp;
        setCondition(condition + Math.random())
    }

    async function RaceCyborgs() {
        all_temp = common_temp;
        setCondition(condition + Math.random())
    }

    async function WarpassClick() {

        amount_claim = amount_claim_warpool;
        pool_name = warpool;
        document.querySelector('#ind1').setAttribute("style", "display:block;");
        document.querySelector('#ind2').setAttribute("style", "display:none;");
        document.querySelector('#free_pool').setAttribute("style", "display:none;");
        document.querySelector('#warpas_pool').setAttribute("style", "display:block;");
        document.querySelector('#Warpass').setAttribute("style", "transform: scale(1.2); opacity: 1;");
        document.querySelector('#Free').setAttribute("style", " opacity: .4;");

        setCondition(condition + Math.random())
    }

    async function FreeClick() {

        pool_name = freepool;
        amount_claim = amount_claim_freepool;
        document.querySelector('#ind2').setAttribute("style", "display:block;");
        document.querySelector('#ind1').setAttribute("style", "display:none;");
        document.querySelector('#warpas_pool').setAttribute("style", "display:none;");
        document.querySelector('#free_pool').setAttribute("style", "display:block;");
        document.querySelector('#Free').setAttribute("style", "transform: scale(1.2); opacity: 1;");
        document.querySelector('#Warpass').setAttribute("style", " opacity: .4;");

        setCondition(condition + Math.random())
        setConditionWlFree(conditionWlFree + Math.random())
    }

    async function AllClick() {
        setTest(test + Math.random())
        setConditionAll(conditionAll + Math.random())

        document.querySelector('#staked_card').setAttribute("style", "display:none;");
        document.querySelector('#all_card').setAttribute("style", "display:block;");
        document.querySelector('#Stake').setAttribute("style", "opacity: 0.4;");
        document.querySelector('#All').setAttribute("style", "opacity: 1;");
    }

    async function StakeClick() {

        reloadWeight();
        reloadStakedWarpass();

        setConditionWeight(conditionWeight + Math.random())
        setConditionUnstake(conditionUnstake + Math.random())

        document.querySelector('#staked_card').setAttribute("style", "display:block;");
        document.querySelector('#all_card').setAttribute("style", "display:none;");
        document.querySelector('#Stake').setAttribute("style", "opacity: 1;");
        document.querySelector('#All').setAttribute("style", "opacity: 0.4;");
    }

    if (false) {
        return <h1 className="main-h top100">Loading...</h1>;
    }

    if (true) {
        return (
            <div className="container-fluid noOverflow">
                <div className="row">
                    <div className="roww inline">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 center">
                            <div className="row_pool">
                                <div className="indicators">
                                    <div>User balance:</div>
                                    <div id="wax_balance"></div>
                                    <div id="token_balance"></div>
                                    <div id="ind1"></div>
                                    <div id="ind2"></div>
                                    <div id="tokentoclaim">Token to claim: {amount_claim} <img
                                        src={require("../img/wd.png").default} className="img__wd"></img></div>
                                </div>
                                <div className="row_pool ptop20">
                                    <button onClick={() => ClaimAction(pool_name)}
                                            className="btn btn-primary btn__claim">CLAIM
                                    </button>
                                    <button onClick={() => Refresh()}
                                            className="btn btn-primary btn__claim">REFRESH
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 center">
                            <div className="row_pool">
                                <div className="box">
                                    <div className="indent">
                                        <img id="Warpass" onClick={WarpassClick}
                                             src={require("../img/waspass.png").default}
                                             className="pool__img"></img>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="indent">
                                        <img id="Free" onClick={FreeClick} src={require("../img/Frame.png").default}
                                             className="pool__img"></img>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="indent">
                                        <img id="?" src={require("../img/qwest.png").default}
                                             className="pool__img"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="roww inline">
                        <div className="col-6 inline left paddingL">
                            <div className="stake__text"><a id="Stake" onClick={StakeClick}>Staked cards</a></div>
                            <div className="stake__text"><a id="All" onClick={AllClick}>All cards</a></div>
                        </div>
                        <div className="col-6 inline right paddingR">
                            <div className="stake__text">Sort by:</div>
                            <div id="Rarity" className="stake__text dropdown">
                                <a className="dropbtn">Rarity</a>
                                <div className="dropdown-content left">
                                    <a onClick={RarityAll}>All</a>
                                    <a onClick={RarityWarpass}>Warpass</a>
                                    <a onClick={RarityTicket}>Ticket</a>
                                    <a onClick={RarityLegendary}>Legendary</a>
                                    <a onClick={RarityMythical}>Mythical</a>
                                    <a onClick={RarityRare}>Rare</a>
                                    <a onClick={RarityUncommon}>Uncommon</a>
                                    <a onClick={RarityCommon}>Common</a>
                                </div>
                            </div>
                            <div id="Income" className="stake__text dropdown">
                                <a className="dropbtn">Income</a>
                                <div className="dropdown-content left">
                                    <a onClick="">Descending</a>
                                    <a onClick="">Ascending</a>
                                </div>
                            </div>
                            <div id="Race" className="stake__text dropdown">
                                <a className="dropbtn">Race</a>
                                <div className="dropdown-content left">
                                    <a onClick={RarityAll}>All</a>
                                    <a onClick={RaceVampires}>Vampires</a>
                                    <a onClick={RaceHumans}>Humans</a>
                                    <a onClick={RaceDemons}>Demons</a>
                                    <a onClick={RaceCyborgs}>Cyborgs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={require("../img/collection_line.png").default} className="row__inline"></img>
                </div>
                <div className="scroll">
                    <div id="staked_card">
                        <div id="warpas_pool">
                            <div className="block__warpass justify-content-center">
                                <div className="box">
                                    <div className="center">
                                        <img src={require("../img/warpass.png").default}
                                             className="stake__nft" id="warpass_staked_warpass"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="warpass_staked_warpass_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="roww pbot100">
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="common_weight">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Common-back.png").default}
                                             className="stake__nft" id="common_staked_warpass"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="common_staked_warpass_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="uncommon_weight">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Unсommon-back.png").default}
                                             className="stake__nft" id="uncommon_staked_warpass"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="uncommon_staked_warpass_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="rare_weight">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Rare-back.png").default}
                                             className="stake__nft" id="rare_staked_warpass"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="rare_staked_warpass_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="mythical_weight">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Mythical-back.png").default}
                                             className="stake__nft" id="mythical_staked_warpass"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="mythical_staked_warpass_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="legendary_weight">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Legendary-back.png").default}
                                             className="stake__nft" id="legendary_staked_warpass"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="legendary_staked_warpass_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="ticket_weight">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/png-3-ticket.png").default}
                                             className="stake__nft" id="ticket_staked_warpass"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="ticket_staked_warpass_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="free_pool">
                            <div className="center ptop50">
                                <div className="block_purchase center">
                                    <div className="ind cetner">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>2000 NWTKN
                                    </div>
                                    <div className="center">
                                        <button onClick={() => SendActionTransferToken(2000)}
                                                className="btn btn-primary btn__claim">BUY
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="roww pbot100">
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="common_weight_f">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Common-back.png").default}
                                             className="stake__nft" id="common_staked_free"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="common_staked_free_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="uncommon_weight_f">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Unсommon-back.png").default}
                                             className="stake__nft" id="uncommon_staked_free"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="uncommon_staked_free_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="rare_weight_f">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Rare-back.png").default}
                                             className="stake__nft" id="rare_staked_free"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="rare_staked_free_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="mythical_weight_f">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Mythical-back.png").default}
                                             className="stake__nft" id="mythical_staked_free"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="mythical_staked_free_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="legendary_weight_f">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Legendary-back.png").default}
                                             className="stake__nft" id="legendary_staked_free"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick="" id="legendary_staked_free_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="ind center">
                                        <img src={require("../img/wd.png").default} className="img__wd"></img>
                                        <div id="ticket_weight_f">0.00</div>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/png-3-ticket.png").default}
                                             className="stake__nft" id="ticket_staked_free"></img>
                                    </div>
                                    <div className="center">
                                        <img src={require("../img/Portal.png").default}
                                             className="stake__nft"></img>
                                    </div>
                                    <div className="center">
                                        <button onClick=""
                                                id="ticket_staked_free_button"
                                                className="btn btn-primary btn__claim">UNSTAKE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="all_card">
                        <div id="block__warpass" className="block__warpass justify-content-center">
                            <ItemFromInventory/>
                        </div>
                        <div className="pbot100"></div>
                    </div>
                </div>
            </div>
        );
    }
};
