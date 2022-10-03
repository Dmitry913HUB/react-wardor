import React, {useState, useEffect} from 'react'
import {Dropdown, Modal, Button} from "react-bootstrap"
import {UserService} from '../../UserService'
import {Link} from "react-router-dom";

const axios = require('axios')

export default function BuildingPool({
                                         weights,
                                         images,
                                         inventoryCards,
                                         energy,
                                         tickets,
                                         isLoading,
                                         setIsLoading,
                                         update,
                                         setUpdate,
                                         claim,
                                         setClaim,
                                         isActive
                                     }) {
    const [warpassSlot, setWarpassSlot] = useState({})
    const [stakedEnergy, setStakedEnergy] = useState(0)
    const [whitelist, setWhitelist] = useState(false)

    const [isTicket, setisTicket] = useState(false)

    const [modalShow, setModalShow] = useState(false);
    const err = {
        'nowarpass': "You can't stake Item while Warpass unstaked",
        'toolnotunstaked': "You can't unstake Item while you not unstake Tool"
    }

    const [receive, setReceive] = useState(0)

    const [currErr, setCurrErr] = useState('nowarpass')
    const ModalError = () => {
        return (
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-bg"
                centered
            >
                <Modal.Body className="modalerr">
                    <div className=''>
                        <div className='center'>
                            <h4>Error</h4><br/>
                        </div>
                        <div className='center'>
                            <p>
                                {err[currErr]}
                            </p>
                        </div>
                        <div className='center unselectable modal-close' onClick={() => {
                            setModalShow(false)
                        }}>
                            Close
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
        )
    }

    const getImageURL = (templateID) => {
        return 'https://wardorinventory.mypinata.cloud/ipfs/' + images[templateID]
    }


    const mapkey = () => {
        const da = new Date()
        // ////console.log(da*Math.random())
        const result = da * Math.random()
        return result
    }
    const [cards, setCards] = useState([])
    const [slots, setSlots] = useState([{}, {}, {}])

    useEffect(() => {
        // ////console.log(weights);
        //https://wax.greymass.com/v1/chain/get_table_rows
        (

            async () => {
                setisTicket(false)
                setIsLoading(true)
                // ////console.log(weights)
                var config = {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'text/plain;charset=UTF-8',
                        'Host': 'wax.greymass.com',
                        'Referer': 'http://wardortest.com/',
                        'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5'
                    },
                }
                var body = {
                    "json": true,
                    "code": "wrdrstake.gm",
                    "scope": "wrdrstake.gm",
                    "table": "constpooltbl",
                    "lower_bound": UserService.authName,
                    "upper_bound": UserService.authName,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "1",
                    "reverse": false,
                    "show_payer": false
                }
                const stackedandslots = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                // //console.log('qwertyuiolkjhgfds', stackedandslots.data)
                var tmpslots = []
                var tmpcards = []
                //заносим в активные слоты все кроме warpass
                if (stackedandslots.data.rows[0]) setClaim(stackedandslots.data.rows[0].tokenstoclaim)

                if (stackedandslots.data.rows && stackedandslots.data.rows[0])
                    for (var i of stackedandslots.data.rows[0].assetscount) {
                        // ////console.log(i.rarity)
                        if (i.rarity != "warpass") {
                            tmpcards.push(i)
                        } else {
                            setWarpassSlot(i)
                        }
                    }
                ////console.log('_____________', tmpcards)
                setCards(tmpcards)
                //
                if (stackedandslots.data.rows && stackedandslots.data.rows[0])
                    for (var i = 0; i < stackedandslots.data.rows[0].slot; i++) {
                        if (tmpcards[i]) {
                            tmpslots.push(tmpcards[i])
                            if (tmpcards[i].rarity.toLowerCase().indexOf('ticket') != -1) {
                                setisTicket(true)
                            }
                        } else tmpslots.push({})
                    }
                // ////console.log(tmpslots)
                if (stackedandslots.data.rows.length > 0) setSlots(tmpslots)

                if (stackedandslots.data.rows[0] && stackedandslots.data.rows[0].energy) setStakedEnergy(stackedandslots.data.rows[0].energy)

                body = {
                    "json": true,
                    "code": "wrdrstake.gm",
                    "scope": "wrdrstake.gm",
                    "table": "constpoolwl",
                    "lower_bound": UserService.authName,
                    "upper_bound": UserService.authName,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "1",
                    "reverse": false,
                    "show_payer": false
                }

                const wl = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                ////console.log(wl.data)
                if (wl.data.rows.length > 0) setWhitelist(true)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
                // setTimeout(setUpdate(Math.random(),150000))
            }

        )()
    }, [update])


    const selectEnergy = (item) => {
        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: 'atomicassets',
                                name: "transfer",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    // authorized_account: UserService.authName,
                                    from: UserService.authName,
                                    to: 'wrdrstake.gm',
                                    asset_ids: [item.asset_id],
                                    memo: 'constpooltbl'
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
                    // ////console.log("Im here")
                    if (response.status === "executed") {
                        UserService.getBalance();
                        ////console.log('Im in if')
                        // window.location.reload();
                        setTimeout(() => {
                            setUpdate(Math.random())
                        }, 1000);
                    }
                });

        } catch (e) {
            ////console.log('ERROR: ', e.message);
            alert(e.message);
        }
    }

    const CardItem = ({item, index}) => {
        const [name, setName] = useState('')
        const [cardsinslots, setCardinSlots] = useState(0)


        const stakeCard = (item) => {
            try {
                UserService.session
                    .signTransaction(
                        {
                            actions: [
                                {
                                    account: 'atomicassets',
                                    name: "transfer",
                                    authorization: [
                                        {
                                            actor: UserService.authName,
                                            permission: "active",
                                        },
                                    ],
                                    data: {
                                        // authorized_account: UserService.authName,
                                        from: UserService.authName,
                                        to: 'wrdrstake.gm',
                                        asset_ids: [item.asset_id],
                                        memo: 'constpooltbl'
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
                        // ////console.log("Im here")
                        if (response.status === "executed") {
                            UserService.getBalance();
                            ////console.log('Im in if')
                            // window.location.reload();
                            setTimeout(() => {
                                setUpdate(Math.random())
                            }, 1000);
                        }
                    });

            } catch (e) {
                ////console.log('ERROR: ', e.message);
                alert(e.message);
            }
        }

        const unstakeCard = (item) => {
            ////console.log('card', item)

            try {
                UserService.session
                    .signTransaction(
                        {
                            actions: [
                                {
                                    account: 'wrdrstake.gm',
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
                                        assetId: item.assetId
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
                        // ////console.log("Im here")
                        if (response.status === "executed") {
                            UserService.getBalance();
                            ////console.log('Im in if')
                            // window.location.reload();
                            setTimeout(() => {
                                setUpdate(Math.random())
                            }, 1000);
                        }
                    });

            } catch (e) {
                ////console.log('ERROR: ', e.message);
                alert(e.message);
            }
        }


        useEffect(() => {
            if (!item.rarity) {
                setName('Select Card')
            } else {
                setName('unstake')
            }
        }, [])


        return (
            <div className="main-pool-card active">
                <div
                    className="main-pool-item-weight">{(weights && item.rarity) ? (
                    <img src={require("../../img/CNT.svg").default}
                         className="little_coin_img"></img>) : (<></>)} {(weights && item.rarity) ? (weights[item.rarity].toFixed(0) + ' CNT/h') : ' '}
                </div>
                <div className='image-block'>
                    {
                        item.rarity ? (
                            item.rarity != 'rare' && item.rarity != 'uncommon' && item.rarity != 'mythical' && item.rarity != 'legendary' ?
                                (<img
                                    src={item.rarity ? (getImageURL(item.templateId)) : (require("../../img/Frame.png").default)}
                                    className={item.rarity ? "main-pool-card img-active" : "main-pool-card img"}/>) : (
                                    <video data-tilt autoPlay loop muted
                                           src={item.rarity ? ('https://wardorinventory.mypinata.cloud/ipfs/' + images[item.templateId]) : (require("../../img/Frame.png").default)}
                                           className={item.rarity ? "main-pool-card img-active" : "main-pool-card img"}/>
                                )
                        ) : (
                            <img src={(require("../../img/Frame.png").default)}
                                 className={item.rarity ? "main-pool-card img-active" : "main-pool-card img"}/>
                        )
                    }
                </div>
                <div>
                    {(name.toUpperCase() == "SELECT CARD") ?
                        (<Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic"
                                             className="main-pool-dropdown-toggle">
                                {name.toUpperCase()}
                            </Dropdown.Toggle>
                            {(cardsinslots != cards.length || !item.rarity) ? (
                                <Dropdown.Menu className="">
                                    {inventoryCards.map((item) => {
                                        return (<Dropdown.Item onClick={() => {
                                            stakeCard(item)
                                        }}
                                                               key={mapkey()}>#{item.template_mint} {item.name} {item.rarity}</Dropdown.Item>)
                                    })}
                                    {item.rarity ? (<></>) : (
                                        !isTicket ? (tickets.map((item) => {
                                                return (<Dropdown.Item onClick={() => {
                                                    stakeCard(item)
                                                }}
                                                                       key={mapkey()}>#{item.template_mint} {item.name} {item.rarity}</Dropdown.Item>)
                                            })
                                        ) : (<></>))}
                                </Dropdown.Menu>) : (<></>)
                            }


                        </Dropdown>) : ((
                            <Button variant="secondary" className="main-pool-dropdown-toggle" onClick={() => {
                                unstakeCard(item)
                            }}>{name.toUpperCase()}</Button>))
                    }
                </div>
            </div>
        )
    }

    const EnergyItem = () => {
        return (
            <div className="main-pool-energy-card">
                
                <div className="main-pool-item-weight">{stakedEnergy}h</div>
                <div className='image-block'>
                    <video autoPlay loop muted
                           src={'https://wardorinventory.mypinata.cloud/ipfs/' + images.energy}
                           className={"main-pool-card img-active"}></video>
                </div>

                {energy.length==0?
                <Button disabled variant="secondary" className="main-pool-dropdown-toggle">
                   NO ENERGY
                </Button>:
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="main-pool-dropdown-toggle">
                        ADD ENERGY
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="">
                        {
                            energy.map((item) => {
                                return (<Dropdown.Item onClick={() => {
                                    selectEnergy(item)
                                }} key={mapkey()}>#{item.template_mint}</Dropdown.Item>)
                            })

                        }
                    </Dropdown.Menu>
                </Dropdown>}
            </div>
        )
    }
    useEffect(() => {
        // //console.log('123',weights)
        var rec = 0
        for (var i of slots) {
            if (weights && i.rarity) {
                rec += weights[i.rarity]
            }
        }
        if (weights && warpassSlot.rarity) {
            rec += weights[warpassSlot.rarity]
        }
        setReceive(rec)

    }, [weights, slots])

    const ReceiveTokens = () => {
        return (
            <div className='tokens-to-recieve'>
                Per hour: <img src={require("../../img/CNT.svg").default}
                               className="little_coin_img"></img> {receive} CNT<br/>
                Per day: <img src={require("../../img/CNT.svg").default}
                              className="little_coin_img"></img> {receive * 24} CNT<br/>
                Per week: <img src={require("../../img/CNT.svg").default}
                               className="little_coin_img"></img> {receive * 24 * 7} CNT<br/>
                Per month: <img src={require("../../img/CNT.svg").default}
                                className="little_coin_img"></img> {receive * 24 * 30} CNT<br/>
            </div>
        )
    }

    if (isActive) return (
        <div className="center main-pool">


            <>
                <div className={!whitelist || isLoading ? 'blured' : ''}>
                    <ModalError></ModalError>
                    <div className="warpass-pool-energy-warpass-div">
                        <ReceiveTokens/>
                        <EnergyItem/>
                    </div>

                    <div className="main-pool-active-cards">
                        {
                            slots.map((item, index) => {
                                return <CardItem item={item} index={index}
                                                 key={mapkey()}/>
                            })
                        }
                    </div>
                </div>
                {isLoading ?
                    (<>
                        <div className="center exstention">
                            <div>
                                <div className="spinner icon-spinner-3" aria-hidden="true"></div>
                            </div>
                        </div>
                    </>) : !whitelist ? (
                            <div className="center exstention">
                                <div>
                                    <div className="extension-text">
                                        You need buy WhiteList to stake in this pool <br/>
                                        You may buy it in <Link className='menu-href extension-btn' to='/shop'>Shop</Link>
                                    </div>

                                </div>
                            </div>
                        ) :
                        (<></>)
                }
            </>

        </div>
    )
    else return (<></>)
}
