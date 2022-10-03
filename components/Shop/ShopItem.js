import React, {useState,useEffect} from 'react'
import '../../styles/Shop/ShopItem.css'
import {UserService} from '../../UserService'
import mslot from '../../img/mslot.png'

export default function ShopItem({
                                    item,
                                    image,
                                    token,
                                    slots,
                                    setUpdate,
                                    names,
                                    balance,
                                    setModalShow,
                                    whitelist
                                }){
    const [count,setCount]=useState(0)
    const [price,setPrice]=useState(item.price)

    const plus_count=()=>{
        if(item.templateIdName.indexOf('slot')!=-1){
            if (item.templateIdName[0]=='w'){
                if(count<(9-slots.warpass)) setCount(count+1);
            }
            else {
                if (item.templateIdName[0]=='m'){
                    if(count<8-slots.main) setCount(count+1);
                }
                else{
                    if(count<8-slots.building) setCount(count+1);
                }
            }

        } 
        else setCount(count+1)
    }

    const minus_count=()=>{
        if(count>0) setCount(count-1)
    } 

    const buy=()=>{
        // //console.log('asdfghjkascdhandljn',token)
        // //console.log('balance',balance)
        if(!balance || balance<price) setModalShow(true) 
        else
        try {
            UserService.session
                .signTransaction(
                    {
                        actions: [
                            {
                                account: token.address,
                                name: "transfer",
                                authorization: [
                                    {
                                        actor: UserService.authName,
                                        permission: "active",
                                    },
                                ],
                                data: {
                                    from: UserService.authName,
                                    to: 'wrdrstake.gm',
                                    quantity: price + ".00000000 "+item.token,
                                    memo: item.templateIdName
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
                    // //console.log("Im here")
                    if (response.status === "executed") {
                        UserService.getBalance();
                        // //console.log('Im in if')
                    }
                    setUpdate(Math.random())
                });

        } catch (e) {
            // //console.log('ERROR: ', e.message);
            alert(e.message);
        }

        setCount(0)

    }
    
    return (
        whitelist&&item.templateIdName=='bwl'?<></>:
        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 text-center">
            <div
                className='top15 nft-name'>{names[item.templateIdInt] || names[item.templateIdName]}</div>
            {item.templateIdName != "energy"&&item.templateIdName != "lvlup" ?
                <img className="top10 img-nft"
                     src={
                         item.templateIdName.indexOf('slot') == -1?
                            (
                                item.templateIdName!='bwl'?
                                 ('https://wardorinventory.mypinata.cloud/ipfs/' + image)
                                 :(require('../../img/Construction_Pass.png').default)
                            ) :
                             (item.templateIdName[0] == 'm' ?
                                     (require("../../img/mslot.png").default) :
                                     (item.templateIdName[0] == 'w' ?
                                             (require("../../img/wslot.png").default) :
                                             (require("../../img/bslot.png").default)
                                     )
                             )}>

                </img> :
                <video data-tilt autoPlay loop muted className="top10 img-nft"
                       src={
                           item.templateIdName.indexOf('slot') == -1 ?
                               ('https://wardorinventory.mypinata.cloud/ipfs/' + image) :
                               (item.templateIdName[0] == 'm' ?
                                       (require("../../img/mslot.png").default) :
                                       (item.templateIdName[0] == 'w' ?
                                               (require("../../img/wslot.png").default) :
                                               (require("../../img/bslot.png").default)
                                       )
                               )}>

                </video>
            }
            <>
                <div className="mx-auto d-block center shop-item-count-block">
                    {/* <div className="shop-item-choose-count">
                        <div className="unselectable center shop-item-operators" onClick={minus_count}>
                            -
                        </div>
                        <div className={count==0?"center shop-item-count zero":"center shop-item-count"}>
                            {count}
                        </div>
                        <div className="unselectable center shop-item-operators" onClick={plus_count}>
                            +
                        </div>
                    </div> */}
                    {item.templateIdName.toLowerCase().indexOf('slot') == -1 ?
                        (

                            (<div className="unselectable center shop-item-buy-button" onClick={() => {
                                buy()
                            }}>
                                {(price * 1).toFixed(0) + ' ' + item.token}
                            </div>)
                        ) : (
                            item.templateIdName[0] == 'w' ?
                                (
                                    slots.warpass < 9 ?
                                        (
                                            <div className="unselectable center shop-item-buy-button" onClick={() => {
                                                buy()
                                            }}>
                                                {(price * 1).toFixed(0) + ' ' + item.token}
                                            </div>
                                        ) : (
                                            <div className="unselectable center shop-item-buy-button nonactive">
                                                {(price * 1).toFixed(0) + ' ' + item.token}
                                            </div>
                                        )

                                ) : (
                                    item.templateIdName[0] == 'm' ? (
                                        slots.main < 8 ?
                                            (
                                                <div className="unselectable center shop-item-buy-button" onClick={() => {
                                                    buy()
                                                }}>
                                                    {(price * 1).toFixed(0) + ' ' + item.token}
                                                </div>
                                            ) : (
                                                <div className="unselectable center shop-item-buy-button nonactive">
                                                    {(price * 1).toFixed(0) + ' ' + item.token}
                                                </div>
                                            )

                                    ) : (
                                        slots.building < 8 ?
                                            (
                                                <div className="unselectable center shop-item-buy-button" onClick={() => {
                                                    buy()
                                                }}>
                                                    {(price * 1).toFixed(0) + ' ' + item.token}
                                                </div>
                                            ) : (
                                                <div className="unselectable center shop-item-buy-button nonactive">
                                                    {(price * 1).toFixed(0) + ' ' + item.token}
                                                </div>
                                            )

                                    )
                                )
                        )}
                    {/* Buy */}
                </div>
            </>
            {/* <>
                <div className="mx-auto d-block center shop-item-total">
                        <div className="center shop-item-total-text">
                            TOTAL:
                        </div>
                        <div className="center shop-item-total-price">
                            {(price*count).toFixed(1)+' '+item.token} 
                        </div>

                </div>
            </> */}
        </div>
    )
}
