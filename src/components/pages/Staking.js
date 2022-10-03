import React, {useEffect, useState} from 'react'
import BuildingPool from '../components/Staking/BuildingPool.js'
import MainPool from '../components/Staking/MainPool'
import WarpassPool from '../components/Staking/WarpassPool'
import StakingTop from '../components/Staking/StakingTop'
import {UserService} from '../UserService'

const axios = require('axios')

export default function Staking() {
    const [pool, setPool] = useState('')

    const [activepools, setActivePools] = useState({
        'mainpooltbl': true,
        'warpooltbl': true,
        'constpooltbl': true,
    })

    const [poolsWeights, setPoolWeights] = useState({})

    const [warpasses, setWarpasses] = useState([])
    const [tickets, setTickets] = useState([])
    const [cards, setCards] = useState([])
    const [tools, setTools] = useState([])
    const [energy, setEnergy] = useState([])
    const [balances, setBalances] = useState({})
    const [update, setUpdate] = useState(0)

    const [ENGClaim, setENGClaim] = useState(0)
    const [CNTClaim, setCNTClaim] = useState(0)
    const [WDCClaim, setWDCClaim] = useState(0)

    const [isLoading, setIsLoading] = useState(true)

    const images = ({
        '327406': 'Qmb6r1us2vYjnfrzSfa5LGiz6z7ZMBRqYa9pG53QJmZZTN',  //warpass
        "326605": 'QmUxio9fpkQHmZ8FP8pdPvRS8s8Cbsig5muzyGLHZDxi1Z',  //ticket2
        '326606': 'QmPUt4dXs93mG5niLvkKufv2wtR9yyFwgf821Y6WMAguGF',  //ticket3
        '326604': 'QmP6aArSTekfzHffsRzF4RtMzhskqBx8iohLNJwsMxVLVQ',  //ticket1
        "279151": 'Qmc5Bp2nQcYgAJ7H6cKeV2nnhLZ7oUXqwHjoG5LoYxipqQ',  //rare
        "394234": "Qma8x8gfKr4YGpQqLYN7VRbykRC5QHVj6x5XP4R36grcz3",  //energy
        "energy": "Qma8x8gfKr4YGpQqLYN7VRbykRC5QHVj6x5XP4R36grcz3",  //energy
        "279152": "QmSH4dgMsZ61EpSn6Gqn26C6ExwNwtqztcWvxdvpfCYt1H",  //uncommon
        '279150': 'QmTWSiYdBLcyFwP7bppikz8bKjjzZYRWsVsd8GRQTnzTbU',  //mythical
        '279149': 'Qmd1fYriN17HuSgCX9vasW78ZBjAiAJWYx2t29reK2yJGq',  //legendary
        '306387': 'Qmf6LV2Q5Y1A5YTcCCb4aAwGV5Wwz2LusNaZC27PnZoZj6',  //boer
        '306388': 'QmYJs7e9A4G2PWbVKsVfPxECT41xiYBiEFBsUtjEdY6CwN',  //pick
        "279153": 'QmfCu94LQp6wQhvsDn6izrzA8Q9EZbtGcJNKfDFrgqnGpH',  //common
        '399229': 'QmUgxZu6z4TavwVtnLsSb9eqvur9AfpWSUNnapNrXbHAHf',  //Shards Pool Pack
        '399232': 'QmeBEmiZ9AWKVdzwoTwT5ha1sLXc4Dgsz6F4Qz8RJP9HyJ',  //Crafter Pack
        '400564': 'QmYWKDpNBQkWGp7H9WrHQzJcywtTKmgAhRZAQkrGVnRfzw',  //Alfa
        '400493': 'QmRsZtuGhUHvzc3MXtq7HuLAYGu2hW9iJhmRz3FL3kFGpG',  //Andreas
        '344989': 'Qmd1fYriN17HuSgCX9vasW78ZBjAiAJWYx2t29reK2yJGq',  //William
        '344984': 'Qmdtk88VfCrY4WQVMHKuBkoUYGpmLz4rhTBo9LssSvDxnq',  //Maximilian
        '400492': 'QmbhbLZXYKH7zUECzP9q22WTaHxadpWLoWZucjFr2i3M2A', //Rob Bitt
        '344979': 'QmTWSiYdBLcyFwP7bppikz8bKjjzZYRWsVsd8GRQTnzTbU', //Oliver
        '344978': 'QmUonAob7x5SaPfrKwBFUhFC5sXCMgpn5SYvZ4LCKHiKmM', //Barboso
        '344975': 'QmQM1YRJjhW4D6FVzmeaq4iLCde7pea6tFAkpgddVsk7Vx', //Ivoloid
        '344973': 'QmXdgafjo1BhJhPeJ8yNbeRmznDWTRV6u2wRofBs1x33pg', //Xaphan
        '344971': 'QmUa1FvKyf6EJ7FGjR5Dg98GjxC9vQjQ58s63vV5A7UvHo', //Asura
        '344969': 'QmVgDBGGjJm6EJjeUXqWMTeMspY2huiU6zwznEtW7dvXpA', //Taylor Labien
        '344967': 'QmeQvkx7bFXvBCEpgbctQh4c5hB6NJtikTnZpzoZFTLbVa', //Bennett Morrigan

        '400497': 'QmTrwgGpNQ4aCVHCQFXCWExhUiheCzHiovWZVX2Nk15U53', //Kalisa Labien
        '344960': 'QmTpkLLjZHnhPAti9j72fbCXaZ1SCDAV8vEL4bsSo37nNh', //Thomas
        '344959': 'QmUwscWocjKNkbn6ijsqegiW86chxtyPvyi2DfQ4QcNeFh', //Edwin
        '344958': 'Qmc5Bp2nQcYgAJ7H6cKeV2nnhLZ7oUXqwHjoG5LoYxipqQ', //Benjamin
        '344956': 'QmT95m3y8Xe2ie4DJqy37jN1y3hUKs57A2Trfv3yckL88p', //Clark
        '344951': 'QmWiwWrej8QPj4GsphRrMdER3qSzr4K7qGrDHdECgEkiwG', //Sonya
        '344954': 'QmURS3j8TPDEQxEY9EUEW8DFsAnTYMnvfdMmdbHp7yCixN', //Tinker
        '344936': 'Qmc3cU1eUyPiRRr7ZUmo4CAkTFBPC8BWnjSCsybCiRKFFU', //Veliar
        '344933': 'QmVxZBRw2xNGqUyUD3vPLCDi4o2SkjPwoP1fzew2u2Bhhk', //Succubus
        '344930': 'QmfXAjQ9qmGpwcZj8q1BKdfURKDeLct8dS67dMHRKNaUWm', //Vaalberite
        '344923': 'QmYvJNaEstSosckn5F91755chWLVUWjspSxYu2YXpjLbFN', //Morrigans
        '344921': 'QmXiL9w7AkZANb5cG5MKRJFbjjMhEyR8YqYTX9WauXXMoH', //Claude d'Estaing 

        '400491': 'QmeGRNToAJVhmEaCoed6egJR7vX43YCvoDwAi5nbNhULdm', //Adam Labien
        '344864': 'QmW5vV9mjsfj8PPpg2X6AaXJqdfRXhHtHpfvJSo5qYHoXB', //Advar Folami 
        '344865': 'QmW3ahHewHf1bjNZy977AXC3VX43zzmeTfcuX4SAwAfmwD', //Emilia d'Estaing
        '344867': 'QmaKQAYASyLrMdDtRbVau3JqDJHdgARHcSU1JGaHwXVuy9', //Vivien d'Estening
        '344869': 'Qmdu6bMjqzuS4GvNBRFBWsjmDX4328ssZwAnQGASevi4rE', //Lupen
        '344872': 'QmWWgefkpKy5Ltn8ZaEePhJyMc6rXZvT2Vwwiw8RCUTce1', //Habaril
        '344873': 'QmWWwtwqtQKDFH7jpSfFQnd89V8Jgz583EauGF6AWkMwKu', //Ufir
        '344874': 'QmefrgZQpwWweLyRKE5DvbgRhgLnU5PnKUp3hYZMdMJxqZ', //Verdelit
        '344879': 'QmX3kNCPC6cP9ebo2sTQwWxP6iK8ipTxU9UN9raHq1ir8n', //Brainstorm
        '344881': 'QmepCzd6D5aZDmyxXqhL5y3vKWdvGYgZyKJ4Gzn3Poa5oo', //Earl
        '344882': 'QmQX8ZHf8GvL2mwXC7wzpNpQWmzNhFfnbZVeQTH1acFTsU', //Erator
        '344883': 'QmVjGnn1jCqVhz8n17fsUvjSv2LwfSdje8dcYKaFGoVcge', //Rusty
        '344885': 'QmSeqtDeLv17CtA6sXed5MY7bsnMX25wHTgNM9TCb99Fj9', //Captain Oberon
        '344888': 'QmU27pgjCCrJ4sbHpw9VUATXJmJ1PnLL6PeBMz6YnL3FGi', //Calvin
        '344889': 'QmVwqG4yh4hSGSFjEVd4n7gZNbaDRaqRgVmY88r7jEWgmf', //Elizabet
        '344890': 'QmSH4dgMsZ61EpSn6Gqn26C6ExwNwtqztcWvxdvpfCYt1H', //James

        '344834': 'QmbgGTHHX4RrzpQVuLcmAJHqpkhjjLUb2ZdykLyzRanCio', //Oscar
        '344832': 'QmYtxED5hiJ7fVv9PPR7wyD3Xub7XS6uJ8A8k2mFEp23VP', //Luise
        '344830': 'QmSshZNoEDxLrCvD2g4U6Bapbcj3kBpaK4Ui4ocTbPnnMp', //Kris
        '344829': 'QmSccCL2y36jHbr9A7LcvQHiZj43wrUaK7wfrzpV3QLjNm', //Jacob
        '344828': 'QmfCu94LQp6wQhvsDn6izrzA8Q9EZbtGcJNKfDFrgqnGpH', //Henry
        '344826': 'QmNUEVTePE2jv6BgZ8PJoAUw1r6ujEy5XLMGYGDaEm5oLZ', //Tin
        '344824': 'QmX88oPmsN9KGHooJ1Nmfab2uBFaF91ACaeckLQpfxsCQk', //Mecha
        '344823': 'QmUvfPi4VBbqaecbh21dkmhHxEPz3KxKFY6wqTfHjwRZKL', //Jet
        '344822': 'QmaLY3qLBz8yVZFUcd439rBiez5mjN5PkGaG8RX72GjJzu', //Gold
        '344821': 'QmRTt9MByB8nVGucnhEjLCWpcqQEDcRWtJgxGJwTwH3yNZ', //Axel
        '344820': 'QmNweAstH5nvHVgad9vFTHxo9USPUtXveUm1bpzncH1ELp', //Sabnak
        '344819': 'QmSPyvM87Jn1jZqP7Q8HoUN7jJxWK4wJB83iJpN5j1AJAo', //Philotanus
        '344818': 'QmbVdpL5VamS8CJCaTU7R19uvmsG48H6tGXQPvr62qdTbL', //Olivier
        '344817': 'QmbfegCMvRHWttL4nrGUKLoN47FTvtVkeyNpHHwnaEYqq8', //Mulciber
        '344776': 'QmTgHm2J5vDZoprHq4v5hLWma28EcRExu7rAjF7sDHs8F2', //Moloch
        '344775': 'QmScAeyaig5DKmHGRTLVSiF6dsyHAmaD3XZWgfJFfgQsGL', //Merrick Folami
        '344774': 'Qma3CBCxjPp4x2RqZ4bYT69UH98DjpMegyv6k9raskP7LS', //Magnus
        '344771': 'QmbYcWkjhkjYv9GeH94qoschKkMDSwE2kxFEt87NQSfUrg', //Lumia Folami
        '344767': 'QmdCFkDV8K8BJQNjT43jdtxM8bP71BPCGGGD5nq4by3vhY', //Killian
        '344758': 'QmZxNt57BpTNz9R7JM1LpQQNex2sFJF8pQKNkh3F4CrUh8', //Hyman Fouls

        '402291': 'QmakRjMjcvyJEQvs27ZB9VLtw7WqYxiAczRFS6fDzRK3ME', //Drilling rig
        '402292': 'QmcatR6gXiXB17bogNKAsffchvyUXBH8Sn7AnNHcviiSX4', //Drilling rig plus
        '402290': 'QmQGcXwaD2eHgFDMbUSGyGs173n7PEwB5k5WyAT4H3b3RM', //Digger
        '402289': 'QmZ5EP38kWUc56uqYNxYMUorvGzakFrphNRMZf7DMb9Jjj', //Digger+
        '402287': 'Qmd5yiN76Bauv74rFYXDaLf3DmxGd8LML5waXrujLzQM85', //Drill
        '402288': 'QmRWpaZd1DFnA1N9pcoSMptTwFn8uZTThT6rLCXQBbQ8ma', //Drill+
        '402286': 'QmYQmb7Ab1e4zVn3bWcdUkZFFGEv1EYpBDptdJe4MWoFVZ', //Pickaxe
        '402284': 'QmaGg1ozs4JdtRDJnJV6tXcFJc4BUJ29bUCMm1gFTnFa94', //Pickaxe+
        '402281': 'QmbTrYgPfjsMJ5DSit78itayGVtPzJkMQwr17riJYgKb3g', //Shovel
        '402282': 'QmYVHa4tuHcEMhT5EhB3ev2tQTofETK6UN3tmT3hUmamtz', //Shovel+
    })

    useEffect(() => {
        (
            async () => {
                var config = {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'text/plain;charset=UTF-8',
                        'Host': 'https://wax.greymass.com/',
                        'Referer': 'https://app.wardor.io/',
                        'Accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6,zh;q=0.5'
                    },
                }
                setIsLoading(true)
                var body = {
                    "json": true,
                    "code": "wrdrstake.gm",
                    "scope": "wrdrstake.gm",
                    "table": "configpools",
                    "lower_bound": null,
                    "upper_bound": null,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "100",
                    "reverse": false,
                    "show_payer": false
                }
                const weights = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                // //console.log('weights',weights.data.rows)
                var tmpools = {
                    constpooltbl: false,
                    mainpooltbl: false,
                    warpooltbl: false
                }
                for (var i of weights.data.rows) {
                    tmpools[i.poolNameInconfigpools] = i.isWork
                }
                if (tmpools.mainpooltbl) {
                    setPool('Main Pool')
                } else if (tmpools.warpooltbl) {
                    setPool('Warpass Pool')
                } else if (tmpools.constpooltbl) {
                    setPool('Construction Pool')
                }
                setActivePools(tmpools)

                var tmpweights = {}
                if (weights.data.rows && weights.data.rows.length > 0) for (var i of weights.data.rows) {
                    tmpweights[i.poolNameInconfigpools] = {}
                    for (var j of i.rarities) {
                        tmpweights[i.poolNameInconfigpools][j.rarity] = j.weight
                    }
                }

                body = {
                    "json": true,
                    "code": "wrdrstake.gm",
                    "scope": "wrdrstake.gm",
                    "table": "permittedid",
                    "lower_bound": null,
                    "upper_bound": null,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "100",
                    "reverse": false,
                    "show_payer": false
                }
                const toolweights = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)

                const stackedandslots = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)


                body = {
                    "json": true,
                    "code": "tokenswardor",
                    "scope": UserService.authName,
                    "table": "accounts",
                    "lower_bound": null,
                    "upper_bound": null,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "3",
                    "reverse": false,
                    "show_payer": false
                }

                const testbal=await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                var tmp = {}
                for (var i of testbal.data.rows) {
                    var symbol=i.balance.substr(i.balance.length-3,i.balance.length-1)
                    tmp[symbol] = i.balance.substr(0,i.balance.length-4)*1
                }
                body = {
                    "json": true,
                    "code": "eosio.token",
                    "scope": UserService.authName,
                    "table": "accounts",
                    "lower_bound": null,
                    "upper_bound": null,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "1",
                    "reverse": false,
                    "show_payer": false
                }

                const testwax=await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                var waxbal
                if (testwax.data.rows[0]) {
                    waxbal = testwax.data.rows[0].balance.substr(0,testwax.data.rows[0].balance.length-4)*1
                    tmp['WAX']=waxbal.toFixed(2)
                } else tmp['WAX'] = 0


                // //console.log(testwax.data)

                var tmptickets = []
                var tmpwarpasses = []
                var tmpenergy = []
                var tmpCards = []
                var tmpTools = []

                const all_items = await axios.get('https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=' + UserService.authName + '&collection_name=wrdruniverse')

                // //console.log(all_items.data.data)

                for (var i of all_items.data.data) {
                    // //console.log(i.schema.schema_name)
                    if (i.schema.schema_name == 'warpass') {
                        tmpwarpasses.push({
                            name: i.name.replace('\t', ''),
                            asset_id: i.asset_id,
                            template_mint: i.template_mint,
                            rarity: i.data.rarity
                        })
                    } else if (i.schema.schema_name == 'tickets') {
                        tmptickets.push({
                            name: i.name.replace('\t', ''),
                            asset_id: i.asset_id,
                            template_mint: i.template_mint,
                            rarity: i.data.rarity
                        })
                    } else if (i.schema.schema_name == 'bundles') {
                        tmpenergy.push({
                            name: i.name.replace('\t', ''),
                            asset_id: i.asset_id,
                            template_mint: i.template_mint,
                        })
                    } else if (i.schema.schema_name == 'heroes') {
                        tmpCards.push({
                            name: i.name.replace('\t', ''),
                            asset_id: i.asset_id,
                            template_mint: i.template_mint,
                            rarity: i.data.rarity
                        })
                    } else if (i.schema.schema_name == 'tools') {
                        var tmpweight = 0
                        for (var j of toolweights.data.rows) {
                            if (j.templateId == i.template.template_id) {
                                tmpweight = j.score
                            }
                        }
                        tmpTools.push({
                            name: i.name.replace('\t', ''),
                            asset_id: i.asset_id,
                            template_mint: i.template_mint,
                            rarity: i.data.rarity,
                            weight: tmpweight
                        })
                    }

                }

                // //console.log(tmpCards)

                await setBalances(tmp)
                await setWarpasses(tmpwarpasses)
                await setTickets(tmptickets)
                await setTools(tmpTools)
                await setCards(tmpCards)
                await setEnergy(tmpenergy)
                await setPoolWeights(tmpweights)

                setIsLoading(false)

            }
        )()
    }, [update])

    useEffect(() => {
        setUpdate(Math.random())
    }, [])


    return (
        <div>
            <StakingTop pool={pool} setPool={setPool} balances={balances} claimedENG={ENGClaim} claimedCNT={CNTClaim}
                        claimedWDC={WDCClaim} setUpdate={setUpdate} activepools={activepools}/>
            {
                pool == "Main Pool" ? (
                    <MainPool
                        weights={poolsWeights.mainpooltbl}
                        images={images}
                        inventoryCards={cards}
                        setInventoryCards={setCards}
                        tools={tools}
                        energy={energy}
                        setEnergy={setEnergy}
                        setUpdate={setUpdate}
                        update={update}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        claim={WDCClaim}
                        setClaim={setWDCClaim}
                        isActive={activepools.mainpooltbl}
                    />
                ) : (
                    pool == "Construction Pool" ? (
                        <BuildingPool
                            weights={poolsWeights.constpooltbl}
                            images={images}
                            inventoryCards={cards}
                            tickets={tickets}
                            energy={energy}
                            setEnergy={setEnergy}
                            setUpdate={setUpdate}
                            update={update}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            claim={CNTClaim}
                            setClaim={setCNTClaim}
                            isActive={activepools.constpooltbl}

                        />
                    ) : (
                        <WarpassPool
                            weights={poolsWeights.warpooltbl}
                            images={images}
                            warpasses={warpasses}
                            inventoryCards={cards}
                            energy={energy}
                            setEnergy={setEnergy}
                            setUpdate={setUpdate}
                            update={update}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            tickets={tickets}
                            claim={ENGClaim}
                            setClaim={setENGClaim}
                            isActive={activepools.warpooltbl}
                        />
                    )
                )
            }
        </div>
    )
}
