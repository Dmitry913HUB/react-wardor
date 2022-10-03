import React, {useEffect, useState} from 'react'
import ShopInventory from '../components/Shop/ShopInventory'
import ShopTop from '../components/Shop/ShopTop'
import {UserService} from '../UserService'
import {Dropdown, Modal, Button} from 'react-bootstrap'


const axios = require('axios')

export default function Shop() {
    const [token, setToken] = useState({
        name: 'ENG',
        address: 'tokenswardor'
    })
    const [update, setUpdate] = useState(0)
    const [whitelist, setWhitelist] = useState(false)

    const [slots, setSlots] = useState({
        warpass: 4,
        building: 3,
        main: 3
    })

    const itemimages = ({
        '327406': 'Qmb6r1us2vYjnfrzSfa5LGiz6z7ZMBRqYa9pG53QJmZZTN',  //warpass
        "326605": 'QmUxio9fpkQHmZ8FP8pdPvRS8s8Cbsig5muzyGLHZDxi1Z',  //ticket2
        '326606': 'QmPUt4dXs93mG5niLvkKufv2wtR9yyFwgf821Y6WMAguGF',  //ticket3
        '326604': 'QmP6aArSTekfzHffsRzF4RtMzhskqBx8iohLNJwsMxVLVQ',  //ticket1
        "279151": 'Qmc5Bp2nQcYgAJ7H6cKeV2nnhLZ7oUXqwHjoG5LoYxipqQ',  //rare
        "394234": "Qma8x8gfKr4YGpQqLYN7VRbykRC5QHVj6x5XP4R36grcz3",  //energy
        "279152": "QmSH4dgMsZ61EpSn6Gqn26C6ExwNwtqztcWvxdvpfCYt1H",  //uncommon
        '279150': 'QmTWSiYdBLcyFwP7bppikz8bKjjzZYRWsVsd8GRQTnzTbU',  //mythical
        '279149': 'Qmd1fYriN17HuSgCX9vasW78ZBjAiAJWYx2t29reK2yJGq',  //legendary
        '306387': 'Qmf6LV2Q5Y1A5YTcCCb4aAwGV5Wwz2LusNaZC27PnZoZj6',  //boer
        '306388': 'QmYJs7e9A4G2PWbVKsVfPxECT41xiYBiEFBsUtjEdY6CwN',  //pick
        "279153": 'QmfCu94LQp6wQhvsDn6izrzA8Q9EZbtGcJNKfDFrgqnGpH',  //common
        '399229': 'QmUgxZu6z4TavwVtnLsSb9eqvur9AfpWSUNnapNrXbHAHf',  //Shards Pool Pack
        '402506': 'QmeBEmiZ9AWKVdzwoTwT5ha1sLXc4Dgsz6F4Qz8RJP9HyJ',  //Crafter Pack
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

        '402300': 'Qmf17DjcSuu5RFgBRtZhT393x42o6teX2pL8iyArkyWF1M', //Level Up

    })

    const [items, setItems] = useState([])

    const [names, setNames] = useState({
        '306387': 'Boer',//boer
        '306388': 'Big Hummer',//pick
        '394234': 'Bundle of Power',//energy
        'bslot': 'Slot for Construction Pool',
        'wslot': 'Slot for Warpass Pool',
        'mslot': 'Slot for Main Pool',
        'bwl': 'Construction Whitelist',
        '399229': 'Shards Pool Pack',
        '402506': 'Tools Pool Pack',
        '400564': 'Alfa',  //Alfa
        '400493': 'Andreas',  //Andreas
        '344989': 'William',  //William
        '344984': 'Maximilian',  //Maximilian
        '400492': 'Rob Bitt', //Rob Bitt
        '344979': 'Oliver', //Oliver
        '344978': 'Barboso', //Barboso
        '344975': 'Ivoloid', //Ivoloid
        '344973': 'Xaphan', //Xaphan
        '344971': 'Asura', //Asura
        '344969': 'Taylor Labien', //Taylor Labien
        '344967': 'Bennett Morrigan', //Bennett Morrigan

        '400497': 'Kalisa Labien', //Kalisa Labien
        '344960': 'Thomas', //Thomas
        '344959': 'Edwin', //Edwin
        '344958': 'Benjamin', //Benjamin
        '344956': 'Clark', //Clark
        '344951': 'Sonya', //Sonya
        '344954': 'Tinker', //Tinker
        '344936': 'Veliar', //Veliar
        '344933': 'Succubus', //Succubus
        '344930': 'Vaalberite', //Vaalberite
        '344923': 'Morrigans', //Morrigans
        '344921': 'Claude d\'Estaing', //Claude d'Estaing 

        '400491': 'Adam Labien', //Adam Labien
        '344864': 'Advar Folami', //Advar Folami 
        '344865': 'Emilia d\'Estaing', //Emilia d'Estaing
        '344867': 'Vivien d\'Estening', //Vivien d'Estening
        '344869': 'Lupen', //Lupen
        '344872': 'Habaril', //Habaril
        '344873': 'Ufir', //Ufir
        '344874': 'Verdelit', //Verdelit
        '344879': 'Brainstorm', //Brainstorm
        '344881': 'Earl', //Earl
        '344882': 'Erator', //Erator
        '344883': 'Rusty', //Rusty
        '344885': 'Captain Oberon', //Captain Oberon
        '344888': 'Calvin', //Calvin
        '344889': 'Elizabet', //Elizabet
        '344890': 'James', //James

        '344834': 'Oscar', //Oscar
        '344832': 'Luise', //Luise
        '344830': 'Kris', //Kris
        '344829': 'Jacob', //Jacob
        '344828': 'Henry', //Henry
        '344826': 'Tin', //Tin
        '344824': 'Mecha', //Mecha
        '344823': 'Jet', //Jet
        '344822': 'Gold', //Gold
        '344821': 'Axel', //Axel
        '344820': 'Sabnak', //Sabnak
        '344819': 'Philotanus', //Philotanus
        '344818': 'Olivier', //Olivier
        '344817': 'Mulciber', //Mulciber
        '344776': 'Moloch', //Moloch
        '344775': 'Merrick Folami', //Merrick Folami
        '344774': 'Magnus', //Magnus
        '344771': 'Lumia Folami', //Lumia Folami
        '344767': 'Killian', //Killian
        '344758': 'Hyman Fouls', //Hyman Fouls

        '402300': 'Level Up Card',


    })
    const [modalShow, setModalShow] = useState(false);
    const err = {
        'nowarpass': "Action not available. Stake warpass first.",
        'toolnotunstaked': "Action not available. Unstake Item from the slot first.",
        'nobalance':'Insufficient balance to purchase'
    }
    const [currErr, setCurrErr] = useState('nobalance')
    const [balances,setBalances]=useState({})


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

    useEffect(() => {
        //https://wax.greymass.com/v1/chain/get_table_rows
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
                var body = {
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

                await setBalances(tmp)

                
                body = {
                    "json": true,
                    "code": "wrdrstake.gm",
                    "scope": "wrdrstake.gm",
                    "table": "shop",
                    "lower_bound": null,
                    "upper_bound": null,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "100",
                    "reverse": false,
                    "show_payer": false
                }
                const items = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                // //console.log('qweqweq', items.data.rows)
                setItems(items.data.rows)

                body = {//building
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
                const axBslots = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                // //console.log('123123123', axBslots.data)
                var Bslots = 3
                if (axBslots.data.rows[0]) Bslots = axBslots.data.rows[0].slot


                body = {
                    "json": true,
                    "code": "wrdrstake.gm",
                    "scope": "wrdrstake.gm",
                    "table": "warpooltbl",
                    "lower_bound": UserService.authName,
                    "upper_bound": UserService.authName,
                    "index_position": 1,
                    "key_type": "",
                    "limit": "1",
                    "reverse": false,
                    "show_payer": false
                }
                const axWslots = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                var Wslots = 4
                if (axWslots.data.rows[0]) Wslots = axWslots.data.rows[0].slot

                body = {
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
                const axMslots = await axios.post('https://wax.greymass.com/v1/chain/get_table_rows', body, config)
                var Mslots = 3
                if (axMslots.data.rows[0]) Mslots = axMslots.data.rows[0].slot

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
                // console.log(wl.data)
                if (wl.data.rows.length > 0) setWhitelist(true);
                else setWhitelist(false)


                setSlots({
                    warpass: Wslots,
                    building: Bslots,
                    main: Mslots
                })
            }

        )()
    }, [update])

    return (
        <div>
            <ModalError/>
            <ShopTop token={token} setToken={setToken}/>
            <ShopInventory items={items} token={token} images={itemimages} slots={slots} setUpdate={setUpdate}
                           names={names} whitelist={whitelist} balances={balances} setModalShow={setModalShow}/>
        </div>
    )
}
