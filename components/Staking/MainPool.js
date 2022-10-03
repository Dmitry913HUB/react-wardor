import React, {useEffect, useState} from 'react'
import {Dropdown, Modal, Button} from 'react-bootstrap'
import '../../styles/Staking/MainPool.css'
import '../../styles/loader.css'
import {IoContract, IoSettings} from "react-icons/io5"
import {UserService} from '../../UserService'


const axios = require('axios')

export default function MainPool({
                                     weights,
                                     images,
                                     inventoryCards,
                                     setInventoryCards,
                                     tools,
                                     energy,
                                     setEnergy,
                                     setUpdate,
                                     update,
                                     isLoading,
                                     setIsLoading,
                                     claim,
                                     setClaim,
                                     isActive
                                 }) {
    const [cards, setCards] = useState([])
    const mapkey = () => {
        const da = new Date()
        // ////console.log(da*Math.random())
        const result = da * Math.random()
        return result
    }

    const [stakedEnergy, setStakedEnergy] = useState(0)

    const [slots, setSlots] = useState([{}, {}, {}])

    const [receive, setReceive] = useState(0)


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
                                    memo: 'mainpooltbl'
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

    const [modalShow, setModalShow] = useState(false);
    const err = {
        'nowarpass': "Action not available. Stake warpass first.",
        'toolnotunstaked': "Action not available. Unstake Item from the slot first."
    }
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

    useEffect(() => {
        // ////console.log(weights);
        //https://wax.greymass.com/v1/chain/get_table_rows
        (
            async () => {
                setIsLoading(true)
                var config = {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'text/plain;charset=UTF-8',
                        'Host': 'wax.greymass.com',
                        'Referer': 'https://app.wardor.io/',
                        'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5'
                    },
                }
                var body = {
                    "json": true,
                    "code": "wrdrstake.gm",
                    "scope": "wrdrstake.gm",
                    "table": "mainpooltbl",
                    "lower_bound": UserService.authName,
                    "upper_bound": UserService.authName,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "1",
                    "reverse": false,
                    "show_payer": false
                }
                const stackedandslots = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                // //console.log('123123123123', stackedandslots.data)
                //////console.log(UserService.authName)
                var tmpslots = []
                var tmpcards = []
                //заносим в активные слоты все кроме warpass
                if (stackedandslots.data.rows[0]) setClaim(stackedandslots.data.rows[0].tokenstoclaim)
                // ////console.log("tokenstoclaim main pool " + stackedandslots.data.rows[0].tokenstoclaim)
                if (stackedandslots.data.rows[0] && stackedandslots.data.rows[0].toolassetscount) for (var i of stackedandslots.data.rows[0].toolassetscount) {
                    // ////console.log(i.rarity)
                    if (i.rarity != "warpass") {
                        tmpcards.push(i)
                    } else {
                        // setWarpassSlot(i)
                    }
                }
                setCards(tmpcards)
                //
                if (stackedandslots.data.rows[0] && stackedandslots.data.rows[0].slot) for (var i = 0; i < stackedandslots.data.rows[0].slot; i++) {
                    if (tmpcards[i]) tmpslots.push(tmpcards[i])
                    else tmpslots.push({})
                }
                // ////console.log(tmpslots)
                if (stackedandslots.data.rows.length > 0) setSlots(tmpslots)

                if (stackedandslots.data.rows[0] && stackedandslots.data.rows[0].energy) setStakedEnergy(stackedandslots.data.rows[0].energy)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);

            }
        )()
    }, [update])


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

    const CardItem = ({item, index}) => {
        const [name, setName] = useState('')
        const [curTool, setCurTool] = useState('')
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
                                        memo: 'mainpooltbl'
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
                            // setUpdate(Math.random())
                            setTimeout(() => {
                                setUpdate(Math.random())
                                setName("UNSTAKE")
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
            if (item.toolAssetId != 0) {
                setCurrErr('toolnotunstaked')
                setModalShow(true)
            } else
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
                                // setUpdate(Math.random())
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
///////////////////////////////////////////////////////////////////////////////////////////////////////UUUUUUNNNNNSTAKE TOOL/////////////////////////////////////////////////////////////////////////////
        const unstakeTool = (tool) => {
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
                                        assetId: tool.toolAssetId + ''
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
                            // setUpdate(Math.random())
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
        ///////////////////////////////////////////////////////////////////////////////////////////////////////STAKE TOOL/////////////////////////////////////////////////////////////////////////////
        const stakeTool = (item, tool, index) => {
            // var tmpslots=[...slots]
            // for(var i of tmpslots){
            //     if(i==item){
            //         i.tool=tool.name
            //     }
            // }
            // ////console.log(tmpslots)
            // setSlots(tmpslots)
            ////console.log(index)
            // num=['onepool','twopool','threepool','fourpool','fivepool','sixpool','sevenpool','eightpool','ninepool']

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
                                        asset_ids: [tool.asset_id],
                                        memo: (index + 1) + 'slot'
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

                            // window.location.reload();
                            // setUpdate(Math.random())
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
                setName("UNSTAKE")
                // setCurTool(item.tool)
            }
        }, [])


        return (
            <div className="main-pool-card active">

                <div
                    className="main-pool-item-weight">{(weights && item.rarity) ? (
                    <img src={require("../../img/WDC.svg").default}
                         className="little_coin_img"></img>) : (<></>)} {(weights && item.rarity) ? (item.toolScore != 0 ? ((weights[item.rarity] * (item.toolScore / 10)).toFixed(0) + ' WDC/h') : weights[item.rarity] + ' WDC/h') : ' '}
                </div>
                <div className='image-block'>
                    <div className="main-pool-img-slots">
                        {
                            item.rarity ? (
                                item.rarity != 'rare' && item.rarity != 'uncommon' && item.rarity != 'mythical' && item.rarity != 'legendary' ?
                                    (
                                        <>
                                            <img
                                                src={item.rarity ? (getImageURL(item.templateId)) : (require("../../img/Frame.png").default)}
                                                className={item.rarity ? "main-pool-card img-active" : "main-pool-card img"}/>
                                            {item.toolScore != 0 ? (
                                                <video data-tilt autoPlay loop muted
                                                       src={getImageURL(item.toolTemplateId)}
                                                       className={item.toolScore != 0 ? "main-pool-tool-img exist" : "main-pool-tool-img"}/>
                                            ) : (
                                                <img
                                                    src={require("../../img/Frame.png").default}
                                                    className={item.toolScore != 0 ? "main-pool-tool-img exist" : "main-pool-tool-img"}/>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <video data-tilt autoPlay loop muted
                                                   src={item.rarity ? ('https://wardorinventory.mypinata.cloud/ipfs/' + images[item.templateId]) : (require("../../img/Frame.png").default)}
                                                   className={item.rarity ? "main-pool-card img-active" : "main-pool-card img"}/>
                                            {item.toolScore != 0 ? (
                                                <video data-tilt autoPlay loop muted
                                                       src={getImageURL(item.toolTemplateId)}
                                                       className={item.toolScore != 0 ? "main-pool-tool-img exist" : "main-pool-tool-img"}/>
                                            ) : (
                                                <img
                                                       src={require("../../img/Frame.png").default}
                                                       className={item.toolScore != 0 ? "main-pool-tool-img exist" : "main-pool-tool-img"}/>
                                            )}

                                        </>
                                    )
                            ) : (
                                <>
                                    <img src={(require("../../img/Frame.png").default)}
                                         className={"main-pool-card img"}/>
                                    <img src={(require("../../img/Frame.png").default)}
                                         className={"main-pool-tool-img"}/>
                                </>
                            )
                        }
                    </div>
                </div>

                <div>
                    {(name.toUpperCase() == "SELECT CARD") ? (<Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="main-pool-dropdown-toggle">
                            {name.toUpperCase()}

                        </Dropdown.Toggle>
                        {(cardsinslots != cards.length || !item.rarity) ? (
                            <Dropdown.Menu className="">
                                {item.rarity ? (<Dropdown.Item>Unstake</Dropdown.Item>) : (

                                    inventoryCards.map((item) => {
                                        return (<Dropdown.Item onClick={() => {
                                            stakeCard(item)
                                        }}
                                                               key={mapkey()}>#{item.template_mint} {item.name} ({item.rarity})</Dropdown.Item>)
                                    })

                                )}
                            </Dropdown.Menu>) : (<></>)
                        }
                    </Dropdown>) : (<Button variant="secondary" className="main-pool-dropdown-toggle" onClick={() => {
                        unstakeCard(item)
                    }}>{name.toUpperCase()}</Button>)}

                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic"
                                         className="main-pool-dropdown-tool-toggle">
                            <IoSettings/>
                        </Dropdown.Toggle>

                        {item.rarity ? (
                            <Dropdown.Menu className="dropdown-menu">
                                {item.toolScore != 0 && item.rarity ? (<Dropdown.Item onClick={() => {
                                        unstakeTool(item)
                                    }}>Unstake tool</Dropdown.Item>) :
                                    (
                                        tools.map((tool) => {
                                            var exist = true;
                                            for (var i of slots) {
                                                if (tool.name == i.tool) exist = false
                                            }
                                            if (exist) return (<Dropdown.Item onClick={() => {
                                                stakeTool(item, tool, index)
                                            }}>#{tool.template_mint} {tool.name.toUpperCase()} X{tool.weight / 10}<br/>({tool.rarity})
                                            </Dropdown.Item>)
                                        })
                                    )}
                            </Dropdown.Menu>) : (<></>)
                        }
                    </Dropdown>

                </div>
            </div>
        )
    }


    useEffect(() => {
        // //console.log('123',weights)
        var rec = 0
        for (var i of slots) {
            if (weights && i.rarity) {
                if (i.toolScore != '0') {
                    rec = rec + parseInt((weights[i.rarity] * i.toolScore / 10).toFixed(0))
                }
                else {
                    rec = rec + parseInt(weights[i.rarity])
                }

            }
        }
        setReceive(rec)

    }, [weights, slots])

    const ReceiveTokens = () => {
        return (
            <div className='tokens-to-recieve'>
                Per hour: <img src={require("../../img/WDC.svg").default}
                               className="little_coin_img"></img> {receive} WDC<br/>
                Per day: <img src={require("../../img/WDC.svg").default}
                              className="little_coin_img"></img> {receive * 24} WDC<br/>
                Per week: <img src={require("../../img/WDC.svg").default}
                               className="little_coin_img"></img> {receive * 24 * 7} WDC<br/>
                Per month: <img src={require("../../img/WDC.svg").default}
                                className="little_coin_img"></img> {receive * 24 * 30} WDC<br/>
            </div>
        )
    }


    if (isActive) return (
        <>
            <div className="center main-pool">
                <div className={isLoading ? 'blured' : ""}>
                    <ModalError/>
                    {/* <div className='main-statistic'> */}
                    <div className='warpass-pool-energy-warpass-div'>
                        <ReceiveTokens/>
                        <EnergyItem/>
                    </div>

                    <div className="main-pool-active-cards">
                        {
                            slots.map((item, index) => {
                                return <CardItem item={item} index={index}/>
                            })
                        }

                    </div>
                </div>
                {isLoading ?
                    (
                        <div className="center exstention">
                            <div>
                                <div className="spinner icon-spinner-3" aria-hidden="true"></div>
                            </div>
                        </div>
                    ) : (<></>)}
            </div>

        </>
    )
    else return (<></>)
}
